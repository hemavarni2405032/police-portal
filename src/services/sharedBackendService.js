// src/services/sharedBackendService.js
// Compatible Shared Backend & Cloud DB Service for Kovai Kaval (Tamil Nadu Police)
// Implements schemas for USERS, SERVICE_REQUESTS, SOS_ALERTS, POLICE_STATIONS, POLICE_OFFICERS
// Supports two-way synchronization: Citizen App <-> Shared Backend <-> Police App

// ==============================================================================
// 1. SEED DATA MATCHING CITIZEN APP & POLICE APP ECOSYSTEM
// ==============================================================================

export const INITIAL_POLICE_STATIONS = [
  {
    stationId: 'STN-GND-01',
    name: 'Gandhipuram Police Station (B1)',
    tamilName: 'காந்திபுரம் காவல் நிலையம் (பி1)',
    zone: 'Coimbatore City Central Zone',
    address: 'Cross Cut Road, Gandhipuram, Coimbatore - 641012',
    phone: '+91 422 2490100',
    inChargeRank: 'Inspector of Police',
    inChargeName: 'R. Kumar (SHO)',
    latitude: 11.0168,
    longitude: 76.9558,
    isOpen247: true,
  },
  {
    stationId: 'STN-RSP-02',
    name: 'R.S. Puram Police Station (B2)',
    tamilName: 'ஆர்.எஸ். புரம் காவல் நிலையம் (பி2)',
    zone: 'Coimbatore City West Zone',
    address: 'DB Road, R.S. Puram, Coimbatore - 641002',
    phone: '+91 422 2541100',
    inChargeRank: 'Inspector of Police',
    inChargeName: 'K. Senthil Nathan',
    latitude: 11.0084,
    longitude: 76.9500,
    isOpen247: true,
  },
  {
    stationId: 'STN-PLM-03',
    name: 'Peelamedu Police Station (E2)',
    tamilName: 'பீளமேடு காவல் நிலையம் (இ2)',
    zone: 'Coimbatore City East Zone',
    address: 'Avinashi Road, Peelamedu, Coimbatore - 641004',
    phone: '+91 422 2572100',
    inChargeRank: 'Inspector of Police',
    inChargeName: 'M. Anandhan',
    latitude: 11.0280,
    longitude: 76.9933,
    isOpen247: true,
  },
  {
    stationId: 'STN-SBC-04',
    name: 'Saibaba Colony Police Station (C1)',
    tamilName: 'சாயிபாபா காலனி காவல் நிலையம் (சி1)',
    zone: 'Coimbatore City North Zone',
    address: 'NSR Road, Saibaba Colony, Coimbatore - 641011',
    phone: '+91 422 2431100',
    inChargeRank: 'Inspector of Police',
    inChargeName: 'S. Selvaraj',
    latitude: 11.0322,
    longitude: 76.9421,
    isOpen247: true,
  },
];

export const INITIAL_POLICE_OFFICERS = [
  {
    officerId: 'TNP-OFF-001',
    fullName: 'Inspector R. Kumar',
    rank: 'Inspector of Police',
    stationId: 'STN-GND-01',
    stationName: 'Gandhipuram',
    badgeId: 'POL-7842-MH',
    dutyPhone: '+91 98765 43210',
    dutyStatus: 'in_charge', // 'on_duty' | 'in_charge' | 'patrol' | 'off_duty'
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignedCasesCount: 4,
    activeSosId: 'SOS-2026-1024',
  },
  {
    officerId: 'TNP-OFF-002',
    fullName: 'SI Arun Sharma',
    rank: 'Sub-Inspector',
    stationId: 'STN-GND-01',
    stationName: 'Gandhipuram',
    badgeId: 'P-11452',
    dutyPhone: '+91 98765 43211',
    dutyStatus: 'patrol',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    assignedCasesCount: 3,
    activeSosId: null,
  },
  {
    officerId: 'TNP-OFF-003',
    fullName: 'SI Meena S.',
    rank: 'Sub-Inspector',
    stationId: 'STN-PLM-03',
    stationName: 'Peelamedu',
    badgeId: 'P-98234',
    dutyPhone: '+91 98765 43212',
    dutyStatus: 'on_duty',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    assignedCasesCount: 2,
    activeSosId: null,
  },
  {
    officerId: 'TNP-OFF-004',
    fullName: 'HC Prakash K.',
    rank: 'Head Constable',
    stationId: 'STN-SBC-04',
    stationName: 'Saibaba Colony',
    badgeId: 'P-44210',
    dutyPhone: '+91 98765 43213',
    dutyStatus: 'on_duty',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    assignedCasesCount: 2,
    activeSosId: null,
  },
  {
    officerId: 'TNP-OFF-005',
    fullName: 'Sgt. Rajan K.',
    rank: 'Sergeant',
    stationId: 'STN-RSP-02',
    stationName: 'R.S. Puram',
    badgeId: 'PATROL-1',
    dutyPhone: '+91 98765 43214',
    dutyStatus: 'patrol',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    assignedCasesCount: 1,
    activeSosId: null,
  },
];

