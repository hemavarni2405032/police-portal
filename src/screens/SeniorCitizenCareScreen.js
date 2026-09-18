// src/screens/SeniorCitizenCareScreen.js
// Police-Side Dedicated Senior Citizen Care Screen
// Displays ONLY Senior Citizen Care cases filed by citizens from the Citizen App
// Reuses exact Police App UI design, headers, typography, status badges, and cards

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import seniorCitizenService, { parseSeniorCitizenData } from '../services/seniorCitizenService';
import { useLanguage } from '../context/LanguageContext';
import { t, translateStatus } from '../i18n/translations';

const BACK_ICON = require('../../assets/details/icon_back.png');

export default function SeniorCitizenCareScreen({ onNavigate, onBack }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const [rawCases, setRawCases] = useState([]);
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('ALL');

  useEffect(() => {
    const unsub = seniorCitizenService.subscribeToCases((cases) => {
      setRawCases(cases);
    });
    return () => unsub();
  }, []);

  const statusFilters = ['ALL', 'SUBMITTED', 'IN_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];

  // Parse all submitted senior cases with real user data
  const parsedCases = rawCases.map(parseSeniorCitizenData);

  const filteredCases = parsedCases.filter((item) => {
    if (!item) return false;
    if (activeStatus !== 'ALL' && item.status.toUpperCase() !== activeStatus) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.trackingToken?.toLowerCase().includes(q) ||
        item.seniorName?.toLowerCase().includes(q) ||
        item.address?.toLowerCase().includes(q) ||
        item.contactName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return { bg: '#EFF6FF', text: '#1D4ED8' };
      case 'IN_REVIEW':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'ASSIGNED':
        return { bg: '#EDE9FE', text: '#6D28D9' };
      case 'IN_PROGRESS':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'RESOLVED':
        return { bg: '#DCFCE7', text: '#15803D' };
      default:
        return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Police Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => onBack ? onBack() : onNavigate && onNavigate('dashboard')}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SENIOR CITIZEN CARE</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{rawCases.length} CASES</Text>
        </View>
      </View>

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Senior Name, Token, Address..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Status Filter Tabs */}
        <View style={styles.filterTabsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabsContent}>
            {statusFilters.map((tab) => {
              const isSelected = activeStatus === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.filterPill, isSelected && styles.filterPillActive]}
                  onPress={() => setActiveStatus(tab)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}>
                    {translateStatus(lang, tab)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Case List or Empty State */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listInner}
          showsVerticalScrollIndicator={false}
        >
          {filteredCases.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>👴</Text>
              <Text style={styles.emptyTitle}>No Senior Citizen Care cases filed yet.</Text>
              <Text style={styles.emptySub}>
                Applications submitted by citizens through the Kovai Kaval Citizen App will appear here in real-time.
              </Text>
            </View>
          ) : (
            filteredCases.map((item) => {
              const badge = getBadgeStyle(item.status);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.caseCard}
                  onPress={() =>
                    onNavigate &&
                    onNavigate('senior_citizen_details', { caseId: item.id })
                  }
                  activeOpacity={0.8}
                >
                  {/* Card Header: Token & Status */}
                  <View style={styles.cardTopRow}>
                    <View style={styles.tokenBadge}>
                      <Text style={styles.tokenText}>{item.trackingToken}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                        {translateStatus(lang, item.status)}
                      </Text>
                    </View>
                  </View>

                  {/* Senior Citizen Details Section */}
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeading}>SENIOR CITIZEN</Text>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Name:</Text>
                    <Text style={styles.fieldValueBold}>{item.seniorName}</Text>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Age:</Text>
                    <Text style={styles.fieldValue}>{item.age} years</Text>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Address:</Text>
                    <Text style={styles.fieldValue} numberOfLines={2}>{item.address}</Text>
                  </View>

                  {/* Living / Relationship Details Section (if provided) */}
                  {item.hasLivingWithContact ? (
                    <View style={styles.livesWithBox}>
                      <Text style={styles.livesWithHeading}>LIVES WITH</Text>
                      <View style={styles.fieldRowCompact}>
                        <Text style={styles.fieldLabel}>Contact Name:</Text>
                        <Text style={styles.fieldValueBold}>{item.contactName}</Text>
                      </View>
                      <View style={styles.fieldRowCompact}>
                        <Text style={styles.fieldLabel}>Relation:</Text>
                        <Text style={styles.fieldValue}>{item.relation}</Text>
                      </View>
                      {item.contactNumber && (
                        <View style={styles.fieldRowCompact}>
                          <Text style={styles.fieldLabel}>Contact Number:</Text>
                          <Text style={styles.fieldValuePhone}>{item.contactNumber}</Text>
                        </View>
                      )}
                    </View>
                  ) : null}

                  <View style={styles.cardDivider} />

                  {/* Bottom Action Footer */}
                  <View style={styles.cardBottomRow}>
                    <Text style={styles.stationText} numberOfLines={1}>
                      🏢 {item.jurisdictionStation || 'City Police Control'}
                    </Text>
                    <Text style={styles.actionLinkText}>VIEW CASE DETAILS →</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
          <View style={{ height: 40 }} />
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
    height: 52,
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
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  filterTabsRow: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 8,
  },
  filterTabsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#000666',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listScroll: {
    flex: 1,
  },
  listInner: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tokenBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tokenText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000666',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  sectionHeader: {
    marginBottom: 6,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.8,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  fieldRowCompact: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  fieldLabel: {
    width: 105,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  fieldValue: {
    flex: 1,
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '500',
  },
  fieldValueBold: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
  },
  fieldValuePhone: {
    flex: 1,
    fontSize: 13,
    color: '#0284C7',
    fontWeight: '700',
  },
  livesWithBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  livesWithHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  actionLinkText: {
    fontSize: 11,
    color: '#000666',
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
