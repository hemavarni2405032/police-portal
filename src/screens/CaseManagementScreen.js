import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACK_ICON = require('../../assets/details/icon_back.png');
const BELL_ICON = require('../../assets/dashboard/icon_bell_white.png');
const USER_ICON = require('../../assets/details/icon_user.png');

export default function CaseManagementScreen({ onNavigate, onBack }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'New', 'Assigned', 'Pending', 'Resolved'];

  const caseItems = [
    {
      id: 'CMP-2045',
      time: '10:30 AM',
      title: 'Vehicle Theft',
      location: 'Peelamedu',
      priority: 'HIGH',
      status: 'ASSIGNED',
      officer: 'Officer Kumar',
    },
    {
      id: 'CMP-2046',
      time: 'Yesterday',
      title: 'Public Disturbance',
      location: 'RS Puram',
      priority: 'MEDIUM',
      status: 'PENDING',
      officer: 'Unassigned',
    },
    {
      id: 'CMP-2047',
      time: 'Oct 12',
      title: 'Cyber Fraud Report',
      location: 'Online / Station',
      priority: 'LOW',
      status: 'RESOLVED',
      officer: 'Inspector Raj',
    },
  ];

  const filteredCases = caseItems.filter((c) => {
    if (activeFilter !== 'All' && c.status.toLowerCase() !== activeFilter.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
        <Text style={styles.headerTitle}>CASE MANAGEMENT</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Image source={BELL_ICON} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cases..."
            placeholderTextColor="#767683"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((f) => {
              const isSelected = activeFilter === f;
              return (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterPill, isSelected && styles.filterPillActive]}
                  onPress={() => setActiveFilter(f)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Cases List */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listInner}
          showsVerticalScrollIndicator={false}
        >
          {filteredCases.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.caseCard}
              onPress={() => onNavigate && onNavigate('case_details', { caseId: item.id })}
              activeOpacity={0.8}
            >
              <View style={styles.cardTop}>
                <Text style={styles.caseId}>{item.id}</Text>
                <Text style={styles.caseTime}>{item.time}</Text>
              </View>

              <Text style={styles.caseTitle}>{item.title}</Text>
              <Text style={styles.caseLocation}>📍 {item.location}</Text>

              <View style={styles.badgesRow}>
                <View
                  style={[
                    styles.tagBadge,
                    item.priority === 'HIGH' && styles.tagHigh,
                    item.priority === 'MEDIUM' && styles.tagMedium,
                    item.priority === 'LOW' && styles.tagLow,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      item.priority === 'HIGH' && styles.tagHighText,
                      item.priority === 'MEDIUM' && styles.tagMediumText,
                      item.priority === 'LOW' && styles.tagLowText,
                    ]}
                  >
                    {item.priority}
                  </Text>
                </View>

                <View
                  style={[
                    styles.tagBadge,
                    item.status === 'ASSIGNED' && styles.tagAssigned,
                    item.status === 'PENDING' && styles.tagPending,
                    item.status === 'RESOLVED' && styles.tagResolved,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      item.status === 'ASSIGNED' && styles.tagAssignedText,
                      item.status === 'PENDING' && styles.tagPendingText,
                      item.status === 'RESOLVED' && styles.tagResolvedText,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardBottomRow}>
                <View style={styles.officerRow}>
                  <Image source={USER_ICON} style={styles.userIcon} resizeMode="contain" />
                  <Text style={styles.officerText}>{item.officer}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => onNavigate && onNavigate('case_details', { caseId: item.id })}
                >
                  <Text style={styles.viewActionText}>[VIEW] →</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#FBF8FF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1C20',
  },
  filterTabsRow: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#000666',
    borderColor: '#000666',
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#454652',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listScroll: {
    flex: 1,
  },
  listInner: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  caseId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  caseTime: {
    fontSize: 12,
    color: '#767683',
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C20',
    marginBottom: 4,
  },
  caseLocation: {
    fontSize: 13,
    color: '#5A5D6B',
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tagHigh: {
    backgroundColor: '#FEE2E2',
  },
  tagHighText: {
    color: '#B51A1B',
  },
  tagMedium: {
    backgroundColor: '#E0E7FF',
  },
  tagMediumText: {
    color: '#3730A3',
  },
  tagLow: {
    backgroundColor: '#F3F4F6',
  },
  tagLowText: {
    color: '#4B5563',
  },
  tagAssigned: {
    backgroundColor: '#FEF3C7',
  },
  tagAssignedText: {
    color: '#B45309',
  },
  tagPending: {
    backgroundColor: '#E0E4FE',
  },
  tagPendingText: {
    color: '#000666',
  },
  tagResolved: {
    backgroundColor: '#D1FAE5',
  },
  tagResolvedText: {
    color: '#047857',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginBottom: 10,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  officerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 12,
    height: 14,
    marginRight: 6,
    tintColor: '#767683',
  },
  officerText: {
    fontSize: 12.5,
    color: '#5A5D6B',
  },
  viewActionText: {
    color: '#000666',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
