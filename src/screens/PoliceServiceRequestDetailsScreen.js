// src/screens/PoliceServiceRequestDetailsScreen.js
// Police Integration Screen: Citizen Service Request / Case Details
// Implements complete SERVICE_REQUESTS schema, dynamic form data, status timeline, and officer assignment

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
import serviceRequestService from '../services/serviceRequestService';
import { parseLHMSData } from '../services/lhmsService';
import officerService from '../services/officerService';
import { useLanguage } from '../context/LanguageContext';
import { t, translateStatus } from '../i18n/translations';

const BACK_ICON = require('../../assets/details/icon_back.png');
const USER_ICON = require('../../assets/details/icon_user.png');
const PIN_ICON = require('../../assets/details/icon_pin.png');
const CLOCK_ICON = require('../../assets/details/icon_clock.png');
const HOUSE_ICON = require('../../assets/icon_house.png');
const PHONE_ICON = require('../../assets/icon_phone.png');

export default function PoliceServiceRequestDetailsScreen({ route, params, onNavigate, onBack }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const targetCaseId = (params && (params.caseId || params.id || params.trackingToken)) ||
                       (route && route.params && (route.params.caseId || route.params.id || route.params.trackingToken)) ||
                       'SR-2026-LOK-84912';

  const [requestItem, setRequestItem] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const unsubReq = serviceRequestService.subscribeToRequests((allRequests) => {
      const found = allRequests.find((r) => r.id === targetCaseId || r.trackingToken === targetCaseId) || allRequests[0];
      setRequestItem(found);
    });

    const unsubOff = officerService.subscribeToOfficers(setOfficers);

    return () => {
      unsubReq();
      unsubOff();
    };
  }, [targetCaseId]);

  if (!requestItem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000666" />
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading Request Details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleCallApplicant = () => {
    const phone = requestItem.applicantPhone || '+91 98765 43210';
    Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`).catch(() => {
      Alert.alert('Phone Call', `Dialing applicant: ${phone}`);
    });
  };

  const handleOpenLocation = () => {
    const lat = requestItem.latitude || 11.0168;
    const lng = requestItem.longitude || 76.9558;
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`).catch(() => {
      Alert.alert('Location', `Coordinates: ${lat}, ${lng}`);
    });
  };

  const handleStatusChange = (nextStatus, remarks) => {
    serviceRequestService.updateStatus(
      requestItem.id,
      nextStatus,
      remarks,
      'Inspector R. Kumar (SHO)'
    );
    Alert.alert('Status Updated', `Request status updated to ${nextStatus}. Synced with Citizen App.`);
  };

  const handleAssignOfficer = (officer) => {
    serviceRequestService.assignOfficer(
      requestItem.id,
      officer.officerId,
      officer.fullName,
      'Assigned for verification/patrol'
    );
    setShowAssignModal(false);
    Alert.alert('Officer Assigned', `${officer.fullName} assigned to ${requestItem.trackingToken}.`);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'IN_REVIEW':
        return { bg: '#EDE9FE', text: '#6D28D9' };
      case 'ASSIGNED':
        return { bg: '#E0F2FE', text: '#0369A1' };
      case 'IN_PROGRESS':
        return { bg: '#E0E7FF', text: '#00288E' };
      case 'RESOLVED':
        return { bg: '#DCFCE7', text: '#00875A' };
      default:
        return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const badgeStyle = getStatusBadgeStyle(requestItem.status);
  const isLHMS = requestItem.serviceType === 'LHMS' || requestItem.serviceType === 'LOCKED_HOUSE';
  const lhmsParsed = isLHMS ? parseLHMSData(requestItem) : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('citizen_service_requests'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{requestItem.trackingToken}</Text>
          <Text style={styles.headerSubId}>{requestItem.id}</Text>
        </View>

        <View style={[styles.statusBadgeHeader, { backgroundColor: badgeStyle.bg }]}>
          <Text style={[styles.statusBadgeHeaderText, { color: badgeStyle.text }]}>
            {translateStatus(lang, requestItem.status)}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {isLHMS && lhmsParsed ? (
          <>
            {/* LHMS Card 1: Overview & Token */}
            <View style={styles.card}>
              <View style={styles.serviceTypeRow}>
                <View style={styles.servicePill}>
                  <Text style={styles.servicePillText}>LOCKED HOUSE (LHMS)</Text>
                </View>
                <Text style={styles.timestampText}>
                  Submitted: {new Date(requestItem.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </Text>
              </View>

              <Text style={styles.requestHeading}>{requestItem.serviceTitle}</Text>
              <View style={styles.stationRow}>
                <Image source={PIN_ICON} style={styles.miniPinIcon} resizeMode="contain" />
                <Text style={styles.stationText}>Jurisdiction: {requestItem.jurisdictionStation}</Text>
              </View>
            </View>

            {/* LHMS Section 1: HOUSE / APPLICANT DETAILS */}
            <View style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionTitleWithIcon}>
                  <Image source={USER_ICON} style={styles.sectionTitleIcon} resizeMode="contain" />
                  <Text style={styles.sectionTitle}>HOUSE / APPLICANT DETAILS</Text>
                </View>
                <View style={styles.verifiedTag}>
                  <Text style={styles.verifiedTagText}>✓ CITIZEN VERIFIED</Text>
                </View>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.fieldLabel}>Applicant Name</Text>
                <Text style={styles.fieldValueBold}>{requestItem.applicantName}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.dataRow}>
                <Text style={styles.fieldLabel}>Phone Number</Text>
                <View style={styles.valueWithIcon}>
                  <Image source={PHONE_ICON} style={styles.miniPhoneIcon} resizeMode="contain" />
                  <Text style={styles.fieldValueBold}>{requestItem.applicantPhone}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.dataRow}>
                <Text style={styles.fieldLabel}>House Address</Text>
              </View>
              <View style={styles.addressBox}>
                <Text style={styles.addressText}>{lhmsParsed.address}</Text>
              </View>

              <View style={styles.contactRow}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={handleCallApplicant}
                  activeOpacity={0.8}
                >
                  <Text style={styles.callBtnText}>CALL APPLICANT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.mapBtn}
                  onPress={handleOpenLocation}
                  activeOpacity={0.8}
                >
                  <Text style={styles.mapBtnText}>VIEW LOCATION</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* LHMS Section 2: LHMS DETAILS */}
            <View style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionTitleWithIcon}>
                  <Image source={CLOCK_ICON} style={styles.sectionTitleIcon} resizeMode="contain" />
                  <Text style={styles.sectionTitle}>LHMS DETAILS</Text>
                </View>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.fieldLabel}>Purpose</Text>
                <Text style={styles.fieldValueBold}>{lhmsParsed.purpose}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.dataRow}>
                <Text style={styles.fieldLabel}>Where From / Destination</Text>
                <Text style={styles.fieldValueBold}>{lhmsParsed.whereFrom}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.twoColRow}>
                <View style={styles.col}>
                  <Text style={styles.fieldLabel}>From Date</Text>
                  <Text style={styles.fieldValueBold}>{lhmsParsed.fromDate}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.fieldLabel}>From Time</Text>
                  <Text style={styles.fieldValueBold}>{lhmsParsed.fromTime}</Text>
                </View>
              </View>
            </View>

            {/* LHMS Section 3: RETURN / REACH UPDATE (Only if citizen updated) */}
            {lhmsParsed.hasReachUpdate ? (
              <View style={[styles.card, styles.reachCard]}>
                <View style={styles.sectionHeaderRow}>
                  <View style={styles.sectionTitleWithIcon}>
                    <Image source={PIN_ICON} style={[styles.sectionTitleIcon, { tintColor: '#059669' }]} resizeMode="contain" />
                    <Text style={[styles.sectionTitle, { color: '#059669' }]}>RETURN / REACH UPDATE</Text>
                  </View>
                  <View style={[styles.verifiedTag, { backgroundColor: '#DCFCE7' }]}>
                    <Text style={[styles.verifiedTagText, { color: '#15803D' }]}>✓ CITIZEN UPDATED</Text>
                  </View>
                </View>

                <View style={styles.dataRow}>
                  <Text style={styles.fieldLabel}>Status</Text>
                  <Text style={[styles.fieldValueBold, { color: '#059669' }]}>
                    {lhmsParsed.returnStatus || 'Updated'}
                  </Text>
                </View>

                {lhmsParsed.updatedDate && (
                  <>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}>
                      <Text style={styles.fieldLabel}>Updated Date</Text>
                      <Text style={styles.fieldValueBold}>{lhmsParsed.updatedDate}</Text>
                    </View>
                  </>
                )}

                {lhmsParsed.updatedTime && (
                  <>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}>
                      <Text style={styles.fieldLabel}>Updated Time</Text>
                      <Text style={styles.fieldValueBold}>{lhmsParsed.updatedTime}</Text>
                    </View>
                  </>
                )}
              </View>
            ) : null}
          </>
        ) : (
          <>
            {/* Card 1: Overview & Service Type */}
            <View style={styles.card}>
              <View style={styles.serviceTypeRow}>
                <View style={styles.servicePill}>
                  <Text style={styles.servicePillText}>{requestItem.serviceType}</Text>
                </View>
                <Text style={styles.timestampText}>
                  Submitted: {new Date(requestItem.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </Text>
              </View>

              <Text style={styles.requestHeading}>{requestItem.serviceTitle}</Text>
              <Text style={styles.stationText}>Jurisdiction: {requestItem.jurisdictionStation}</Text>
            </View>

            {/* Card 2: Applicant Information */}
            <View style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>CITIZEN APPLICANT</Text>
                <View style={styles.verifiedTag}>
                  <Text style={styles.verifiedTagText}>✓ VERIFIED</Text>
                </View>
              </View>

              <View style={styles.applicantRow}>
                <View style={styles.applicantAvatarBox}>
                  <Image source={USER_ICON} style={styles.userIcon} resizeMode="contain" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.applicantNameText}>{requestItem.applicantName}</Text>
                  <Text style={styles.applicantPhoneText}>{requestItem.applicantPhone}</Text>
                  <Text style={styles.applicantMetaText}>{requestItem.formData?.area || 'Coimbatore Region'}</Text>
                </View>
              </View>

              <View style={styles.contactRow}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={handleCallApplicant}
                  activeOpacity={0.8}
                >
                  <Text style={styles.callBtnText}>CALL APPLICANT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.mapBtn}
                  onPress={handleOpenLocation}
                  activeOpacity={0.8}
                >
                  <Text style={styles.mapBtnText}>VIEW LOCATION</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 3: Form Data (Dynamic) */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>SUBMITTED FORM DATA</Text>

              {requestItem.formData && Object.keys(requestItem.formData).map((key) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                const val = requestItem.formData[key];
                return (
                  <View key={key} style={styles.formFieldItem}>
                    <Text style={styles.formFieldLabel}>{label}</Text>
                    <Text style={styles.formFieldValue}>{String(val)}</Text>
                  </View>
                );
              })}

              {/* Evidence Attachments */}
              {requestItem.evidenceUrls && requestItem.evidenceUrls.length > 0 && (
                <View style={styles.evidenceWrap}>
                  <Text style={styles.evidenceHeading}>Submitted Documents ({requestItem.evidenceUrls.length}):</Text>
                  {requestItem.evidenceUrls.map((url, idx) => (
                    <View key={idx} style={styles.evidenceItem}>
                      <Text style={styles.evidenceText} numberOfLines={1}>attached_evidence_{idx + 1}.jpg</Text>
                      <TouchableOpacity onPress={() => onNavigate && onNavigate('evidence')}>
                        <Text style={styles.evidenceLink}>VIEW →</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        )}

        {/* Card 4: Assigned Officer */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>ASSIGNED OFFICER</Text>
            <TouchableOpacity
              style={styles.reassignBtn}
              onPress={() => setShowAssignModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.reassignBtnText}>ASSIGN / REASSIGN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.officerRow}>
            <View style={styles.officerAvatar}>
              <Text style={{ fontSize: 20 }}>👮</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.officerNameText}>
                {requestItem.assignedOfficer || 'Unassigned (Action Required)'}
              </Text>
              <Text style={styles.officerStationText}>{requestItem.jurisdictionStation}</Text>
            </View>
          </View>
        </View>

        {/* Card 5: Status Timeline & History */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>STATUS TIMELINE</Text>

          {/* Stepper */}
          <View style={styles.stepperWrap}>
            {['SUBMITTED', 'IN_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'].map((st, i) => {
              const order = ['SUBMITTED', 'IN_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
              const currentIdx = order.indexOf(requestItem.status);
              const isDone = currentIdx >= i;
              const isCurrent = currentIdx === i;

              return (
                <View key={st} style={styles.stepCol}>
                  <View style={[
                    styles.stepDot,
                    isDone ? { backgroundColor: '#000666' } : { backgroundColor: '#E2E8F0' },
                    isCurrent && { borderColor: '#D4AF37', borderWidth: 2 }
                  ]}>
                    <Text style={[styles.stepDotText, isDone && { color: '#FFFFFF' }]}>
                      {isDone ? '✓' : String(i + 1)}
                    </Text>
                  </View>
                  <Text style={[styles.stepLabel, isCurrent && { color: '#000666', fontWeight: '800' }]}>
                    {translateStatus(lang, st)}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Timeline list */}
          <View style={styles.timelineWrap}>
            {(requestItem.statusTimeline || []).map((tItem, idx) => (
              <View key={idx} style={styles.timelineRow}>
                <View style={styles.timelineMarker} />
                <View style={{ flex: 1 }}>
                  <View style={styles.timelineTopRow}>
                    <Text style={styles.timelineStatusTitle}>{tItem.status}</Text>
                    <Text style={styles.timelineTimestamp}>{tItem.timestamp}</Text>
                  </View>
                  <Text style={styles.timelineUser}>By: {tItem.updatedBy}</Text>
                  <Text style={styles.timelineRemarks}>"{tItem.remarks}"</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Card 6: Role Actions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>POLICE ROLE ACTIONS</Text>

          <View style={styles.actionsStack}>
            {requestItem.status === 'SUBMITTED' && (
              <TouchableOpacity
                style={[styles.ctaBtn, { backgroundColor: '#6D28D9' }]}
                onPress={() => handleStatusChange('IN_REVIEW', 'Application details taken up for review')}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaBtnText}>🔍 MOVE TO IN REVIEW</Text>
              </TouchableOpacity>
            )}

            {(requestItem.status === 'SUBMITTED' || requestItem.status === 'IN_REVIEW') && (
              <TouchableOpacity
                style={[styles.ctaBtn, { backgroundColor: '#0369A1' }]}
                onPress={() => setShowAssignModal(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaBtnText}>👮 ASSIGN OFFICER</Text>
              </TouchableOpacity>
            )}

            {requestItem.status === 'ASSIGNED' && (
              <TouchableOpacity
                style={[styles.ctaBtn, { backgroundColor: '#000666' }]}
                onPress={() => handleStatusChange('IN_PROGRESS', 'Investigation & beat patrol initiated')}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaBtnText}>⚡ START IN PROGRESS</Text>
              </TouchableOpacity>
            )}

            {requestItem.status === 'IN_PROGRESS' && (
              <TouchableOpacity
                style={[styles.ctaBtn, { backgroundColor: '#00875A' }]}
                onPress={() => handleStatusChange('RESOLVED', 'Verification completed. Report filed.')}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaBtnText}>✅ RESOLVE REQUEST</Text>
              </TouchableOpacity>
            )}

            {requestItem.status === 'RESOLVED' && (
              <View style={styles.resolvedNotice}>
                <Text style={styles.resolvedNoticeText}>
                  ✅ Request completed and resolved. Citizen notified via app.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Modal: Assign Officer */}
      <Modal
        visible={showAssignModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAssignModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTop}>
              <Text style={styles.modalHeading}>Assign Station Officer</Text>
              <TouchableOpacity onPress={() => setShowAssignModal(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              {officers.map((off) => (
                <TouchableOpacity
                  key={off.officerId}
                  style={styles.officerPickItem}
                  onPress={() => handleAssignOfficer(off)}
                  activeOpacity={0.7}
                >
                  <View style={styles.officerPickAvatar}>
                    <Text style={{ fontSize: 18 }}>👮</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.officerPickName}>{off.fullName}</Text>
                    <Text style={styles.officerPickMeta}>
                      {off.rank} • {off.stationName} • {off.dutyPhone}
                    </Text>
                  </View>
                  <Text style={styles.assignCtaText}>ASSIGN →</Text>
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF8FF',
  },
  loadingText: {
    fontSize: 14,
    color: '#000666',
    fontWeight: '700',
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
  headerTitleWrap: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  headerSubId: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
  },
  statusBadgeHeader: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusBadgeHeaderText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FBF8FF',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 12,
  },
  serviceTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  servicePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  servicePillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#000666',
  },
  timestampText: {
    fontSize: 11,
    color: '#5A5D6B',
  },
  requestHeading: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#1A1C20',
    marginBottom: 4,
  },
  stationText: {
    fontSize: 11.5,
    color: '#5A5D6B',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.5,
  },
  verifiedTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2E7D32',
  },
  applicantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  applicantAvatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  userIcon: {
    width: 18,
    height: 18,
    tintColor: '#000666',
  },
  applicantNameText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1C20',
  },
  applicantPhoneText: {
    fontSize: 12,
    color: '#5A5D6B',
  },
  applicantMetaText: {
    fontSize: 11,
    color: '#767683',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F8',
    paddingTop: 8,
  },
  callBtn: {
    flex: 1,
    backgroundColor: '#000666',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  callBtnText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  mapBtn: {
    flex: 1,
    backgroundColor: '#001A5E',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  mapBtnText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  formFieldItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
  },
  formFieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5A5D6B',
  },
  formFieldValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A1C20',
    marginTop: 2,
  },
  evidenceWrap: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F8',
    paddingTop: 6,
  },
  evidenceHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5A5D6B',
    marginBottom: 4,
  },
  evidenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F9',
    padding: 6,
    borderRadius: 4,
    marginBottom: 4,
  },
  evidenceText: {
    flex: 1,
    fontSize: 11,
    color: '#1A1C20',
    fontWeight: '600',
  },
  evidenceLink: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000666',
  },
  reassignBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  reassignBtnText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#000666',
  },
  officerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  officerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  officerNameText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1A1C20',
  },
  officerStationText: {
    fontSize: 11,
    color: '#5A5D6B',
  },
  stepperWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  stepCol: {
    alignItems: 'center',
    width: '19%',
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  stepDotText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#5A5D6B',
  },
  stepLabel: {
    fontSize: 7.5,
    color: '#5A5D6B',
    textAlign: 'center',
  },
  timelineWrap: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F8',
    paddingTop: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000666',
    marginTop: 4,
    marginRight: 8,
  },
  timelineTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineStatusTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#000666',
  },
  timelineTimestamp: {
    fontSize: 9.5,
    color: '#767683',
  },
  timelineUser: {
    fontSize: 10,
    color: '#5A5D6B',
  },
  timelineRemarks: {
    fontSize: 10.5,
    color: '#454652',
    fontStyle: 'italic',
  },
  actionsStack: {
    gap: 8,
    marginTop: 6,
  },
  ctaBtn: {
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  ctaBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  resolvedNotice: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 6,
  },
  resolvedNoticeText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 10, 40, 0.7)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000666',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#767683',
    padding: 4,
  },
  officerPickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    marginBottom: 6,
  },
  officerPickAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  officerPickName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#1A1C20',
  },
  officerPickMeta: {
    fontSize: 10,
    color: '#5A5D6B',
  },
  assignCtaText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#000666',
  },
  miniPinIcon: {
    width: 12,
    height: 12,
    tintColor: '#5A5D6B',
    marginRight: 6,
  },
  miniPhoneIcon: {
    width: 12,
    height: 12,
    tintColor: '#000666',
    marginRight: 6,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleIcon: {
    width: 14,
    height: 14,
    tintColor: '#000666',
    marginRight: 6,
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
    marginBottom: 8,
  },
  addressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1C20',
    lineHeight: 18,
  },
  reachCard: {
    borderColor: '#A7F3D0',
    backgroundColor: '#FAFCF8',
  },
});
