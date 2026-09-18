import React from 'react';
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

const BACK_ICON = require('../../assets/details/icon_back.png');
const BELL_ICON = require('../../assets/dashboard/icon_bell_white.png');
const USER_ICON = require('../../assets/details/icon_user.png');
const CHEVRON_ICON = require('../../assets/details/icon_chevron.png');

export default function CaseDetailsScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('case_management'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CASE DETAILS</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Image source={BELL_ICON} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Case ID and Badges */}
        <View style={styles.titleRow}>
          <Text style={styles.caseNumber}>#CMP-2047</Text>
          <View style={styles.tagHigh}>
            <Text style={styles.tagHighText}>! HIGH</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.tagNew}>
            <Text style={styles.tagNewText}>NEW</Text>
          </View>
          <Text style={styles.timeText}>⏱ 14 mins ago</Text>
        </View>

        {/* Category & Location Card */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.circleEmoji}>⚓</Text>
            </View>
            <View>
              <Text style={styles.subLabel}>Category</Text>
              <Text style={styles.mainText}>Cyber Fraud</Text>
            </View>
          </View>

          <View style={styles.overviewDivider} />

          <View style={styles.overviewItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.circleEmoji}>📍</Text>
            </View>
            <View>
              <Text style={styles.subLabel}>Location</Text>
              <Text style={styles.mainText}>Saibaba Colony</Text>
            </View>
          </View>
        </View>

        {/* Incident Details Card */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Incident Details</Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailsTopRow}>
            <View style={styles.detailBox}>
              <Text style={styles.subLabel}>Fraud Type</Text>
              <View style={styles.detailBoxInner}>
                <Text style={styles.detailBoxText}>UPI Phishing</Text>
              </View>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.subLabel}>Reported Amount</Text>
              <View style={[styles.detailBoxInner, styles.amountBox]}>
                <Text style={styles.amountText}>₹45,000</Text>
              </View>
            </View>
          </View>

          <Text style={[styles.subLabel, { marginTop: 12, marginBottom: 6 }]}>
            Involved Phone Number
          </Text>
          <View style={styles.phoneBox}>
            <Text style={styles.phoneText}>+91 98765 43210</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Copied', '+91 98765 43210 copied to clipboard')}
            >
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.subLabel, { marginTop: 14, marginBottom: 4 }]}>
            Victim Statement Summary
          </Text>
          <Text style={styles.statementText}>
            Citizen reported that he received a call claiming to be bank verification. Shared OTP
            resulting in immediate deduction of funds from primary account.
          </Text>
        </View>

        {/* Complainant Card */}
        <View style={styles.complainantCard}>
          <Text style={[styles.subLabel, { marginBottom: 12 }]}>COMPLAINANT</Text>
          <View style={styles.complainantRow}>
            <View style={styles.complainantAvatar}>
              <Image source={USER_ICON} style={styles.avatarIcon} resizeMode="contain" />
            </View>
            <View style={styles.complainantTextCol}>
              <Text style={styles.complainantName}>Arun Kumar</Text>
              <Text style={styles.complainantPhone}>+91 XXXXX XXXXX</Text>
              <Text style={styles.complainantId}>CIT-1024</Text>
            </View>
          </View>

          <View style={styles.complainantActionsRow}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Alert.alert('Call', 'Connecting call to citizen Arun Kumar...')}
              activeOpacity={0.75}
            >
              <Text style={styles.callBtnText}>📞 CALL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewCitizenBtn}
              onPress={() => onNavigate && onNavigate('complainant')}
              activeOpacity={0.75}
            >
              <Text style={styles.viewCitizenBtnText}>👁 VIEW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Links Row */}
        <View style={styles.linksCard}>
          {/* AI Case Analysis Link */}
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => onNavigate && onNavigate('ai_analysis')}
            activeOpacity={0.7}
          >
            <View style={[styles.linkIconCircle, { backgroundColor: '#E0E4FE' }]}>
              <Text style={styles.linkEmoji}>🤖</Text>
            </View>
            <View style={styles.linkTextCol}>
              <Text style={styles.linkTitle}>AI Case Analysis</Text>
              <Text style={styles.linkSub}>View automated insights</Text>
            </View>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>

          <View style={styles.linkDivider} />

          {/* Evidence Link */}
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => onNavigate && onNavigate('evidence')}
            activeOpacity={0.7}
          >
            <View style={[styles.linkIconCircle, { backgroundColor: '#F3F4F6' }]}>
              <Text style={styles.linkEmoji}>📁</Text>
            </View>
            <View style={styles.linkTextCol}>
              <Text style={styles.linkTitle}>Evidence</Text>
              <Text style={styles.linkSub}>CCTV Footage, Vehicle Photo...</Text>
            </View>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>

          <View style={styles.linkDivider} />

          {/* Assigned Officer Link */}
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => onNavigate && onNavigate('station_details')}
            activeOpacity={0.7}
          >
            <View style={[styles.linkIconCircle, { backgroundColor: '#E0E4FE' }]}>
              <Text style={styles.linkEmoji}>👮</Text>
            </View>
            <View style={styles.linkTextCol}>
              <Text style={styles.linkTitle}>Assigned Officer</Text>
              <Text style={styles.linkSub}>Officer Kumar</Text>
            </View>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Evidence Attachments */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Evidence</Text>
          <Text style={styles.itemsCount}>2 Items</Text>
        </View>

        <TouchableOpacity
          style={styles.evidenceItemCard}
          onPress={() => onNavigate && onNavigate('evidence')}
          activeOpacity={0.7}
        >
          <View style={styles.evidenceIconBox}>
            <Text style={styles.evidenceEmoji}>🖼</Text>
          </View>
          <View style={styles.evidenceTextCol}>
            <Text style={styles.evidenceFileName}>sms_screenshot_01.jpg</Text>
            <Text style={styles.evidenceMeta}>Uploaded by Victim • 1.2 MB</Text>
          </View>
          <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.evidenceItemCard}
          onPress={() => onNavigate && onNavigate('evidence')}
          activeOpacity={0.7}
        >
          <View style={styles.evidenceIconBox}>
            <Text style={styles.evidenceEmoji}>📄</Text>
          </View>
          <View style={styles.evidenceTextCol}>
            <Text style={styles.evidenceFileName}>bank_statement_jun.pdf</Text>
            <Text style={styles.evidenceMeta}>System Generated • 450 KB</Text>
          </View>
          <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
        </TouchableOpacity>

        {/* Bottom Actions */}
        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            style={styles.statusUpdateBtn}
            onPress={() => Alert.alert('Update Status', 'Mark case as: IN PROGRESS, RESOLVED, or CLOSED')}
            activeOpacity={0.75}
          >
            <Text style={styles.statusUpdateText}>UPDATE STATUS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addNoteBtn}
            onPress={() => Alert.alert('Add Note', 'Enter case notes')}
            activeOpacity={0.75}
          >
            <Text style={styles.addNoteText}>ADD NOTE</Text>
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
    height: 48,
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
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  bellBtn: {
    padding: 6,
  },
  bellIcon: {
    width: 18,
    height: 20,
    tintColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FBF8FF',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  caseNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: -0.3,
  },
  tagHigh: {
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagHighText: {
    color: '#B51A1B',
    fontSize: 11,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagNew: {
    backgroundColor: '#E0E4FE',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  tagNewText: {
    color: '#000666',
    fontSize: 10,
    fontWeight: '800',
  },
  timeText: {
    fontSize: 12,
    color: '#767683',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 16,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginVertical: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  circleEmoji: {
    fontSize: 18,
  },
  subLabel: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '600',
  },
  mainText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000666',
  },
  itemsCount: {
    fontSize: 12,
    color: '#767683',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 16,
    marginBottom: 16,
  },
  detailsTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailBox: {
    flex: 1,
    marginRight: 6,
  },
  detailBoxInner: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  detailBoxText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1C20',
  },
  amountBox: {
    backgroundColor: '#FEE2E2',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B51A1B',
  },
  phoneBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  phoneText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A1C20',
  },
  copyIcon: {
    fontSize: 16,
  },
  statementText: {
    fontSize: 12.5,
    color: '#454652',
    lineHeight: 18,
    marginTop: 4,
  },
  complainantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 16,
    marginBottom: 16,
  },
  complainantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  complainantAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarIcon: {
    width: 20,
    height: 20,
    tintColor: '#475569',
  },
  complainantTextCol: {
    flex: 1,
  },
  complainantName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C20',
  },
  complainantPhone: {
    fontSize: 12,
    color: '#5A5D6B',
    marginTop: 2,
  },
  complainantId: {
    fontSize: 11,
    color: '#767683',
    marginTop: 2,
  },
  complainantActionsRow: {
    flexDirection: 'row',
  },
  callBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 6,
  },
  callBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1C20',
  },
  viewCitizenBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 6,
  },
  viewCitizenBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000666',
  },
  linksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 8,
    marginBottom: 16,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  linkIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  linkEmoji: {
    fontSize: 18,
  },
  linkTextCol: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  linkSub: {
    fontSize: 11.5,
    color: '#767683',
    marginTop: 2,
  },
  linkDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginHorizontal: 8,
  },
  chevronIcon: {
    width: 12,
    height: 12,
    tintColor: '#C6C5D4',
  },
  evidenceItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  evidenceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2D3748',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  evidenceEmoji: {
    fontSize: 18,
  },
  evidenceTextCol: {
    flex: 1,
  },
  evidenceFileName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A1C20',
  },
  evidenceMeta: {
    fontSize: 11.5,
    color: '#767683',
    marginTop: 2,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statusUpdateBtn: {
    flex: 1,
    backgroundColor: '#E0E4FE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 6,
  },
  statusUpdateText: {
    color: '#000666',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  addNoteBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 6,
  },
  addNoteText: {
    color: '#1A1C20',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