export const INITIAL_USERS = [
  {
    uid: 'USR-CIT-001',
    mobileNumber: '+91 98765 43210',
    fullName: 'Ananya Ramesh',
    dob: '1998-04-12',
    gender: 'Female',
    residentialAddress: 'Flat 402, Green Meadows, 5th Cross, Gandhipuram, Coimbatore',
    emergencyContactName: 'Ramesh Krishnan (Father)',
    emergencyContactPhone: '+91 94432 11890',
    bloodGroup: 'B+',
    isVerified: true,
    createdAt: '2026-01-15T08:30:00.000Z',
    updatedAt: '2026-09-01T10:42:00.000Z',
  },
  {
    uid: 'USR-CIT-002',
    mobileNumber: '+91 98421 77654',
    fullName: 'K. Balasubramaniam',
    dob: '1952-11-03',
    gender: 'Male',
    residentialAddress: '14/2 East Sambandam Road, R.S. Puram, Coimbatore',
    emergencyContactName: 'B. Suresh (Son)',
    emergencyContactPhone: '+91 98421 99887',
    bloodGroup: 'O+',
    isVerified: true,
    createdAt: '2026-02-10T09:15:00.000Z',
    updatedAt: '2026-08-30T14:20:00.000Z',
  },
  {
    uid: 'USR-CIT-003',
    mobileNumber: '+91 99440 22311',
    fullName: 'S. Priyanka',
    dob: '2001-08-22',
    gender: 'Female',
    residentialAddress: 'Tidel Park Road, Peelamedu, Coimbatore',
    emergencyContactName: 'S. Devi (Mother)',
    emergencyContactPhone: '+91 99440 44556',
    bloodGroup: 'A+',
    isVerified: true,
    createdAt: '2026-03-05T11:00:00.000Z',
    updatedAt: '2026-09-01T21:10:00.000Z',
  },
];

