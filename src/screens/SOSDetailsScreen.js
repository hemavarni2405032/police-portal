import React from 'react';
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
const CITIZEN_IMG = require('../../assets/sos/image1_132_2.jpg');
const OFFICER_IMG = require('../../assets/sos/image3_132_2.jpg');
const MAP_SNIPPET = require('../../assets/sos/image2_132_2.jpg');

export default function SOSDetailsScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('sos_center'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>SOS-1024</Text>

        <View style={styles.criticalActiveBadge}>
          <Text style={styles.criticalActiveBadgeText}>CRITICAL / ACTIVE</Text>
        </View>

        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: Emergency Header */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewTopRow}>
            <View style={styles.overviewTextCol}>
              <Text style={styles.emergencyHeading}>Personal Safety{"\n"}Emergency</Text>
              <Text style={styles.receivedTimeText}>
                SOS-1024 • Received 01 Sep 2026, 10:42 AM
              </Text>
            </View>
            <View style={styles.asteriskCirclePink}>
              <Text style={styles.asteriskRed}>✻</Text>
            </View>
          </View>

          <View style={styles.locationPillBox}>
            <Text style={styles.locPinIcon}>📍</Text>
            <Text style={styles.locationPillText}>Gandhipuram, Coimbatore</Text>
          </View>
        </View>

        {/* Card 2: Citizen Information */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderIcon}>👤</Text>
            <Text style={styles.cardHeaderTitle}>CITIZEN INFORMATION</Text>
          </View>

          <View style={styles.citizenProfileRow}>
            <Image
              source={CITIZEN_IMG}
              style={styles.citizenPhoto}
              resizeMode="cover"
            />
            <View style={styles.citizenMeta}>
              <Text style={styles.citizenName}>Ananya R</Text>
              <Text style={styles.citizenSub}>+91 98765 43210</Text>
              <View style={styles.ageGenderRow}>
                <Text style={styles.ageGenderText}>28 yrs • Female</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>Verified ID</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.outlineActionBtn}
            onPress={() => onNavigate && onNavigate('citizen_info')}
            activeOpacity={0.75}
          >
            <Text style={styles.outlineActionBtnText}>VIEW CITIZEN DETAILS</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3: Emergency Details */}
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => onNavigate && onNavigate('sos_emergency_details')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderIcon}>ℹ️</Text>
            <Text style={styles.cardHeaderTitle}>EMERGENCY DETAILS</Text>
          </View>

          <View style={styles.detailItemRow}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>Personal Safety</Text>
          </View>

          <View style={styles.detailItemRow}>
            <Text style={styles.detailLabel}>Priority</Text>
            <Text style={[styles.detailValue, { color: '#B6171E' }]}>CRITICAL</Text>
          </View>

          <View style={styles.detailItemRow}>
            <Text style={styles.detailLabel}>Source</Text>
            <Text style={styles.detailValue}>SOS Mobile App</Text>
          </View>

          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              "Citizen reported an immediate personal safety concern..."
            </Text>
          </View>
        </TouchableOpacity>

        {/* Card 4: Live Location */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeaderIcon}>🗺️</Text>
            <Text style={styles.cardHeaderTitle}>LIVE LOCATION</Text>
          </View>

          <View style={styles.mapSnippetWrap}>
            <Image source={MAP_SNIPPET} style={styles.mapSnippetImg} resizeMode="cover" />
            <View style={styles.mapPinCenter}>
              <Text style={styles.mapPinEmoji}>📍</Text>
            </View>
          </View>

          <View style={styles.twoBtnRow}>
            <TouchableOpacity
              style={styles.btnHalfOutline}
              onPress={() => onNavigate && onNavigate('live_map')}
              activeOpacity={0.75}
            >
              <Text style={styles.btnHalfOutlineText}>VIEW LIVE MAP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnHalfFilled}
              onPress={() => onNavigate && onNavigate('live_sos_location')}
              activeOpacity={0.8}
            >
              <Text style={styles.btnHalfFilledIcon}>↱</Text>
              <Text style={styles.btnHalfFilledText}>DIRECTIONS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 5: Assigned Officer */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRowSpace}>
            <View style={styles.headerLeft}>
              <Text style={styles.cardHeaderIcon}>👮</Text>
              <Text style={styles.cardHeaderTitle}>ASSIGNED OFFICER</Text>
            </View>
            <View style={styles.respondingBadge}>
              <Text style={styles.respondingBadgeText}>RESPONDING</Text>
            </View>
          </View>

          <View style={styles.officerRow}>
            <Image
              source={OFFICER_IMG}
              style={styles.officerAvatar}
              resizeMode="cover"
            />
            <View style={styles.officerTextCol}>
              <Text style={styles.officerName}>Inspector Kumar</Text>
              <Text style={styles.officerRank}>Inspector</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.outlineActionBtn}
            onPress={() => onNavigate && onNavigate('unit_details')}
            activeOpacity={0.75}
          >
            <Text style={styles.outlineActionBtnText}>VIEW PROFILE</Text>
          </TouchableOpacity>
        </View>

        {/* Card 6: Assigned Unit */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRowSpace}>
            <View style={styles.headerLeft}>
              <Text style={styles.cardHeaderIcon}>🛡️</Text>
              <Text style={styles.cardHeaderTitle}>ASSIGNED UNIT</Text>
            </View>
            <View style={styles.enRoutePill}>
              <Text style={styles.enRoutePillText}>EN ROUTE</Text>
            </View>
          </View>

          <View style={styles.unitRow}>
            <View style={styles.unitSquareCar}>
              <Text style={styles.carIcon}>🚗</Text>
            </View>
            <View style={styles.unitInfoText}>
              <Text style={styles.unitNameBold}>Unit PU-12</Text>
              <Text style={styles.unitEtaSub}>Patrol Unit • ETA: 06 mins</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.outlineActionBtn}
            onPress={() => onNavigate && onNavigate('unit_details')}
            activeOpacity={0.75}
          >
            <Text style={styles.outlineActionBtnText}>VIEW UNIT</Text>
          </TouchableOpacity>
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
    height: 52,
    backgroundColor: '#000666',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  criticalActiveBadge: {
    backgroundColor: '#B6171E',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
  },
  criticalActiveBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  moreBtn: {
    marginLeft: 'auto',
    padding: 6,
  },
  moreIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  overviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  overviewTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  emergencyHeading: {
    fontSize: 18,
    fontWeight: '900',
    color: '#191C1D',
    lineHeight: 22,
  },
  receivedTimeText: {
    fontSize: 12,
    color: '#5A5D6B',
    marginTop: 4,
  },
  asteriskCirclePink: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  asteriskRed: {
    color: '#B6171E',
    fontSize: 22,
    fontWeight: '900',
  },
  locationPillBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  locPinIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  locationPillText: {
    fontSize: 12,
    color: '#191C1D',
    fontWeight: '600',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderRowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  cardHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.8,
  },
  respondingBadge: {
    backgroundColor: '#E0E7FF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  respondingBadgeText: {
    color: '#1A237E',
    fontSize: 9.5,
    fontWeight: '800',
  },
  enRoutePill: {
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  enRoutePillText: {
    color: '#B45309',
    fontSize: 9.5,
    fontWeight: '800',
  },
  citizenProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  citizenPhoto: {
    width: 52,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  citizenMeta: {
    flex: 1,
  },
  citizenName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#191C1D',
  },
  citizenSub: {
    fontSize: 12,
    color: '#5A5D6B',
    marginTop: 2,
  },
  ageGenderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ageGenderText: {
    fontSize: 11,
    color: '#767683',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#E8ECF2',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#454652',
  },
  outlineActionBtn: {
    borderWidth: 1,
    borderColor: '#000B58',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  outlineActionBtnText: {
    color: '#000B58',
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  detailItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: '#5A5D6B',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#191C1D',
  },
  quoteBox: {
    backgroundColor: '#F3F4F9',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  quoteText: {
    fontSize: 11.5,
    fontStyle: 'italic',
    color: '#454652',
    lineHeight: 16,
  },
  mapSnippetWrap: {
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
    backgroundColor: '#E2E2E7',
  },
  mapSnippetImg: {
    width: '100%',
    height: '100%',
  },
  mapPinCenter: {
    position: 'absolute',
    top: '40%',
    left: '46%',
  },
  mapPinEmoji: {
    fontSize: 24,
  },
  twoBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnHalfOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000B58',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 6,
  },
  btnHalfOutlineText: {
    color: '#000B58',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  btnHalfFilled: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000B58',
    borderRadius: 8,
    paddingVertical: 10,
    marginLeft: 6,
  },
  btnHalfFilledIcon: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    marginRight: 6,
  },
  btnHalfFilledText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  officerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  officerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 10,
  },
  officerTextCol: {
    flex: 1,
  },
  officerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
  },
  officerRank: {
    fontSize: 11.5,
    color: '#5A5D6B',
    marginTop: 2,
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  unitSquareCar: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#ECECF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  carIcon: {
    fontSize: 18,
  },
  unitInfoText: {
    flex: 1,
  },
  unitNameBold: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
  },
  unitEtaSub: {
    fontSize: 11.5,
    color: '#5A5D6B',
    marginTop: 2,
  },
});
