// src/services/policeStationService.js
// Dedicated Police Station Directory & Jurisdiction Operations

import sharedBackendService from './sharedBackendService';

export const policeStationService = {
  getAllStations: () => sharedBackendService.stations,

  getStationById: (stationId) => {
    return sharedBackendService.stations.find((s) => s.stationId === stationId) || null;
  },

  subscribeToStations: (callback) => {
    return sharedBackendService.subscribeToStations(callback);
  },
};

export default policeStationService;
