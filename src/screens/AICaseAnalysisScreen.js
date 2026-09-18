import React, { useState } from 'react';
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

export default function AICaseAnalysisScreen({ onNavigate, onBack, route }) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    Alert.alert('AI Action Applied', 'Priority set to CRITICAL. Field patrol unit alerted.', [
      { text: 'View Case', onPress: () => onNavigate && onNavigate('case_details') },
      { text: 'OK' },
    ]);
  };

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
        <Text style={styles.headerTitle}>AI CASE ANALYSIS</Text>
        <TouchableOpacity
          style={styles.helpBtn}
          onPress={() =>
            Alert.alert(
              'About AI Assistant',
              'AI assists law enforcement by prioritizing emergency severity, detecting repeat crime patterns, and calculating officer ETA.'
            )
          }
          activeOpacity={0.7}
        >
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Case Context Row */}
        <View style={styles.contextRow}>
          <Text style={styles.contextLabel}>CASE CONTEXT</Text>
          <View style={styles.contextPill}>
            <Text style={styles.contextPillText}>📁 CMP-2045</Text>
          </View>
        </View>

        {/* Main AI Confidence Card */}
        <View style={styles.aiCard}>
          <View style={styles.aiCardHeader}>
            <View style={styles.aiActiveBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.aiActiveText}>AI ACTIVE</Text>
            </View>

            <View style={styles.confidenceCol}>
              <Text style={styles.confidenceLabel}>AI Confidence</Text>
              <Text style={styles.confidenceValue}>92%</Text>
            </View>
          </View>

          {/* Category & Risk Level */}
          <View style={styles.catRiskRow}>
            <View style={styles.catBox}>
              <Text style={styles.boxLabel}>Category</Text>
              <Text style={styles.boxVal}>Cyber Fraud</Text>
            </View>

            <View style={styles.riskBox}>
              <Text style={styles.boxLabel}>Risk Level</Text>
              <Text style={styles.riskVal}>⚠ HIGH</Text>
            </View>
          </View>

          {/* Priority Status Card */}
          <View style={styles.priorityBox}>
            <View>
              <Text style={styles.priorityLabel}>Priority Status</Text>
              <Text style={styles.priorityVal}>CRITICAL</Text>
            </View>
            <Text style={styles.asteriskIcon}>✱</Text>
          </View>

          {/* Recommendation */}
          <View style={styles.recommendationCard}>
            <View style={styles.recAccentBar} />
            <View style={styles.recInner}>
              <View style={styles.recHeaderRow}>
                <Text style={styles.gearIcon}>⚙</Text>
                <Text style={styles.recTitle}>RECOMMENDATION</Text>
              </View>
              <Text style={styles.recText}>Immediate officer response recommended.</Text>
            </View>
          </View>
        </View>

        {/* Legal Note Box */}
        <View style={styles.legalBox}>
          <Text style={styles.legalIcon}>⚖</Text>
          <Text style={styles.legalText}>
            <Text style={styles.legalBold}>Legal Note:</Text> AI is decision support. Final action
            remains with the authorized officer.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.btnSection}>
          <TouchableOpacity
            style={[styles.acceptBtn, accepted && styles.acceptBtnActive]}
            onPress={handleAccept}
            activeOpacity={0.8}
          >
            <Text style={styles.acceptBtnText}>
              {accepted ? '✔ RECOMMENDATION ACCEPTED' : '✔ ACCEPT RECOMMENDATION'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dualBtnRow}>
            <TouchableOpacity
              style={styles.outlineHalfBtn}
              onPress={() => Alert.alert('Priority Option', 'Select new priority: HIGH, MEDIUM, LOW')}
              activeOpacity={0.75}
            >
              <Text style={styles.outlineHalfBtnText}>CHANGE PRIORITY</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.outlineHalfBtn}
              onPress={() => onNavigate && onNavigate('case_details')}
              activeOpacity={0.75}
            >
              <Text style={styles.outlineHalfBtnText}>VIEW CASE</Text>
            </TouchableOpacity>
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
  helpBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
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
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contextLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5A5D6B',
    letterSpacing: 0.5,
    marginRight: 10,
  },
  contextPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  contextPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1C20',
  },
  aiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  aiCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  aiActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E4FE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000666',
    marginRight: 6,
  },
  aiActiveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000666',
    letterSpacing: 0.5,
  },
  confidenceCol: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: 11,
    color: '#5A5D6B',
    fontWeight: '600',
  },
  confidenceValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#B51A1B',
    letterSpacing: -0.5,
    marginTop: 2,
  },
  catRiskRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  catBox: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginRight: 6,
  },
  riskBox: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginLeft: 6,
  },
  boxLabel: {
    fontSize: 11,
    color: '#5A5D6B',
    fontWeight: '500',
    marginBottom: 4,
  },
  boxVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  riskVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B51A1B',
  },
  priorityBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priorityLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B51A1B',
    marginBottom: 2,
  },
  priorityVal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#B51A1B',
    letterSpacing: 0.5,
  },
  asteriskIcon: {
    fontSize: 28,
    color: '#B51A1B',
    fontWeight: '900',
  },
  recommendationCard: {
    backgroundColor: '#FBF8FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    overflow: 'hidden',
    position: 'relative',
  },
  recAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#000666',
  },
  recInner: {
    paddingLeft: 16,
    paddingRight: 14,
    paddingVertical: 14,
  },
  recHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  gearIcon: {
    fontSize: 15,
    marginRight: 6,
    color: '#000666',
  },
  recTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.5,
  },
  recText: {
    fontSize: 13.5,
    color: '#1A1C20',
    fontWeight: '600',
    lineHeight: 19,
  },
  legalBox: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 14,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  legalIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#5A5D6B',
  },
  legalText: {
    flex: 1,
    fontSize: 11.5,
    color: '#5A5D6B',
    lineHeight: 17,
  },
  legalBold: {
    fontWeight: '700',
    color: '#1A1C20',
  },
  btnSection: {
    marginTop: 4,
  },
  acceptBtn: {
    backgroundColor: '#000666',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  acceptBtnActive: {
    backgroundColor: '#10B981',
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dualBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineHalfBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000666',
    paddingVertical: 13,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  outlineHalfBtnText: {
    color: '#000666',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
