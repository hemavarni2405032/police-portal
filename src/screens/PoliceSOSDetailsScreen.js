// src/screens/PoliceSOSDetailsScreen.js
// Dedicated SOS Details Screen according to APPS_SUMMARY.txt Section 10
// Exact Police App design style, emergency status, citizen details, GPS, map, patrol dispatch & resolve

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import sosService from '../services/sosService';
import { useLanguage } from '../context/LanguageContext';
import { t, translateStatus } from '../i18n/translations';

const BACK_ICON = require('../../assets/details/icon_back.png');
const CITIZEN_IMG = require('../../assets/sos/image1_132_2.jpg');
const MAP_SNIPPET = require('../../assets/sos/image2_132_2.jpg');

export default function PoliceSOSDetailsScreen({ route, params, onNavigate, onBack }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const targetSosId = (params && (params.sosId || params.id || params.trackingToken)) ||
                      (route && route.params && (route.params.sosId || route.params.id || route.params.trackingToken)) ||
                      'SOS-2026-1024';

  const [sosAlert, setSosAlert] = useState(null);

  useEffect(() => {
    const unsub = sosService.subscribeToAlerts((allAlerts) => {
      const found = allAlerts.find((s) => s.id === targetSosId || s.trackingToken === targetSosId) || allAlerts[0];
      setSosAlert(found);
    });
    return () => unsub();
  }, [targetSosId]);

  if (!sosAlert) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#000666" />
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading SOS Details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isDispatched = sosAlert.status === 'PATROL_DISPATCHED';
  const isResolved = sosAlert.status === 'RESOLVED';
  const isCancelled = sosAlert.status === 'CANCELLED';
  const isActive = sosAlert.status === 'ACTIVE';

  const handleCallCitizen = () => {
    const phone = sosAlert.citizenPhone || '+91 98765 43210';
    Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`).catch(() => {
      Alert.alert('Call Citizen', `Connecting call to ${sosAlert.citizenName} (${phone})`);
    });
  };

  const handleCallEmergencyContact = () => {
    const raw = sosAlert.emergencyContact || '+91 94432 11890';
    const digits = raw.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${digits}`).catch(() => {
      Alert.alert('Emergency Contact', `Dialing ICE contact: ${raw}`);
    });
  };

  const handleOpenMaps = () => {
    const lat = sosAlert.latitude || 11.0168;
    const lng = sosAlert.longitude || 76.9558;
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`).catch(() => {
      Alert.alert('GPS Location', `Coordinates: ${lat}, ${lng} (${sosAlert.locationName})`);
    });
  };

  const handleDispatchPatrol = () => {
    Alert.alert(
      'Dispatch Patrol Unit',
      `Dispatch nearest available patrol vehicle to ${sosAlert.citizenName} at ${sosAlert.locationName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Dispatch PU-12 (Gandhipuram Sector)',
          onPress: () => {
            sosService.dispatchPatrol(sosAlert.id, 'PU-12', 360, 'Inspector R. Kumar');
            Alert.alert('Patrol Dispatched', 'Unit PU-12 dispatched. Status synced with Citizen App.');
          },
        },
        {
          text: 'Dispatch PU-05 (Pink Patrol)',
          onPress: () => {
            sosService.dispatchPatrol(sosAlert.id, 'PU-05-PINK', 300, 'SI Meena S.');
            Alert.alert('Pink Patrol Dispatched', 'Women Safety Unit PU-05 dispatched.');
          },
        },
      ]
    );
  };

  const handleMarkResolved = () => {
    Alert.alert(
      'Mark SOS Resolved',
      'Confirm that the incident has been attended and resolved by police personnel?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Resolve',
          onPress: () => {
            sosService.resolveAlert(sosAlert.id, 'Patrol arrived on scene. Citizen safe.');
            Alert.alert('SOS Resolved', 'Emergency alert marked RESOLVED. Citizen notified.');
          },
        },
      ]
    );
  };

  const handleCancelAlert = () => {
    Alert.alert(
      'Cancel SOS Alert',
      'Confirm cancel as duplicate or false alarm?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Confirm Cancel',
          style: 'destructive',
          onPress: () => {
            sosService.cancelAlert(sosAlert.id, 'Cancelled as false trigger.');
            Alert.alert('Alert Cancelled', 'Alert status updated to CANCELLED.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('citizen_sos_screen'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{sosAlert.trackingToken}</Text>
          <Text style={styles.headerSubId}>{sosAlert.id}</Text>
        </View>

        <View style={[
          styles.statusBadgeTop,
          isActive ? { backgroundColor: '#B6171E' } :
          isDispatched ? { backgroundColor: '#00288E' } :
          isResolved ? { backgroundColor: '#00875A' } : { backgroundColor: '#64748B' }
        ]}>
          <Text style={styles.statusBadgeTopText}>
            {translateStatus(lang, sosAlert.status)}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: Emergency Header & Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.emergencyHeading}>{sosAlert.category}</Text>
              <Text style={styles.receivedTimeText}>
                Received: {sosAlert.createdAt ? new Date(sosAlert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:42 AM'} • Critical Priority
              </Text>
            </View>
            <View style={[
              styles.asteriskCircle,
              isActive ? { backgroundColor: '#FFEBEE' } : { backgroundColor: '#E8F5E9' }
            ]}>
              <Text style={{ fontSize: 18 }}>{isActive ? '🚨' : '🛡️'}</Text>
            </View>
          </View>

          <View style={styles.locationPillBox}>
            <Text style={styles.locPinIcon}>📍</Text>
            <Text style={styles.locationPillText} numberOfLines={2}>{sosAlert.locationName}</Text>
          </View>

          {sosAlert.description && (
            <Text style={styles.descriptionText}>"{sosAlert.description}"</Text>
          )}
        </View>

        {/* Card 2: Citizen Information */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderIcon}>👤</Text>
            <Text style={styles.cardHeaderTitle}>CITIZEN INFORMATION</Text>
            <View style={styles.verifiedPill}>
              <Text style={styles.verifiedPillText}>✓ VERIFIED</Text>
            </View>
          </View>

          <View style={styles.citizenProfileRow}>
            <Image source={CITIZEN_IMG} style={styles.citizenPhoto} resizeMode="cover" />
            <View style={styles.citizenMeta}>
              <Text style={styles.citizenName}>{sosAlert.citizenName}</Text>
              <Text style={styles.citizenSub}>{sosAlert.citizenPhone}</Text>
              <Text style={styles.bloodGroupText}>Blood Group: <Text style={styles.boldText}>{sosAlert.bloodGroup || 'B+'}</Text></Text>
              {sosAlert.emergencyContact && (
                <Text style={styles.iceContactText}>ICE: {sosAlert.emergencyContact}</Text>
              )}
            </View>
          </View>

          {/* Contact Buttons */}
          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.callCitizenBtn}
              onPress={handleCallCitizen}
              activeOpacity={0.8}
            >
              <Text style={styles.callCitizenBtnText}>📞 CALL CITIZEN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.callIceBtn}
              onPress={handleCallEmergencyContact}
              activeOpacity={0.8}
            >
              <Text style={styles.callIceBtnText}>👨‍👩‍👧 CALL ICE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 3: GPS Coordinates & Maps */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderIcon}>🗺️</Text>
            <Text style={styles.cardHeaderTitle}>LIVE GPS COORDINATES</Text>
          </View>

          <View style={styles.coordsBox}>
            <View style={styles.coordCol}>
              <Text style={styles.coordLabel}>Latitude</Text>
              <Text style={styles.coordVal}>{sosAlert.latitude || 11.0168}° N</Text>
            </View>
            <View style={styles.coordCol}>
              <Text style={styles.coordLabel}>Longitude</Text>
              <Text style={styles.coordVal}>{sosAlert.longitude || 76.9558}° E</Text>
            </View>
            <View style={styles.coordCol}>
              <Text style={styles.coordLabel}>Accuracy</Text>
              <Text style={[styles.coordVal, { color: '#00875A' }]}>±{sosAlert.accuracyMeters || 4.8}m</Text>
            </View>
          </View>

          <View style={styles.mapSnippetWrap}>
            <Image source={MAP_SNIPPET} style={styles.mapSnippetImg} resizeMode="cover" />
            <View style={styles.mapPinCenter}>
              <Text style={{ fontSize: 24 }}>📍</Text>
            </View>
          </View>

          <View style={styles.mapButtonsRow}>
            <TouchableOpacity
              style={styles.btnHalfOutline}
              onPress={() => onNavigate && onNavigate('live_map')}
              activeOpacity={0.75}
            >
              <Text style={styles.btnHalfOutlineText}>BEAT MAP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnHalfFilled}
              onPress={handleOpenMaps}
              activeOpacity={0.8}
            >
              <Text style={styles.btnHalfFilledText}>🧭 OPEN IN GOOGLE MAPS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 4: Dispatched Patrol Unit & ETA */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRowSpace}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.cardHeaderIcon}>🛡️</Text>
              <Text style={styles.cardHeaderTitle}>PATROL DISPATCH</Text>
            </View>
            <View style={[
              styles.dispatchStatusPill,
              isDispatched ? { backgroundColor: '#E8F5E9' } : { backgroundColor: '#FFF3E0' }
            ]}>
              <Text style={[
                styles.dispatchStatusPillText,
                isDispatched ? { color: '#2E7D32' } : { color: '#E65100' }
              ]}>
                {isDispatched ? 'EN ROUTE' : (isResolved ? 'MISSION RESOLVED' : 'AWAITING DISPATCH')}
              </Text>
            </View>
          </View>

          {isDispatched ? (
            <View style={styles.unitRow}>
              <View style={styles.unitSquareCar}>
                <Text style={{ fontSize: 22 }}>🚓</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.unitNameBold}>{sosAlert.dispatchedUnit || 'PU-12 Patrol Unit'}</Text>
                <Text style={styles.unitOfficerSub}>Officer: {sosAlert.dispatchedOfficer || 'Inspector R. Kumar'}</Text>
                <Text style={styles.unitEtaText}>
                  ⏱️ ETA: {sosAlert.etaSeconds ? `${Math.round(sosAlert.etaSeconds / 60)} mins` : '6 mins'}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.unassignedBox}>
              <Text style={styles.unassignedSubText}>
                No patrol vehicle dispatched to this alert yet. Immediate action advised.
              </Text>
              <TouchableOpacity
                style={styles.dispatchCtaBtn}
                onPress={handleDispatchPatrol}
                activeOpacity={0.8}
              >
                <Text style={styles.dispatchCtaBtnText}>⚡ DISPATCH PATROL VEHICLE</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Card 5: Operational Controls */}
        <View style={styles.cardContainer}>
          <Text style={styles.controlsHeading}>OPERATIONAL ACTIONS</Text>

          <View style={styles.controlsStack}>
            {isActive && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#000666' }]}
                onPress={handleDispatchPatrol}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>🚓 DISPATCH POLICE PATROL</Text>
              </TouchableOpacity>
            )}

            {isDispatched && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#00875A' }]}
                onPress={handleMarkResolved}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>✅ MARK ALERT RESOLVED</Text>
              </TouchableOpacity>
            )}

            {!isResolved && !isCancelled && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#64748B' }]}
                onPress={handleCancelAlert}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>✕ CANCEL / FALSE ALARM</Text>
              </TouchableOpacity>
            )}

            {isResolved && (
              <View style={styles.resolvedBox}>
                <Text style={styles.resolvedBoxText}>
                  ✅ Incident marked RESOLVED. Dispatched unit completed intervention.
                </Text>
              </View>
            )}
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
  statusBadgeTop: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusBadgeTopText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#FBF8FF',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 12,
  },
  overviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  emergencyHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#B6171E',
  },
  receivedTimeText: {
    fontSize: 11,
    color: '#5A5D6B',
    marginTop: 2,
  },
  asteriskCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  locationPillBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F9',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  locPinIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  locationPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1C20',
    flex: 1,
  },
  descriptionText: {
    fontSize: 11.5,
    color: '#5A5D6B',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderRowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardHeaderIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  cardHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.5,
  },
  verifiedPill: {
    marginLeft: 'auto',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedPillText: {
    color: '#2E7D32',
    fontSize: 9,
    fontWeight: '800',
  },
  citizenProfileRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  citizenPhoto: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 10,
    backgroundColor: '#E2E2EC',
  },
  citizenMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  citizenName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1C20',
  },
  citizenSub: {
    fontSize: 12,
    color: '#5A5D6B',
    marginTop: 1,
  },
  bloodGroupText: {
    fontSize: 11,
    color: '#5A5D6B',
    marginTop: 2,
  },
  boldText: {
    fontWeight: '800',
    color: '#1A1C20',
  },
  iceContactText: {
    fontSize: 10.5,
    color: '#B6171E',
    fontWeight: '700',
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F8',
    paddingTop: 8,
  },
  callCitizenBtn: {
    flex: 1,
    backgroundColor: '#000666',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  callCitizenBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  callIceBtn: {
    flex: 1,
    backgroundColor: '#B6171E',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  callIceBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  coordsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F9',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  coordCol: {
    alignItems: 'center',
  },
  coordLabel: {
    fontSize: 9.5,
    color: '#5A5D6B',
    fontWeight: '600',
  },
  coordVal: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#1A1C20',
    marginTop: 2,
  },
  mapSnippetWrap: {
    height: 110,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  mapSnippetImg: {
    width: '100%',
    height: '100%',
  },
  mapPinCenter: {
    position: 'absolute',
    top: '38%',
    left: '46%',
  },
  mapButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  btnHalfOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000666',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnHalfOutlineText: {
    color: '#000666',
    fontSize: 10.5,
    fontWeight: '800',
  },
  btnHalfFilled: {
    flex: 1,
    backgroundColor: '#000666',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnHalfFilledText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  dispatchStatusPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dispatchStatusPillText: {
    fontSize: 9,
    fontWeight: '800',
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitSquareCar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  unitNameBold: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1A1C20',
  },
  unitOfficerSub: {
    fontSize: 11,
    color: '#5A5D6B',
    marginTop: 1,
  },
  unitEtaText: {
    fontSize: 11,
    color: '#000666',
    fontWeight: '800',
    marginTop: 2,
  },
  unassignedBox: {
    paddingVertical: 6,
  },
  unassignedSubText: {
    fontSize: 11.5,
    color: '#5A5D6B',
    marginBottom: 8,
  },
  dispatchCtaBtn: {
    backgroundColor: '#B6171E',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  dispatchCtaBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  controlsHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000666',
    marginBottom: 8,
  },
  controlsStack: {
    gap: 8,
  },
  actionBtn: {
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  resolvedBox: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 6,
  },
  resolvedBoxText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '700',
  },
});
