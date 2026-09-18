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

export default function PoliceUnitsScreen({ onNavigate, onBack }) {
  const units = [
    {
      id: 'PU-12',
      type: 'Patrol Unit',
      status: 'EN ROUTE',
      statusType: 'en_route',
      officer: 'Inspector Kumar',
      location: 'Gandhipuram',
      eta: 'ETA: 06 min',
      icon: '🛡️',
      barColor: '#000B58',
    },
    {
      id: 'PU-08',
      type: 'Patrol Unit',
      status: 'AVAILABLE',
      statusType: 'available',
      officer: 'SI Arun',
      location: 'RS Puram',
      icon: '🚗',
      barColor: '#000B58',
    },
    {
      id: 'PU-15',
      type: 'Patrol Unit',
      status: 'BUSY',
      statusType: 'busy',
      officer: 'Officer Priya',
      location: 'Peelamedu',
      icon: '🛡️',
      barColor: '#B6171E',
    },
    {
      id: 'PU-21',
      type: 'Patrol Unit',
      status: 'AVAILABLE',
      statusType: 'available',
      officer: 'Officer Ravi',
      location: 'Saibaba Colony',
      icon: '🚗',
      barColor: '#000B58',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('sos_center'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>POLICE UNITS</Text>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* 4 Stat Cards in 2x2 Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValNavy}>12</Text>
            <Text style={styles.statLbl}>AVAILABLE</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#FFEBEE', borderColor: '#FFCDD2' }]}>
            <Text style={styles.statValRed}>08</Text>
            <Text style={[styles.statLbl, { color: '#B6171E' }]}>BUSY</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValNavy}>04</Text>
            <Text style={styles.statLbl}>DISPATCHED</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValNavy}>03</Text>
            <Text style={styles.statLbl}>OFFLINE</Text>
          </View>
        </View>

        {/* Units List */}
        {units.map((unit) => (
          <TouchableOpacity
            key={unit.id}
            style={styles.unitCard}
            onPress={() => onNavigate && onNavigate('unit_details')}
            activeOpacity={0.75}
          >
            <View style={[styles.accentBar, { backgroundColor: unit.barColor }]} />
            <View style={styles.unitCardInner}>
              <View style={styles.unitTopRow}>
                <View style={styles.unitIdRow}>
                  <Text style={styles.unitIconText}>{unit.icon}</Text>
                  <Text style={styles.unitIdBold}>{unit.id}</Text>
                  <Text style={styles.unitTypeDivider}>|</Text>
                  <Text style={styles.unitTypeText}>{unit.type}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    unit.statusType === 'en_route' && styles.enRouteBadge,
                    unit.statusType === 'available' && styles.availableBadge,
                    unit.statusType === 'busy' && styles.busyBadge,
                  ]}
                >
                  {unit.statusType === 'en_route' && <View style={styles.goldDot} />}
                  <Text
                    style={[
                      styles.statusBadgeText,
                      unit.statusType === 'en_route' && styles.enRouteBadgeText,
                      unit.statusType === 'available' && styles.availableBadgeText,
                      unit.statusType === 'busy' && styles.busyBadgeText,
                    ]}
                  >
                    {unit.status}
                  </Text>
                </View>
              </View>

              <View style={styles.officerRow}>
                <Text style={styles.userIcon}>👤</Text>
                <Text style={styles.officerName}>{unit.officer}</Text>
              </View>

              <View style={styles.locationRow}>
                <Text style={styles.locPin}>📍</Text>
                <Text style={styles.locText}>{unit.location}</Text>
              </View>

              {unit.eta && (
                <View style={styles.etaPillBox}>
                  <Text style={styles.clockIcon}>⏱️</Text>
                  <Text style={styles.etaText}>{unit.eta}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
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
  searchBtn: {
    padding: 6,
  },
  searchIcon: {
    fontSize: 16,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  statValNavy: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000B58',
  },
  statValRed: {
    fontSize: 24,
    fontWeight: '900',
    color: '#B6171E',
  },
  statLbl: {
    fontSize: 10,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  unitCard: {
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
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  unitCardInner: {
    paddingLeft: 18,
    paddingRight: 14,
    paddingVertical: 14,
  },
  unitTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  unitIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitIconText: {
    fontSize: 14,
    marginRight: 6,
  },
  unitIdBold: {
    fontSize: 16,
    fontWeight: '900',
    color: '#191C1D',
  },
  unitTypeDivider: {
    color: '#C6C5D4',
    marginHorizontal: 6,
  },
  unitTypeText: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '500',
  },
  statusBadge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  enRouteBadge: {
    backgroundColor: '#3E2723',
  },
  enRouteBadgeText: {
    color: '#FFB74D',
    fontSize: 10,
    fontWeight: '800',
  },
  goldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFB74D',
    marginRight: 4,
  },
  availableBadge: {
    backgroundColor: '#000B58',
  },
  availableBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  busyBadge: {
    backgroundColor: '#FFEBEE',
  },
  busyBadgeText: {
    color: '#B6171E',
    fontSize: 10,
    fontWeight: '800',
  },
  officerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  officerName: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locPin: {
    fontSize: 12,
    marginRight: 6,
  },
  locText: {
    fontSize: 12,
    color: '#454652',
    fontWeight: '500',
  },
  etaPillBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  clockIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  etaText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F57F17',
  },
});
