// src/services/lhmsService.js
// Dedicated Service & Parser for Locked House Monitoring System (LHMS)
// Connects directly to sharedBackendService (SERVICE_REQUESTS) with real-time 2-way sync

import sharedBackendService from './sharedBackendService';

export const LHMS_SERVICE_TYPE = 'LHMS';

/**
 * Normalizes an LHMS service request object to ensure consistent field access
 * without modifying or losing any citizen-submitted information.
 */
export function parseLHMSData(request) {
  if (!request) return null;
  const fd = request.formData || {};

  // Address: exact submitted address or structured fallback
  let address = fd.address;
  if (!address && (fd.houseNo || fd.area)) {
    address = [fd.houseNo, fd.area, fd.landmark].filter(Boolean).join(', ');
  }
  if (!address) {
    address = request.address || 'Not provided';
  }

  // Purpose of leaving the house
  const purpose = fd.purpose || fd.purposeOfLeaving || fd.reason || 'Not provided';

  // Where from / Destination
  const whereFrom = fd.whereFrom || fd.destination || fd.whereGoing || fd.travelDestination || 'Not provided';

  // From Date
  const fromDate = fd.fromDate || fd.vacationStart || fd.startDate || fd.departureDate || 'Not provided';

  // From Time
  const fromTime = fd.fromTime || fd.departureTime || fd.startTime || 'Not provided';

  // Return / Reach Update information
  const returnStatus = fd.returnStatus || fd.reachStatus || fd.reachReturnStatus || fd.updateStatus || null;
  const updatedDate = fd.updatedDate || fd.returnDate || fd.reachDate || null;
  const updatedTime = fd.updatedTime || fd.returnTime || fd.reachTime || null;

  return {
    ...request,
    address,
    purpose,
    whereFrom,
    fromDate,
    fromTime,
    returnStatus,
    updatedDate,
    updatedTime,
    hasReachUpdate: Boolean(returnStatus || updatedDate || updatedTime),
  };
}

class LHMSService {
  // Subscribe to real-time LHMS cases
  subscribeToCases(callback) {
    const filterLHMS = (allRequests) => {
      const lhmsRequests = allRequests.filter(
        (r) => r.serviceType === 'LHMS' || r.serviceType === 'LOCKED_HOUSE'
      );
      callback(lhmsRequests);
    };

    // Initial load
    filterLHMS(sharedBackendService.getServiceRequests());

    // Real-time listener
    if (typeof sharedBackendService.subscribeToServiceRequests === 'function') {
      return sharedBackendService.subscribeToServiceRequests((all) => {
        filterLHMS(all);
      });
    }
    if (typeof sharedBackendService.subscribe === 'function') {
      return sharedBackendService.subscribe('requests', (all) => {
        filterLHMS(all);
      });
    }
    return () => {};
  }

  // Get specific LHMS case by ID or tracking token
  getCaseById(caseId) {
    const all = sharedBackendService.getServiceRequests();
    const found = all.find((r) => r.id === caseId || r.trackingToken === caseId);
    return found ? parseLHMSData(found) : null;
  }

  // Update status of an LHMS case from Police App
  updateStatus(caseId, newStatus, officerName, remarks) {
    return sharedBackendService.updateServiceRequestStatus(
      caseId,
      newStatus,
      officerName || 'Duty Officer',
      remarks || `Status updated to ${newStatus} by Coimbatore City Police`
    );
  }

  // Update Reach/Return status (simulated citizen or officer reach update)
  updateReachStatus(caseId, reachStatus, date, time) {
    const req = sharedBackendService.getServiceRequests().find((r) => r.id === caseId);
    if (!req) return null;

    const updatedFormData = {
      ...req.formData,
      returnStatus: reachStatus,
      updatedDate: date || new Date().toLocaleDateString('en-GB'),
      updatedTime: time || new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    req.formData = updatedFormData;
    req.updatedAt = new Date().toISOString();

    sharedBackendService._notify('requests', [...sharedBackendService.serviceRequests]);
    sharedBackendService._addLog(`📍 LHMS Reach Update for ${req.trackingToken}: ${reachStatus}`);
    return parseLHMSData(req);
  }
}

const lhmsService = new LHMSService();
export default lhmsService;
