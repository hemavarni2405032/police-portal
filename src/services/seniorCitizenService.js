// src/services/seniorCitizenService.js
// Dedicated Service for Senior Citizen Care cases filed from Citizen App
// Operates exclusively on SERVICE_REQUESTS where serviceType === 'SENIOR_CITIZEN_CARE'

import sharedBackendService from './sharedBackendService.js';

export const SENIOR_CITIZEN_SERVICE_TYPE = 'SENIOR_CITIZEN_CARE';

/**
 * Normalizes submitted case data for Senior Citizen Care.
 * Extracts Senior Citizen info and optional Living With details without generating mock data.
 */
export function parseSeniorCitizenData(item) {
  if (!item) return null;
  const fd = item.formData || {};

  // Senior Citizen Details
  const seniorName = fd.seniorCitizenName || fd.name || fd.fullName || item.applicantName || null;
  const age = fd.age || fd.seniorCitizenAge || null;
  const address = fd.address || fd.residentialAddress || fd.houseAddress || fd.area || item.applicantAddress || null;

  // Living With / Relationship Details
  const contactName = fd.contactPersonName || fd.contactName || fd.livesWithName || fd.caregiverName || fd.relativeName || (fd.livesWith && fd.livesWith.name) || null;
  const relation = fd.relationship || fd.relation || fd.livesWithRelation || (fd.livesWith && fd.livesWith.relation) || null;
  const contactNumber = fd.contactNumber || fd.contactPhone || fd.livesWithPhone || fd.emergencyPhone || (fd.livesWith && fd.livesWith.phone) || null;

  const hasLivingWithContact = Boolean(contactName || relation || contactNumber);

  return {
    id: item.id,
    trackingToken: item.trackingToken,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    jurisdictionStation: item.jurisdictionStation,
    assignedOfficer: item.assignedOfficer,
    officerId: item.officerId,
    statusTimeline: item.statusTimeline || [],

    // Senior Citizen Details
    seniorName: seniorName || 'Not provided',
    age: age ? `${age}` : 'Not provided',
    address: address || 'Not provided',

    // Living With Details
    hasLivingWithContact,
    contactName: contactName || null,
    relation: relation || null,
    contactNumber: contactNumber || null,

    // Any other submitted medical or care data
    medicalConditions: fd.medicalConditions || fd.healthConditions || null,
    emergencyDoctor: fd.emergencyDoctor || fd.physician || null,
    specialRequests: fd.specialRequests || fd.notes || null,

    rawFormData: fd,
  };
}

export const seniorCitizenService = {
  // Returns only Senior Citizen Care cases
  getSeniorCitizenCases: () => {
    return sharedBackendService
      .getServiceRequests()
      .filter((r) => r.serviceType === SENIOR_CITIZEN_SERVICE_TYPE);
  },

  // Returns single case by ID or Tracking Token
  getCaseById: (id) => {
    const all = sharedBackendService.getServiceRequests();
    return all.find(
      (r) =>
        r.serviceType === SENIOR_CITIZEN_SERVICE_TYPE &&
        (r.id === id || r.trackingToken === id)
    ) || null;
  },

  // Subscribe in real time to Senior Citizen Care cases only
  subscribeToCases: (callback) => {
    return sharedBackendService.subscribeToServiceRequests((allRequests) => {
      const seniorCases = allRequests.filter(
        (r) => r.serviceType === SENIOR_CITIZEN_SERVICE_TYPE
      );
      callback(seniorCases);
    });
  },

  // Update status (SUBMITTED -> IN_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED)
  updateStatus: (requestId, nextStatus, remarks, officerName) => {
    return sharedBackendService.updateRequestStatus(requestId, nextStatus, remarks, officerName);
  },

  // Assign duty officer
  assignOfficer: (requestId, officerId, officerName, remarks) => {
    return sharedBackendService.assignOfficerToRequest(requestId, officerId, officerName, remarks);
  },

  parseData: parseSeniorCitizenData,
};

export default seniorCitizenService;
