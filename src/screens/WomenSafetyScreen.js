import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import Header from '../components/Header';
import { WOMEN_SAFETY_METRICS } from '../data/mockData';

export default function WomenSafetyScreen({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    { key: 'women', label: 'Women Safety', icon: '👩', count: '14' },
    { key: 'child', label: 'Child Safety', icon: '👶', count: '8' },
    { key: 'harassment', label: 'Harassment', icon: '🛑', count: '10' },
    { key: 'abuse', label: 'Abuse', icon: '✋', count: '5' },
  ];

  return (
    <View style={styles.container}>
      <Header title="WOMEN & CHILD SAFETY" subtitle="Special Protection & Rapid Response Division" />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner (Matching Women safety.png Screen 1) */}
        <View style={styles.heroBanner}>
          <Text style={styles.bannerBadge}>SPECIAL UNIT</Text>
          <Text style={styles.bannerTitle}>Women & Child Protection Unit</Text>
          <Text style={styles.bannerSub}>Coimbatore City Police Special Operations</Text>
        </View>

        {/* Status Overview Grid (Matching Women safety.png Screen 1 & 2) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CURRENT STATUS OVERVIEW</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, SHADOWS.small]}>
            <Text style={styles.statVal}>{WOMEN_SAFETY_METRICS.totalCases}</Text>
            <Text style={styles.statLbl}>TOTAL CASES</Text>
          </View>

          <View style={[styles.statCard, SHADOWS.small]}>
            <Text style={[styles.statVal, { color: COLORS.critical }]}>{WOMEN_SAFETY_METRICS.criticalCases}</Text>
            <Text style={styles.statLbl}>CRITICAL</Text>
          </View>

          <View style={[styles.statCard, SHADOWS.small]}>
            <Text style={[styles.statVal, { color: COLORS.accent }]}>{WOMEN_SAFETY_METRICS.activeCases}</Text>
            <Text style={styles.statLbl}>ACTIVE</Text>
          </View>

          <View style={[styles.statCard, SHADOWS.small]}>
            <Text style={[styles.statVal, { color: COLORS.success }]}>{WOMEN_SAFETY_METRICS.resolvedCases}</Text>
            <Text style={styles.statLbl}>RESOLVED</Text>
          </View>
        </View>

        {/* Case Categories Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CASE CATEGORIES</Text>
        </View>

        <View style={styles.catGrid}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[styles.catCard, SHADOWS.small, activeCategory === c.key && styles.catCardActive]}
              onPress={() => setActiveCategory(c.key)}
            >
              <Text style={styles.catIcon}>{c.icon}</Text>
              <Text style={styles.catTitle}>{c.label}</Text>
              <Text style={styles.catCount}>{c.count} Active</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority Alerts List (Matching Women safety.png Screen 2 & 3) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PRIORITY ALERTS & REPORTS</Text>
        </View>

        {/* Alert 1 */}
        <View style={[styles.complaintCard, SHADOWS.small]}>
          <View style={styles.complaintTop}>
            <View style={styles.criticalPill}>
              <Text style={styles.criticalPillText}>CRITICAL  •  Case #CR-2023-142</Text>
            </View>
            <Text style={styles.timeAgo}>10m ago</Text>
          </View>

          <Text style={styles.complaintTitle}>Women Safety Report</Text>
          <Text style={styles.complaintLoc}>📍 Gandhipuram Crosscut Road</Text>
          <Text style={styles.victimName}>Victim: Lakshmi K.</Text>

          <View style={styles.complaintActionRow}>
            <TouchableOpacity style={styles.dispatchPatrolBtn} onPress={() => onNavigate('dispatch')}>
              <Text style={styles.dispatchPatrolText}>🚨 DISPATCH PATROL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewBtn} onPress={() => onNavigate('ai_analysis')}>
              <Text style={styles.reviewBtnText}>👁️ REVIEW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Alert 2 */}
        <View style={[styles.complaintCard, SHADOWS.small]}>
          <View style={styles.complaintTop}>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>ACTIVE  •  Case #WS-2023-089</Text>
            </View>
            <Text style={styles.timeAgo}>2h ago</Text>
          </View>

          <Text style={styles.complaintTitle}>Harassment Complaint</Text>
          <Text style={styles.complaintLoc}>📍 T. Nagar Bus Terminus</Text>

          <TouchableOpacity style={styles.reviewFullBtn} onPress={() => onNavigate('cases')}>
            <Text style={styles.reviewFullBtnText}>Review Details</Text>
          </TouchableOpacity>
        </View>

        {/* Response Timeline Tracker (Matching Women safety.png Screen 7) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RESPONSE TIMELINE & STATUS</Text>
        </View>

        <View style={[styles.timelineCard, SHADOWS.small]}>
          {[
            { title: 'SOS Received', time: '14:02 PM', done: true },
            { title: 'Control Room Notified', time: '14:03 PM', done: true },
            { title: 'Officer Assigned (Insp. Kumar)', time: '14:05 PM', done: true },
            { title: 'Unit Dispatched (PU-12)', time: 'Pending', done: false },
          ].map((item, idx) => (
            <View key={idx} style={styles.timelineRow}>
              <View style={[styles.timelineNode, item.done && styles.timelineNodeDone]}>
                <Text style={styles.nodeCheck}>{item.done ? '✓' : '•'}</Text>
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, item.done && styles.timelineTitleDone]}>{item.title}</Text>
                <Text style={styles.timelineTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 14,
  },
  heroBanner: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  bannerBadge: {
    color: COLORS.warning,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  bannerSub: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 10,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statVal: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  statLbl: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  catCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  catCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#F8FAFC',
  },
  catIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  catTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  catCount: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  complaintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  complaintTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  criticalPill: {
    backgroundColor: COLORS.criticalBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  criticalPillText: {
    color: COLORS.critical,
    fontSize: 9,
    fontWeight: '800',
  },
  activePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activePillText: {
    color: COLORS.accent,
    fontSize: 9,
    fontWeight: '800',
  },
  timeAgo: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  complaintTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  complaintLoc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  victimName: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 2,
    marginBottom: 10,
  },
  complaintActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dispatchPatrolBtn: {
    backgroundColor: COLORS.critical,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 6,
    alignItems: 'center',
  },
  dispatchPatrolText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  reviewBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  reviewBtnText: {
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
  reviewFullBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  reviewFullBtnText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  timelineNode: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  timelineNodeDone: {
    backgroundColor: COLORS.primary,
  },
  nodeCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  timelineTitleDone: {
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  timelineTime: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 1,
  },
});
