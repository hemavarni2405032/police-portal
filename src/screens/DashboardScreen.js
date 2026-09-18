import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Assets
const POLICE_LOGO = require('../../assets/dashboard/image2_0_1.jpg');
const WATERMARK_IMG = require('../../assets/dashboard/image1_0_1.jpg');
const BACK_ICON = require('../../assets/details/icon_back.png');

const BADGE_AI = require('../../assets/dashboard/badge_ai_analysis.png');
const BADGE_MAP = require('../../assets/dashboard/badge_live_map.png');
const BADGE_EVIDENCE = require('../../assets/dashboard/badge_evidence.png');
const BADGE_WOMEN = require('../../assets/dashboard/badge_women_safety.png');
const BADGE_OFFICERS = require('../../assets/dashboard/badge_officers.png');
const BADGE_SOS = require('../../assets/dashboard/badge_sos.png');
const BADGE_ANALYTICS = require('../../assets/dashboard/badge_analytics.png');
const BADGE_LHMS = require('../../assets/dashboard/badge_lhms.png');
const BADGE_SENIOR = require('../../assets/dashboard/badge_senior_citizen.png');
const BADGE_LOST = require('../../assets/dashboard/badge_lost_items.png');
const BADGE_TRACK = require('../../assets/dashboard/badge_track_trip.png');
const BADGE_CYBER = require('../../assets/dashboard/badge_cyber_complaints.png');
const BADGE_CASES = require('../../assets/dashboard/badge_cases.png');
const BADGE_STATIONS = require('../../assets/dashboard/badge_stations.png');

export default function DashboardScreen({ onNavigate, onBack }) {
  const featureList = [
    // Row 1: Active SOS Alerts & Women Safety Escort
    {
      id: 'sos',
      title: 'ACTIVE SOS\nALERTS',
      badge: BADGE_SOS,
      target: 'citizen_sos_screen',
    },
    {
      id: 'women_safety',
      title: 'WOMEN SAFETY\n& ESCORT',
      badge: BADGE_WOMEN,
      target: 'citizen_service_requests',
      params: { initialCategory: 'WOMEN_NIGHT_ESCORT' },
    },

    // Row 2: Senior Citizen Care & Locked House Monitoring (LHMS)
    {
      id: 'senior_citizen',
      title: 'SENIOR CITIZEN\nCARE',
      badge: BADGE_SENIOR,
      target: 'senior_citizen_care',
    },
    {
      id: 'lhms',
      title: 'LOCKED HOUSE\n(LHMS)',
      badge: BADGE_LHMS,
      target: 'citizen_service_requests',
      params: { initialCategory: 'LHMS' },
    },

    // Row 3: Lost Items & Track My Trip
    {
      id: 'lost_items',
      title: 'LOST ITEMS\nREPORT',
      badge: BADGE_LOST,
      target: 'citizen_service_requests',
      params: { initialCategory: 'LOST_ITEMS' },
    },
    {
      id: 'track_trip',
      title: 'TRACK MY\nTRIP',
      badge: BADGE_TRACK,
      target: 'citizen_service_requests',
      params: { initialCategory: 'TRACK_MY_TRIP' },
    },

    // Row 4: Cyber Complaints & Cases & Investigation
    {
      id: 'cyber_complaints',
      title: 'CYBER\nCOMPLAINTS',
      badge: BADGE_CYBER,
      target: 'citizen_service_requests',
      params: { initialCategory: 'CYBER_COMPLAINTS' },
    },
    {
      id: 'cases',
      title: 'CASES &\nINVESTIGATION',
      badge: BADGE_CASES,
      target: 'case_management',
    },

    // Row 5: Police Officers & Police Stations
    {
      id: 'officers',
      title: 'POLICE\nOFFICERS',
      badge: BADGE_OFFICERS,
      target: 'officers',
    },
    {
      id: 'stations',
      title: 'POLICE\nSTATIONS',
      badge: BADGE_STATIONS,
      target: 'station_details',
    },

    // Row 6: AI Case Analysis & Live Incident Map (placed at end)
    {
      id: 'ai_analysis',
      title: 'AI CASE\nANALYSIS',
      badge: BADGE_AI,
      target: 'ai_analysis',
    },
    {
      id: 'live_map',
      title: 'LIVE INCIDENT\nMAP',
      badge: BADGE_MAP,
      target: 'live_map',
    },
  ];


  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header matching Figma Screen 1 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={POLICE_LOGO} style={styles.logoImage} resizeMode="cover" />
          <Text style={styles.headerTitle}>KOVAI KAVAL</Text>
        </View>
        <TouchableOpacity
          style={styles.headerRightBtn}
          onPress={() => onNavigate && onNavigate('station_details')}
          activeOpacity={0.7}
        >
          <Text style={styles.stationBadgeText}>GND-01</Text>
        </TouchableOpacity>
      </View>

      {/* Main Container with Watermark */}
      <View style={styles.container}>
        <Image
          source={WATERMARK_IMG}
          style={styles.watermarkBg}
          resizeMode="contain"
          pointerEvents="none"
        />

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator={false}
        >
          {/* Subheader: Back Arrow + All Features */}
          <View style={styles.subHeader}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => (onBack ? onBack() : onNavigate && onNavigate('auth'))}
              activeOpacity={0.7}
            >
              <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>All Features</Text>
          </View>

          {/* Quick Access to Station Details Banner */}
          <TouchableOpacity
            style={styles.stationBannerCard}
            onPress={() => onNavigate && onNavigate('station_details')}
            activeOpacity={0.8}
          >
            <View style={styles.stationBannerLeft}>
              <Text style={styles.stationBannerTitle}>Gandhipuram Police Station</Text>
              <Text style={styles.stationBannerSub}>STN-GND • Active Command Post</Text>
            </View>
            <View style={styles.stationBannerAction}>
              <Text style={styles.stationBannerActionText}>DETAILS →</Text>
            </View>
          </TouchableOpacity>

          {/* 10 Feature Cards in 2-Column Grid */}
          <View style={styles.grid}>
            {featureList.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => onNavigate && onNavigate(item.target, item.params || {})}
                activeOpacity={0.75}
              >
                <Image source={item.badge} style={styles.cardBadge} resizeMode="contain" />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const cardWidth = (width - 48) / 2;

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  headerRightBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stationBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF8FF',
    position: 'relative',
  },
  watermarkBg: {
    position: 'absolute',
    width: 440,
    height: 440,
    left: -25,
    top: 150,
    opacity: 0.05,
  },
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#000666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: -0.3,
  },
  stationBannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    padding: 14,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  stationBannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  stationBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A237E',
  },
  stationBannerSub: {
    fontSize: 12,
    color: '#5A5D6B',
    marginTop: 2,
  },
  stationBannerAction: {
    backgroundColor: '#1A237E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  stationBannerActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    height: 128,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6E5F0',
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    elevation: 2,
    shadowColor: '#0A1147',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardBadge: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1C20',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 16,
  },
});
