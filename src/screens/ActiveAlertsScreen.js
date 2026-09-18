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

export default function ActiveAlertsScreen({ onNavigate, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPill, setSelectedPill] = useState('ALL');

  const alerts = [
    {
      id: 'SOS-1024',
      type: 'Personal Safety',
      priority: 'CRITICAL',
      status: 'ACTIVE',
      location: 'Gandhipuram',
      time: '10:42 AM',
      officer: 'Inspector Kumar',
      unit: 'PU-12',
      actionType: 'officer',
      colorBar: '#B6171E',
    },
    {
      id: 'SOS-1025',
      type: 'Medical Emergency',
      priority: 'CRITICAL',
      status: 'ACTIVE',
      location: 'Peelamedu',
      time: '10:31 AM',
      actionType: 'dispatch_required',
      colorBar: '#B6171E',
    },
    {
      id: 'SOS-1026',
      type: "Women's Safety",
      priority: 'HIGH',
      status: 'ACTIVE',
      location: 'RS Puram',
      time: '10:18 AM',
      unit: 'PU-04',
      unitStatus: 'En Route',
      actionType: 'unit_status',
      colorBar: '#D97706',
    },
  ];

  const filteredAlerts = alerts.filter((item) => {
    if (selectedPill !== 'ALL' && item.priority !== selectedPill) return false;
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
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
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('sos_center'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>ACTIVE ALERTS</Text>

        <TouchableOpacity style={styles.filterMenuBtn} activeOpacity={0.7}>
          <Text style={styles.filterMenuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input Box */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search SOS ID, location or emergency type"
          placeholderTextColor="#767683"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Pills */}
      <View style={styles.pillsRow}>
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((pill) => (
          <TouchableOpacity
            key={pill}
            style={[
              styles.pillBtn,
              selectedPill === pill && styles.pillBtnActive,
              pill === 'CRITICAL' && selectedPill !== 'CRITICAL' && styles.pillBtnCriticalOutline,
            ]}
            onPress={() => setSelectedPill(pill)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pillBtnText,
                selectedPill === pill && styles.pillBtnTextActive,
                pill === 'CRITICAL' && selectedPill !== 'CRITICAL' && styles.pillBtnTextCritical,
              ]}
            >
              {pill}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {filteredAlerts.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <View style={[styles.accentBar, { backgroundColor: item.colorBar }]} />
            <View style={styles.cardInner}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardId}>{item.id}</Text>
                <View style={styles.cardBadges}>
                  <View
                    style={[
                      styles.priorityBadge,
                      item.priority === 'CRITICAL' && styles.criticalBadge,
                      item.priority === 'HIGH' && styles.highBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityBadgeText,
                        item.priority === 'CRITICAL' && styles.criticalBadgeText,
                        item.priority === 'HIGH' && styles.highBadgeText,
                      ]}
                    >
                      {item.priority}
                    </Text>
                  </View>
                  <View style={styles.activeTag}>
                    <Text style={styles.activeTagText}>{item.status}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.emergencyType}>{item.type}</Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>📍</Text>
                  <Text style={styles.metaText}>{item.location}</Text>
                </View>

                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>⏱️</Text>
                  <Text style={styles.metaText}>{item.time}</Text>
                </View>
              </View>

              <View style={styles.dividerLine} />

              {/* Action Bottom Section */}
              {item.actionType === 'officer' && (
                <TouchableOpacity
                  style={styles.officerActionRow}
                  onPress={() => onNavigate && onNavigate('sos_details')}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={styles.actionSub}>Officer Assigned</Text>
                    <Text style={styles.officerNameBold}>{item.officer}</Text>
                  </View>
                  <View style={styles.chevronCircleNavy}>
                    <Text style={styles.chevronText}>›</Text>
                  </View>
                </TouchableOpacity>
              )}

              {item.actionType === 'dispatch_required' && (
                <View style={styles.dispatchActionRow}>
                  <View>
                    <Text style={styles.actionWarningText}>⚠️ Action Required</Text>
                    <Text style={styles.awaitingText}>Awaiting Dispatch</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.dispatchBtn}
                    onPress={() => onNavigate && onNavigate('dispatch')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.dispatchBtnText}>DISPATCH</Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.actionType === 'unit_status' && (
                <TouchableOpacity
                  style={styles.unitActionRow}
                  onPress={() => onNavigate && onNavigate('unit_details')}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={styles.actionSub}>Unit: {item.unit}</Text>
                    <Text style={styles.officerNameBold}>Status: {item.unitStatus}</Text>
                  </View>
                  <View style={styles.chevronCircleGray}>
                    <Text style={styles.chevronTextGray}>›</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
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
  filterMenuBtn: {
    padding: 6,
  },
  filterMenuIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#191C1D',
  },
  clearIcon: {
    fontSize: 14,
    color: '#767683',
    padding: 4,
  },
  pillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pillBtn: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  pillBtnActive: {
    backgroundColor: '#000B58',
    borderColor: '#000B58',
  },
  pillBtnCriticalOutline: {
    borderColor: '#B6171E',
  },
  pillBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#454652',
  },
  pillBtnTextActive: {
    color: '#FFFFFF',
  },
  pillBtnTextCritical: {
    color: '#B6171E',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 14,
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
  cardInner: {
    paddingLeft: 18,
    paddingRight: 14,
    paddingVertical: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#767683',
  },
  cardBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  criticalBadge: {
    backgroundColor: '#FFEBEE',
  },
  highBadge: {
    backgroundColor: '#FEF3C7',
  },
  priorityBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  criticalBadgeText: {
    color: '#B6171E',
  },
  highBadgeText: {
    color: '#B45309',
  },
  activeTag: {
    backgroundColor: '#E8ECF2',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeTagText: {
    color: '#454652',
    fontSize: 9.5,
    fontWeight: '700',
  },
  emergencyType: {
    fontSize: 16,
    fontWeight: '800',
    color: '#191C1D',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#454652',
    fontWeight: '600',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#F3F4F9',
    marginBottom: 10,
  },
  officerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionSub: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  officerNameBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#191C1D',
    marginTop: 1,
  },
  chevronCircleNavy: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  dispatchActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionWarningText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B6171E',
  },
  awaitingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#191C1D',
    marginTop: 1,
  },
  dispatchBtn: {
    backgroundColor: '#000B58',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  dispatchBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  unitActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chevronCircleGray: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8ECF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronTextGray: {
    color: '#454652',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
});
