// src/screens/AdminPortalScreen.js
// Admin Command & Control Portal (#000666 theme)

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import SharedHeader from '../components/SharedHeader';
import { OFFICERS, CASES, STATION_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

export default function AdminPortalScreen({ onNavigate, onBack, canGoBack, onSwitchPortal }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview' | 'roster' | 'logs'

  const auditLogs = [
    { id: 'log-1', time: '10:14 AM', action: 'PU-12 Patrol Dispatched', user: 'Inspector Kumar (SHO)', status: 'Success' },
    { id: 'log-2', time: '09:50 AM', action: 'Case #W-1042 Updated', user: 'SI Arun Sharma', status: 'Modified' },
    { id: 'log-3', time: '09:12 AM', action: 'Citizen SOS #1024 Logged', user: 'Control Room System', status: 'Critical' },
    { id: 'log-4', time: '08:30 AM', action: 'Traffic Diversion Notice Posted', user: 'Admin Station Officer', status: 'Published' },
  ];

  return (
    <View style={styles.container}>
      <SharedHeader
        portalRole="admin"
        title="COMMAND & CONTROL ADMINISTRATION"
        subtitle="Coimbatore City Police Master Dashboard"
        showBack={canGoBack}
        onBack={onBack}
        onSwitchPortal={onSwitchPortal}
      />

      {/* Admin Tab Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeAdminTab === 'overview' && styles.tabItemActive]}
          onPress={() => setActiveAdminTab('overview')}
        >
          <Text style={[styles.tabText, activeAdminTab === 'overview' && styles.tabTextActive]}>
            {tr('nav_overview')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeAdminTab === 'roster' && styles.tabItemActive]}
          onPress={() => setActiveAdminTab('roster')}
        >
          <Text style={[styles.tabText, activeAdminTab === 'roster' && styles.tabTextActive]}>
            {tr('nav_roster')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeAdminTab === 'logs' && styles.tabItemActive]}
          onPress={() => setActiveAdminTab('logs')}
        >
          <Text style={[styles.tabText, activeAdminTab === 'logs' && styles.tabTextActive]}>
            Audit Logs
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeAdminTab === 'overview' && (
          <View>
            {/* Master Metrics Grid */}
            <View style={styles.metricsGrid}>
              <View style={[styles.metricCard, SHADOWS.small]}>
                <Text style={[styles.metricValue, { color: '#000666' }]}>24</Text>
                <Text style={styles.metricLabel}>{tr('on_duty')}</Text>
              </View>
              <View style={[styles.metricCard, SHADOWS.small]}>
                <Text style={[styles.metricValue, { color: COLORS.critical }]}>06</Text>
                <Text style={styles.metricLabel}>{tr('sos_alerts')}</Text>
              </View>
              <View style={[styles.metricCard, SHADOWS.small]}>
                <Text style={[styles.metricValue, { color: COLORS.info }]}>18</Text>
                <Text style={styles.metricLabel}>{tr('active_cases')}</Text>
              </View>
              <View style={[styles.metricCard, SHADOWS.small]}>
                <Text style={[styles.metricValue, { color: COLORS.success }]}>98%</Text>
                <Text style={styles.metricLabel}>System Health</Text>
              </View>
            </View>

            {/* Station Status Control */}
            <View style={[styles.sectionCard, SHADOWS.small]}>
              <Text style={styles.cardHeaderTitle}>STATION HOUSE STATUS</Text>
              <Text style={styles.stationNameText}>{STATION_INFO.name}</Text>
              <Text style={styles.stationSubText}>STN CODE: {STATION_INFO.code} • Jurisdiction: {STATION_INFO.jurisdiction}</Text>

              <View style={styles.controlRow}>
                <TouchableOpacity
                  style={styles.adminActionBtn}
                  onPress={() => Alert.alert('Roster Action', 'Roster broadcast sent to all active units.')}
                >
                  <Text style={styles.adminActionBtnText}>📢 Broadcast Roster</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.adminActionBtn, { backgroundColor: '#DC2626' }]}
                  onPress={() => Alert.alert('High Alert Mode', 'High alert mode activated for Coimbatore zone.')}
                >
                  <Text style={styles.adminActionBtnText}>⚠️ High Alert Mode</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Officer Summary */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitleText}>{tr('officer_management')}</Text>
              <TouchableOpacity onPress={() => setActiveAdminTab('roster')}>
                <Text style={styles.viewAllText}>{tr('view_all')}</Text>
              </TouchableOpacity>
            </View>

            {OFFICERS.slice(0, 3).map((off) => (
              <View key={off.id} style={[styles.officerListItem, SHADOWS.small]}>
                <View style={styles.officerBadgeBox}>
                  <Text style={{ fontSize: 18 }}>👮</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.officerName}>{off.name}</Text>
                  <Text style={styles.officerSub}>{off.rank} • {off.station}</Text>
                </View>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>{off.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeAdminTab === 'roster' && (
          <View>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitleText}>ALL STATION OFFICERS ({OFFICERS.length})</Text>
            </View>
            {OFFICERS.map((off) => (
              <View key={off.id} style={[styles.officerListItem, SHADOWS.small]}>
                <View style={styles.officerBadgeBox}>
                  <Text style={{ fontSize: 20 }}>👮</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.officerName}>{off.name}</Text>
                  <Text style={styles.officerSub}>{off.rank} • {off.badge}</Text>
                  <Text style={styles.officerPhone}>{off.phone}</Text>
                </View>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>{off.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeAdminTab === 'logs' && (
          <View>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitleText}>SYSTEM AUDIT LOGSTREAM</Text>
            </View>
            {auditLogs.map((log) => (
              <View key={log.id} style={[styles.logItemCard, SHADOWS.small]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.logActionText}>{log.action}</Text>
                  <Text style={styles.logUserText}>By {log.user} • {log.time}</Text>
                </View>
                <View style={styles.logStatusTag}>
                  <Text style={styles.logStatusTagText}>{log.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000666',
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#F59E0B',
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeaderTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 6,
  },
  stationNameText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000666',
  },
  stationSubText: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
    marginBottom: 14,
  },
  controlRow: {
    flexDirection: 'row',
    gap: 10,
  },
  adminActionBtn: {
    flex: 1,
    backgroundColor: '#000666',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  adminActionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 6,
  },
  sectionTitleText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000666',
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
  },
  officerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  officerBadgeBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  officerName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  officerSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  officerPhone: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusPillText: {
    color: '#059669',
    fontSize: 10,
    fontWeight: '800',
  },
  logItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logActionText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  logUserText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  logStatusTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  logStatusTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#475569',
  },
});
