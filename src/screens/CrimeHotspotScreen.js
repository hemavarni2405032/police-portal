import React, { useState } from 'react';
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
const MAP_SNIPPET = require('../../assets/map/image0_147_2015.png');

export default function CrimeHotspotScreen({ onNavigate, onBack }) {
  const [timeRange, setTimeRange] = useState('today');

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

        <Text style={styles.headerTitle}>CRIME HOTSPOT ANALYSIS</Text>

        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Critical Alert Banner */}
      <View style={styles.alertBanner}>
        <Text style={styles.alertBannerText}>⚠️ CRIME ACTIVITY: HIGH</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Preview Snippet */}
        <View style={styles.mapSnippetBox}>
          <Image source={MAP_SNIPPET} style={styles.mapSnippetImg} resizeMode="cover" />
          <View style={styles.mapSnippetOverlay} />

          <View style={styles.zoneBadge}>
            <Text style={styles.zoneBadgeText}>Zone B3</Text>
          </View>
        </View>

        {/* Time Selector Pills */}
        <View style={styles.timePillsRow}>
          {[
            { key: 'today', label: 'Today' },
            { key: '7days', label: '7 Days' },
            { key: '30days', label: '30 Days' },
          ].map((pill) => (
            <TouchableOpacity
              key={pill.key}
              style={[
                styles.timePill,
                timeRange === pill.key && styles.timePillActive,
              ]}
              onPress={() => setTimeRange(pill.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.timePillText,
                  timeRange === pill.key && styles.timePillTextActive,
                ]}
              >
                {pill.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2-Column Stat Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>24</Text>
            <Text style={styles.statLbl}>Recent Incidents</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: '#B6171E' }]}>8</Text>
            <Text style={styles.statLbl}>Active Cases</Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <Text style={styles.sectionHeaderTitle}>Category Breakdown</Text>
        <View style={styles.breakdownCard}>
          {/* Row 1: Vehicle Theft */}
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.catIconCircle, { backgroundColor: '#FFEBEE' }]}>
                <Text style={styles.catIconText}>🚗</Text>
              </View>
              <Text style={styles.catName}>Vehicle Theft</Text>
            </View>
            <Text style={styles.catCount}>12</Text>
          </View>

          {/* Row 2: Women Safety */}
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.catIconCircle, { backgroundColor: '#E0E7FF' }]}>
                <Text style={styles.catIconText}>♀</Text>
              </View>
              <Text style={styles.catName}>Women Safety</Text>
            </View>
            <Text style={styles.catCount}>5</Text>
          </View>

          {/* Row 3: Public Disturbance */}
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.catIconCircle, { backgroundColor: '#E8ECF2' }]}>
                <Text style={styles.catIconText}>👥</Text>
              </View>
              <Text style={styles.catName}>Public Disturbance</Text>
            </View>
            <Text style={styles.catCount}>7</Text>
          </View>
        </View>

        {/* Recent Incidents */}
        <View style={styles.incidentsHeaderRow}>
          <Text style={styles.incidentsSectionTitle}>RECENT INCIDENTS</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Incident 1: W-1042 */}
        <TouchableOpacity
          style={styles.incidentCard}
          onPress={() => onNavigate && onNavigate('case_w1042')}
          activeOpacity={0.75}
        >
          <View style={styles.incidentCardTop}>
            <Text style={styles.incidentCardId}>W-1042</Text>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>ACTIVE</Text>
            </View>
          </View>

          <Text style={styles.incidentTimeLoc}>10 mins ago • Cross Cut Rd</Text>
          <Text style={styles.incidentDesc}>
            Reported two-wheeler theft near main signal. Suspect fled north.
          </Text>

          <View style={styles.incidentTagRow}>
            <Text style={styles.incidentTagIcon}>🚗</Text>
            <Text style={styles.incidentTagLabel}>Vehicle Theft</Text>
          </View>
        </TouchableOpacity>

        {/* Incident 2: W-1040 */}
        <TouchableOpacity
          style={styles.incidentCard}
          onPress={() => onNavigate && onNavigate('case_details')}
          activeOpacity={0.75}
        >
          <View style={styles.incidentCardTop}>
            <Text style={styles.incidentCardId}>W-1040</Text>
            <View style={styles.closedPill}>
              <Text style={styles.closedPillText}>CLOSED</Text>
            </View>
          </View>

          <Text style={styles.incidentTimeLoc}>45 mins ago • 100ft Road</Text>
          <Text style={styles.incidentDesc}>
            Harassment complaint near bus stand. Unit dispatched and situation resolved.
          </Text>

          <View style={styles.incidentTagRow}>
            <Text style={styles.incidentTagIcon}>♀</Text>
            <Text style={styles.incidentTagLabel}>Women Safety</Text>
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
  moreBtn: {
    padding: 6,
  },
  moreIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  alertBanner: {
    backgroundColor: '#B6171E',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBannerText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  mapSnippetBox: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E232A',
    marginBottom: 14,
  },
  mapSnippetImg: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  mapSnippetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 10, 25, 0.3)',
  },
  zoneBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  zoneBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#191C1D',
  },
  timePillsRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  timePill: {
    borderRadius: 20,
    backgroundColor: '#E8ECF2',
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginRight: 8,
  },
  timePillActive: {
    backgroundColor: '#000B58',
  },
  timePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#454652',
  },
  timePillTextActive: {
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  statVal: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000B58',
  },
  statLbl: {
    fontSize: 11,
    fontWeight: '600',
    color: '#767683',
    marginTop: 2,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#191C1D',
    marginBottom: 10,
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  catIconText: {
    fontSize: 16,
  },
  catName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#191C1D',
  },
  catCount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
  },
  incidentsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  incidentsSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.8,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000B58',
  },
  incidentCard: {
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
  incidentCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  incidentCardId: {
    fontSize: 15,
    fontWeight: '900',
    color: '#191C1D',
  },
  activePill: {
    backgroundColor: '#FFEBEE',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  activePillText: {
    color: '#D32F2F',
    fontSize: 10,
    fontWeight: '800',
  },
  closedPill: {
    backgroundColor: '#E8ECF2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  closedPillText: {
    color: '#454652',
    fontSize: 10,
    fontWeight: '700',
  },
  incidentTimeLoc: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
    marginBottom: 6,
  },
  incidentDesc: {
    fontSize: 13,
    color: '#191C1D',
    lineHeight: 18,
    marginBottom: 8,
  },
  incidentTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incidentTagIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  incidentTagLabel: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '600',
  },
});
