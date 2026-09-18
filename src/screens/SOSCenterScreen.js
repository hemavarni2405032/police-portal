import React from 'react';
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

export default function SOSCenterScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('dashboard'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>SOS EMERGENCY RESPONSE</Text>

        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Area */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Emergency Response{"\n"}Center</Text>
          <Text style={styles.subTitle}>
            Monitor and respond to active emergency alerts.
          </Text>
        </View>

        {/* 4 Stat Cards in 2x2 Grid */}
        <View style={styles.statsGrid}>
          {/* Card 1: ACTIVE SOS */}
          <TouchableOpacity
            style={styles.statCardWhite}
            onPress={() => onNavigate && onNavigate('active_alerts')}
            activeOpacity={0.8}
          >
            <View style={styles.statCardTopRow}>
              <Text style={styles.statLabelRed}>ACTIVE SOS</Text>
              <Text style={styles.asteriskRed}>✻</Text>
            </View>
            <Text style={styles.statNumberDark}>06</Text>
          </TouchableOpacity>

          {/* Card 2: CRITICAL */}
          <TouchableOpacity
            style={styles.statCardPink}
            onPress={() => onNavigate && onNavigate('active_alerts')}
            activeOpacity={0.8}
          >
            <View style={styles.statCardTopRow}>
              <Text style={styles.statLabelCrimson}>CRITICAL</Text>
              <Text style={styles.triangleRed}>▲</Text>
            </View>
            <Text style={styles.statNumberCrimson}>03</Text>
          </TouchableOpacity>

          {/* Card 3: RESPONDING */}
          <TouchableOpacity
            style={styles.statCardNavy}
            onPress={() => onNavigate && onNavigate('police_units')}
            activeOpacity={0.8}
          >
            <View style={styles.statCardTopRow}>
              <Text style={styles.statLabelLightBlue}>RESPONDING</Text>
              <Text style={styles.shieldWhite}>🛡️</Text>
            </View>
            <Text style={styles.statNumberLightBlue}>02</Text>
          </TouchableOpacity>

          {/* Card 4: RESOLVED TODAY */}
          <TouchableOpacity
            style={styles.statCardWhite}
            onPress={() => onNavigate && onNavigate('sos_history')}
            activeOpacity={0.8}
          >
            <View style={styles.statCardTopRow}>
              <Text style={styles.statLabelGray}>RESOLVED{"\n"}TODAY</Text>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
            <Text style={styles.statNumberDark}>18</Text>
          </TouchableOpacity>
        </View>

        {/* ACTIVE EMERGENCY ALERTS Section */}
        <View style={styles.alertsHeaderRow}>
          <Text style={styles.alertsSectionTitle}>ACTIVE EMERGENCY ALERTS</Text>
          <TouchableOpacity
            onPress={() => onNavigate && onNavigate('active_alerts')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Alert Card 1: SOS-1024 */}
        <TouchableOpacity
          style={styles.alertCard}
          onPress={() => onNavigate && onNavigate('sos_details')}
          activeOpacity={0.75}
        >
          <View style={styles.alertRedBar} />
          <View style={styles.alertCardInner}>
            <View style={styles.alertTopRow}>
              <Text style={styles.alertIdText}>SOS-1024</Text>
              <View style={styles.badgeRow}>
                <View style={styles.criticalBadge}>
                  <Text style={styles.criticalBadgeText}>CRITICAL</Text>
                </View>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>ACTIVE</Text>
                </View>
              </View>
              <Text style={styles.alertTimestamp}>10:42 AM</Text>
            </View>

            <Text style={styles.emergencyHeading}>Personal Safety Emergency</Text>

            <View style={styles.locationRow}>
              <Text style={styles.locPin}>📍</Text>
              <Text style={styles.locText}>Gandhipuram</Text>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.officerAssignedRow}>
              <Text style={styles.checkBlueIcon}>✓</Text>
              <Text style={styles.officerAssignedText}>Officer Assigned</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Alert Card 2: SOS-1025 */}
        <TouchableOpacity
          style={styles.alertCard}
          onPress={() => onNavigate && onNavigate('dispatch')}
          activeOpacity={0.75}
        >
          <View style={styles.alertRedBar} />
          <View style={styles.alertCardInner}>
            <View style={styles.alertTopRow}>
              <Text style={styles.alertIdText}>SOS-1025</Text>
              <View style={styles.badgeRow}>
                <View style={styles.criticalBadge}>
                  <Text style={styles.criticalBadgeText}>CRITICAL</Text>
                </View>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>ACTIVE</Text>
                </View>
              </View>
              <Text style={styles.alertTimestamp}>10:31 AM</Text>
            </View>

            <Text style={styles.emergencyHeading}>Medical Emergency</Text>

            <View style={styles.locationRow}>
              <Text style={styles.locPin}>📍</Text>
              <Text style={styles.locText}>Peelamedu</Text>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.awaitingRow}>
              <Text style={styles.clockRedIcon}>⏱️</Text>
              <Text style={styles.awaitingText}>Awaiting Dispatch</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bellBtn: {
    padding: 6,
  },
  bellIcon: {
    fontSize: 18,
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
  titleSection: {
    marginBottom: 18,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#191C1D',
    lineHeight: 28,
  },
  subTitle: {
    fontSize: 13,
    color: '#5A5D6B',
    marginTop: 6,
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCardWhite: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  statCardPink: {
    width: '48%',
    backgroundColor: '#FFEBEE',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  statCardNavy: {
    width: '48%',
    backgroundColor: '#000B58',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000B58',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statLabelRed: {
    color: '#B6171E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  asteriskRed: {
    color: '#B6171E',
    fontSize: 16,
    fontWeight: '900',
  },
  statLabelCrimson: {
    color: '#B6171E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  triangleRed: {
    color: '#B6171E',
    fontSize: 14,
    fontWeight: '900',
  },
  statLabelLightBlue: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  shieldWhite: {
    fontSize: 14,
  },
  statLabelGray: {
    color: '#454652',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    lineHeight: 12,
  },
  checkIcon: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '900',
  },
  statNumberDark: {
    fontSize: 28,
    fontWeight: '900',
    color: '#191C1D',
  },
  statNumberCrimson: {
    fontSize: 28,
    fontWeight: '900',
    color: '#B6171E',
  },
  statNumberLightBlue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  alertsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertsSectionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#191C1D',
    letterSpacing: 0.8,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000B58',
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  alertRedBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#B6171E',
  },
  alertCardInner: {
    paddingLeft: 16,
    paddingRight: 14,
    paddingVertical: 14,
  },
  alertTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  alertIdText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  criticalBadge: {
    backgroundColor: '#FFEBEE',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  criticalBadgeText: {
    color: '#B6171E',
    fontSize: 9.5,
    fontWeight: '800',
  },
  activeBadge: {
    backgroundColor: '#E8ECF2',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeBadgeText: {
    color: '#454652',
    fontSize: 9.5,
    fontWeight: '700',
  },
  alertTimestamp: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  emergencyHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#191C1D',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locPin: {
    fontSize: 12,
    marginRight: 4,
  },
  locText: {
    fontSize: 12,
    color: '#454652',
    fontWeight: '600',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F9',
    marginBottom: 10,
  },
  officerAssignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBlueIcon: {
    fontSize: 13,
    color: '#000B58',
    marginRight: 6,
    fontWeight: '900',
  },
  officerAssignedText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#000B58',
  },
  awaitingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockRedIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  awaitingText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#B6171E',
  },
});
