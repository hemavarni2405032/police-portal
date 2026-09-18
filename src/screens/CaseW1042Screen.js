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

export default function CaseW1042Screen({ onNavigate, onBack }) {
  const handleResolve = () => {
    Alert.alert(
      'Resolve Case W-1042',
      'Confirm closing this domestic violence report. Legal documentation and complainant follow-up will be archived.',
      [
        {
          text: 'Confirm Resolution',
          onPress: () => {
            Alert.alert('Resolved', 'Case W-1042 marked as resolved.');
            onNavigate && onNavigate('case_report');
          },
        },
        { text: 'Cancel', style: 'cancel' },
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
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('dashboard'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CASE W-1042</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Image source={BELL_ICON} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.caseTitle}>Domestic Violence</Text>
            <View style={styles.tagActive}>
              <Text style={styles.tagActiveText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.datePriorityRow}>
            <Text style={styles.dateText}>01 Sep 2026 • 10:42 AM</Text>
            <View style={styles.tagCritical}>
              <Text style={styles.tagCriticalText}>CRITICAL</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.locationRow}>
            <Text style={styles.locPin}>📍</Text>
            <Text style={styles.locText}>Gandhipuram, Coimbatore Zone 3</Text>
          </View>
        </View>

        {/* 2 Dual Cards: Complainant & Assigned Officer */}
        <View style={styles.dualCardsRow}>
          {/* Complainant */}
          <TouchableOpacity
            style={styles.halfCard}
            onPress={() => onNavigate && onNavigate('complainant')}
            activeOpacity={0.75}
          >
            <View style={styles.halfCardTop}>
              <Image source={USER_ICON} style={styles.halfCardIcon} resizeMode="contain" />
              <Image source={CHEVRON_ICON} style={styles.halfCardChevron} resizeMode="contain" />
            </View>
            <Text style={styles.halfCardLabel}>COMPLAINANT</Text>
            <Text style={styles.halfCardValue}>Anitha R.</Text>
          </TouchableOpacity>

          {/* Assigned Officer */}
          <TouchableOpacity
            style={styles.halfCard}
            onPress={() => onNavigate && onNavigate('station_details')}
            activeOpacity={0.75}
          >
            <View style={styles.halfCardTop}>
              <Text style={styles.shieldIcon}>🛡</Text>
              <Image source={CHEVRON_ICON} style={styles.halfCardChevron} resizeMode="contain" />
            </View>
            <Text style={styles.halfCardLabel}>ASSIGNED TO</Text>
            <Text style={styles.halfCardValue}>Insp. Kumar</Text>
          </TouchableOpacity>
        </View>

        {/* AI Analysis Yellow Card */}
        <TouchableOpacity
          style={styles.aiRiskCard}
          onPress={() => onNavigate && onNavigate('ai_domestic')}
          activeOpacity={0.8}
        >
          <View style={styles.aiIconCircle}>
            <Text style={styles.aiEmoji}>🧠</Text>
          </View>
          <View style={styles.aiTextCol}>
            <Text style={styles.aiCardLabel}>AI ANALYSIS</Text>
            <Text style={styles.aiRiskValue}>Medium Risk Indicator</Text>
          </View>
          <Image source={CHEVRON_ICON} style={styles.aiChevron} resizeMode="contain" />
        </TouchableOpacity>

        {/* Options List */}
        <View style={styles.optionsList}>
          {/* Incident Details */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => onNavigate && onNavigate('case_details')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionEmoji}>📄</Text>
            <Text style={styles.optionTitle}>Incident Details</Text>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>

          {/* Evidence */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => onNavigate && onNavigate('evidence')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionEmoji}>📁</Text>
            <View style={styles.optionTitleWithBadge}>
              <Text style={styles.optionTitle}>Evidence</Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgePillText}>3 Items</Text>
              </View>
            </View>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>

          {/* Location Map View */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => onNavigate && onNavigate('jurisdiction')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionEmoji}>🗺</Text>
            <Text style={styles.optionTitle}>Location Map View</Text>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>

          {/* Status Timeline */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => Alert.alert('Timeline', '10:42 AM Report Created\n10:48 AM Officer Kumar Dispatched\n11:05 AM On Site')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionEmoji}>⏱</Text>
            <Text style={styles.optionTitle}>Status Timeline</Text>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>

          {/* Related Cases */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => onNavigate && onNavigate('case_report')}
            activeOpacity={0.7}
          >
            <Text style={styles.optionEmoji}>🔗</Text>
            <View style={styles.optionTitleWithBadge}>
              <Text style={styles.optionTitle}>Related Cases</Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgePillText}>2</Text>
              </View>
            </View>
            <Image source={CHEVRON_ICON} style={styles.chevronIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Resolve Button */}
        <TouchableOpacity style={styles.resolveBtn} onPress={handleResolve} activeOpacity={0.8}>
          <Text style={styles.resolveBtnText}>✔ RESOLVE CASE</Text>
        </TouchableOpacity>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1C20',
  },
  tagActive: {
    backgroundColor: '#000666',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagActiveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  datePriorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#767683',
  },
  tagCritical: {
    backgroundColor: '#B51A1B',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagCriticalText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locPin: {
    fontSize: 15,
    marginRight: 6,
  },
  locText: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '500',
  },
  dualCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  halfCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginHorizontal: 4,
  },
  halfCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  halfCardIcon: {
    width: 16,
    height: 18,
    tintColor: '#000666',
  },
  shieldIcon: {
    fontSize: 18,
  },
  halfCardChevron: {
    width: 10,
    height: 10,
    tintColor: '#C6C5D4',
  },
  halfCardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#767683',
    letterSpacing: 0.5,
  },
  halfCardValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
    marginTop: 2,
  },
  aiRiskCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  aiIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiEmoji: {
    fontSize: 20,
  },
  aiTextCol: {
    flex: 1,
  },
  aiCardLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  aiRiskValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
    marginTop: 2,
  },
  aiChevron: {
    width: 12,
    height: 12,
    tintColor: '#92400E',
  },
  optionsList: {
    marginBottom: 20,
  },
  optionRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionEmoji: {
    fontSize: 18,
    marginRight: 14,
  },
  optionTitleWithBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  badgePill: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgePillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#5A5D6B',
  },
  chevronIcon: {
    width: 12,
    height: 12,
    tintColor: '#C6C5D4',
  },
  resolveBtn: {
    backgroundColor: '#000666',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  resolveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
