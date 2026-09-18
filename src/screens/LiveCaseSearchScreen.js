import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACK_ICON = require('../../assets/details/icon_back.png');

export default function LiveCaseSearchScreen({ onNavigate, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, incidents, officers, units

  const recentItems = [
    {
      id: 'w1042',
      title: 'W-1042',
      tag: 'Incident',
      tagType: 'gray',
      icon: '▲',
      iconBg: '#E8ECF2',
      iconColor: '#000B58',
      subtitle: 'Suspicious Activity Reported',
      location: 'Cross Cut Road, Gandhipuram',
      type: 'incidents',
      target: 'case_w1042',
    },
    {
      id: 'sos1024',
      title: 'SOS-1024',
      tag: 'Critical',
      tagType: 'critical',
      icon: '✻',
      iconBg: '#B6171E',
      iconColor: '#FFFFFF',
      subtitle: 'Medical Emergency',
      location: 'DB Road, RS Puram',
      type: 'incidents',
      target: 'sos_details',
    },
    {
      id: 'officer_kumar',
      title: 'Inspector Kumar',
      tag: 'On Duty',
      tagType: 'duty',
      icon: '🛡️',
      iconBg: '#E0E7FF',
      iconColor: '#000B58',
      subtitle: 'ID: TN-POL-4829',
      location: 'Patrol Zone 3, Peelamedu',
      type: 'officers',
      target: 'unit_details',
    },
    {
      id: 'pu12',
      title: 'PU-12',
      tag: 'Unit',
      tagType: 'gray',
      icon: '🚗',
      iconBg: '#E8ECF2',
      iconColor: '#000B58',
      subtitle: 'Highway Patrol',
      location: 'Avinashi Road',
      type: 'units',
      target: 'unit_details',
    },
  ];

  const filteredItems = recentItems.filter((item) => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('live_map'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>LIVE CASE ANALYSIS</Text>

        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input Card */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.searchBackBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('live_map'))}
        >
          <Text style={styles.searchBackArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.searchMagnifier}>🔍</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search incident, SOS, officer, unit or location"
          placeholderTextColor="#767683"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={false}
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearInputBtn}>
            <Text style={styles.clearInputIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        {[
          { key: 'all', label: 'All Results' },
          { key: 'incidents', label: 'Incidents' },
          { key: 'officers', label: 'Officers' },
          { key: 'units', label: 'Units' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabPill, activeTab === tab.key && styles.tabPillActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabPillText,
                activeTab === tab.key && styles.tabPillTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeader}>Recent Searches</Text>

        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => onNavigate && onNavigate(item.target)}
            activeOpacity={0.75}
          >
            <View style={[styles.itemIconCircle, { backgroundColor: item.iconBg }]}>
              <Text style={[styles.itemIconText, { color: item.iconColor }]}>
                {item.icon}
              </Text>
            </View>

            <View style={styles.itemInfo}>
              <View style={styles.itemTopRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.tagType === 'critical' && (
                  <View style={styles.criticalBadge}>
                    <Text style={styles.criticalBadgeText}>Critical</Text>
                  </View>
                )}
                {item.tagType === 'duty' && (
                  <View style={styles.dutyBadge}>
                    <View style={styles.greenDutyDot} />
                    <Text style={styles.dutyBadgeText}>On Duty</Text>
                  </View>
                )}
                {item.tagType === 'gray' && (
                  <View style={styles.grayBadge}>
                    <Text style={styles.grayBadgeText}>{item.tag}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>

              <View style={styles.itemLocationRow}>
                <Text style={styles.locationPin}>📍</Text>
                <Text style={styles.itemLocationText}>{item.location}</Text>
              </View>
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
  bellBtn: {
    padding: 6,
  },
  bellIcon: {
    fontSize: 18,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 48,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchBackBtn: {
    paddingRight: 6,
  },
  searchBackArrow: {
    fontSize: 18,
    color: '#191C1D',
    fontWeight: '700',
  },
  searchMagnifier: {
    fontSize: 15,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#191C1D',
    fontWeight: '500',
  },
  clearInputBtn: {
    padding: 6,
  },
  clearInputIcon: {
    fontSize: 14,
    color: '#767683',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  tabPill: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  tabPillActive: {
    backgroundColor: '#000B58',
    borderColor: '#000B58',
  },
  tabPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#454652',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  itemIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemIconText: {
    fontSize: 18,
    fontWeight: '900',
  },
  itemInfo: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#191C1D',
  },
  criticalBadge: {
    backgroundColor: '#B6171E',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  criticalBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  dutyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  greenDutyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E7D32',
    marginRight: 4,
  },
  dutyBadgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '700',
  },
  grayBadge: {
    backgroundColor: '#E8ECF2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  grayBadgeText: {
    color: '#454652',
    fontSize: 10,
    fontWeight: '700',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '500',
    marginBottom: 4,
  },
  itemLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    fontSize: 11,
    marginRight: 4,
  },
  itemLocationText: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
});
