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

export default function ComplainantScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('case_details'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>COMPLAINANT</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Image source={BELL_ICON} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Case Context Subtitle */}
        <View style={styles.contextRow}>
          <Text style={styles.contextText}>📁 CASE W-1042</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.avatarCircle}>
              <Image source={USER_ICON} style={styles.avatarIcon} resizeMode="contain" />
            </View>
            <View style={styles.profileNameCol}>
              <Text style={styles.profileName}>Arun Kumar</Text>
              <Text style={styles.profileAge}>Age: 32</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📞</Text>
            <View>
              <Text style={styles.contactLabel}>Primary Phone</Text>
              <Text style={styles.contactValue}>+91 98765 43210</Text>
            </View>
          </View>

          <View style={[styles.contactItem, { marginTop: 12 }]}>
            <Text style={styles.contactIcon}>📍</Text>
            <View>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>Gandhipuram, Coimbatore</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact Card */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Text style={styles.emergencyAsterisk}>✱</Text>
            <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          </View>

          <View style={styles.emergencyBox}>
            <Text style={styles.emergencyNumber}>+91 99999 88888</Text>
            <TouchableOpacity
              style={styles.callGreenBtn}
              onPress={() => Alert.alert('Emergency Call', 'Dialing emergency contact: +91 99999 88888')}
              activeOpacity={0.8}
            >
              <Text style={styles.callGreenText}>📞 CALL</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Previous Complaints History */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Previous Complaints History</Text>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyTopRow}>
            <Text style={styles.historyCaseId}>C-1021</Text>
            <View style={styles.tagResolved}>
              <Text style={styles.tagResolvedText}>RESOLVED</Text>
            </View>
          </View>
          <Text style={styles.historyIncidentType}>Harassment</Text>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyTopRow}>
            <Text style={styles.historyCaseId}>C-0987</Text>
            <View style={styles.tagClosed}>
              <Text style={styles.tagClosedText}>CLOSED</Text>
            </View>
          </View>
          <Text style={styles.historyIncidentType}>Domestic Violence</Text>
        </View>

        <View style={styles.bottomDivider} />

        {/* Return Button */}
        <TouchableOpacity
          style={styles.returnBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('case_details'))}
          activeOpacity={0.8}
        >
          <Text style={styles.returnBtnText}>Return to Case Details</Text>
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
  contextRow: {
    marginBottom: 14,
  },
  contextText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5A5D6B',
  },
  profileCard: {
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
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarIcon: {
    width: 24,
    height: 24,
    tintColor: '#000666',
  },
  profileNameCol: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1C20',
  },
  profileAge: {
    fontSize: 13,
    color: '#767683',
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginVertical: 14,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  contactLabel: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
    marginTop: 2,
  },
  emergencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 16,
    marginBottom: 20,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyAsterisk: {
    color: '#B51A1B',
    fontSize: 18,
    marginRight: 6,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  emergencyBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  emergencyNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  callGreenBtn: {
    backgroundColor: '#10B981',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  callGreenText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionHeaderRow: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000666',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 10,
  },
  historyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyCaseId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5A5D6B',
  },
  tagResolved: {
    backgroundColor: '#000666',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
  },
  tagResolvedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  tagClosed: {
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
  },
  tagClosedText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  historyIncidentType: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  bottomDivider: {
    height: 1,
    backgroundColor: '#D9D8E6',
    marginVertical: 14,
  },
  returnBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000666',
    paddingVertical: 14,
    alignItems: 'center',
  },
  returnBtnText: {
    color: '#000666',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
