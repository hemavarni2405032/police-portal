// src/models/integrationModels.js
// Shared Data Models & Schemas according to APPS_SUMMARY.txt Section 5
// Compatible with Citizen App <-> Shared Cloud DB <-> Police App

export const SERVICE_TYPES = {
  LHMS: 'LHMS', // Locked House Monitoring System
  LOST_ITEMS: 'LOST_ITEMS', // Lost Item Reports
  WOMEN_SAFETY_ESCORT: 'WOMEN_SAFETY_ESCORT', // Women Safety Night Escort
  SENIOR_CITIZEN_CARE: 'SENIOR_CITIZEN_CARE', // Senior Citizen Care
  TRACK_MY_TRIP: 'TRACK_MY_TRIP', // Track My Trip
  CYBER_COMPLAINTS: 'CYBER_COMPLAINTS', // Cyber Complaints
};

export const SERVICE_STATUSES = {
  SUBMITTED: 'SUBMITTED',
  IN_REVIEW: 'IN_REVIEW',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
};

export const SOS_STATUSES = {
  ACTIVE: 'ACTIVE',
  PATROL_DISPATCHED: 'PATROL_DISPATCHED',
  RESOLVED: 'RESOLVED',
  CANCELLED: 'CANCELLED',
};

export const DUTY_STATUSES = {
  ON_DUTY: 'on_duty',
  IN_CHARGE: 'in_charge',
  PATROL: 'patrol',
  OFF_DUTY: 'off_duty',
};

/**
 * Validation schema helpers
 */
export function validateServiceRequest(req) {
  const required = ['id', 'trackingToken', 'serviceType', 'applicantName', 'applicantPhone', 'status'];
  for (const field of required) {
    if (!req[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  return { valid: true };
}

export function validateSOSAlert(sos) {
  const required = ['id', 'trackingToken', 'citizenPhone', 'citizenName', 'latitude', 'longitude', 'status'];
  for (const field of required) {
    if (!sos[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  return { valid: true };
}
