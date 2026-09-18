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
const CHEVRON_ICON = require('../../assets/details/icon_chevron.png');

export default function CaseReportScreen({ onNavigate, onBack }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  const filterTabs = ['ALL', 'ACTIVE', 'CRITICAL', 'HIGH', 'MEDIUM'];

  const cases = [
    {
      id: 'W-1042',
      title: 'Domestic Violence',
      location: 'Gandhipuram',
      time: '10 min ago',
      priority: 'CRITICAL',
      status: 'ACTIVE',
      accentColor: '#B51A1B',
      target: 'case_w1042',
    },
    {
      id: 'W-1039',
      title: 'Domestic Violence',
      location: 'RS Puram',
      time: '2 hrs ago',
      priority: 'HIGH',
      status: 'ACTIVE',
      accentColor: '#B51A1B',
      target: 'case_details',
    },
    {
      id: 'CCP-1042',
      title: 'Vehicle Theft',
      location: 'Gandhipuram',
      time: 'Yesterday',
      priority: 'HIGH',
      status: 'ACTIVE',
      accentColor: '#1A237E',
      target: 'case_details',
    },
    {
      id: 'CCP-1039',
      title: 'Cyber Fraud',
      location: 'Saibaba Colony',
      time: 'Oct 12',
      priority: 'MEDIUM',
      status: 'RESOLVED',
      accentColor: '#2563EB',
      target: 'case_details',
    },
  ];

  const filtered = cases.filter((c) => {
    if (activeTab === 'ACTIVE' && c.status !== 'ACTIVE') return false;
    if (activeTab === 'CRITICAL' && c.priority !== 'CRITICAL') return false;
    if (activeTab === 'HIGH' && c.priority !== 'HIGH') return false;
    if (activeTab === 'MEDIUM' && c.priority !== 'MEDIUM') return false;
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
        <Text style={styles.headerTitle}>CASE REPORT</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Image source={BELL_ICON} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Search */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search case ID, name or location"
            placeholderTextColor="#767683"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.pillsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterTabs.map((t) => {
              const isSelected = activeTab === t;
              return (
                <TouchableOpacity
                  key={t}
                  style={[styles.pill, isSelected && styles.pillActive]}
                  onPress={() => setActiveTab(t)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>{t}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 3 Metric Cards Row */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>1,248</Text>
            <Text style={styles.metricLabel}>TOTAL</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>142</Text>
            <Text style={styles.metricLabel}>ACTIVE</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardCritical]}>
            <Text style={[styles.metricNumber, { color: '#B51A1B' }]}>12</Text>
            <Text style={[styles.metricLabel, { color: '#B51A1B' }]}>CRITICAL</Text>
          </View>
        </View>

        {/* Case Cards List */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listInner}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.caseCard}
              onPress={() => onNavigate && onNavigate(item.target)}
              activeOpacity={0.75}
            >
              <View style={[styles.cardAccent, { backgroundColor: item.accentColor }]} />

              <View style={styles.cardContent}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.idPill}>
                    <Text style={styles.idPillText}>{item.id}</Text>
                  </View>

                  <View style={styles.tagsContainer}>
                    <View
                      style={[
                        styles.priorityPill,
                        item.priority === 'CRITICAL' && styles.prioCritical,
                        item.priority === 'HIGH' && styles.prioHigh,
                        item.priority === 'MEDIUM' && styles.prioMedium,
                      ]}
                    >
                      <Text
                        style={[
                          styles.prioText,
                          (item.priority === 'CRITICAL' || item.priority === 'HIGH') &&
                            styles.prioWhiteText,
                        ]}
                      >
                        {item.priority}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusPill,
                        item.status === 'ACTIVE' && styles.statusActive,
                        item.status === 'RESOLVED' && styles.statusResolved,
                      ]}
                    >
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.caseName}>{item.title}</Text>

                <View style={styles.cardBottomRow}>
                  <Text style={styles.metaInfo}>
                    📍 {item.location}   ⏱ {item.time}
                  </Text>
                  <Image source={CHEVRON_ICON} style={styles.chevron} resizeMode="contain" />
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Load More Button */}
          <TouchableOpacity style={styles.loadMoreBtn} activeOpacity={0.75}>
            <Text style={styles.loadMoreText}>Load More Cases</Text>
          </TouchableOpacity>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#1A1C20',
  },
  pillsRow: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#000666',
    borderColor: '#000666',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#454652',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  metricCardCritical: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  metricNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000666',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#767683',
    letterSpacing: 0.5,
    marginTop: 2,
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
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardContent: {
    paddingLeft: 16,
    paddingRight: 14,
    paddingVertical: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  idPill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  idPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1C20',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  priorityPill: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  prioCritical: {
    backgroundColor: '#B51A1B',
  },
  prioHigh: {
    backgroundColor: '#B51A1B',
  },
  prioMedium: {
    backgroundColor: '#E5E7EB',
  },
  prioText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#1A1C20',
  },
  prioWhiteText: {
    color: '#FFFFFF',
  },
  statusPill: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusActive: {
    backgroundColor: '#000666',
  },
  statusResolved: {
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  caseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C20',
    marginBottom: 6,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    fontSize: 12,
    color: '#767683',
  },
  chevron: {
    width: 12,
    height: 12,
    tintColor: '#C6C5D4',
  },
  loadMoreBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  loadMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5A5D6B',
  },
});
