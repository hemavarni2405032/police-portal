import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACK_ICON = require('../../assets/details/icon_back.png');
const BELL_ICON = require('../../assets/dashboard/icon_bell_white.png');
const STEPPER_PIN = require('../../assets/dashboard/stepper_1_pin.png');
const STEPPER_CHIP = require('../../assets/dashboard/stepper_2_chip.png');
const STEPPER_STATION = require('../../assets/dashboard/stepper_3_station.png');
const STEPPER_OFFICER = require('../../assets/dashboard/stepper_4_officer.png');

export default function JurisdictionScreen({ onNavigate, onBack }) {
  const [assigned, setAssigned] = useState(false);

  const handleAutoAssign = () => {
    setAssigned(true);
    Alert.alert(
      'Dispatch Confirmed',
      'Officer Kumar has been auto-assigned to Gandhipuram incident with an ETA of 4 minutes.',
      [
        {
          text: 'View Case Details',
          onPress: () => onNavigate && onNavigate('case_details'),
        },
        { text: 'OK' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('dashboard'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>JURISDICTION</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Image source={BELL_ICON} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Timeline Stepper Container */}
        <View style={styles.stepperWrapper}>
          {/* Vertical Connecting Line */}
          <View style={styles.timelineLine} />

          {/* STEP 1: Incident Location */}
          <View style={styles.stepRow}>
            <Image source={STEPPER_PIN} style={styles.stepIcon} resizeMode="contain" />
            <View style={styles.stepCard}>
              <Text style={styles.cardLabel}>INCIDENT LOCATION</Text>
              <Text style={styles.cardMainValue}>Gandhipuram</Text>
            </View>
          </View>

          {/* ENGINE BADGE */}
          <View style={styles.engineRow}>
            <Image source={STEPPER_CHIP} style={styles.chipIcon} resizeMode="contain" />
            <View style={styles.enginePill}>
              <Text style={styles.enginePillText}>⚡ JURISDICTION ENGINE</Text>
            </View>
          </View>

          {/* STEP 2: Police Station */}
          <View style={styles.stepRow}>
            <Image source={STEPPER_STATION} style={styles.stepIcon} resizeMode="contain" />
            <TouchableOpacity
              style={styles.stepCard}
              onPress={() => onNavigate && onNavigate('station_details')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardLabel}>POLICE STATION</Text>
              <Text style={styles.cardMainValue}>Gandhipuram Police Station</Text>
            </TouchableOpacity>
          </View>

          {/* STEP 3: Nearest Officer */}
          <View style={styles.stepRow}>
            <Image source={STEPPER_OFFICER} style={styles.stepIcon} resizeMode="contain" />
            <TouchableOpacity
              style={styles.stepCard}
              onPress={() => onNavigate && onNavigate('officers')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardLabel}>NEAREST OFFICER</Text>
              <Text style={[styles.cardMainValue, { color: '#000666' }]}>Officer Kumar</Text>
            </TouchableOpacity>
          </View>

          {/* ETA Card */}
          <View style={styles.etaOffsetRow}>
            <View style={styles.etaCard}>
              <Text style={styles.etaLabel}>⏱ ETA</Text>
              <Text style={styles.etaValue}>4 minutes</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons matching Screen 3 */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.primaryBtn, assigned && styles.primaryBtnAssigned]}
            onPress={handleAutoAssign}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryBtnText}>
              {assigned ? '✔ [ASSIGNED - EN ROUTE]' : '✔ [AUTO ASSIGN]'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => onNavigate && onNavigate('station_details')}
            activeOpacity={0.75}
          >
            <Text style={styles.outlineBtnText}>⇄ [CHANGE STATION]</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryOutlineBtn}
            onPress={() => onNavigate && onNavigate('officers')}
            activeOpacity={0.75}
          >
            <Text style={styles.secondaryOutlineBtnText}>👤+ [ASSIGN OFFICER]</Text>
          </TouchableOpacity>
        </View>
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
    height: 48,
    backgroundColor: '#000666',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backBtn: {
    padding: 6,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  bellBtn: {
    padding: 6,
  },
  bellIcon: {
    width: 18,
    height: 20,
    tintColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FBF8FF',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  stepperWrapper: {
    position: 'relative',
    paddingLeft: 4,
    marginBottom: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 27,
    top: 24,
    bottom: 80,
    width: 2,
    backgroundColor: '#D9D8E6',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIcon: {
    width: 48,
    height: 48,
    marginRight: 12,
    zIndex: 2,
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#767683',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardMainValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C20',
  },
  engineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 9,
    marginBottom: 16,
    zIndex: 2,
  },
  chipIcon: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  enginePill: {
    backgroundColor: '#E0E4FE',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#C6CBF8',
  },
  enginePillText: {
    color: '#000666',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  etaOffsetRow: {
    paddingLeft: 60,
    marginTop: 4,
  },
  etaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  etaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#767683',
  },
  etaValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3A2E00',
    marginTop: 4,
  },
  actionsContainer: {
    marginTop: 8,
  },
  primaryBtn: {
    backgroundColor: '#000666',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnAssigned: {
    backgroundColor: '#10B981',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  outlineBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000666',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  outlineBtnText: {
    color: '#000666',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryOutlineBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryOutlineBtnText: {
    color: '#1A1C20',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
