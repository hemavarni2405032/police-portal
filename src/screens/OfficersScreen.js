import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import Header from '../components/Header';
import { OFFICERS } from '../data/mockData';

export default function OfficersScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('roster'); // roster | leaderboard | performance
  const [filterDuty, setFilterDuty] = useState('ALL'); // ALL | ON DUTY | AVAILABLE | BUSY
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOfficers = OFFICERS.filter((officer) => {
    if (filterDuty !== 'ALL' && officer.status !== filterDuty) return false;
    if (searchQuery) {
      return (
        officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.station.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <Header title="OFFICER OPERATIONS" subtitle="Personnel & Deployment Management" />

      {/* Top Operations Metrics Bar (Matching Officer Profile.png Screen 1) */}
      <View style={styles.metricsSummaryBar}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>128</Text>
          <Text style={styles.summaryLabel}>Total Officers</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.success }]}>86</Text>
          <Text style={styles.summaryLabel}>On Duty</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.accent }]}>64</Text>
          <Text style={styles.summaryLabel}>Available</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: COLORS.warning }]}>22</Text>
          <Text style={styles.summaryLabel}>Busy</Text>
        </View>
      </View>

      {/* View Switcher Tabs */}
      <View style={styles.tabNavRow}>
        <TouchableOpacity
          style={[styles.navTab, activeTab === 'roster' && styles.navTabActive]}
          onPress={() => setActiveTab('roster')}
        >
          <Text style={[styles.navTabText, activeTab === 'roster' && styles.navTabTextActive]}>Roster</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navTab, activeTab === 'leaderboard' && styles.navTabActive]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={[styles.navTabText, activeTab === 'leaderboard' && styles.navTabTextActive]}>Leaderboard 🏆</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navTab, activeTab === 'performance' && styles.navTabActive]}
          onPress={() => setActiveTab('performance')}
        >
          <Text style={[styles.navTabText, activeTab === 'performance' && styles.navTabTextActive]}>Performance</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* VIEW 1: OFFICER ROSTER */}
        {activeTab === 'roster' && (
          <View>
            {/* Search & Duty Filter */}
            <View style={styles.searchBarBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search officer name, ID or station..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.dutyPillsRow}>
              {['ALL', 'ON DUTY', 'AVAILABLE', 'BUSY'].map((st) => (
                <TouchableOpacity
                  key={st}
                  style={[styles.dutyFilterPill, filterDuty === st && styles.dutyFilterPillActive]}
                  onPress={() => setFilterDuty(st)}
                >
                  <Text style={[styles.dutyFilterText, filterDuty === st && styles.dutyFilterTextActive]}>{st}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {filteredOfficers.map((officer) => (
              <TouchableOpacity
                key={officer.id}
                style={[styles.officerCard, SHADOWS.small]}
                onPress={() => onNavigate('officer_profile')}
              >
                <View style={styles.officerAvatarBox}>
                  <Text style={styles.avatarEmoji}>👮</Text>
                </View>
                <View style={styles.officerInfo}>
                  <Text style={styles.officerName}>{officer.name}</Text>
                  <Text style={styles.officerBadge}>ID: {officer.badge}  •  {officer.rank}</Text>
                  <Text style={styles.officerStation}>📍 Station: {officer.station}</Text>
                  <Text style={styles.officerAssignment}>Assignment: {officer.assignment}</Text>
                </View>
                <View style={styles.statusCol}>
                  <View style={[styles.statusBadge, { backgroundColor: officer.status === 'ON DUTY' ? COLORS.successBg : COLORS.accentLight }]}>
                    <Text style={[styles.statusBadgeText, { color: officer.status === 'ON DUTY' ? COLORS.success : COLORS.accent }]}>
                      {officer.status}
                    </Text>
                  </View>
                  <Text style={styles.ratingText}>⭐ {officer.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* VIEW 2: LEADERBOARD (Matching Officer Profile.png Screen 4) */}
        {activeTab === 'leaderboard' && (
          <View>
            <View style={styles.topStatsTwoCol}>
              <View style={[styles.topStatCard, SHADOWS.small]}>
                <Text style={styles.topStatVal}>128</Text>
                <Text style={styles.topStatLbl}>Total Officers</Text>
              </View>
              <View style={[styles.topStatCard, SHADOWS.small]}>
                <Text style={[styles.topStatVal, { color: COLORS.success }]}>1,246</Text>
                <Text style={styles.topStatLbl}>Cases Resolved</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>TOP PERFORMERS THIS MONTH</Text>
            </View>

            {[
              { rank: '#1', name: 'Inspector Kumar', cases: '42 Cases', sos: '18 SOS', time: '07m avg', medal: '🥇' },
              { rank: '#2', name: 'SI Meena S.', cases: '38 Cases', sos: '15 SOS', time: '09m avg', medal: '🥈' },
              { rank: '#3', name: 'SI Arun Sharma', cases: '35 Cases', sos: '12 SOS', time: '11m avg', medal: '🥉' },
            ].map((item) => (
              <View key={item.rank} style={[styles.leaderCard, SHADOWS.small]}>
                <Text style={styles.medalIcon}>{item.medal}</Text>
                <View style={styles.leaderInfo}>
                  <Text style={styles.leaderName}>{item.name}</Text>
                  <Text style={styles.leaderMeta}>{item.cases}  •  {item.sos}  •  {item.time}</Text>
                </View>
                <View style={styles.rankPill}>
                  <Text style={styles.rankPillText}>{item.rank}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* VIEW 3: PERFORMANCE METRICS (Matching Officer Profile.png Screen 7) */}
        {activeTab === 'performance' && (
          <View>
            <View style={[styles.perfOverviewCard, SHADOWS.small]}>
              <Text style={styles.perfTitle}>INSPECTOR KUMAR PERFORMANCE</Text>

              <View style={styles.resolutionRow}>
                <Text style={styles.resLabel}>Resolution Rate</Text>
                <Text style={styles.resVal}>75%</Text>
              </View>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: '75%' }]} />
              </View>

              <View style={styles.perfTwoGrid}>
                <View style={styles.perfMetricBox}>
                  <Text style={styles.perfMetricVal}>42</Text>
                  <Text style={styles.perfMetricLbl}>Cases Resolved</Text>
                </View>
                <View style={styles.perfMetricBox}>
                  <Text style={styles.perfMetricVal}>18</Text>
                  <Text style={styles.perfMetricLbl}>SOS Responses</Text>
                </View>
              </View>

              <View style={styles.avgTimeBox}>
                <Text style={styles.avgTimeLbl}>AVERAGE RESPONSE TIME</Text>
                <Text style={styles.avgTimeVal}>07 <Text style={styles.avgTimeUnit}>MIN</Text></Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  metricsSummaryBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  summaryLabel: {
    color: COLORS.textMuted,
    fontSize: 9,
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  tabNavRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  navTabActive: {
    backgroundColor: COLORS.primary,
  },
  navTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  navTabTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 14,
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 38,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  dutyPillsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dutyFilterPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginRight: 6,
  },
  dutyFilterPillActive: {
    backgroundColor: COLORS.accent,
  },
  dutyFilterText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  dutyFilterTextActive: {
    color: '#FFFFFF',
  },
  officerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  officerAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  officerInfo: {
    flex: 1,
  },
  officerName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  officerBadge: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  officerStation: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  officerAssignment: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  statusCol: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.warning,
  },
  topStatsTwoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  topStatCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topStatVal: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  topStatLbl: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.8,
  },
  leaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  medalIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  leaderMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  rankPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  rankPillText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#D97706',
  },
  perfOverviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  perfTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  resolutionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  resLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  resVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.success,
  },
  barBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  perfTwoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  perfMetricBox: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  perfMetricVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },
  perfMetricLbl: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  avgTimeBox: {
    backgroundColor: '#F0F9FF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  avgTimeLbl: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.primaryLight,
    letterSpacing: 1,
  },
  avgTimeVal: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primaryLight,
    marginTop: 2,
  },
  avgTimeUnit: {
    fontSize: 14,
    fontWeight: '700',
  },
});
