// src/screens/SeniorCitizenDetailsScreen.js
// Police-Side Dedicated Senior Citizen Case Details Screen
// Displays detailed information for a single Senior Citizen Care submission
// Reuses exact Police App UI styling, typography, status badges, and action buttons

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import seniorCitizenService, { parseSeniorCitizenData } from '../services/seniorCitizenService';
import officerService from '../services/officerService';
import { useLanguage } from '../context/LanguageContext';
import { t, translateStatus } from '../i18n/translations';

const BACK_ICON = require('../../assets/details/icon_back.png');

export default function SeniorCitizenDetailsScreen({ route, params, onNavigate, onBack }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const targetCaseId =
    (params && (params.caseId || params.id || params.trackingToken)) ||
    (route && route.params && (route.params.caseId || route.params.id || route.params.trackingToken)) ||
    null;

  const [rawItem, setRawItem] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const unsub = seniorCitizenService.subscribeToCases((allCases) => {
      const found =
        allCases.find((c) => c.id === targetCaseId || c.trackingToken === targetCaseId) ||
        allCases[0] ||
        null;
      setRawItem(found);
    });

    const unsubOff = officerService.subscribeToOfficers(setOfficers);

    return () => {
      unsub();
      unsubOff();
    };
  }, [targetCaseId]);

  if (!rawItem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000666" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => onBack ? onBack() : onNavigate && onNavigate('senior_citizen_care')}
            activeOpacity={0.7}
          >
            <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CASE DETAILS</Text>
          <View style={{ width: 30 }} />
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>No Senior Citizen Care case found.</Text>
          <TouchableOpacity
            style={styles.backLinkBtn}
            onPress={() => onBack ? onBack() : onNavigate && onNavigate('senior_citizen_care')}
          >
            <Text style={styles.backLinkText}>← Return to Senior Citizen Care List</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const caseData = parseSeniorCitizenData(rawItem);

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

  const handleCallContact = (phone) => {
    if (!phone || phone === 'Not provided') {
      Alert.alert('No Phone Number', 'Contact phone number was not provided in this submission.');
      return;
    }
    const cleanNumber = phone.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${cleanNumber}`).catch(() => {
      Alert.alert('Phone Call Failed', `Unable to call ${phone} on this device.`);
    });
  };

  const handleUpdateStatus = (nextStatus, remarks) => {
    seniorCitizenService.updateStatus(caseData.id, nextStatus, remarks, 'Duty Officer');
    Alert.alert('Status Updated', `Case ${caseData.trackingToken} marked as ${nextStatus}.`);
  };

  const handleAssignOfficer = (officer) => {
    seniorCitizenService.assignOfficer(
      caseData.id,
      officer.officerId,
      officer.fullName,
      `Assigned to ${officer.rank} for senior citizen beat verification`
    );
    setShowAssignModal(false);
    Alert.alert('Officer Assigned', `${officer.fullName} (${officer.badgeId}) assigned to case.`);
  };

  const badge = getBadgeStyle(caseData.status);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Police Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => onBack ? onBack() : onNavigate && onNavigate('senior_citizen_care')}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SENIOR CITIZEN CASE</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{caseData.status}</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Token & Status Card */}
        <View style={styles.tokenCard}>
          <View style={styles.tokenRow}>
            <View>
              <Text style={styles.metaLabel}>TRACKING TOKEN</Text>
              <Text style={styles.tokenValue}>{caseData.trackingToken}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
              <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                {translateStatus(lang, caseData.status)}
              </Text>
            </View>
          </View>
          <View style={styles.tokenDivider} />
          <View style={styles.metaGrid}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>STATION</Text>
              <Text style={styles.metaValueSmall}>{caseData.jurisdictionStation || 'Control Room'}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>ASSIGNED OFFICER</Text>
              <Text style={styles.metaValueSmall}>{caseData.assignedOfficer || 'Unassigned'}</Text>
            </View>
          </View>
        </View>

        {/* 1. Senior Citizen Details Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>SENIOR CITIZEN INFORMATION</Text>
            <Text style={styles.sectionTag}>PRIMARY</Text>
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.valuePrimary}>{caseData.seniorName}</Text>
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.valuePrimary}>
              {caseData.age !== 'Not provided' ? `${caseData.age} years` : 'Not provided'}
            </Text>
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.valueAddress}>{caseData.address}</Text>
          </View>
        </View>

        {/* 2. Living With Details Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>LIVING WITH INFORMATION</Text>
            {caseData.hasLivingWithContact ? (
              <Text style={[styles.sectionTag, { backgroundColor: '#DCFCE7', color: '#15803D' }]}>
                PROVIDED
              </Text>
            ) : (
              <Text style={[styles.sectionTag, { backgroundColor: '#F1F5F9', color: '#64748B' }]}>
                NOT PROVIDED
              </Text>
            )}
          </View>

          {caseData.hasLivingWithContact ? (
            <>
              <View style={styles.fieldBox}>
                <Text style={styles.label}>Contact Person Name</Text>
                <Text style={styles.valuePrimary}>{caseData.contactName || 'Not provided'}</Text>
              </View>

              <View style={styles.fieldBox}>
                <Text style={styles.label}>Relationship with Senior Citizen</Text>
                <Text style={styles.valuePrimary}>{caseData.relation || 'Not provided'}</Text>
              </View>

              {caseData.contactNumber ? (
                <View style={styles.fieldBox}>
                  <Text style={styles.label}>Contact Number</Text>
                  <View style={styles.phoneActionRow}>
                    <Text style={styles.valuePhone}>{caseData.contactNumber}</Text>
                    <TouchableOpacity
                      style={styles.callSmallBtn}
                      onPress={() => handleCallContact(caseData.contactNumber)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.callSmallBtnText}>📞 Call Contact</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </>
          ) : (
            <View style={styles.notProvidedBox}>
              <Text style={styles.notProvidedText}>
                The citizen did not provide a "Lives With" contact person in this submission.
              </Text>
            </View>
          )}
        </View>

        {/* 3. Case Information & Submitted Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>CASE INFORMATION</Text>
            <Text style={styles.sectionTag}>DETAILS</Text>
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.label}>Tracking Token</Text>
            <Text style={styles.valuePrimary}>{caseData.trackingToken}</Text>
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.label}>Submitted Date / Time</Text>
            <Text style={styles.valueSecondary}>
              {caseData.createdAt ? new Date(caseData.createdAt).toLocaleString('en-IN') : 'Recently Submitted'}
            </Text>
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.label}>Current Status</Text>
            <Text style={[styles.valuePrimary, { color: badge.text }]}>
              {translateStatus(lang, caseData.status)}
            </Text>
          </View>

          {/* Any other actually submitted fields */}
          {caseData.medicalConditions ? (
            <View style={styles.fieldBox}>
              <Text style={styles.label}>Medical / Health Conditions</Text>
              <Text style={styles.valueSecondary}>{caseData.medicalConditions}</Text>
            </View>
          ) : null}

          {caseData.emergencyDoctor ? (
            <View style={styles.fieldBox}>
              <Text style={styles.label}>Emergency Doctor</Text>
              <Text style={styles.valueSecondary}>{caseData.emergencyDoctor}</Text>
            </View>
          ) : null}

          {caseData.specialRequests ? (
            <View style={styles.fieldBox}>
              <Text style={styles.label}>Special Requests / Notes</Text>
              <Text style={styles.valueSecondary}>{caseData.specialRequests}</Text>
            </View>
          ) : null}
        </View>

        {/* 4. Police Action Buttons */}
        <View style={styles.actionCard}>
          <Text style={styles.actionCardTitle}>POLICE ACTIONS</Text>

          <View style={styles.actionButtonsRow}>
            {caseData.status === 'SUBMITTED' && (
              <TouchableOpacity
                style={[styles.primaryActionBtn, { backgroundColor: '#B45309' }]}
                onPress={() => handleUpdateStatus('IN_REVIEW', 'Case reviewed by Police Control Desk')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>🔍 Move to In Review</Text>
              </TouchableOpacity>
            )}

            {(caseData.status === 'SUBMITTED' || caseData.status === 'IN_REVIEW') && (
              <TouchableOpacity
                style={[styles.primaryActionBtn, { backgroundColor: '#6D28D9' }]}
                onPress={() => setShowAssignModal(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>👮 Assign Beat Officer</Text>
              </TouchableOpacity>
            )}

            {caseData.status === 'ASSIGNED' && (
              <TouchableOpacity
                style={[styles.primaryActionBtn, { backgroundColor: '#D97706' }]}
                onPress={() => handleUpdateStatus('IN_PROGRESS', 'Beat officer visited residence; wellness check in progress')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>🚶 Start Beat Visit (In Progress)</Text>
              </TouchableOpacity>
            )}

            {caseData.status !== 'RESOLVED' && (
              <TouchableOpacity
                style={[styles.primaryActionBtn, { backgroundColor: '#15803D' }]}
                onPress={() => handleUpdateStatus('RESOLVED', 'Senior citizen wellness check successfully conducted and enrolled')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>✅ Resolve & Close Case</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Status Timeline */}
        {caseData.statusTimeline && caseData.statusTimeline.length > 0 && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>CASE STATUS TIMELINE</Text>
            {caseData.statusTimeline.map((step, idx) => (
              <View key={idx} style={styles.timelineRow}>
                <View style={styles.timelineBullet} />
                <View style={styles.timelineContent}>
                  <View style={styles.timelineTop}>
                    <Text style={styles.timelineStatus}>{step.status}</Text>
                    <Text style={styles.timelineTime}>{step.timestamp}</Text>
                  </View>
                  <Text style={styles.timelineRemarks}>{step.remarks}</Text>
                  <Text style={styles.timelineBy}>Updated by: {step.updatedBy}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Officer Assignment Modal */}
      <Modal visible={showAssignModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Assign Beat Officer</Text>
              <TouchableOpacity onPress={() => setShowAssignModal(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              {officers.map((off) => (
                <TouchableOpacity
                  key={off.officerId}
                  style={styles.officerItem}
                  onPress={() => handleAssignOfficer(off)}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={styles.officerNameText}>{off.fullName}</Text>
                    <Text style={styles.officerMetaText}>
                      {off.rank} • Badge: {off.badgeId} • {off.stationName}
                    </Text>
                  </View>
                  <Text style={styles.selectArrowText}>SELECT →</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 16,
  },
  backLinkBtn: {
    backgroundColor: '#000666',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backLinkText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  tokenCard: {
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
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenValue: {
    fontSize: 15,
    fontWeight: '800',
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
  tokenDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metaValueSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  sectionCard: {
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.8,
  },
  sectionTag: {
    fontSize: 9,
    fontWeight: '800',
    backgroundColor: '#EEF2FF',
    color: '#00288E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  fieldBox: {
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  valuePrimary: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700',
  },
  valueSecondary: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  valueAddress: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
    lineHeight: 18,
  },
  valuePhone: {
    fontSize: 14,
    color: '#0284C7',
    fontWeight: '700',
  },
  phoneActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callSmallBtn: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  callSmallBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  notProvidedBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notProvidedText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  actionButtonsRow: {
    gap: 10,
  },
  primaryActionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  timelineRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  timelineBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000666',
    marginTop: 4,
    marginRight: 10,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  timelineStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  timelineTime: {
    fontSize: 10,
    color: '#64748B',
  },
  timelineRemarks: {
    fontSize: 12,
    color: '#334155',
    marginBottom: 2,
  },
  timelineBy: {
    fontSize: 10,
    color: '#94A3B8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000666',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '700',
    padding: 4,
  },
  officerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  officerNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  officerMetaText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  selectArrowText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
  },
});
