import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACK_ICON = require('../../assets/details/icon_back.png');
const RAJAN_IMG = require('../../assets/map/image4_147_2015.jpg');
const MEENA_IMG = require('../../assets/map/image5_147_2015.jpg');

export default function StationDetailsScreen({ onNavigate, onBack }) {
  const [activeTab, setActiveTab] = useState('officers'); // officers, cases, sos, units

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('dashboard'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KOVAI KAVAL</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: Station Overview Banner */}
        <View style={styles.stationCard}>
          <View style={styles.stationCardHeader}>
            <Text style={styles.stationName}>Gandhipuram</Text>
            <View style={styles.activeBadge}>
              <View style={styles.greenActiveDot} />
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Text style={styles.pinIcon}>📍</Text>
            <Text style={styles.stationSub}>Cross Cut Rd, Ram Nagar</Text>
          </View>

          {/* Action Buttons: Call Station & Navigate */}
          <View style={styles.topActionsRow}>
            <TouchableOpacity style={styles.callStationBtn} activeOpacity={0.8}>
              <Text style={styles.callStationIcon}>📞</Text>
              <Text style={styles.callStationText}>Call Station</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateBtn}
              onPress={() => onNavigate && onNavigate('live_map')}
              activeOpacity={0.75}
            >
              <Text style={styles.navigateIcon}>↱</Text>
              <Text style={styles.navigateText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4 Stat Metric Boxes (2x2 Grid) */}
        <View style={styles.statsGrid}>
          {/* Card 1: ACTIVE SOS */}
          <TouchableOpacity
            style={styles.statBoxCard}
            onPress={() => onNavigate && onNavigate('active_alerts')}
            activeOpacity={0.8}
          >
            <View style={styles.redTopBar} />
            <View style={styles.statBoxTopRow}>
              <Text style={styles.statBoxLabelRed}>ACTIVE SOS</Text>
              <Text style={styles.redDiamondAlert}>♦</Text>
            </View>
            <Text style={styles.statBoxNumRed}>2</Text>
          </TouchableOpacity>

          {/* Card 2: ACTIVE CASES */}
          <TouchableOpacity
            style={styles.statBoxCard}
            onPress={() => onNavigate && onNavigate('case_management')}
            activeOpacity={0.8}
          >
            <View style={styles.statBoxTopRow}>
              <Text style={styles.statBoxLabel}>ACTIVE CASES</Text>
              <Text style={styles.statIconDark}>📋</Text>
            </View>
            <Text style={styles.statBoxNumDark}>18</Text>
          </TouchableOpacity>

          {/* Card 3: ON DUTY */}
          <TouchableOpacity
            style={styles.statBoxCard}
            onPress={() => onNavigate && onNavigate('officers')}
            activeOpacity={0.8}
          >
            <View style={styles.statBoxTopRow}>
              <Text style={styles.statBoxLabel}>ON DUTY</Text>
              <Text style={styles.statIconDark}>🛡️</Text>
            </View>
            <Text style={styles.statBoxNumDark}>24</Text>
          </TouchableOpacity>

          {/* Card 4: AVAILABLE */}
          <TouchableOpacity
            style={styles.statBoxCard}
            onPress={() => onNavigate && onNavigate('police_units')}
            activeOpacity={0.8}
          >
            <View style={styles.statBoxTopRow}>
              <Text style={styles.statBoxLabel}>AVAILABLE</Text>
              <Text style={styles.greenCheckIcon}>✓</Text>
            </View>
            <Text style={styles.statBoxNumDark}>8</Text>
          </TouchableOpacity>
        </View>

        {/* 4 Horizontal Tabs: OFFICERS, CASES, SOS, UNITS */}
        <View style={styles.tabsRow}>
          {[
            { key: 'officers', label: 'OFFICERS' },
            { key: 'cases', label: 'CASES' },
            { key: 'sos', label: 'SOS' },
            { key: 'units', label: 'UNITS' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabItem,
                activeTab === tab.key && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabItemText,
                  activeTab === tab.key && styles.tabItemTextActive,
                ]}
              >
                {tab.label}
              </Text>
              {activeTab === tab.key && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB 1: OFFICERS */}
        {activeTab === 'officers' && (
          <View>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Available Patrols</Text>
              <TouchableOpacity style={styles.filterInlineRow}>
                <Text style={styles.filterText}>Filter ☵</Text>
              </TouchableOpacity>
            </View>

            {/* Officer 1: Sgt. Rajan K. */}
            <View style={styles.patrolOfficerCard}>
              <Image source={RAJAN_IMG} style={styles.officerPhoto} resizeMode="cover" />
              <View style={styles.officerMeta}>
                <Text style={styles.officerName}>Sgt. Rajan K.</Text>
                <Text style={styles.officerSub}>Sector A • 0.5km away</Text>
              </View>
              <View style={styles.patrolPillNavy}>
                <Text style={styles.patrolPillText}>PATROL 1</Text>
              </View>
              <TouchableOpacity style={styles.radioBtn} activeOpacity={0.7}>
                <Text style={styles.radioIcon}>📻</Text>
              </TouchableOpacity>
            </View>

            {/* Officer 2: Insp. Meena S. */}
            <View style={styles.patrolOfficerCard}>
              <Image source={MEENA_IMG} style={styles.officerPhoto} resizeMode="cover" />
              <View style={styles.officerMeta}>
                <Text style={styles.officerName}>Insp. Meena S.</Text>
                <Text style={styles.officerSub}>Desk Duty</Text>
              </View>
              <View style={styles.stationPillGray}>
                <Text style={styles.stationPillText}>STATION</Text>
              </View>
              <TouchableOpacity style={styles.radioBtn} activeOpacity={0.7}>
                <Text style={styles.radioIcon}>📻</Text>
              </TouchableOpacity>
            </View>

            {/* View All Officers Button */}
            <TouchableOpacity
              style={styles.viewAllOfficersBtn}
              onPress={() => onNavigate && onNavigate('officers')}
              activeOpacity={0.75}
            >
              <Text style={styles.viewAllOfficersBtnText}>View All 24 Officers</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* TAB 2: CASES */}
        {activeTab === 'cases' && (
          <View>
            <TouchableOpacity
              style={styles.patrolOfficerCard}
              onPress={() => onNavigate && onNavigate('case_w1042')}
              activeOpacity={0.75}
            >
              <View style={styles.officerMeta}>
                <Text style={styles.officerName}>FIR: W-1042</Text>
                <Text style={styles.officerSub}>Cross Cut Road • Two-wheeler theft</Text>
              </View>
              <View style={styles.activeBadgeRed}>
                <Text style={styles.activeBadgeRedText}>CRITICAL</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.patrolOfficerCard}
              onPress={() => onNavigate && onNavigate('case_details')}
              activeOpacity={0.75}
            >
              <View style={styles.officerMeta}>
                <Text style={styles.officerName}>FIR: CCP-1042</Text>
                <Text style={styles.officerSub}>100ft Road • Traffic Incident</Text>
              </View>
              <View style={styles.stationPillGray}>
                <Text style={styles.stationPillText}>INVESTIGATING</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* TAB 3: SOS */}
        {activeTab === 'sos' && (
          <View>
            <TouchableOpacity
              style={styles.patrolOfficerCard}
              onPress={() => onNavigate && onNavigate('sos_details')}
              activeOpacity={0.75}
            >
              <View style={styles.officerMeta}>
                <Text style={styles.officerName}>SOS-1024</Text>
                <Text style={styles.officerSub}>Personal Safety • Gandhipuram</Text>
              </View>
              <View style={styles.activeBadgeRed}>
                <Text style={styles.activeBadgeRedText}>ACTIVE</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* TAB 4: UNITS */}
        {activeTab === 'units' && (
          <View>
            <TouchableOpacity
              style={styles.patrolOfficerCard}
              onPress={() => onNavigate && onNavigate('unit_details')}
              activeOpacity={0.75}
            >
              <View style={styles.officerMeta}>
                <Text style={styles.officerName}>Unit PU-12</Text>
                <Text style={styles.officerSub}>En Route to SOS-1024 • ETA: 06 min</Text>
              </View>
              <View style={styles.patrolPillNavy}>
                <Text style={styles.patrolPillText}>EN ROUTE</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
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
  stationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  stationCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stationName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#191C1D',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  greenActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E7D32',
    marginRight: 6,
  },
  activeBadgeText: {
    color: '#2E7D32',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pinIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  stationSub: {
    fontSize: 13,
    color: '#5A5D6B',
    fontWeight: '500',
  },
  topActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callStationBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000B58',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 6,
  },
  callStationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  callStationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  navigateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8ECF2',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 6,
  },
  navigateIcon: {
    color: '#191C1D',
    fontSize: 15,
    fontWeight: '900',
    marginRight: 6,
  },
  navigateText: {
    color: '#191C1D',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statBoxCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    position: 'relative',
    overflow: 'hidden',
  },
  redTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#B6171E',
  },
  statBoxTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statBoxLabelRed: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B6171E',
    letterSpacing: 0.5,
  },
  redDiamondAlert: {
    color: '#B6171E',
    fontSize: 14,
  },
  statBoxLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.5,
  },
  statIconDark: {
    fontSize: 13,
  },
  greenCheckIcon: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '900',
  },
  statBoxNumRed: {
    fontSize: 26,
    fontWeight: '900',
    color: '#B6171E',
  },
  statBoxNumDark: {
    fontSize: 26,
    fontWeight: '900',
    color: '#191C1D',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E7',
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  tabItemActive: {},
  tabItemText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#767683',
    letterSpacing: 0.5,
  },
  tabItemTextActive: {
    color: '#000B58',
    fontWeight: '900',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: '#000B58',
    borderRadius: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#191C1D',
  },
  filterInlineRow: {
    padding: 4,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000B58',
  },
  patrolOfficerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
  },
  officerPhoto: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
  },
  officerMeta: {
    flex: 1,
  },
  officerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
  },
  officerSub: {
    fontSize: 11.5,
    color: '#767683',
    marginTop: 2,
  },
  patrolPillNavy: {
    backgroundColor: '#000B58',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  patrolPillText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  stationPillGray: {
    backgroundColor: '#E8ECF2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  stationPillText: {
    color: '#454652',
    fontSize: 9.5,
    fontWeight: '700',
  },
  activeBadgeRed: {
    backgroundColor: '#FFEBEE',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeBadgeRedText: {
    color: '#B6171E',
    fontSize: 9.5,
    fontWeight: '800',
  },
  radioBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECECF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIcon: {
    fontSize: 16,
  },
  viewAllOfficersBtn: {
    borderWidth: 1.5,
    borderColor: '#000B58',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  viewAllOfficersBtnText: {
    color: '#000B58',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
