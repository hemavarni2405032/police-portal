// src/screens/LHMSDetailsScreen.js
// Police-Side Dedicated Locked House Monitoring System (LHMS) Case Details Screen
// Exactly reflects citizen-submitted LHMS data with real-time status & reach/return synchronization
// Replaces all emojis with clean, high-resolution UI vector/png icons

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import lhmsService, { parseLHMSData } from '../services/lhmsService';
import sharedBackendService from '../services/sharedBackendService';
import { useLanguage } from '../context/LanguageContext';
import { t, translateStatus } from '../i18n/translations';

// High-resolution UI icons (No emojis)
const BACK_ICON = require('../../assets/details/icon_back.png');
const USER_ICON = require('../../assets/details/icon_user.png');
const PIN_ICON = require('../../assets/details/icon_pin.png');
const CLOCK_ICON = require('../../assets/details/icon_clock.png');
const HOUSE_ICON = require('../../assets/icon_house.png');
const PHONE_ICON = require('../../assets/icon_phone.png');
const SHIELD_ICON = require('../../assets/icon_shield.png');

export default function LHMSDetailsScreen({ route, params, onNavigate, onBack }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const caseId = (params && params.caseId) || (route && route.params && route.params.caseId);

  const [caseData, setCaseData] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Subscribe to real-time service requests to stay 100% in sync with citizen submissions
  useEffect(() => {
    const fetchAndSet = () => {
      if (!caseId) return;
      const found = lhmsService.getCaseById(caseId);
      if (found) {
        setCaseData(found);
      }
    };

    fetchAndSet();

    const unsub = typeof sharedBackendService.subscribeToServiceRequests === 'function'
      ? sharedBackendService.subscribeToServiceRequests(() => {
          fetchAndSet();
        })
      : typeof sharedBackendService.subscribe === 'function'
      ? sharedBackendService.subscribe('requests', () => {
          fetchAndSet();
        })
      : null;

    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, [caseId]);

  if (!caseData) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor="#000666" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => (onBack ? onBack() : onNavigate && onNavigate('citizen_service_requests'))}
            activeOpacity={0.7}
          >
            <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>LOCKED HOUSE DETAILS</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading LHMS Case Details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return { bg: '#FEF3C7', text: '#B45309', label: 'SUBMITTED' };
      case 'IN_REVIEW':
        return { bg: '#EDE9FE', text: '#6D28D9', label: 'IN REVIEW' };
      case 'ASSIGNED':
        return { bg: '#E0F2FE', text: '#0369A1', label: 'ASSIGNED' };
      case 'IN_PROGRESS':
        return { bg: '#E0E7FF', text: '#00288E', label: 'IN PROGRESS' };
      case 'RESOLVED':
        return { bg: '#DCFCE7', text: '#00875A', label: 'RESOLVED' };
      default:
        return { bg: '#F1F5F9', text: '#475569', label: status || 'UNKNOWN' };
    }
  };

  const badge = getStatusBadge(caseData.status);

  // Status transitions
  const handleStatusChange = (newStatus) => {
    setUpdating(true);
    lhmsService.updateStatus(caseData.id, newStatus, caseData.assignedOfficer, `Case transitioned to ${newStatus}`);
    setUpdating(false);
    Alert.alert('Status Updated', `Case ${caseData.trackingToken} updated to ${newStatus}.`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Police Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('citizen_service_requests'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>LOCKED HOUSE DETAILS</Text>
          <Text style={styles.headerToken}>{caseData.trackingToken}</Text>
        </View>

        <View style={[styles.statusBadgeHeader, { backgroundColor: badge.bg }]}>
          <Text style={[styles.statusBadgeHeaderText, { color: badge.text }]}>
            {translateStatus(lang, caseData.status)}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Token Banner Card */}
        <View style={styles.tokenCard}>
          <View style={styles.tokenCardLeft}>
            <View style={styles.houseIconBadge}>
              <Image source={HOUSE_ICON} style={styles.houseIcon} resizeMode="contain" />
            </View>
            <View>
              <Text style={styles.tokenLabel}>TRACKING TOKEN</Text>
              <Text style={styles.tokenNumber}>{caseData.trackingToken}</Text>
            </View>
          </View>
          <View style={[styles.statusPill, { backgroundColor: badge.bg }]}>
            <Text style={[styles.statusPillText, { color: badge.text }]}>
              {translateStatus(lang, caseData.status)}
            </Text>
          </View>
        </View>

        {/* Section 1: APPLICANT DETAILS */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <Image source={USER_ICON} style={styles.sectionIcon} resizeMode="contain" />
              <Text style={styles.sectionTitle}>APPLICANT</Text>
            </View>
            <View style={styles.verifiedTag}>
              <Text style={styles.verifiedTagText}>✓ CITIZEN VERIFIED</Text>
            </View>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text style={styles.fieldValueBold}>{caseData.applicantName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <View style={styles.valueWithIcon}>
              <Image source={PHONE_ICON} style={styles.miniIcon} resizeMode="contain" />
              <Text style={styles.fieldValueBold}>{caseData.applicantPhone}</Text>
            </View>
          </View>
        </View>

        {/* Section 2: HOUSE ADDRESS */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <Image source={PIN_ICON} style={styles.sectionIcon} resizeMode="contain" />
              <Text style={styles.sectionTitle}>HOUSE ADDRESS</Text>
            </View>
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.addressText}>{caseData.address}</Text>
          </View>

          {caseData.formData?.cameraEquipped && (
            <View style={styles.extraTagRow}>
              <Text style={styles.extraTagLabel}>CCTV Surveillance:</Text>
              <Text style={styles.extraTagValue}>{caseData.formData.cameraEquipped}</Text>
            </View>
          )}

          {caseData.formData?.neighborContact && (
            <View style={styles.extraTagRow}>
              <Text style={styles.extraTagLabel}>Neighbor Contact:</Text>
              <Text style={styles.extraTagValue}>{caseData.formData.neighborContact}</Text>
            </View>
          )}
        </View>

        {/* Section 3: LHMS DETAILS */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <Image source={CLOCK_ICON} style={styles.sectionIcon} resizeMode="contain" />
              <Text style={styles.sectionTitle}>LHMS DETAILS</Text>
            </View>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.fieldLabel}>Purpose</Text>
            <Text style={styles.fieldValueBold}>{caseData.purpose}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Text style={styles.fieldLabel}>Where From / Destination</Text>
            <Text style={styles.fieldValueBold}>{caseData.whereFrom}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.twoColRow}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>From Date</Text>
              <Text style={styles.fieldValueBold}>{caseData.fromDate}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>From Time</Text>
              <Text style={styles.fieldValueBold}>{caseData.fromTime}</Text>
            </View>
          </View>
        </View>

        {/* Section 4: RETURN / REACH UPDATE (Only shown when updated by citizen) */}
        {caseData.hasReachUpdate ? (
          <View style={[styles.card, styles.reachCard]}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleWithIcon}>
                <Image source={PIN_ICON} style={[styles.sectionIcon, { tintColor: '#059669' }]} resizeMode="contain" />
                <Text style={[styles.sectionTitle, { color: '#059669' }]}>RETURN / REACH UPDATE</Text>
              </View>
              <View style={[styles.verifiedTag, { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.verifiedTagText, { color: '#15803D' }]}>✓ CITIZEN UPDATED</Text>
              </View>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.fieldLabel}>Status</Text>
              <Text style={[styles.fieldValueBold, { color: '#059669' }]}>
                {caseData.returnStatus || 'Updated'}
              </Text>
            </View>

            {caseData.updatedDate && (
              <>
                <View style={styles.divider} />
                <View style={styles.dataRow}>
                  <Text style={styles.fieldLabel}>Date</Text>
                  <Text style={styles.fieldValueBold}>{caseData.updatedDate}</Text>
                </View>
              </>
            )}

            {caseData.updatedTime && (
              <>
                <View style={styles.divider} />
                <View style={styles.dataRow}>
                  <Text style={styles.fieldLabel}>Time</Text>
                  <Text style={styles.fieldValueBold}>{caseData.updatedTime}</Text>
                </View>
              </>
            )}
          </View>
        ) : null}

        {/* Section 5: CASE STATUS & POLICE ASSIGNMENT */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <Image source={SHIELD_ICON} style={styles.sectionIcon} resizeMode="contain" />
              <Text style={styles.sectionTitle}>POLICE STATUS & DISPATCH</Text>
            </View>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.fieldLabel}>Current Status</Text>
            <View style={[styles.statusTagInline, { backgroundColor: badge.bg }]}>
              <Text style={[styles.statusTagInlineText, { color: badge.text }]}>
                {translateStatus(lang, caseData.status)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Text style={styles.fieldLabel}>Assigned Officer</Text>
            <Text style={styles.fieldValueBold}>{caseData.assignedOfficer || 'SI Arun Sharma'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Text style={styles.fieldLabel}>Police Station</Text>
            <Text style={styles.fieldValueBold}>{caseData.jurisdictionStation}</Text>
          </View>

          {/* Status Action Buttons for Officer */}
          <Text style={styles.actionPromptText}>TRANSITION CASE STATUS</Text>
          <View style={styles.statusActionRow}>
            {['IN_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'].map((st) => {
              const isCurrent = caseData.status === st;
              return (
                <TouchableOpacity
                  key={st}
                  style={[
                    styles.statusBtn,
                    isCurrent && styles.statusBtnActive,
                  ]}
                  onPress={() => handleStatusChange(st)}
                  disabled={updating || isCurrent}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.statusBtnText, isCurrent && styles.statusBtnTextActive]}>
                    {translateStatus(lang, st)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
    height: 54,
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
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  headerToken: {
    fontSize: 10,
    color: '#BFDBFE',
    fontWeight: '700',
    marginTop: 1,
  },
  statusBadgeHeader: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusBadgeHeaderText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8F9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#5A5D6B',
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollInner: {
    padding: 16,
    paddingBottom: 40,
  },
  tokenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tokenCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  houseIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  houseIcon: {
    width: 22,
    height: 22,
    tintColor: '#000666',
  },
  tokenLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#767683',
    letterSpacing: 0.5,
  },
  tokenNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000666',
    marginTop: 1,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  reachCard: {
    borderColor: '#A7F3D0',
    backgroundColor: '#FAFCF8',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 14,
    height: 14,
    tintColor: '#000666',
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.6,
  },
  verifiedTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00288E',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  twoColRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  col: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#767683',
    fontWeight: '600',
  },
  fieldValueBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1C20',
  },
  valueWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniIcon: {
    width: 12,
    height: 12,
    tintColor: '#000666',
    marginRight: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginVertical: 8,
  },
  addressBox: {
    backgroundColor: '#F8F9FE',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8F2',
    marginTop: 2,
  },
  addressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1C20',
    lineHeight: 18,
  },
  extraTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  extraTagLabel: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '600',
    marginRight: 6,
  },
  extraTagValue: {
    fontSize: 11.5,
    color: '#000666',
    fontWeight: '700',
  },
  statusTagInline: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusTagInlineText: {
    fontSize: 10,
    fontWeight: '800',
  },
  actionPromptText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#767683',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 8,
  },
  statusActionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  statusBtn: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  statusBtnActive: {
    backgroundColor: '#000666',
    borderColor: '#000666',
  },
  statusBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  statusBtnTextActive: {
    color: '#FFFFFF',
  },
});
