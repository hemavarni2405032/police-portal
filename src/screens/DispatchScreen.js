import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACK_ICON = require('../../assets/details/icon_back.png');
const MAP_DISPATCH = require('../../assets/sos/image2_132_2.jpg');
const MAP_CONFIRM = require('../../assets/sos/image8_132_2.jpg');

export default function DispatchScreen({ onNavigate, onBack }) {
  const [step, setStep] = useState(1); // 1: Select Unit, 2: Confirm Dispatch, 3: Dispatch Successful
  const [selectedUnit, setSelectedUnit] = useState({
    id: 'PU-08',
    officer: 'SI Arun',
    origin: 'RS Puram',
    eta: '08 minutes',
    distance: '8 min away',
  });

  const availableUnits = [
    {
      id: 'PU-08',
      officer: 'SI Arun',
      origin: 'RS Puram',
      eta: '08 minutes',
      distance: '8 min away',
    },
    {
      id: 'PU-21',
      officer: 'Officer Ravi',
      origin: 'Saibaba Colony',
      eta: '12 minutes',
      distance: '12 min away',
    },
    {
      id: 'PU-33',
      officer: 'Officer Deepa',
      origin: 'Town Hall',
      eta: '15 minutes',
      distance: '15 min away',
    },
  ];

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(1);
    } else {
      if (onBack) onBack();
      else if (onNavigate) onNavigate('sos_center');
    }
  };

  // STAGE 3: DISPATCH SUCCESSFUL
  if (step === 3) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor="#000666" />

        <View style={styles.successContainer}>
          <View style={styles.successCheckCircle}>
            <Text style={styles.successCheckmarkIcon}>✓</Text>
          </View>

          <Text style={styles.successTitle}>DISPATCH SUCCESSFUL</Text>
          <Text style={styles.successSubtitle}>
            Police unit dispatched successfully to the emergency location.
          </Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Incident ID</Text>
              <Text style={styles.summaryValBold}>SOS-1024</Text>
            </View>
            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Assigned Unit</Text>
              <View style={styles.assignedUnitRow}>
                <Text style={styles.carEmoji}>🚓</Text>
                <Text style={styles.summaryValBold}>{selectedUnit.id}</Text>
              </View>
            </View>
            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Est. Arrival</Text>
              <Text style={styles.summaryValBold}>{selectedUnit.eta}</Text>
            </View>
          </View>

          <View style={styles.successActionsCol}>
            <TouchableOpacity
              style={styles.btnNavyFull}
              onPress={() => onNavigate && onNavigate('patrol_tracking')}
              activeOpacity={0.8}
            >
              <Text style={styles.btnIconWhite}>🎯</Text>
              <Text style={styles.btnNavyFullText}>TRACK UNIT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnOutlineFull}
              onPress={() => onNavigate && onNavigate('sos_details')}
              activeOpacity={0.75}
            >
              <Text style={styles.btnIconNavy}>👁️</Text>
              <Text style={styles.btnOutlineFullText}>VIEW SOS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.doneTextBtn}
              onPress={() => onNavigate && onNavigate('sos_center')}
              activeOpacity={0.7}
            >
              <Text style={styles.doneText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // STAGE 2: CONFIRM DISPATCH
  if (step === 2) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor="#000666" />

        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
            <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CONFIRM DISPATCH</Text>
        </View>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator={false}
        >
          {/* Map Preview Snippet with Live Tracking Tag */}
          <View style={styles.confirmMapBox}>
            <Image source={MAP_CONFIRM} style={styles.confirmMapImg} resizeMode="cover" />
            <View style={styles.liveTrackingTag}>
              <View style={styles.redLiveDot} />
              <Text style={styles.liveTrackingTagText}>LIVE TRACKING ACTIVE</Text>
            </View>
          </View>

          {/* Card 1: Emergency Target */}
          <View style={styles.confirmCard}>
            <View style={styles.targetIconCircle}>
              <Text style={styles.asteriskRed}>✻</Text>
            </View>
            <View style={styles.confirmTextCol}>
              <Text style={styles.targetHeaderLabel}>EMERGENCY TARGET</Text>
              <Text style={styles.targetIncidentId}>SOS-1024</Text>
              <Text style={styles.targetSubtitle}>Personal Safety</Text>
              <View style={styles.targetLocationPill}>
                <Text style={styles.pinSmall}>📍</Text>
                <Text style={styles.targetLocationText}>Gandhipuram</Text>
              </View>
            </View>
          </View>

          {/* Card 2: Selected Unit */}
          <View style={styles.confirmCard}>
            <View style={styles.unitIconCircleNavy}>
              <Text style={styles.shieldEmojiWhite}>🛡️</Text>
            </View>
            <View style={styles.confirmTextCol}>
              <Text style={styles.targetHeaderLabel}>SELECTED UNIT</Text>
              <Text style={styles.targetIncidentId}>{selectedUnit.id}</Text>
              <Text style={styles.targetSubtitle}>{selectedUnit.officer}</Text>
              <View style={styles.originRow}>
                <Text style={styles.arrowSmall}>↗</Text>
                <Text style={styles.originText}>Origin: {selectedUnit.origin}</Text>
              </View>
            </View>
          </View>

          {/* Card 3: Estimated Arrival */}
          <View style={styles.confirmCardArrival}>
            <View style={styles.clockCircleGray}>
              <Text style={styles.clockEmoji}>⏱️</Text>
            </View>
            <View style={styles.confirmTextCol}>
              <Text style={styles.targetHeaderLabel}>ESTIMATED ARRIVAL</Text>
              <Text style={styles.arrivalEtaBold}>{selectedUnit.eta}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.confirmBottomBar}>
          <TouchableOpacity
            style={styles.confirmBtnNavy}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmBtnText}>CONFIRM DISPATCH  ➤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => setStep(1)} activeOpacity={0.7}>
            <Text style={styles.cancelBtnText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // STAGE 1: DISPATCH UNIT (Select Unit)
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DISPATCH UNIT</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Target Incident Overview Card */}
        <View style={styles.targetIncidentCard}>
          <View style={styles.incidentTopRow}>
            <View>
              <Text style={styles.incidentHeaderLabel}>TARGET INCIDENT</Text>
              <Text style={styles.incidentIdTitle}>SOS-1024</Text>
            </View>
            <View style={styles.criticalBadge}>
              <Text style={styles.criticalBadgeText}>▲ CRITICAL</Text>
            </View>
          </View>

          <View style={styles.incidentMetaRow}>
            <View style={styles.incidentMetaCol}>
              <Text style={styles.metaLabelSmall}>Type</Text>
              <Text style={styles.metaValBold}>Personal Safety</Text>
            </View>

            <View style={styles.incidentMetaCol}>
              <Text style={styles.metaLabelSmall}>Location</Text>
              <View style={styles.locWrap}>
                <Text style={styles.pinSmall}>📍</Text>
                <Text style={styles.metaValBold}>Gandhipuram</Text>
              </View>
            </View>
          </View>

          {/* Mini Map Snippet */}
          <View style={styles.miniMapWrap}>
            <Image source={MAP_DISPATCH} style={styles.miniMapImg} resizeMode="cover" />
          </View>
        </View>

        {/* Section: AVAILABLE UNITS */}
        <Text style={styles.unitsSectionTitle}>AVAILABLE UNITS</Text>

        {availableUnits.map((u) => (
          <View key={u.id} style={styles.unitRowCard}>
            <View style={styles.unitCarCircle}>
              <Text style={styles.carEmoji}>🚗</Text>
            </View>

            <View style={styles.unitDetailsCol}>
              <View style={styles.unitNameRow}>
                <Text style={styles.unitNameTitle}>{u.id}</Text>
                <View style={styles.availableTag}>
                  <Text style={styles.availableTagText}>Available</Text>
                </View>
              </View>
              <Text style={styles.unitLocationEta}>
                {u.origin} • <Text style={styles.redEtaText}>{u.distance}</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.selectUnitBtn}
              onPress={() => handleSelectUnit(u)}
              activeOpacity={0.8}
            >
              <Text style={styles.selectUnitBtnText}>SELECT</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000666',
  },
  header: {
    height: 52,
    backgroundColor: '#000666',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  targetIncidentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  incidentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  incidentHeaderLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#767683',
    letterSpacing: 0.8,
  },
  incidentIdTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#191C1D',
    marginTop: 2,
  },
  criticalBadge: {
    backgroundColor: '#FFEBEE',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  criticalBadgeText: {
    color: '#B6171E',
    fontSize: 10,
    fontWeight: '900',
  },
  incidentMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  incidentMetaCol: {
    width: '48%',
  },
  metaLabelSmall: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  metaValBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#191C1D',
    marginTop: 2,
  },
  locWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  pinSmall: {
    fontSize: 12,
    marginRight: 4,
  },
  miniMapWrap: {
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1E232A',
  },
  miniMapImg: {
    width: '100%',
    height: '100%',
  },
  unitsSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  unitRowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
  },
  unitCarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  carEmoji: {
    fontSize: 18,
  },
  unitDetailsCol: {
    flex: 1,
  },
  unitNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  unitNameTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#191C1D',
    marginRight: 8,
  },
  availableTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  availableTagText: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: '700',
  },
  unitLocationEta: {
    fontSize: 12,
    color: '#454652',
    fontWeight: '500',
  },
  redEtaText: {
    color: '#B6171E',
    fontWeight: '700',
  },
  selectUnitBtn: {
    backgroundColor: '#000B58',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  selectUnitBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // STAGE 2 STYLES
  confirmMapBox: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 14,
    backgroundColor: '#0A0E1A',
  },
  confirmMapImg: {
    width: '100%',
    height: '100%',
  },
  liveTrackingTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  redLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D32F2F',
    marginRight: 6,
  },
  liveTrackingTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#191C1D',
    letterSpacing: 0.5,
  },
  confirmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
  },
  confirmCardArrival: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
  },
  targetIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  asteriskRed: {
    color: '#B6171E',
    fontSize: 22,
    fontWeight: '900',
  },
  unitIconCircleNavy: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  shieldEmojiWhite: {
    fontSize: 22,
  },
  clockCircleGray: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  clockEmoji: {
    fontSize: 22,
  },
  confirmTextCol: {
    flex: 1,
  },
  targetHeaderLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#B6171E',
    letterSpacing: 0.8,
  },
  targetIncidentId: {
    fontSize: 18,
    fontWeight: '900',
    color: '#191C1D',
    marginTop: 1,
  },
  targetSubtitle: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '500',
    marginTop: 1,
  },
  targetLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F9',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  targetLocationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#191C1D',
  },
  originRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  arrowSmall: {
    fontSize: 12,
    color: '#454652',
    marginRight: 4,
  },
  originText: {
    fontSize: 11.5,
    color: '#454652',
    fontWeight: '500',
  },
  arrivalEtaBold: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000B58',
    marginTop: 2,
  },
  confirmBottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E7',
  },
  confirmBtnNavy: {
    backgroundColor: '#000B58',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: '#C6C5D4',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#454652',
    fontSize: 12,
    fontWeight: '800',
  },

  // STAGE 3 SUCCESS STYLES
  successContainer: {
    flex: 1,
    backgroundColor: '#F3F4F9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successCheckCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000B58',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  successCheckmarkIcon: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#191C1D',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 13,
    color: '#5A5D6B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E2E7',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#5A5D6B',
    fontWeight: '500',
  },
  summaryValBold: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
  },
  assignedUnitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F3F4F9',
  },
  successActionsCol: {
    width: '100%',
  },
  btnNavyFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000B58',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 10,
  },
  btnIconWhite: {
    fontSize: 16,
    marginRight: 8,
  },
  btnNavyFullText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  btnOutlineFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#000B58',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 16,
  },
  btnIconNavy: {
    fontSize: 16,
    marginRight: 8,
  },
  btnOutlineFullText: {
    color: '#000B58',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  doneTextBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  doneText: {
    color: '#454652',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
