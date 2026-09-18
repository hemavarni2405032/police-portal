// src/screens/CitizenPortalScreen.js
// User / Citizen Portal matching Reference Image 4 exactly (#000666 theme)

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import SharedHeader from '../components/SharedHeader';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

export default function CitizenPortalScreen({ onNavigate, onBack, canGoBack, onSwitchPortal }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const [sosActiveModal, setSosActiveModal] = useState(false);
  const [sosDispatched, setSosDispatched] = useState(false);

  const handleTriggerSOS = () => {
    setSosActiveModal(true);
    setTimeout(() => {
      setSosDispatched(true);
    }, 1200);
  };

  const newsItems = [
    {
      id: 'news-1',
      tag: 'ALERT',
      tagBg: '#FEF2F2',
      tagColor: '#DC2626',
      title: 'Traffic Diversion in Gandhipuram Flyover',
      desc: 'Heavy vehicle diversion via 100 Feet Road from 8:00 AM to 6:00 PM due to bridge surfacing work.',
      time: 'Today, 08:30 AM',
    },
    {
      id: 'news-2',
      tag: 'UPDATE',
      tagBg: '#EEF2FF',
      tagColor: '#000666',
      title: '20 New Patrol Vehicles Deployed',
      desc: 'Coimbatore City Police has deployed 20 new high-tech mobile patrol units across Gandhipuram and RS Puram.',
      time: 'Today, 07:15 AM',
    },
  ];

  const recentActivities = [
    {
      id: 'act-1',
      icon: '🛡️',
      title: '24/7 Police SOS Active',
      sub: 'Gandhipuram Zone, Coimbatore',
      status: 'Active',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
    },
    {
      id: 'act-2',
      icon: '🚥',
      title: 'Traffic Diversion Route Checked',
      sub: '100 Feet Road, Gandhipuram',
      status: 'Live',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
    },
    {
      id: 'act-3',
      icon: '📝',
      title: 'Street Light Concern Logged',
      sub: 'Ref #KVK-2026-8941 • Reviewing',
      status: 'In Progress',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
    },
  ];

  return (
    <View style={styles.container}>
      <SharedHeader
        portalRole="citizen"
        showBack={canGoBack}
        onBack={onBack}
        onSwitchPortal={onSwitchPortal}
      />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* SECTION 1: LATEST NEWS (Matching Image 4) */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.goldIndicator} />
            <Text style={styles.sectionTitleText}>{tr('latest_news')}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{tr('view_all_news')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsHorizontalList}>
          {newsItems.map((news) => (
            <View key={news.id} style={[styles.newsCard, SHADOWS.small]}>
              <View style={[styles.newsTagPill, { backgroundColor: news.tagBg }]}>
                <Text style={[styles.newsTagText, { color: news.tagColor }]}>{news.tag}</Text>
              </View>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsDesc} numberOfLines={2}>{news.desc}</Text>
              <View style={styles.newsFooterRow}>
                <Text style={styles.newsTime}>⏱ {news.time}</Text>
                <TouchableOpacity style={styles.readMoreBtn}>
                  <Text style={styles.readMoreText}>Read More →</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* SECTION 2: 24/7 EMERGENCY SOS RESPONSE CARD (Matching Image 4) */}
        <View style={[styles.sosCardContainer, SHADOWS.medium]}>
          <View style={styles.sosCardHeader}>
            <View style={styles.sosShieldBox}>
              <Text style={{ fontSize: 24 }}>🛡️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sosTitle}>{tr('emergency_sos_response')}</Text>
              <Text style={styles.sosSub}>{tr('emergency_sos_tag')}</Text>
            </View>
          </View>

          <Text style={styles.sosDescription}>{tr('sos_desc')}</Text>

          <View style={styles.sosActionRow}>
            <View style={styles.avgTimePill}>
              <Text style={styles.avgTimeText}>{tr('sos_avg_time')}</Text>
            </View>

            <TouchableOpacity style={styles.sosRedBtn} onPress={handleTriggerSOS} activeOpacity={0.85}>
              <Text style={styles.sosRedBtnText}>{tr('sos_112_btn')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 3: CITIZEN QUICK SERVICES GRID */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.goldIndicator} />
            <Text style={styles.sectionTitleText}>{tr('quick_services')}</Text>
          </View>
        </View>

        <View style={styles.servicesGrid}>
          <TouchableOpacity style={[styles.serviceItem, SHADOWS.small]} onPress={() => Alert.alert('Citizen Service', 'File a new complaint form.')}>
            <Text style={styles.serviceIcon}>📝</Text>
            <Text style={styles.serviceTitle}>{tr('service_complaint')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceItem, SHADOWS.small]} onPress={() => Alert.alert('Police Clearance', 'Apply for Police Verification Certificate.')}>
            <Text style={styles.serviceIcon}>📜</Text>
            <Text style={styles.serviceTitle}>{tr('service_police_noc')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceItem, SHADOWS.small]} onPress={() => Alert.alert('Lost & Found', 'Report or search lost documents/items.')}>
            <Text style={styles.serviceIcon}>🔍</Text>
            <Text style={styles.serviceTitle}>{tr('service_lost_found')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceItem, SHADOWS.small]} onPress={() => Alert.alert('Traffic Diversion', 'View live traffic updates in Coimbatore.')}>
            <Text style={styles.serviceIcon}>🚥</Text>
            <Text style={styles.serviceTitle}>{tr('service_traffic')}</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 4: RECENT ACTIVITY (Matching Image 4) */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.goldIndicator} />
            <Text style={styles.sectionTitleText}>{tr('recent_activity')}</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Incident Report', 'Opening citizen incident logging form.')}>
            <Text style={styles.reportBtnText}>{tr('report_incident')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentActivityList}>
          {recentActivities.map((item) => (
            <View key={item.id} style={[styles.activityItemCard, SHADOWS.small]}>
              <View style={styles.activityIconBox}>
                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySub}>{item.sub}</Text>
              </View>
              <View style={[styles.statusBadgePill, { backgroundColor: item.statusBg }]}>
                <Text style={[styles.statusBadgeText, { color: item.statusColor }]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* SOS DISPATCH MODAL */}
      <Modal visible={sosActiveModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, SHADOWS.large]}>
            <View style={styles.modalRedHeader}>
              <Text style={styles.modalHeaderTitle}>🚨 POLICE CONTROL ROOM ALERT</Text>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.dispatchingText}>
                {sosDispatched ? '✅ PATROL UNIT DISPATCHED' : '📡 DISPATCHING NEAREST PATROL UNIT...'}
              </Text>
              <Text style={styles.gpsLocationText}>Live GPS: 11.0168° N, 76.9558° E (Gandhipuram, Coimbatore)</Text>

              {sosDispatched ? (
                <View style={styles.unitDispatchedBox}>
                  <Text style={styles.unitName}>Patrol Unit PU-12 (Inspector Kumar)</Text>
                  <Text style={styles.etaText}>Estimated Arrival: 3 Minutes</Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.closeModalBtn}
                onPress={() => {
                  setSosActiveModal(false);
                  setSosDispatched(false);
                }}
              >
                <Text style={styles.closeModalBtnText}>{tr('close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goldIndicator: {
    width: 4,
    height: 16,
    backgroundColor: '#D97706',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000666',
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
  },
  reportBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
  },

  // News Cards
  newsHorizontalList: {
    marginBottom: 6,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    width: 280,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  newsTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  newsTagText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  newsTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  newsDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 10,
  },
  newsFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  newsTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  readMoreBtn: {},
  readMoreText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000666',
  },

  // 24/7 SOS Card (Matching Image 4)
  sosCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
  },
  sosCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sosShieldBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  sosTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000666',
  },
  sosSub: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
    marginTop: 1,
  },
  sosDescription: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 17,
    marginBottom: 12,
  },
  sosActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avgTimePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  avgTimeText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  sosRedBtn: {
    backgroundColor: '#B91C1C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 3,
  },
  sosRedBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // Services Grid
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
  },

  // Recent Activity List
  recentActivityList: {
    marginBottom: 24,
  },
  activityItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activityIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  activityTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  activitySub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadgePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    overflow: 'hidden',
  },
  modalRedHeader: {
    backgroundColor: '#DC2626',
    padding: 14,
    alignItems: 'center',
  },
  modalHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modalBody: {
    padding: 20,
    alignItems: 'center',
  },
  dispatchingText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000666',
    textAlign: 'center',
    marginBottom: 8,
  },
  gpsLocationText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  unitDispatchedBox: {
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  unitName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#059669',
  },
  etaText: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
  },
  closeModalBtn: {
    backgroundColor: '#000666',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  closeModalBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