// Citizen SOS Alerts Schema (Section 5.3)
// status: 'ACTIVE' | 'PATROL_DISPATCHED' | 'RESOLVED' | 'CANCELLED'
export const INITIAL_SOS_ALERTS = [
  {
    id: 'SOS-2026-1024',
    trackingToken: 'TN-KVK-2026-SOS-1024',
    citizenPhone: '+91 98765 43210',
    citizenName: 'Ananya Ramesh',
    latitude: 11.0168,
    longitude: 76.9558,
    accuracyMeters: 4.8,
    status: 'PATROL_DISPATCHED', // ACTIVE -> PATROL_DISPATCHED -> RESOLVED
    dispatchedUnit: 'PU-12 (Gandhipuram Sector)',
    dispatchedOfficer: 'Inspector R. Kumar',
    etaSeconds: 360, // 6 minutes
    category: 'Personal Safety',
    locationName: 'Cross Cut Road, near City Bus Stop, Gandhipuram',
    description: 'Caller reported feeling unsafe while walking alone; suspect vehicle following. Immediate patrol dispatched.',
    emergencyContact: 'Ramesh Krishnan (Father): +91 94432 11890',
    bloodGroup: 'B+',
    createdAt: '2026-09-01T10:42:15.000Z',
    dispatchedAt: '2026-09-01T10:44:00.000Z',
    resolvedAt: null,
  },
  {
    id: 'SOS-2026-1025',
    trackingToken: 'TN-KVK-2026-SOS-1025',
    citizenPhone: '+91 98421 77654',
    citizenName: 'Riya Sharma',
    latitude: 11.0084,
    longitude: 76.9500,
    accuracyMeters: 6.2,
    status: 'ACTIVE',
    dispatchedUnit: null,
    dispatchedOfficer: null,
    etaSeconds: null,
    category: 'Medical Emergency',
    locationName: 'DB Road, near Flower Market, R.S. Puram',
    description: 'Elderly pedestrian collapsed near junction. Traffic diversion and emergency support requested.',
    emergencyContact: 'S. Sharma (Spouse): +91 98421 11223',
    bloodGroup: 'O+',
    createdAt: '2026-09-01T10:31:00.000Z',
    dispatchedAt: null,
    resolvedAt: null,
  },
  {
    id: 'SOS-2026-1026',
    trackingToken: 'TN-KVK-2026-SOS-1026',
    citizenPhone: '+91 99440 22311',
    citizenName: 'Lakshmi K.',
    latitude: 11.0280,
    longitude: 76.9933,
    accuracyMeters: 5.1,
    status: 'ACTIVE',
    dispatchedUnit: null,
    dispatchedOfficer: null,
    etaSeconds: null,
    category: 'Women Safety',
    locationName: 'T. Nagar Bus Terminus, Peelamedu',
    description: 'Citizen reported aggressive harassment at transit stop. Seeking police intervention.',
    emergencyContact: 'K. Kumar: +91 99999 88888',
    bloodGroup: 'A+',
    createdAt: '2026-09-01T10:18:00.000Z',
    dispatchedAt: null,
    resolvedAt: null,
  },
  {
    id: 'SOS-2026-1001',
    trackingToken: 'TN-KVK-2026-SOS-1001',
    citizenPhone: '+91 94432 00112',
    citizenName: 'Suresh Babu',
    latitude: 11.0322,
    longitude: 76.9421,
    accuracyMeters: 3.5,
    status: 'RESOLVED',
    dispatchedUnit: 'PU-21',
    dispatchedOfficer: 'HC Prakash K.',
    etaSeconds: 0,
    category: 'Road Incident',
    locationName: 'NSR Road, Saibaba Colony',
    description: 'Minor traffic confrontation resolved on spot by patrol unit.',
    emergencyContact: 'Family: +91 94432 99887',
    bloodGroup: 'AB+',
    createdAt: '2026-08-31T18:20:00.000Z',
    dispatchedAt: '2026-08-31T18:22:00.000Z',
    resolvedAt: '2026-08-31T18:45:00.000Z',
  }
];

