// src/components/CitizenSyncSimulatorModal.js
// Interactive Citizen-Police Two-Way Synchronization Bridge & Simulation Panel
// Allows testing Citizen App actions (SOS, LHMS, Cyber, Escort) and observing
// real-time synchronization with the Police App directly in Expo Go on mobile.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS } from '../theme/colors';
import sharedBackendService from '../services/sharedBackendService';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

export default function CitizenSyncSimulatorModal({ visible, onClose, onNavigate }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('actions'); // 'actions' | 'logs'

  useEffect(() => {
    const unsubLogs = sharedBackendService.subscribeToSyncLogs((updatedLogs) => {
      setLogs(updatedLogs);
    });
    return () => unsubLogs();
  }, []);

  const handleTriggerSOS = () => {
    const names = ['Kavitha R.', 'Divya Prakash', 'S. Nandhini', 'Meena Sundaram'];
    const locs = [
      '100 Feet Road, Gandhipuram (Opposite Signal)',
      'Cross Cut Road Junction, Gandhipuram',
      'Avinashi Road near Peelamedu Flyover',
      'DB Road near Post Office, R.S. Puram',
    ];
    const pickedName = names[Math.floor(Math.random() * names.length)];
    const pickedLoc = locs[Math.floor(Math.random() * locs.length)];

    const newSOS = sharedBackendService.triggerCitizenSOS({
      citizenName: pickedName,
      citizenPhone: '+91 98765 ' + Math.floor(10000 + Math.random() * 90000),
      category: 'Women Safety / Personal Emergency',
      locationName: pickedLoc,
      description: 'Emergency SOS button triggered from Kovai Kaval Citizen App. Live GPS coordinates and audio telemetry transmitted to Control Room.',
    });

    Alert.alert(
      '🚨 Citizen SOS Emitted',
      `Citizen: ${newSOS.citizenName}\nToken: ${newSOS.trackingToken}\nLocation: ${newSOS.locationName}\n\nSynced to Police App in real-time!`,
      [
        { text: 'OK' },
        {
          text: 'View Alert Now',
          onPress: () => {
            onClose();
            if (onNavigate) onNavigate('sos_details', { sosId: newSOS.id });
          },
        },
      ]
    );
  };

  const handleTriggerLHMS = () => {
    const randomHouse = Math.floor(10 + Math.random() * 90);
    const newReq = sharedBackendService.submitCitizenServiceRequest({
      serviceType: 'LHMS',
      serviceTitle: 'Locked House Monitoring System (LHMS)',
      applicantName: 'Dr. S. Karthikeyan',
      applicantPhone: '+91 98421 ' + Math.floor(10000 + Math.random() * 90000),
      jurisdictionStation: 'Gandhipuram Police Station (B1)',
      stationId: 'STN-GND-01',
      formData: {
        address: `No. ${randomHouse}, 7th Cross, Gandhipuram, Coimbatore`,
        purpose: 'Vacation',
        whereFrom: 'Coimbatore',
        fromDate: '20-09-2026',
        fromTime: '08:00 AM',
        returnStatus: null,
        updatedDate: null,
        updatedTime: null,
        cameraEquipped: 'Yes (TNP Stream Verified)',
        neighborContact: 'Mr. Selvam (+91 94432 11002)',
      },
    });

    Alert.alert(
      '📥 LHMS Application Received',
      `Applicant: ${newReq.applicantName}\nToken: ${newReq.trackingToken}\nAddress: ${newReq.formData.address}\nPurpose: ${newReq.formData.purpose}\n\nStatus: SUBMITTED (Ready for Police Review)`,
      [
        { text: 'OK' },
        {
          text: 'Open LHMS Details',
          onPress: () => {
            onClose();
            if (onNavigate) onNavigate('lhms_details', { caseId: newReq.id });
          },
        },
      ]
    );
  };

  const handleTriggerLHMSReachUpdate = () => {
    const allRequests = sharedBackendService.getServiceRequests();
    const lhmsReq = allRequests.find((r) => r.serviceType === 'LHMS' || r.serviceType === 'LOCKED_HOUSE');
    if (!lhmsReq) {
      Alert.alert('No LHMS Case', 'Please submit an LHMS request first before sending reach update.');
      return;
    }

    const updatedDate = '20-09-2026';
    const updatedTime = '06:30 PM';
    const returnStatus = 'Safely Reached Destination';

    lhmsReq.formData = {
      ...lhmsReq.formData,
      returnStatus,
      updatedDate,
      updatedTime,
    };
    lhmsReq.updatedAt = new Date().toISOString();

    sharedBackendService._notify('requests', [...sharedBackendService.serviceRequests]);
    sharedBackendService._addLog(`📍 Citizen Reached Destination Update: ${lhmsReq.trackingToken}`);

    Alert.alert(
      '📍 Citizen Return / Reach Updated',
      `Token: ${lhmsReq.trackingToken}\nStatus: ${returnStatus}\nUpdated: ${updatedDate} at ${updatedTime}`,
      [
        { text: 'OK' },
        {
          text: 'View in LHMS Details',
          onPress: () => {
            onClose();
            if (onNavigate) onNavigate('lhms_details', { caseId: lhmsReq.id });
          },
        },
      ]
    );
  };

  const handleTriggerNightEscort = () => {
    const newReq = sharedBackendService.submitCitizenServiceRequest({
      serviceType: 'WOMEN_NIGHT_ESCORT',
      serviceTitle: 'Women Safety Night Escort Request',
      applicantName: 'P. Sneha (IT Professional)',
      applicantPhone: '+91 99440 ' + Math.floor(10000 + Math.random() * 90000),
      jurisdictionStation: 'Peelamedu Police Station (E2)',
      stationId: 'STN-PLM-03',
      formData: {
        pickupLocation: 'Tidel Park Main Gate, Avinashi Road',
        destinationLocation: 'Saibaba Colony Junction',
        scheduledTime: '11:15 PM Tonight',
        vehiclePreference: 'Pink Patrol Escort Vehicle',
      },
    });

    Alert.alert(
      '🛡️ Night Escort Request Received',
      `Applicant: ${newReq.applicantName}\nToken: ${newReq.trackingToken}\nPickup: Tidel Park Main Gate\n\nStatus: SUBMITTED`,
      [
        { text: 'OK' },
        {
          text: 'Open Request',
          onPress: () => {
            onClose();
            if (onNavigate) onNavigate('case_details', { caseId: newReq.id });
          },
        },
      ]
    );
  };

  const handleTriggerCyber = () => {
    const newReq = sharedBackendService.submitCitizenServiceRequest({
      serviceType: 'CYBER_COMPLAINTS',
      serviceTitle: 'Cyber Fraud & Phishing Report',
      applicantName: 'M. Vignesh',
      applicantPhone: '+91 98433 ' + Math.floor(10000 + Math.random() * 90000),
      jurisdictionStation: 'Saibaba Colony Police Station (C1)',
      stationId: 'STN-SBC-04',
      formData: {
        incidentType: 'UPI Phishing / Fraud Call',
        financialLoss: '₹32,500',
        suspectPhone: '+91 93456 78901',
        transactionId: 'UPI/2026/0902/' + Math.floor(100000 + Math.random() * 900000),
        narrative: 'Received spoof call posing as electricity board verification. App downloaded unauthorized screen mirror APK.',
      },
    });

    Alert.alert(
      '💻 Cyber Complaint Received',
      `Applicant: ${newReq.applicantName}\nToken: ${newReq.trackingToken}\nLoss: ₹32,500\n\nStatus: SUBMITTED`,
      [
        { text: 'OK' },
        {
          text: 'Open Request',
          onPress: () => {
            onClose();
            if (onNavigate) onNavigate('case_details', { caseId: newReq.id });
          },
        },
      ]
    );
  };

  const handleTriggerSeniorCitizenWithContact = () => {
    const newReq = sharedBackendService.submitCitizenServiceRequest({
      serviceType: 'SENIOR_CITIZEN_CARE',
      serviceTitle: 'Senior Citizen Care & Wellness Verification',
      applicantName: 'Ramesh Kumar',
      applicantPhone: '+91 98421 11223',
      jurisdictionStation: 'R.S. Puram Police Station (B2)',
      stationId: 'STN-RSP-02',
      formData: {
        seniorCitizenName: 'Ramesh Kumar',
        age: '72',
        address: '14/2 East Sambandam Road, R.S. Puram, Coimbatore',
        contactPersonName: 'Priya Kumar',
        relationship: 'Daughter',
        contactNumber: '+91 98421 99887',
        medicalConditions: 'Cardiac history & mild mobility impairment',
        specialRequests: 'Weekly police beat patrol check-in requested',
      },
    });

    Alert.alert(
      '👴 Senior Citizen Care Case Filed',
      `Senior Citizen: Ramesh Kumar (72 yrs)\nLives with: Priya Kumar (Daughter)\nPhone: +91 98421 99887\n\nToken: ${newReq.trackingToken}\n\nStored in shared backend and received in Police App!`,
      [
        { text: 'OK' },
        {
          text: 'Open Case Details',
          onPress: () => {
            onClose();
            if (onNavigate) onNavigate('senior_citizen_details', { caseId: newReq.id });
          },
        },
      ]
    );
  };

  const handleTriggerSeniorCitizenWithoutContact = () => {
    const newReq = sharedBackendService.submitCitizenServiceRequest({
      serviceType: 'SENIOR_CITIZEN_CARE',
      serviceTitle: 'Senior Citizen Care Application',
      applicantName: 'Sundaram Natarajan',
      applicantPhone: '+91 94432 55667',
      jurisdictionStation: 'Peelamedu Police Station (E2)',
      stationId: 'STN-PLM-03',
      formData: {
        seniorCitizenName: 'Sundaram Natarajan',
        age: '78',
        address: 'Flat 3B, Sri Krishna Apartments, Avinashi Road, Peelamedu, Coimbatore',
        medicalConditions: 'Living independently; diabetes and hypertension',
        emergencyDoctor: 'Dr. Mohan, Coimbatore Medical Center (+91 98422 33445)',
      },
    });

    Alert.alert(
      '👴 Senior Citizen Care Case Filed (Lives Alone)',
      `Senior Citizen: Sundaram Natarajan (78 yrs)\nLives With: Not provided (Living alone)\n\nToken: ${newReq.trackingToken}\n\nStored in shared backend and received in Police App!`,
      [
        { text: 'OK' },
        {
          text: 'Open Case Details',
          onPress: () => {
            onClose();
            if (onNavigate) onNavigate('senior_citizen_details', { caseId: newReq.id });
          },
        },
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset Demo Data?',
      'This will reset all SOS alerts and service requests to initial state.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            sharedBackendService.resetToInitial();
            Alert.alert('Reset Complete', 'Datasets restored to Coimbatore City Police seed data.');
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.headerTitle}>CITIZEN ↔ POLICE BRIDGE</Text>
              <Text style={styles.headerSub}>Two-Way Cloud DB Synchronization Engine</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Sync Status Banner */}
          <View style={styles.syncBanner}>
            <View style={styles.livePulseDot} />
            <Text style={styles.syncBannerText}>
              Shared Cloud DB: <Text style={styles.boldWhite}>ACTIVE & READY</Text>
            </Text>
            <Text style={styles.syncBadge}>2-WAY REALTIME</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'actions' && styles.tabBtnActive]}
              onPress={() => setActiveTab('actions')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'actions' && styles.tabBtnTextActive]}>
                Simulate Citizen Actions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'logs' && styles.tabBtnActive]}
              onPress={() => setActiveTab('logs')}
            >
              <Text style={[styles.tabBtnText, activeTab === 'logs' && styles.tabBtnTextActive]}>
                Live Cloud Logs ({logs.length})
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {activeTab === 'actions' && (
              <View>
                <Text style={styles.sectionHeading}>
                  TAP TO EMIT CITIZEN ACTIONS TO POLICE APP:
                </Text>

                {/* Trigger 1: Emergency SOS */}
                <TouchableOpacity
                  style={[styles.actionCard, { borderColor: '#BA1A1A' }]}
                  onPress={handleTriggerSOS}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: '#FEE2E2' }]}>
                    <Text style={{ fontSize: 24 }}>🚨</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actionTitle, { color: '#BA1A1A' }]}>
                      Trigger Citizen Emergency SOS
                    </Text>
                    <Text style={styles.actionDesc}>
                      Simulate a citizen pressing SOS 112 in Citizen App. Emits live GPS coordinates, personal info, and tracking token.
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Trigger 2: LHMS */}
                <TouchableOpacity
                  style={[styles.actionCard, { borderColor: '#00288E' }]}
                  onPress={handleTriggerLHMS}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: '#EEF2FF' }]}>
                    <Text style={{ fontSize: 24 }}>🏠</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actionTitle, { color: '#00288E' }]}>
                      Submit LHMS Request
                    </Text>
                    <Text style={styles.actionDesc}>
                      Simulate citizen filing Locked House Monitoring with vacation itinerary and smart camera compatibility.
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Trigger 2B: LHMS Reach / Return Update */}
                <TouchableOpacity
                  style={[styles.actionCard, { borderColor: '#059669', backgroundColor: '#F0FDF4' }]}
                  onPress={handleTriggerLHMSReachUpdate}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: '#DCFCE7' }]}>
                    <Text style={{ fontSize: 24 }}>📍</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actionTitle, { color: '#059669' }]}>
                      Update LHMS Reach / Return Status
                    </Text>
                    <Text style={styles.actionDesc}>
                      Simulate citizen reporting "Safely Reached Destination" with timestamp update on the active LHMS case.
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Trigger 3: Night Escort */}
                <TouchableOpacity
                  style={[styles.actionCard, { borderColor: '#7C3AED' }]}
                  onPress={handleTriggerNightEscort}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: '#F3E8FF' }]}>
                    <Text style={{ fontSize: 24 }}>🛡️</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actionTitle, { color: '#7C3AED' }]}>
                      Submit Women Night Escort
                    </Text>
                    <Text style={styles.actionDesc}>
                      Simulate a woman commuter requesting police escort from IT corridor to residence.
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Trigger 4: Cyber Complaints */}
                <TouchableOpacity
                  style={[styles.actionCard, { borderColor: '#0D9488' }]}
                  onPress={handleTriggerCyber}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: '#CCFBF1' }]}>
                    <Text style={{ fontSize: 24 }}>💻</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actionTitle, { color: '#0D9488' }]}>
                      Submit Cyber Complaint
                    </Text>
                    <Text style={styles.actionDesc}>
                      Simulate UPI fraud filing with transaction ID, suspect phone, and statement.
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Trigger 5: Senior Citizen Care (With Living With Details) */}
                <TouchableOpacity
                  style={[styles.actionCard, { borderColor: '#D97706' }]}
                  onPress={handleTriggerSeniorCitizenWithContact}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={{ fontSize: 24 }}>👴</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actionTitle, { color: '#D97706' }]}>
                      Submit Senior Citizen Case (With Family Contact)
                    </Text>
                    <Text style={styles.actionDesc}>
                      Ramesh Kumar (72 yrs) • Lives with daughter Priya Kumar (Relation & Phone provided).
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Trigger 6: Senior Citizen Care (Living Alone / Not Provided) */}
                <TouchableOpacity
                  style={[styles.actionCard, { borderColor: '#D97706' }]}
                  onPress={handleTriggerSeniorCitizenWithoutContact}
                  activeOpacity={0.8}
                >
                  <View style={[styles.actionIconBox, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={{ fontSize: 24 }}>🧓</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actionTitle, { color: '#D97706' }]}>
                      Submit Senior Citizen Case (Lives Alone)
                    </Text>
                    <Text style={styles.actionDesc}>
                      Sundaram Natarajan (78 yrs) • Lives alone without contact person (Lives With section shows not provided).
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Reset Button */}
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={handleResetData}
                  activeOpacity={0.8}
                >
                  <Text style={styles.resetBtnText}>↺ Reset to Default Demo Data</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === 'logs' && (
              <View>
                <Text style={styles.sectionHeading}>
                  REALTIME SYNCHRONIZATION EVENT STREAM:
                </Text>
                {logs.map((log) => (
                  <View key={log.id} style={styles.logRow}>
                    <Text style={styles.logTime}>{log.time}</Text>
                    <Text style={styles.logMsg}>{log.message}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
              <Text style={styles.doneBtnText}>CLOSE SIMULATOR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 10, 40, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    backgroundColor: '#001A5E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  syncBanner: {
    backgroundColor: '#00288E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00E676',
    marginRight: 8,
  },
  syncBannerText: {
    color: '#E0E7FF',
    fontSize: 11,
    flex: 1,
  },
  boldWhite: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  syncBadge: {
    backgroundColor: '#D4AF37',
    color: '#001A5E',
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#00288E',
    backgroundColor: '#FFFFFF',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#00288E',
    fontWeight: '900',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingTop: 16,
    maxHeight: 420,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  resetBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  resetBtnText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '700',
  },
  logRow: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#00288E',
  },
  logTime: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 2,
  },
  logMsg: {
    fontSize: 11.5,
    color: '#0D1B2A',
    fontWeight: '600',
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  doneBtn: {
    backgroundColor: '#001A5E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
