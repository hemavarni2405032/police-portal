// src/services/sosService.js
// Dedicated SOS Emergency Alert Operations for Police App
// Coordinates with Shared Cloud DB and Citizen App SOS alerts

import sharedBackendService from './sharedBackendService';

export const sosService = {
  getAllAlerts: () => sharedBackendService.getSOSAlerts(),

  getActiveAlerts: () => {
    return sharedBackendService.getSOSAlerts().filter(
      (s) => s.status === 'ACTIVE' || s.status === 'PATROL_DISPATCHED'
    );
  },

  getAlertById: (id) => sharedBackendService.getSOSById(id),

  dispatchPatrol: (sosId, unitId, etaSeconds, officerName) => {
    return sharedBackendService.dispatchPatrol(sosId, unitId, etaSeconds, officerName);
  },

  resolveAlert: (sosId, notes) => {
    return sharedBackendService.resolveSOS(sosId, notes);
  },

  cancelAlert: (sosId, reason) => {
    return sharedBackendService.cancelSOS(sosId, reason);
  },

  subscribeToAlerts: (callback) => {
    return sharedBackendService.subscribeToSOS(callback);
  },

  triggerCitizenSOS: (data) => {
    return sharedBackendService.triggerCitizenSOS(data);
  },
};

export default sosService;