// Citizen E-Service Requests Schema (Section 5.2)
// Service Types: LHMS | LOST_ITEMS | WOMEN_NIGHT_ESCORT | SENIOR_CITIZEN_CARE | TRACK_MY_TRIP | CYBER_COMPLAINTS
// status: 'SUBMITTED' -> 'IN_REVIEW' -> 'ASSIGNED' -> 'IN_PROGRESS' -> 'RESOLVED'
export const INITIAL_SERVICE_REQUESTS = [
  {
    id: 'SR-2026-LHM-84912',
    trackingToken: 'TN-KVK-2026-LHM-84912',
    serviceType: 'LHMS', // Locked House Monitoring System
    serviceTitle: 'Locked House Monitoring System (LHMS)',
    applicantName: 'Ananya Ramesh',
    applicantPhone: '+91 98765 43210',
    jurisdictionStation: 'Gandhipuram Police Station (B1)',
    stationId: 'STN-GND-01',
    assignedOfficer: 'SI Arun Sharma',
    officerId: 'TNP-OFF-002',
    status: 'IN_PROGRESS',
    statusTimeline: [
      { status: 'SUBMITTED', timestamp: '28 Aug 2026, 09:15 AM', updatedBy: 'Citizen (Mobile App)', remarks: 'Application registered with travel itinerary' },
      { status: 'IN_REVIEW', timestamp: '28 Aug 2026, 11:30 AM', updatedBy: 'Duty Desk Gandhipuram', remarks: 'Documents and neighbor contacts verified' },
      { status: 'ASSIGNED', timestamp: '28 Aug 2026, 02:00 PM', updatedBy: 'Insp. R. Kumar', remarks: 'Assigned to Beat Officer SI Arun Sharma' },
      { status: 'IN_PROGRESS', timestamp: '29 Aug 2026, 08:00 AM', updatedBy: 'SI Arun Sharma', remarks: 'Active camera installed & daily beat patrol scheduled' },
    ],
    formData: {
      address: '123, Gandhipuram, Coimbatore',
      purpose: 'Family Vacation',
      whereFrom: 'Coimbatore',
      fromDate: '20-09-2026',
      fromTime: '08:00 AM',
      returnStatus: 'Reached Destination Safely',
      updatedDate: '20-09-2026',
      updatedTime: '06:30 PM',
      cameraEquipped: 'Yes (Police Live Stream compatible)',
      neighborContact: 'Mr. V. Sundaram (+91 94432 55441)',
      lockType: 'Smart Padlock with tamper alarm',
    },
    evidenceUrls: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
    ],
    latitude: 11.0180,
    longitude: 76.9570,
    createdAt: '2026-08-28T09:15:00.000Z',
    updatedAt: '2026-08-29T08:00:00.000Z',
  },
  {
    id: 'SR-2026-CYB-20471',
    trackingToken: 'TN-KVK-2026-CYB-20471',
    serviceType: 'CYBER_COMPLAINTS', // Cyber Complaints
    serviceTitle: 'Cyber Fraud & Phishing Report',
    applicantName: 'Arun Kumar',
    applicantPhone: '+91 98421 55667',
    jurisdictionStation: 'Saibaba Colony Police Station (C1)',
    stationId: 'STN-SBC-04',
    assignedOfficer: 'HC Prakash K.',
    officerId: 'TNP-OFF-004',
    status: 'IN_REVIEW',
    statusTimeline: [
      { status: 'SUBMITTED', timestamp: '01 Sep 2026, 10:28 AM', updatedBy: 'Citizen (Mobile App)', remarks: 'Cyber complaint registered regarding unauthorized UPI debit' },
      { status: 'IN_REVIEW', timestamp: '01 Sep 2026, 10:45 AM', updatedBy: 'Cyber Cell Station Desk', remarks: 'Bank transaction statement and SMS screenshots queued for forensics' },
    ],
    formData: {
      incidentType: 'UPI Phishing / Fake KYC Call',
      financialLoss: '₹45,000',
      bankName: 'State Bank of India (RS Puram Branch)',
      suspectPhone: '+91 91234 56789',
      transactionId: 'UPI/2026/0901/994821',
      narrative: 'Received phone call from caller claiming to be bank executive. Shared OTP under duress resulting in immediate deduction.',
    },
    evidenceUrls: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    ],
    latitude: 11.0322,
    longitude: 76.9421,
    createdAt: '2026-09-01T10:28:00.000Z',
    updatedAt: '2026-09-01T10:45:00.000Z',
  },
  {
    id: 'SR-2026-WNE-39102',
    trackingToken: 'TN-KVK-2026-WNE-39102',
    serviceType: 'WOMEN_NIGHT_ESCORT', // Women Safety Night Escort
    serviceTitle: 'Women Safety Night Escort Request',
    applicantName: 'S. Priyanka',
    applicantPhone: '+91 99440 22311',
    jurisdictionStation: 'Peelamedu Police Station (E2)',
    stationId: 'STN-PLM-03',
    assignedOfficer: 'SI Meena S.',
    officerId: 'TNP-OFF-003',
    status: 'ASSIGNED',
    statusTimeline: [
      { status: 'SUBMITTED', timestamp: '01 Sep 2026, 09:30 PM', updatedBy: 'Citizen (Mobile App)', remarks: 'Night commute escort request registered from IT Park' },
      { status: 'IN_REVIEW', timestamp: '01 Sep 2026, 09:35 PM', updatedBy: 'Control Room Officer', remarks: 'Route verified; nearest Pink Patrol car identified' },
      { status: 'ASSIGNED', timestamp: '01 Sep 2026, 09:40 PM', updatedBy: 'Insp. M. Anandhan', remarks: 'Pink Patrol Unit 05 assigned to escort from Tidel Park to Hope College' },
    ],
    formData: {
      pickupLocation: 'Tidel Park Main Gate, Avinashi Road',
      destinationLocation: 'Hope College Junction, Peelamedu',
      scheduledTime: '10:30 PM Tonight',
      numPassengers: '1 Female',
      employer: 'Cognizant Technology Solutions',
      vehiclePreference: 'Pink Patrol Escort Vehicle',
    },
    evidenceUrls: [],
    latitude: 11.0280,
    longitude: 76.9933,
    createdAt: '2026-09-01T21:30:00.000Z',
    updatedAt: '2026-09-01T21:40:00.000Z',
  },
  {
    id: 'SR-2026-LST-19482',
    trackingToken: 'TN-KVK-2026-LST-19482',
    serviceType: 'LOST_ITEMS', // Lost Item Reports
    serviceTitle: 'Lost Item Report (Identity & Wallet)',
    applicantName: 'V. Murugan',
    applicantPhone: '+91 98433 11223',
    jurisdictionStation: 'Gandhipuram Police Station (B1)',
    stationId: 'STN-GND-01',
    assignedOfficer: 'Inspector R. Kumar',
    officerId: 'TNP-OFF-001',
    status: 'SUBMITTED',
    statusTimeline: [
      { status: 'SUBMITTED', timestamp: '01 Sep 2026, 08:00 AM', updatedBy: 'Citizen (Mobile App)', remarks: 'Lost wallet report submitted with scanned Aadhaar acknowledgment' },
    ],
    formData: {
      itemType: 'Leather Wallet containing Original Aadhaar, PAN & Driving License',
      approximateValue: '₹3,500 Cash + Cards',
      lostPlace: 'Gandhipuram Central Bus Stand Platform 3',
      lostDateTime: '31 Aug 2026, 07:30 PM',
      identifyingMarks: 'Brown Tommy Hilfiger wallet with blue lanyard',
    },
    evidenceUrls: [],
    latitude: 11.0168,
    longitude: 76.9558,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'SR-2026-TMT-77401',
    trackingToken: 'TN-KVK-2026-TMT-77401',

    serviceType: 'TRACK_MY_TRIP', // Track My Trip
    serviceTitle: 'Track My Trip Live Commute Monitoring',
    applicantName: 'Ananya Ramesh',
    applicantPhone: '+91 98765 43210',
    jurisdictionStation: 'Gandhipuram Police Station (B1)',
    stationId: 'STN-GND-01',
    assignedOfficer: 'SI Arun Sharma',
    officerId: 'TNP-OFF-002',
    status: 'RESOLVED',
    statusTimeline: [
      { status: 'SUBMITTED', timestamp: '30 Aug 2026, 11:15 PM', updatedBy: 'Citizen (Mobile App)', remarks: 'Auto-rickshaw night commute tracking initiated' },
      { status: 'IN_PROGRESS', timestamp: '30 Aug 2026, 11:16 PM', updatedBy: 'System Auto-Monitor', remarks: 'GPS breadcrumb telemetry streaming to Control Room' },
      { status: 'RESOLVED', timestamp: '30 Aug 2026, 11:42 PM', updatedBy: 'Citizen (Mobile App)', remarks: 'Citizen safely arrived at destination. Telemetry closed.' },
    ],
    formData: {
      transportMode: 'Auto Rickshaw (TN 37 CY 4120)',
      driverName: 'Mr. Saravanan',
      origin: 'Coimbatore Junction Railway Station',
      destination: 'Gandhipuram 5th Cross',
      estimatedDurationMinutes: '25 mins',
    },
    evidenceUrls: [],
    latitude: 11.0168,
    longitude: 76.9558,
    createdAt: '2026-08-30T23:15:00.000Z',
    updatedAt: '2026-08-30T23:42:00.000Z',
  },
];

