import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const MAP_BG = require('../../assets/map/image0_147_2015.png');
const BACK_ICON = require('../../assets/details/icon_back.png');

export default function LiveMapScreen({ onNavigate, onBack }) {
  const [filterVisible, setFilterVisible] = useState(false);
  const [quickSelect, setQuickSelect] = useState('ALL');
  const [selectedSOS, setSelectedSOS] = useState('SOS-1024');
  const [acknowledged, setAcknowledged] = useState(false);

  // Active layer filter pills
  const [showSOS, setShowSOS] = useState(true);
  const [showUnits, setShowUnits] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);

  // Categories checkbox state
  const [categories, setCategories] = useState({
    women_safety: true,
    child_safety: true,
    crime: true,
    missing_person: true,
    vehicle_theft: false,
    police_units: false,
    police_stations: false,
  });

  const toggleCategory = (key) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAllFilters = () => {
    setCategories({
      women_safety: false,
      child_safety: false,
      crime: false,
      missing_person: false,
      vehicle_theft: false,
      police_units: false,
      police_stations: false,
    });
    setQuickSelect('ALL');
  };

  const applyFilters = () => {
    setFilterVisible(false);
    if (quickSelect === 'HOTSPOTS') {
      onNavigate && onNavigate('crime_hotspots');
    } else if (quickSelect === 'SOS') {
      onNavigate && onNavigate('sos_center');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Live Data Header Bar */}
      <View style={styles.topLiveBar}>
        <View style={styles.liveIndicator}>
          <View style={styles.redDot} />
          <Text style={styles.liveIndicatorText}>LIVE DATA</Text>
        </View>
        <Text style={styles.lastUpdatedText}>Last Updated: 10:48 AM</Text>
      </View>

      {/* Main Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('dashboard'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>LIVE MAP</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => onNavigate && onNavigate('live_case_search')}
            activeOpacity={0.7}
          >
            <Text style={styles.iconSymbol}>🔍</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setFilterVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.iconSymbol}>🎛️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Interactive Map Area */}
      <View style={styles.mapArea}>
        <Image source={MAP_BG} style={styles.mapBgImage} resizeMode="cover" />
        <View style={styles.mapNightOverlay} />

        {/* 1. Gandhipuram PS Marker */}
        <TouchableOpacity
          style={[styles.markerContainer, { top: 90, left: width * 0.48 }]}
          onPress={() => onNavigate && onNavigate('station_details')}
          activeOpacity={0.8}
        >
          <View style={styles.stationPin}>
            <Text style={styles.markerEmoji}>🛡️</Text>
          </View>
          <View style={styles.stationBadgeCallout}>
            <Text style={styles.stationBadgeText}>Gandhipuram PS</Text>
          </View>
        </TouchableOpacity>

        {/* 2. SOS-1024 Critical Diamond Marker */}
        {showSOS && (
          <TouchableOpacity
            style={[styles.markerContainer, { top: 130, left: width * 0.12 }]}
            onPress={() => setSelectedSOS('SOS-1024')}
            activeOpacity={0.8}
          >
            <View style={styles.sosDiamondMarker}>
              <Text style={styles.sosDiamondText}>!</Text>
            </View>
            <View style={styles.sosCalloutBadge}>
              <Text style={styles.sosCalloutText}>SOS-1024</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* 3. W-1042 Incident Marker */}
        {showIncidents && (
          <TouchableOpacity
            style={[styles.markerContainer, { top: 220, left: width * 0.46 }]}
            onPress={() => onNavigate && onNavigate('case_w1042')}
            activeOpacity={0.8}
          >
            <View style={styles.incidentPin}>
              <Text style={styles.incidentPinText}>▲</Text>
            </View>
            <View style={styles.incidentCalloutBadge}>
              <Text style={styles.incidentCalloutText}>W-1042</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* 4. PU-12 Patrol Unit Marker */}
        {showUnits && (
          <TouchableOpacity
            style={[styles.markerContainer, { top: 260, left: width * 0.22 }]}
            onPress={() => onNavigate && onNavigate('unit_details')}
            activeOpacity={0.8}
          >
            <View style={styles.unitPin}>
              <Text style={styles.unitPinText}>🚗</Text>
            </View>
            <View style={styles.unitCalloutBadge}>
              <Text style={styles.unitCalloutText}>PU-12</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Right Floating Map Controls */}
        <View style={styles.rightControls}>
          <View style={styles.zoomControlPill}>
            <TouchableOpacity style={styles.zoomBtn} activeOpacity={0.7}>
              <Text style={styles.zoomBtnText}>+</Text>
            </TouchableOpacity>
            <View style={styles.zoomDivider} />
            <TouchableOpacity style={styles.zoomBtn} activeOpacity={0.7}>
              <Text style={styles.zoomBtnText}>−</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.gpsCenterBtn} activeOpacity={0.7}>
            <Text style={styles.gpsIconText}>⌖</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Floating Filter Toggle Pills */}
        <View style={styles.floatingFilterPills}>
          <TouchableOpacity
            style={[styles.filterPill, showSOS && styles.filterPillActive]}
            onPress={() => setShowSOS(!showSOS)}
            activeOpacity={0.7}
          >
            <View style={[styles.pillDot, { backgroundColor: '#D32F2F' }]} />
            <Text style={styles.filterPillLabel}>SOS Active</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, showUnits && styles.filterPillActive]}
            onPress={() => setShowUnits(!showUnits)}
            activeOpacity={0.7}
          >
            <View style={[styles.pillDot, { backgroundColor: '#1A237E' }]} />
            <Text style={styles.filterPillLabel}>Units</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, showIncidents && styles.filterPillActive]}
            onPress={() => setShowIncidents(!showIncidents)}
            activeOpacity={0.7}
          >
            <View style={[styles.pillDot, { backgroundColor: '#767683' }]} />
            <Text style={styles.filterPillLabel}>Incidents</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Drawer Card: Selected SOS Alert */}
        <View style={styles.bottomDrawerCard}>
          <View style={styles.drawerAccentBar} />
          <View style={styles.drawerGrabHandle} />

          <View style={styles.drawerTopRow}>
            <View style={styles.priorityPill}>
              <Text style={styles.priorityPillText}>HIGH PRIORITY</Text>
            </View>
            <Text style={styles.distanceText}>0.2 km away</Text>
            <TouchableOpacity
              style={styles.directionsBtn}
              onPress={() => onNavigate && onNavigate('patrol_tracking')}
              activeOpacity={0.7}
            >
              <Text style={styles.directionsIcon}>↱</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.incidentTitle}>SOS-1024: Medical Emergency</Text>
          <Text style={styles.incidentLocation}>Cross Cut Rd, Gandhipuram, Coimbatore</Text>

          <View style={styles.drawerActionsRow}>
            <TouchableOpacity
              style={[styles.ackBtn, acknowledged && styles.ackBtnActive]}
              onPress={() => {
                setAcknowledged(true);
                onNavigate && onNavigate('dispatch');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.ackBtnText}>
                {acknowledged ? 'ACKNOWLEDGED ✓' : 'Acknowledge'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailsBtn}
              onPress={() => onNavigate && onNavigate('sos_details')}
              activeOpacity={0.7}
            >
              <Text style={styles.detailsBtnText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Screen 1: Map Filters Modal Bottom Sheet */}
      <Modal visible={filterVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetGrabBar} />

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Map Filters</Text>
              <TouchableOpacity
                onPress={() => setFilterVisible(false)}
                style={styles.closeSheetBtn}
              >
                <Text style={styles.closeSheetIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Quick Select */}
              <Text style={styles.filterSectionHeading}>QUICK SELECT</Text>
              <View style={styles.quickSelectRow}>
                {['ALL', 'HOTSPOTS', 'SOS'].map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.quickPill,
                      quickSelect === opt && styles.quickPillSelected,
                    ]}
                    onPress={() => setQuickSelect(opt)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.quickPillText,
                        quickSelect === opt && styles.quickPillTextSelected,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Categories */}
              <Text style={styles.filterSectionHeading}>CATEGORIES</Text>

              {[
                { key: 'women_safety', label: 'WOMEN SAFETY', icon: '♀' },
                { key: 'child_safety', label: 'CHILD SAFETY', icon: '👶' },
                { key: 'crime', label: 'CRIME', icon: '⚠️' },
                { key: 'missing_person', label: 'MISSING PERSON', icon: '👤' },
                { key: 'vehicle_theft', label: 'VEHICLE THEFT', icon: '🚗' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.categoryRow}
                  onPress={() => toggleCategory(item.key)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryLeft}>
                    <Text style={styles.categoryIcon}>{item.icon}</Text>
                    <Text style={styles.categoryLabel}>{item.label}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      categories[item.key] && styles.checkboxActive,
                    ]}
                  >
                    {categories[item.key] && (
                      <View style={styles.checkboxInnerSquare} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}

              <View style={styles.modalDivider} />

              {[
                { key: 'police_units', label: 'POLICE UNITS', icon: '🛡️' },
                { key: 'police_stations', label: 'POLICE STATIONS', icon: '🏛️' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.categoryRow}
                  onPress={() => toggleCategory(item.key)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryLeft}>
                    <Text style={styles.categoryIcon}>{item.icon}</Text>
                    <Text style={styles.categoryLabel}>{item.label}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      categories[item.key] && styles.checkboxActive,
                    ]}
                  >
                    {categories[item.key] && (
                      <View style={styles.checkboxInnerSquare} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Modal Bottom Buttons */}
            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={clearAllFilters}
                activeOpacity={0.7}
              >
                <Text style={styles.clearBtnText}>CLEAR ALL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyBtn}
                onPress={applyFilters}
                activeOpacity={0.8}
              >
                <Text style={styles.applyBtnText}>APPLY FILTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000666',
  },
  topLiveBar: {
    height: 32,
    backgroundColor: '#EBEBF2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D32F2F',
    marginRight: 6,
  },
  liveIndicatorText: {
    color: '#D32F2F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  lastUpdatedText: {
    color: '#454652',
    fontSize: 11,
    fontWeight: '600',
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
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 14,
    padding: 4,
  },
  iconSymbol: {
    fontSize: 18,
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#1E232A',
    position: 'relative',
    overflow: 'hidden',
  },
  mapBgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  mapNightOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 10, 25, 0.45)',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  stationPin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  markerEmoji: {
    fontSize: 20,
  },
  stationBadgeCallout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  stationBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000B58',
  },
  sosDiamondMarker: {
    width: 36,
    height: 36,
    backgroundColor: '#B6171E',
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#B6171E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  sosDiamondText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    transform: [{ rotate: '-45deg' }],
  },
  sosCalloutBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#B6171E',
  },
  sosCalloutText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#B6171E',
  },
  incidentPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#454652',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incidentPinText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  incidentCalloutBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  incidentCalloutText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#191C1D',
  },
  unitPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000B58',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitPinText: {
    fontSize: 14,
  },
  unitCalloutBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#000B58',
  },
  unitCalloutText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000B58',
  },
  rightControls: {
    position: 'absolute',
    right: 16,
    top: 140,
    alignItems: 'center',
  },
  zoomControlPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: 44,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zoomBtn: {
    width: 44,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#191C1D',
  },
  zoomDivider: {
    width: 32,
    height: 1,
    backgroundColor: '#E2E2E7',
  },
  gpsCenterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  gpsIconText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  floatingFilterPills: {
    position: 'absolute',
    bottom: 184,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filterPillActive: {
    borderColor: '#000B58',
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  filterPillLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#191C1D',
  },
  bottomDrawerCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  drawerAccentBar: {
    position: 'absolute',
    top: 0,
    left: 18,
    right: 18,
    height: 4,
    backgroundColor: '#B6171E',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  drawerGrabHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#C6C5D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  drawerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  priorityPill: {
    backgroundColor: '#B6171E',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  priorityPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  distanceText: {
    fontSize: 12,
    color: '#454652',
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  directionsBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8ECF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionsIcon: {
    fontSize: 16,
    color: '#000B58',
    fontWeight: '900',
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#B6171E',
    marginTop: 2,
  },
  incidentLocation: {
    fontSize: 12,
    color: '#454652',
    marginTop: 2,
    marginBottom: 14,
  },
  drawerActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ackBtn: {
    flex: 1,
    backgroundColor: '#B6171E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  ackBtnActive: {
    backgroundColor: '#2E7D32',
  },
  ackBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  detailsBtn: {
    flex: 1,
    backgroundColor: '#E8ECF2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  detailsBtnText: {
    color: '#191C1D',
    fontSize: 13,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    maxHeight: '82%',
  },
  sheetGrabBar: {
    width: 40,
    height: 4,
    backgroundColor: '#C6C5D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#191C1D',
  },
  closeSheetBtn: {
    padding: 4,
  },
  closeSheetIcon: {
    fontSize: 18,
    color: '#767683',
    fontWeight: '700',
  },
  filterSectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.8,
    marginTop: 10,
    marginBottom: 10,
  },
  quickSelectRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  quickPill: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
  },
  quickPillSelected: {
    backgroundColor: '#E8ECF8',
    borderColor: '#000B58',
  },
  quickPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#454652',
  },
  quickPillTextSelected: {
    color: '#000B58',
    fontWeight: '800',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 16,
    width: 26,
    color: '#000B58',
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#191C1D',
    letterSpacing: 0.3,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C6C5D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#000B58',
    borderColor: '#000B58',
  },
  checkboxInnerSquare: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E2E2E7',
    marginVertical: 10,
  },
  modalActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  clearBtn: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#000B58',
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  clearBtnText: {
    color: '#000B58',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  applyBtn: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#000B58',
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
