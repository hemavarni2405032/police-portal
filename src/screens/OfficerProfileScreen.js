// src/screens/OfficerProfileScreen.js
// PROFILE tab — authenticated officer profile with language support

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';
import { OFFICERS } from '../data/mockData';

const PROFILE_OFFICER = OFFICERS[0]; // Inspector Kumar — CCP-O-001

export default function OfficerProfileScreen({ onNavigate, onBack, canGoBack, onLogout }) {
  const { lang, setLang } = useLanguage();
  const tr = (key) => t(lang, key);

  const handleLogout = () => {
    Alert.alert(
      tr('logout'),
      lang === 'ta'
        ? 'நீங்கள் வெளியேற விரும்புகிறீர்களா?'
        : 'Are you sure you want to log out?',
      [
        { text: tr('cancel'), style: 'cancel' },
        {
          text: tr('logout'),
          style: 'destructive',
          onPress: () => onLogout && onLogout(),
        },
      ]
    );
  };

  const statCards = [
    { label: lang === 'ta' ? 'தீர்க்கப்பட்ட வழக்குகள்' : 'Cases Resolved', value: PROFILE_OFFICER.casesResolved, color: COLORS.success },
    { label: lang === 'ta' ? 'SOS பதில்கள்' : 'SOS Responses', value: PROFILE_OFFICER.sosResponses, color: COLORS.critical },
    { label: lang === 'ta' ? 'சராசரி நேரம்' : 'Avg Response', value: PROFILE_OFFICER.avgResponseTime, color: COLORS.warning },
    { label: lang === 'ta' ? 'தீர்வு விகிதம்' : 'Resolution Rate', value: PROFILE_OFFICER.resolutionRate, color: COLORS.primary },
  ];

  const actions = [
    { key: 'cases', label: tr('view_assigned_cases'), icon: '📋', screen: 'cases' },
    { key: 'sos', label: tr('view_assigned_sos'), icon: '🚨', screen: 'sos' },
    { key: 'performance', label: tr('view_performance'), icon: '📊', screen: 'officers' },
    { key: 'activity', label: tr('view_activity'), icon: '📈', screen: 'officers' },
  ];

  return (
    <View style={styles.container}>
      <Header title={tr('my_profile')} subtitle="Inspector Kumar • STN-GND" showBack={canGoBack} onBack={onBack} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Officer Card */}
        <View style={[styles.profileCard, SHADOWS.medium]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>👮</Text>
          </View>
          <Text style={styles.officerName}>{PROFILE_OFFICER.name}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{PROFILE_OFFICER.rank}</Text>
            </View>
            <View style={[styles.rankBadge, styles.statusBadge]}>
              <Text style={styles.statusText}>🟢 {PROFILE_OFFICER.status}</Text>
            </View>
          </View>
          <Text style={styles.stationText}>🏛️ {PROFILE_OFFICER.station} {lang === 'ta' ? 'காவல் நிலையம்' : 'Police Station'}</Text>
          <Text style={styles.idText}>{tr('officer_id')}: {PROFILE_OFFICER.id}</Text>
        </View>

        {/* Language Toggle */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{tr('language_select')}</Text>
          <View style={styles.langToggleRow}>
            <TouchableOpacity
              style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
              onPress={() => setLang('en')}
            >
              <Text style={[styles.langBtnText, lang === 'en' && styles.langBtnActiveText]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, lang === 'ta' && styles.langBtnActive]}
              onPress={() => setLang('ta')}
            >
              <Text style={[styles.langBtnText, lang === 'ta' && styles.langBtnActiveText]}>தமிழ்</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {statCards.map((s, i) => (
            <View key={i} style={[styles.statCard, SHADOWS.small]}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Info Rows */}
        <View style={styles.sectionCard}>
          <InfoRow icon="📞" label={tr('contact')} value={PROFILE_OFFICER.phone} />
          <InfoRow icon="✉️" label="Email" value={PROFILE_OFFICER.email} />
          <InfoRow icon="🏛️" label={tr('station')} value={PROFILE_OFFICER.station + ' Police Station'} />
          <InfoRow icon="👔" label={tr('rank')} value={PROFILE_OFFICER.rank} />
          <InfoRow icon="📌" label="Designation" value={PROFILE_OFFICER.designation} />
          <InfoRow icon="📅" label={lang === 'ta' ? 'சேர்ந்த தேதி' : 'Joined'} value={PROFILE_OFFICER.joinedDate} />
          <InfoRow icon="🏢" label={lang === 'ta' ? 'துறை' : 'Department'} value={PROFILE_OFFICER.department} />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          {actions.map((a) => (
            <TouchableOpacity
              key={a.key}
              style={[styles.actionBtn, SHADOWS.small]}
              onPress={() => onNavigate && onNavigate(a.screen)}
            >
              <Text style={styles.actionIcon}>{a.icon}</Text>
              <Text style={styles.actionLabel}>{a.label}</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>🔓 {tr('logout')}</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scroll: { flex: 1, padding: 16 },
  profileCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2, borderColor: COLORS.warning,
  },
  avatarText: { fontSize: 36 },
  officerName: {
    color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginBottom: 8,
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 8, flexWrap: 'wrap', justifyContent: 'center' },
  rankBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: { color: '#CBD5E1', fontSize: 11, fontWeight: '700' },
  statusBadge: { backgroundColor: 'rgba(16,185,129,0.25)' },
  statusText: { color: '#6EE7B7', fontSize: 11, fontWeight: '700' },
  stationText: { color: '#94A3B8', fontSize: 12, marginBottom: 4 },
  idText: { color: '#64748B', fontSize: 11 },

  sectionCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 12, fontWeight: '800', color: COLORS.textPrimary,
    letterSpacing: 0.5, marginBottom: 12, textTransform: 'uppercase',
  },
  langToggleRow: {
    flexDirection: 'row', gap: 10,
  },
  langBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 8,
    alignItems: 'center', borderWidth: 1.5,
    borderColor: COLORS.border, backgroundColor: '#F8FAFC',
  },
  langBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  langBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.textSecondary },
  langBtnActiveText: { color: '#FFFFFF' },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 14, width: '47%', alignItems: 'center',
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  statValue: { fontSize: 22, fontWeight: '900' },
  statLabel: { fontSize: 10, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },

  infoRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  infoIcon: { fontSize: 16, marginRight: 12, marginTop: 2 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600' },
  infoValue: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '600', marginTop: 2 },

  actionsSection: { marginBottom: 16 },
  actionBtn: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    padding: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  actionIcon: { fontSize: 20, marginRight: 12 },
  actionLabel: { flex: 1, fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  actionArrow: { fontSize: 20, color: COLORS.textMuted },

  logoutBtn: {
    backgroundColor: '#FEF2F2', borderRadius: 12,
    padding: 16, alignItems: 'center', marginBottom: 8,
    borderWidth: 1, borderColor: '#FECACA',
  },
  logoutText: { color: COLORS.critical, fontWeight: '800', fontSize: 14 },
});