// Available Patrol Units for dispatch
export const PATROL_FLEET = [
  {
    unitId: 'PU-12',
    unitName: 'Patrol Unit 12 (Scorpio)',
    stationId: 'STN-GND-01',
    status: 'BUSY',
    assignedOfficer: 'Inspector R. Kumar',
    vehicleNumber: 'TN 38 G 0112',
    currentLocation: 'Gandhipuram Signal',
    etaMinutes: 6,
  },
  {
    unitId: 'PU-08',
    unitName: 'Patrol Unit 08 (Innova)',
    stationId: 'STN-RSP-02',
    status: 'AVAILABLE',
    assignedOfficer: 'Sgt. Rajan K.',
    vehicleNumber: 'TN 38 G 0108',
    currentLocation: 'R.S. Puram West',
    etaMinutes: 8,
  },
  {
    unitId: 'PU-05-PINK',
    unitName: 'Pink Patrol 05 (Women Safety)',
    stationId: 'STN-PLM-03',
    status: 'AVAILABLE',
    assignedOfficer: 'SI Meena S.',
    vehicleNumber: 'TN 38 G 0105',
    currentLocation: 'Peelamedu Fun Republic',
    etaMinutes: 5,
  },
  {
    unitId: 'PU-21',
    unitName: 'Interceptor Bike Unit 21',
    stationId: 'STN-SBC-04',
    status: 'AVAILABLE',
    assignedOfficer: 'HC Prakash K.',
    vehicleNumber: 'TN 38 G 0121',
    currentLocation: 'NSR Road Saibaba Colony',
    etaMinutes: 4,
  },
];

