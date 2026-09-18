// src/services/officerService.js
// Dedicated Police Officer Operations for Police App

import sharedBackendService from './sharedBackendService';

export const officerService = {
  getAllOfficers: () => sharedBackendService.officers,

  getOfficersByStation: (stationId) => {
    return sharedBackendService.officers.filter((o) => o.stationId === stationId);
  },

  getOfficerById: (officerId) => {
    return sharedBackendService.officers.find((o) => o.officerId === officerId || o.badgeId === officerId) || null;
  },

  updateDutyStatus: (officerId, dutyStatus) => {
    return sharedBackendService.updateOfficerDutyStatus(officerId, dutyStatus);
  },

  subscribeToOfficers: (callback) => {
    return sharedBackendService.subscribeToOfficers(callback);
  },
};

export default officerService;
