// src/services/serviceRequestService.js
// Dedicated Service Request Operations for Police App
// Coordinates with Shared Cloud DB and Citizen App E-Services
// Supports: LHMS, Lost Items, Women Safety Escort, Senior Care, Track Trip, Cyber Complaints

import sharedBackendService from './sharedBackendService';

export const serviceRequestService = {
  getAllRequests: () => sharedBackendService.getServiceRequests(),

  getRequestById: (id) => sharedBackendService.getRequestById(id),

  filterByType: (serviceType) => {
    return sharedBackendService.getServiceRequests().filter((r) => r.serviceType === serviceType);
  },

  filterByStatus: (status) => {
    return sharedBackendService.getServiceRequests().filter((r) => r.status.toUpperCase() === status.toUpperCase());
  },

  searchByTokenOrKeyword: (query) => {
    if (!query || !query.trim()) return sharedBackendService.getServiceRequests();
    const q = query.toLowerCase().trim();
    return sharedBackendService.getServiceRequests().filter((r) => {
      return (
        r.trackingToken?.toLowerCase().includes(q) ||
        r.applicantName?.toLowerCase().includes(q) ||
        r.applicantPhone?.toLowerCase().includes(q) ||
        r.serviceTitle?.toLowerCase().includes(q)
      );
    });
  },

  updateStatus: (requestId, nextStatus, remarks, officerName) => {
    return sharedBackendService.updateRequestStatus(requestId, nextStatus, remarks, officerName);
  },

  assignOfficer: (requestId, officerId, officerName, remarks) => {
    return sharedBackendService.assignOfficerToRequest(requestId, officerId, officerName, remarks);
  },

  addEvidence: (requestId, evidenceUrl) => {
    return sharedBackendService.addRequestEvidence(requestId, evidenceUrl);
  },

  subscribeToRequests: (callback) => {
    return sharedBackendService.subscribeToServiceRequests(callback);
  },

  submitCitizenRequest: (data) => {
    return sharedBackendService.submitCitizenServiceRequest(data);
  },
};

export default serviceRequestService;
