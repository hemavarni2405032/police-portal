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

export default function CitizenInfoScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('sos_details'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CITIZEN INFORMATION</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={CITIZEN_IMG}
            style={styles.citizenPhoto}
            resizeMode="cover"
          />

          <View style={styles.profileInfo}>
            <Text style={styles.nameTitle}>Ananya R</Text>
            <View style={styles.pillsRow}>
              <View style={styles.grayPill}>
                <Text style={styles.grayPillText}>28 yrs</Text>
              </View>
              <View style={styles.grayPill}>
                <Text style={styles.grayPillText}>Female</Text>
              </View>
              <View style={styles.verifiedPill}>
                <Text style={styles.verifiedPillText}>Verified ID</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact & Emergency Details */}
        <View style={styles.contactCard}>
          <Text style={styles.sectionHeaderLabel}>CONTACT & EMERGENCY DETAILS</Text>

          {/* Primary Mobile */}
          <View style={styles.contactRow}>
            <View style={styles.iconCircleGray}>
              <Text style={styles.phoneEmoji}>📱</Text>
            </View>
            <View style={styles.contactTextCol}>
              <Text style={styles.contactLabelSmall}>Primary Mobile</Text>
              <Text style={styles.contactValueBold}>+91 98XXX XX452</Text>
            </View>
          </View>

          <View style={styles.rowDivider} />

          {/* Emergency Contact */}
          <View style={styles.contactRow}>
            <View style={[styles.iconCircleGray, { backgroundColor: '#FFEBEE' }]}>
              <Text style={styles.phoneEmoji}>🆘</Text>
            </View>
            <View style={styles.contactTextCol}>
              <Text style={styles.contactLabelSmall}>Emergency Contact</Text>
              <Text style={styles.contactValueBold}>Ramesh K (Father)</Text>
              <Text style={styles.contactSubNumber}>+91 94432 11890</Text>
            </View>
            <TouchableOpacity style={styles.callTextBtn} activeOpacity={0.7}>
              <Text style={styles.callBtnText}>CALL</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SOS History Section */}
        <Text style={styles.sosHistorySectionTitle}>SOS History</Text>

        {/* History Item 1: Active Now */}
        <TouchableOpacity
          style={styles.historyCard}
          onPress={() => onNavigate && onNavigate('sos_details')}
          activeOpacity={0.75}
        >
          <View style={styles.redBarAccent} />
          <View style={styles.historyCardInner}>
            <View style={styles.historyTopRow}>
              <View style={styles.historyTitleWrap}>
                <Text style={styles.redAsterisk}>✻</Text>
                <Text style={styles.historyIdBold}>SOS-1024</Text>
              </View>
              <View style={styles.activeNowBadge}>
                <Text style={styles.activeNowBadgeText}>ACTIVE NOW</Text>
              </View>
            </View>
            <Text style={styles.historySub}>
              Dispatched: Patrol Unit Alpha-3. ETA 2 mins.
            </Text>
          </View>
        </TouchableOpacity>

        {/* History Item 2: Resolved */}
        <View style={styles.historyCardPlain}>
          <View style={styles.historyIconCircleGray}>
            <Text style={styles.historyClockEmoji}>🕒</Text>
          </View>
          <View style={styles.historyInfo}>
            <Text style={styles.historyIdPlain}>SOS-0942</Text>
            <Text style={styles.historyDateText}>12 May 2026, 14:30 HRS</Text>
          </View>
          <View style={styles.resolvedBadge}>
            <Text style={styles.resolvedBadgeText}>RESOLVED</Text>
          </View>
        </View>

        {/* History Item 3: Cancelled */}
        <View style={styles.historyCardPlain}>
          <View style={styles.historyIconCircleGray}>
            <Text style={styles.historyCrossEmoji}>✕</Text>
          </View>
          <View style={styles.historyInfo}>
            <Text style={styles.historyIdPlain}>SOS-0811</Text>
            <Text style={styles.historyDateText}>04 Feb 2026, 09:15 HRS</Text>
          </View>
          <View style={styles.cancelledBadge}>
            <Text style={styles.cancelledBadgeText}>CANCELLED</Text>
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
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  citizenPhoto: {
    width: 68,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  nameTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#191C1D',
    marginBottom: 8,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  grayPill: {
    backgroundColor: '#E8ECF2',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
  },
  grayPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#454652',
  },
  verifiedPill: {
    backgroundColor: '#E8ECF2',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  verifiedPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#191C1D',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeaderLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000B58',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  iconCircleGray: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECECF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  phoneEmoji: {
    fontSize: 18,
  },
  contactTextCol: {
    flex: 1,
  },
  contactLabelSmall: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  contactValueBold: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
    marginTop: 1,
  },
  contactSubNumber: {
    fontSize: 12,
    color: '#5A5D6B',
    marginTop: 2,
  },
  callTextBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  callBtnText: {
    color: '#000B58',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F3F4F9',
    marginVertical: 10,
  },
  sosHistorySectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000B58',
    marginBottom: 12,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  redBarAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#B6171E',
  },
  historyCardInner: {
    paddingLeft: 18,
    paddingRight: 14,
    paddingVertical: 14,
  },
  historyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  historyTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redAsterisk: {
    color: '#B6171E',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 6,
  },
  historyIdBold: {
    fontSize: 16,
    fontWeight: '900',
    color: '#191C1D',
  },
  activeNowBadge: {
    backgroundColor: '#B6171E',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  activeNowBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  historySub: {
    fontSize: 12,
    color: '#454652',
    lineHeight: 16,
  },
  historyCardPlain: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E7',
  },
  historyIconCircleGray: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECECF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyClockEmoji: {
    fontSize: 16,
  },
  historyCrossEmoji: {
    fontSize: 14,
    color: '#767683',
    fontWeight: '900',
  },
  historyInfo: {
    flex: 1,
  },
  historyIdPlain: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
  },
  historyDateText: {
    fontSize: 11,
    color: '#767683',
    marginTop: 2,
  },
  resolvedBadge: {
    backgroundColor: '#E8ECF2',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  resolvedBadgeText: {
    color: '#454652',
    fontSize: 10,
    fontWeight: '700',
  },
  cancelledBadge: {
    backgroundColor: '#E8ECF2',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  cancelledBadgeText: {
    color: '#767683',
    fontSize: 10,
    fontWeight: '700',
  },
});
