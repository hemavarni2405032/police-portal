import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QuickScreenNavigator({ currentScreen, onSelectScreen }) {
  const [modalVisible, setModalVisible] = useState(false);

  const screenSections = [
    {
      title: '🤝 CITIZEN APP INTEGRATION',
      items: [
        { key: 'citizen_service_requests', name: '🏠 Locked House (LHMS Cases Only)', params: { initialCategory: 'LHMS' } },
        { key: 'lhms_details', name: '🏠 Locked House Details (#LHM-84912)', params: { caseId: 'SR-2026-LHM-84912' } },
        { key: 'senior_citizen_care', name: '👴 Senior Citizen Care (Citizen Cases)' },
        { key: 'senior_citizen_details', name: '👴 Senior Citizen Case Details' },
        { key: 'citizen_service_requests', name: 'Citizen Service Requests (6 Services)' },
        { key: 'citizen_service_details', name: 'Service Request Details' },
        { key: 'citizen_sos_screen', name: 'Citizen SOS Alerts Monitor' },
        { key: 'citizen_sos_details', name: 'Citizen SOS Details (#SOS-1024)' },
      ],
    },
    {
      title: '🗺 LIVE INCIDENT MAP (Live Map Incident.svg)',
      items: [
        { key: 'live_map', name: '3. Live Map Overview (Coimbatore)' },
        { key: 'live_case_search', name: '2. Live Case Analysis & Search' },
        { key: 'unit_details', name: '4. Unit Details (PU-12 En Route)' },
        { key: 'patrol_tracking', name: '5. PU-12 Live Route Tracking' },
        { key: 'crime_hotspots', name: '7. Crime Hotspot Analysis' },
      ],
    },
    {
      title: '🚨 SOS EMERGENCY SYSTEM (SOS.svg)',
      items: [
        { key: 'sos_center', name: '1. SOS Emergency Center Hub' },
        { key: 'active_alerts', name: '2. Active Alerts & Search' },
        { key: 'sos_details', name: '3 & 4. SOS-1024 Incident Details' },
        { key: 'citizen_info', name: '5. Citizen Info (Ananya R)' },
        { key: 'sos_emergency_details', name: '6. Full Emergency Report' },
        { key: 'live_sos_location', name: '7. Live SOS Location & Pulse' },
        { key: 'sos_history', name: '8. SOS Emergency History' },
        { key: 'police_units', name: '9. Police Units Roster' },
        { key: 'dispatch', name: '11-13. Dispatch & Confirm Unit' },
      ],
    },
    {
      title: '🎨 FIGMA DASHBOARD & CASES',
      items: [
        { key: 'dashboard', name: '1. All Features Dashboard' },
        { key: 'station_details', name: '2. Station Hub (Gandhipuram)' },
        { key: 'jurisdiction', name: '3. Jurisdiction & Dispatch' },
        { key: 'case_management', name: '4. Case Management (CMP List)' },
        { key: 'ai_analysis', name: '5. AI Case Analysis (Cyber Fraud)' },
        { key: 'case_details', name: '6 & 7. Case Details (#CMP-2047)' },
        { key: 'complainant', name: '8. Complainant Profile (Arun Kumar)' },
        { key: 'evidence', name: '9 & 12. Evidence Details / CCTV Player' },
        { key: 'ai_domestic', name: '10. AI Domestic Analysis (W-1042)' },
        { key: 'case_w1042', name: '11. Case W-1042 Details' },
        { key: 'evidence_list', name: '13. Evidence Multi-Tab List' },
        { key: 'case_report', name: '14. Case Reports & Analytics' },
        { key: 'women_safety', name: 'Women & Child Safety' },
        { key: 'officers', name: 'Officers on Duty Roster' },
      ],
    },
    {
      title: '🔐 AUTH & SPLASH',
      items: [
        { key: 'auth', name: '🔒 Police Auth & Verification' },
        { key: 'splash', name: '🌟 Official Splash Screen' },
      ],
    },
  ];

  const totalCount = screenSections.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <>
      {/* Floating Preview Pill */}
      <View style={styles.floatingContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.floatingPill}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.floatingPillText}>📱 Screens ({totalCount})</Text>
        </TouchableOpacity>
      </View>

      {/* Modal with direct access to any screen */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay} edges={['top', 'bottom', 'left', 'right']}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>All App Screens</Text>
                <Text style={styles.modalSub}>Switch instantly in Expo Go</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.screensList} showsVerticalScrollIndicator={false}>
              {screenSections.map((sec, idx) => (
                <View key={idx} style={styles.sectionBlock}>
                  <Text style={styles.sectionBlockTitle}>{sec.title}</Text>
                  {sec.items.map((s) => {
                    const isActive = currentScreen === s.key;
                    return (
                      <TouchableOpacity
                        key={s.key}
                        style={[styles.screenItem, isActive && styles.screenItemActive]}
                        onPress={() => {
                          setModalVisible(false);
                          onSelectScreen(s.key, s.params || {});
                        }}
                        activeOpacity={0.75}
                      >
                        <Text
                          style={[styles.screenItemText, isActive && styles.screenItemTextActive]}
                        >
                          {s.name}
                        </Text>
                        {isActive ? (
                          <View style={styles.currentBadge}>
                            <Text style={styles.currentBadgeText}>CURRENT</Text>
                          </View>
                        ) : (
                          <Text style={styles.arrowText}>→</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
              <View style={{ height: 24 }} />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    zIndex: 9999,
    elevation: 10,
  },
  floatingPill: {
    backgroundColor: '#000666',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  floatingPillText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000666',
  },
  modalSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '700',
  },
  screensList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionBlockTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  screenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  screenItemActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  screenItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  screenItemTextActive: {
    color: '#000666',
    fontWeight: '700',
  },
  currentBadge: {
    backgroundColor: '#000666',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  currentBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  arrowText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700',
  },
});
