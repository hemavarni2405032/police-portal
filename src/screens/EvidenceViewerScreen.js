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
const BELL_ICON = require('../../assets/dashboard/icon_bell_white.png');
const USER_ICON = require('../../assets/details/icon_user.png');
const CHEVRON_ICON = require('../../assets/details/icon_chevron.png');

export default function EvidenceViewerScreen({ onNavigate, onBack, initialMode = 'detail' }) {
  const [viewMode, setViewMode] = useState(initialMode);
  const [activeTab, setActiveTab] = useState('ALL'); // ALL | PHOTOS | VIDEOS | DOCUMENTS | AUDIO
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const tabs = ['ALL', 'PHOTOS', 'VIDEOS', 'DOCUMENTS', 'AUDIO'];

  const evidenceItems = [
    {
      id: 'EV-882',
      type: 'Photo',
      date: '01 Sep 2026',
      uploader: 'Insp. Kumar',
      status: 'VERIFIED',
    },
    {
      id: 'EV-883',
      type: 'Video',
      duration: '2:14',
      date: '01 Sep 2026',
      uploader: 'Awaiting assignment',
      status: 'PENDING',
    },
    {
      id: 'EV-884',
      type: 'Document',
      name: 'Financial Records Summary.pdf',
      date: '01 Sep 2026',
      status: 'VERIFIED',
    },
  ];

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
        <Text style={styles.headerTitle}>
          {viewMode === 'detail' ? 'EVIDENCE DETAILS' : 'EVIDENCE LIST'}
        </Text>
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={() => setViewMode(viewMode === 'detail' ? 'list' : 'detail')}
          activeOpacity={0.7}
        >
          <Text style={styles.toggleBtnText}>{viewMode === 'detail' ? 'LIST' : 'PLAYER'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {viewMode === 'detail' ? (
          /* VIEW 1: EVIDENCE DETAILS / PLAYER (Screen 9 & 12) */
          <View>
            {/* Media Player Container */}
            <View style={styles.playerContainer}>
              {/* Verified Badge */}
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedBadgeText}>✔ Verified</Text>
              </View>

              {/* Centered Play Button */}
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => setIsPlaying(!isPlaying)}
                activeOpacity={0.8}
              >
                <Text style={styles.playIconText}>{isPlaying ? '⏸' : '▶'}</Text>
              </TouchableOpacity>

              {/* Expand Icon */}
              <TouchableOpacity
                style={styles.expandBtn}
                onPress={() => Alert.alert('Fullscreen', 'Opening evidence footage in full resolution')}
              >
                <Text style={styles.expandIconText}>⛶</Text>
              </TouchableOpacity>
            </View>

            {/* Evidence Title & Info */}
            <View style={styles.detailsHeader}>
              <Text style={styles.evidenceTitle}>CCTV Footage</Text>
              <Text style={styles.evidenceSub}>Evidence ID: EV-1042</Text>
            </View>

            {/* 2 Stat Boxes */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>📁</Text>
                <Text style={styles.statLabel}>Case ID</Text>
                <Text style={styles.statValue}>CMP-2045</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statIcon}>📹</Text>
                <Text style={styles.statLabel}>Type</Text>
                <Text style={styles.statValue}>Video</Text>
              </View>
            </View>

            {/* Location Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconCircle}>
                <Text style={styles.infoEmoji}>📍</Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>Peelamedu</Text>
              </View>
            </View>

            {/* Uploaded By Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconCircle}>
                <Image source={USER_ICON} style={styles.userIconSmall} resizeMode="contain" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Uploaded By</Text>
                <Text style={styles.infoValue}>Officer Kumar</Text>
                <Text style={styles.infoDate}>31 August 2026</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionButtonsCol}>
              <View style={styles.dualActionsRow}>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => Alert.alert('Viewing Evidence', 'Rendering high-definition video feed')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.viewBtnText}>👁 VIEW</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => Alert.alert('Download', 'Evidence saved to secure device storage')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.downloadBtnText}>⬇ DOWNLOAD</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.markVerifiedBtn}
                onPress={() => {
                  setIsVerified(!isVerified);
                  Alert.alert('Verification', 'Evidence verified and logged in Chain of Custody.');
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.markVerifiedText}>
                  {isVerified ? '✔ EVIDENCE VERIFIED' : '✔ MARK VERIFIED'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* VIEW 2: EVIDENCE LIST (Screen 13) */
          <View>
            <View style={styles.listHeaderRow}>
              <View>
                <Text style={styles.refLabel}>CASE REFERENCE</Text>
                <Text style={styles.refValue}>W-1042</Text>
              </View>
              <TouchableOpacity style={styles.filterActionBtn}>
                <Text style={styles.filterActionText}>☰ FILTER</Text>
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
              {tabs.map((t) => {
                const isSelected = activeTab === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[styles.tabItem, isSelected && styles.tabItemActive]}
                    onPress={() => setActiveTab(t)}
                  >
                    <Text style={[styles.tabItemText, isSelected && styles.tabItemTextActive]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Items */}
            {evidenceItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemCard}
                onPress={() => setViewMode('detail')}
                activeOpacity={0.8}
              >
                <View style={styles.itemIconBox}>
                  <Text style={styles.itemEmoji}>
                    {item.type === 'Photo' ? '🖼' : item.type === 'Video' ? '📹' : '📄'}
                  </Text>
                  {item.duration ? <Text style={styles.durationTag}>{item.duration}</Text> : null}
                </View>

                <View style={styles.itemTextCol}>
                  <View style={styles.itemTopRow}>
                    <Text style={styles.itemId}>{item.id}</Text>
                    <View
                      style={[
                        styles.statusPill,
                        item.status === 'VERIFIED' ? styles.pillVerified : styles.pillPending,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusPillText,
                          item.status === 'VERIFIED'
                            ? styles.pillVerifiedText
                            : styles.pillPendingText,
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.itemTypeDate}>
                    {item.type} • {item.date}
                  </Text>
                  <Text style={styles.itemUploader}>{item.name || item.uploader}</Text>
                </View>

                <Image source={CHEVRON_ICON} style={styles.chevron} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  toggleBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  toggleBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  playerContainer: {
    height: 220,
    backgroundColor: '#0A0A10',
    borderRadius: 14,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E6F4EA',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#CEEAD6',
  },
  verifiedBadgeText: {
    color: '#137333',
    fontSize: 11,
    fontWeight: '700',
  },
  playBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 6, 102, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  playIconText: {
    color: '#FFFFFF',
    fontSize: 22,
    marginLeft: 3,
  },
  expandBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 6,
  },
  expandIconText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  detailsHeader: {
    marginBottom: 14,
  },
  evidenceTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1C20',
  },
  evidenceSub: {
    fontSize: 13,
    color: '#767683',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginHorizontal: 4,
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1C20',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E4FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoEmoji: {
    fontSize: 18,
  },
  userIconSmall: {
    width: 18,
    height: 18,
    tintColor: '#000666',
  },
  infoLabel: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
    marginTop: 1,
  },
  infoDate: {
    fontSize: 11.5,
    color: '#767683',
    marginTop: 1,
  },
  actionButtonsCol: {
    marginTop: 8,
  },
  dualActionsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: '#000666',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginRight: 6,
  },
  viewBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  downloadBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000666',
    paddingVertical: 13,
    alignItems: 'center',
    marginLeft: 6,
  },
  downloadBtnText: {
    color: '#000666',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  markVerifiedBtn: {
    backgroundColor: '#E8BD70',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  markVerifiedText: {
    color: '#3E2700',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  refLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#767683',
    letterSpacing: 0.5,
  },
  refValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000666',
    marginTop: 2,
  },
  filterActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    backgroundColor: '#FFFFFF',
  },
  filterActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1C20',
  },
  tabsRow: {
    marginBottom: 16,
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#000666',
  },
  tabItemText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#767683',
  },
  tabItemTextActive: {
    color: '#000666',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  itemEmoji: {
    fontSize: 20,
  },
  durationTag: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    fontSize: 9,
    fontWeight: '700',
    color: '#5A5D6B',
  },
  itemTextCol: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1C20',
  },
  statusPill: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pillVerified: {
    backgroundColor: '#000666',
  },
  pillVerifiedText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  pillPending: {
    backgroundColor: '#F3F4F6',
  },
  pillPendingText: {
    color: '#5A5D6B',
    fontSize: 9.5,
    fontWeight: '800',
  },
  itemTypeDate: {
    fontSize: 12,
    color: '#5A5D6B',
  },
  itemUploader: {
    fontSize: 12,
    color: '#767683',
    marginTop: 2,
  },
  chevron: {
    width: 12,
    height: 12,
    tintColor: '#C6C5D4',
  },
});