// ==============================================================================
// 2. REACTIVE STATE STORE & SYNC ENGINE
// ==============================================================================

class SharedBackendService {
  constructor() {
    this.stations = [...INITIAL_POLICE_STATIONS];
    this.officers = [...INITIAL_POLICE_OFFICERS];
    this.users = [...INITIAL_USERS];
    this.sosAlerts = [...INITIAL_SOS_ALERTS];
    this.serviceRequests = [...INITIAL_SERVICE_REQUESTS];
    this.patrolUnits = [...PATROL_FLEET];
    
    // Pub/Sub listeners for real-time reactive UI updates
    this.listeners = {
      sos: new Set(),
      requests: new Set(),
      officers: new Set(),
      stations: new Set(),
      syncLogs: new Set(),
    };

    this.syncLogs = [
      { id: 'log-0', time: new Date().toLocaleTimeString(), message: 'Cloud DB Synchronized with Tamil Nadu Police Citizen Gateway' },
    ];
  }

  // --- Subscriptions ---
  subscribe(type, callback) {
    if (type === 'requests' || type === 'serviceRequests') {
      return this.subscribeToServiceRequests(callback);
    }
    if (type === 'sos') {
      return this.subscribeToSOS(callback);
    }
    if (type === 'officers') {
      return this.subscribeToOfficers(callback);
    }
    if (type === 'stations') {
      return this.subscribeToStations(callback);
    }
    if (type === 'syncLogs') {
      return this.subscribeToSyncLogs(callback);
    }
    if (this.listeners && this.listeners[type]) {
      this.listeners[type].add(callback);
      return () => this.listeners[type].delete(callback);
    }
    return () => {};
  }

  subscribeToSOS(callback) {
    this.listeners.sos.add(callback);
    callback([...this.sosAlerts]);
    return () => this.listeners.sos.delete(callback);
  }

  subscribeToServiceRequests(callback) {
    this.listeners.requests.add(callback);
    callback([...this.serviceRequests]);
    return () => this.listeners.requests.delete(callback);
  }

  subscribeToOfficers(callback) {
    this.listeners.officers.add(callback);
    callback([...this.officers]);
    return () => this.listeners.officers.delete(callback);
  }

  subscribeToStations(callback) {
    this.listeners.stations.add(callback);
    callback([...this.stations]);
    return () => this.listeners.stations.delete(callback);
  }

  subscribeToSyncLogs(callback) {
    this.listeners.syncLogs.add(callback);
    callback([...this.syncLogs]);
    return () => this.listeners.syncLogs.delete(callback);
  }

