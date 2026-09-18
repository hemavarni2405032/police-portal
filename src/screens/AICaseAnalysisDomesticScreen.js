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
const CHEVRON_ICON = require('../../assets/details/icon_chevron.png');

export default function AICaseAnalysisDomesticScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Navy Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('case_w1042'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI CASE ANALYSIS</Text>
        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => Alert.alert('Notifications', 'No new alerts for Case W-1042')}
          activeOpacity={0.7}
        >
          <Image source={BELL_ICON} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Case Focus */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>AI CASE ANALYSIS</Text>
          <View style={styles.caseFocusRow}>
            <Text style={styles.folderIcon}>📁</Text>
            <Text style={styles.caseFocusText}>Case Focus: W-1042 (Domestic Violence)</Text>
          </View>
        </View>

        {/* Risk Assessment Card */}
        <View style={styles.riskCard}>
          <View style={styles.riskTopRow}>
            <Text style={styles.riskCardTitle}>Risk Assessment</Text>
            <View style={styles.mediumPill}>
              <Text style={styles.mediumPillText}>▲ MEDIUM</Text>
            </View>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreNumber}>82%</Text>
            <Text style={styles.scoreLabel}>Confidence Score</Text>
          </View>

          {/* Progress Bar (82%) */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '82%' }]} />
          </View>
        </View>

        {/* Two Metric Boxes: Location Risk & Repeat Pattern */}
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <View style={styles.metricHeaderRow}>
              <Text style={styles.metricIcon}>📍</Text>
              <Text style={styles.metricLabel}>LOCATION RISK</Text>
            </View>
            <Text style={styles.highRiskText}>HIGH</Text>
          </View>

          <View style={styles.metricBox}>
            <View style={styles.metricHeaderRow}>
              <Text style={styles.metricIcon}>⏱</Text>
              <Text style={styles.metricLabel}>REPEAT PATTERN</Text>
            </View>
            <Text style={styles.mediumRiskText}>MEDIUM</Text>
          </View>
        </View>

        {/* Time Pattern Box */}
        <View style={styles.timePatternBox}>
          <View style={styles.timeHeaderRow}>
            <Text style={styles.timeIcon}>⏱</Text>
            <Text style={styles.timeLabel}>TIME PATTERN</Text>
          </View>
          <Text style={styles.timeValueText}>
            MEDIUM <Text style={styles.timeSubText}>(Frequent late night occurrences)</Text>
          </Text>
        </View>

        {/* AI Recommendations Section */}
        <View style={styles.recSectionCard}>
          <View style={styles.recHeaderRow}>
            <Text style={styles.recSectionIcon}>💡</Text>
            <Text style={styles.recSectionTitle}>AI Recommendations</Text>
          </View>

          {/* Rec 1 */}
          <TouchableOpacity
            style={styles.recItemBox}
            onPress={() => onNavigate && onNavigate('evidence')}
            activeOpacity={0.75}
          >
            <Text style={styles.recItemIcon}>📹</Text>
            <Text style={styles.recItemText}>Review CCTV footage from adjacent street</Text>
          </TouchableOpacity>

          {/* Rec 2 */}
          <TouchableOpacity
            style={styles.recItemBox}
            onPress={() => onNavigate && onNavigate('case_management')}
            activeOpacity={0.75}
          >
            <Text style={styles.recItemIcon}>📄</Text>
            <Text style={styles.recItemText}>Check Related Complaints in zone B</Text>
          </TouchableOpacity>

          {/* Rec 3 */}
          <TouchableOpacity
            style={styles.recItemBox}
            onPress={() => Alert.alert('Forensic Verification', 'Physical evidence request logged for forensic team.')}
            activeOpacity={0.75}
          >
            <Text style={styles.recItemIcon}>🛡</Text>
            <Text style={styles.recItemText}>Verify physical evidence with forensics</Text>
          </TouchableOpacity>
        </View>

        {/* Related Pattern Cases */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedSectionTitle}>Related Pattern Cases</Text>

          <View style={styles.relatedCardsRow}>
            {/* Case W-1039 */}
            <TouchableOpacity
              style={styles.relatedCard}
              onPress={() => onNavigate && onNavigate('case_details')}
              activeOpacity={0.8}
            >
              <View style={styles.relatedTopRow}>
                <Text style={styles.relatedCaseId}>W-1039</Text>
                <Image source={CHEVRON_ICON} style={styles.relatedChevron} resizeMode="contain" />
              </View>
              <View style={styles.matchPill}>
                <Text style={styles.matchPillText}>85% Match</Text>
              </View>
              <Text style={styles.relatedCrime}>Domestic Dispute</Text>
            </TouchableOpacity>

            {/* Case W-1032 */}
            <TouchableOpacity
              style={styles.relatedCard}
              onPress={() => onNavigate && onNavigate('case_details')}
              activeOpacity={0.8}
            >
              <View style={styles.relatedTopRow}>
                <Text style={styles.relatedCaseId}>W-1032</Text>
                <Image source={CHEVRON_ICON} style={styles.relatedChevron} resizeMode="contain" />
              </View>
              <View style={styles.matchPill}>
                <Text style={styles.matchPillText}>78% Match</Text>
              </View>
              <Text style={styles.relatedCrime}>Disturbance</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 28 }} />
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
    backgroundColor: '#F8FAFC',
  },
  scrollInner: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  caseFocusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  folderIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  caseFocusText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  riskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  riskTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  mediumPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  mediumPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 42,
    fontWeight: '800',
    color: '#D97706',
    marginRight: 10,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D97706',
    borderRadius: 4,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  metricHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  highRiskText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#DC2626',
  },
  mediumRiskText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D97706',
  },
  timePatternBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    marginHorizontal: 4,
  },
  timeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  timeIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  timeValueText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#D97706',
  },
  timeSubText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  recSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    marginHorizontal: 4,
  },
  recHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recSectionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  recSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  recItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  recItemIcon: {
    fontSize: 15,
    marginRight: 10,
  },
  recItemText: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  relatedSection: {
    marginHorizontal: 4,
  },
  relatedSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  relatedCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  relatedCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  relatedTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  relatedCaseId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  relatedChevron: {
    width: 12,
    height: 12,
    tintColor: '#94A3B8',
  },
  matchPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  matchPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  relatedCrime: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