  _notify(type, data) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((cb) => cb(data));
    }
  }

  _addLog(message) {
    const log = { id: `log-${Date.now()}`, time: new Date().toLocaleTimeString(), message };
    this.syncLogs = [log, ...this.syncLogs.slice(0, 20)];
    this._notify('syncLogs', [...this.syncLogs]);
  }

  // --- SOS Alert Operations ---

  getSOSAlerts() {
    return [...this.sosAlerts];
  }

  getSOSById(id) {
    return this.sosAlerts.find((s) => s.id === id || s.trackingToken === id) || null;
  }

  // Dispatch patrol unit to active SOS alert
  // Workflow: ACTIVE -> PATROL_DISPATCHED
  dispatchPatrol(sosId, unitId, etaSeconds = 360, officerName = null) {
    const unit = this.patrolUnits.find((u) => u.unitId === unitId);
    const unitName = unit ? unit.unitName : unitId;
    const officer = officerName || (unit ? unit.assignedOfficer : 'Duty Patrol Officer');

    this.sosAlerts = this.sosAlerts.map((sos) => {
      if (sos.id === sosId || sos.trackingToken === sosId) {
        return {
          ...sos,
          status: 'PATROL_DISPATCHED',
          dispatchedUnit: unitName,
          dispatchedOfficer: officer,
          etaSeconds: etaSeconds,
          dispatchedAt: new Date().toISOString(),
        };
      }
      return sos;
    });

    if (unit) {
      unit.status = 'BUSY';
    }

    this._notify('sos', [...this.sosAlerts]);
    this._addLog(`[SOS] ${sosId}: Patrol Dispatched (${unitName}, ETA: ${Math.round(etaSeconds / 60)}m)`);
    return true;
  }

  // Mark SOS alert resolved
  // Workflow: PATROL_DISPATCHED -> RESOLVED
  resolveSOS(sosId, notes = 'Incident handled and resolved on scene by dispatched patrol unit.') {
    this.sosAlerts = this.sosAlerts.map((sos) => {
      if (sos.id === sosId || sos.trackingToken === sosId) {
        return {
          ...sos,
          status: 'RESOLVED',
          resolvedAt: new Date().toISOString(),
          resolutionNotes: notes,
        };
      }
      return sos;
    });

    this._notify('sos', [...this.sosAlerts]);
    this._addLog(`[SOS] ${sosId}: Alert Marked RESOLVED. Citizen App notified.`);
    return true;
  }

  // Cancel SOS alert (e.g. false alarm)
  cancelSOS(sosId, reason = 'Reported as false alarm or duplicate trigger.') {
    this.sosAlerts = this.sosAlerts.map((sos) => {
      if (sos.id === sosId || sos.trackingToken === sosId) {
        return {
          ...sos,
          status: 'CANCELLED',
          resolvedAt: new Date().toISOString(),
          resolutionNotes: reason,
        };
      }
      return sos;
    });

    this._notify('sos', [...this.sosAlerts]);
    this._addLog(`[SOS] ${sosId}: Alert Marked CANCELLED.`);
    return true;
  }

  // --- Citizen Service Requests Operations ---

  getServiceRequests() {
    return [...this.serviceRequests];
  }

  getRequestById(id) {
    return this.serviceRequests.find((r) => r.id === id || r.trackingToken === id) || null;
  }

  // Update Service Request Status
  // Workflow: SUBMITTED -> IN_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED
  updateRequestStatus(requestId, newStatus, remarks = '', updatedBy = 'Police Officer') {
    const validStatuses = ['SUBMITTED', 'IN_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    this.serviceRequests = this.serviceRequests.map((req) => {
      if (req.id === requestId || req.trackingToken === requestId) {
        const newTimeline = [
          ...req.statusTimeline,
          {
            status: newStatus,
            timestamp: timestamp,
            updatedBy: updatedBy,
            remarks: remarks || `Status updated to ${newStatus}`,
          },
        ];

        return {
          ...req,
          status: newStatus,
          statusTimeline: newTimeline,
          updatedAt: new Date().toISOString(),
        };
      }
      return req;
    });

    this._notify('requests', [...this.serviceRequests]);
    this._addLog(`[E-Service] ${requestId}: Status updated to ${newStatus} (${updatedBy})`);
    return true;
  }

  // Assign Officer to Service Request
  assignOfficerToRequest(requestId, officerId, officerName, remarks = 'Officer assigned for investigation/inspection') {
    const timestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    this.serviceRequests = this.serviceRequests.map((req) => {
      if (req.id === requestId || req.trackingToken === requestId) {
        const newTimeline = [
          ...req.statusTimeline,
          {
            status: 'ASSIGNED',
            timestamp: timestamp,
            updatedBy: 'Station Inspector',
            remarks: `${remarks} -> ${officerName}`,
          },
        ];

        return {
          ...req,
          assignedOfficer: officerName,
          officerId: officerId,
          status: 'ASSIGNED',
          statusTimeline: newTimeline,
          updatedAt: new Date().toISOString(),
        };
      }
      return req;
    });

    this._notify('requests', [...this.serviceRequests]);
    this._addLog(`[E-Service] ${requestId}: Assigned to ${officerName}`);
    return true;
  }

  // Add evidence URL or note to service request
  addRequestEvidence(requestId, evidenceUrl) {
    this.serviceRequests = this.serviceRequests.map((req) => {
      if (req.id === requestId || req.trackingToken === requestId) {
        return {
          ...req,
          evidenceUrls: [...(req.evidenceUrls || []), evidenceUrl],
          updatedAt: new Date().toISOString(),
        };
      }
      return req;
    });

    this._notify('requests', [...this.serviceRequests]);
    this._addLog(`[E-Service] ${requestId}: New evidence attached`);
    return true;
  }

  // Update Officer Duty Status
  updateOfficerDutyStatus(officerId, dutyStatus) {
    this.officers = this.officers.map((off) => {
      if (off.officerId === officerId || off.badgeId === officerId) {
        return { ...off, dutyStatus };
      }
      return off;
    });

    this._notify('officers', [...this.officers]);
    this._addLog(`[Officer] ${officerId}: Duty status changed to ${dutyStatus}`);
    return true;
  }

  // --- Two-Way Simulation Engine (Citizen App -> Police App) ---

  // Trigger simulated Citizen SOS
  triggerCitizenSOS(overrideData = {}) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newSOS = {
      id: `SOS-2026-${randomNum}`,
      trackingToken: `TN-KVK-2026-SOS-${randomNum}`,
      citizenPhone: overrideData.citizenPhone || '+91 98765 12345',
      citizenName: overrideData.citizenName || 'Meena Sundaram',
      latitude: overrideData.latitude || 11.0185,
      longitude: overrideData.longitude || 76.9620,
      accuracyMeters: 3.8,
      status: 'ACTIVE',
      dispatchedUnit: null,
      dispatchedOfficer: null,
      etaSeconds: null,
      category: overrideData.category || 'Personal Safety Emergency',
      locationName: overrideData.locationName || '100 Feet Road, Gandhipuram, Coimbatore',
      description: overrideData.description || 'Citizen activated emergency SOS button on mobile application. Immediate location streaming active.',
      emergencyContact: 'Sundaram (Husband): +91 94432 99110',
      bloodGroup: 'O+',
      createdAt: new Date().toISOString(),
      dispatchedAt: null,
      resolvedAt: null,
    };

    this.sosAlerts = [newSOS, ...this.sosAlerts];
    this._notify('sos', [...this.sosAlerts]);
    this._addLog(`🚨 NEW CITIZEN SOS RECEIVED: ${newSOS.trackingToken} from ${newSOS.citizenName}`);
    return newSOS;
  }

  // Submit simulated Citizen Service Request
  submitCitizenServiceRequest(requestData = {}) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const type = requestData.serviceType || 'LHMS';
    const typeCode = type.substring(0, 3).toUpperCase();
    const token = `TN-KVK-2026-${typeCode}-${randomNum}`;

    const timestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newRequest = {
      id: `SR-2026-${typeCode}-${randomNum}`,
      trackingToken: token,
      serviceType: type,
      serviceTitle: requestData.serviceTitle || `${type} Citizen Service Request`,
      applicantName: requestData.applicantName || 'V. Karthikeyan',
      applicantPhone: requestData.applicantPhone || '+91 98421 88990',
      jurisdictionStation: requestData.jurisdictionStation || 'Gandhipuram Police Station (B1)',
      stationId: requestData.stationId || 'STN-GND-01',
      assignedOfficer: 'Unassigned',
      officerId: null,
      status: 'SUBMITTED',
      statusTimeline: [
        {
          status: 'SUBMITTED',
          timestamp: timestamp,
          updatedBy: 'Citizen (Mobile App)',
          remarks: 'New digital service application submitted via Kovai Kaval Citizen App',
        },
      ],
      formData: requestData.formData || {
        notes: 'Submitted via citizen application gateway for police verification.',
      },
      evidenceUrls: requestData.evidenceUrls || [],
      latitude: requestData.latitude || 11.0168,
      longitude: requestData.longitude || 76.9558,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.serviceRequests = [newRequest, ...this.serviceRequests];
    this._notify('requests', [...this.serviceRequests]);
    this._addLog(`📥 NEW SERVICE REQUEST: ${newRequest.trackingToken} (${newRequest.serviceTitle})`);
    return newRequest;
  }

  // Reset demo data
  resetToInitial() {
    this.stations = [...INITIAL_POLICE_STATIONS];
    this.officers = [...INITIAL_POLICE_OFFICERS];
    this.users = [...INITIAL_USERS];
    this.sosAlerts = [...INITIAL_SOS_ALERTS];
    this.serviceRequests = [...INITIAL_SERVICE_REQUESTS];
    this.patrolUnits = [...PATROL_FLEET];
    this._notify('sos', [...this.sosAlerts]);
    this._notify('requests', [...this.serviceRequests]);
    this._notify('officers', [...this.officers]);
    this._notify('stations', [...this.stations]);
    this._addLog('Demo state reset to initial Coimbatore City Police datasets.');
  }
}

// Singleton instance accessible across the application
export const sharedBackendService = new SharedBackendService();
export default sharedBackendService;
