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
const MAP_SNIPPET = require('../../assets/sos/image2_132_2.jpg');

export default function SOSFullDetailsScreen({ onNavigate, onBack }) {
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

        <Text style={styles.headerTitle}>EMERGENCY DETAILS</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: ID & Status */}
        <View style={styles.infoCard}>
          <View style={styles.topIdRow}>
            <View>
              <Text style={styles.labelMuted}>SOS ID</Text>
              <Text style={styles.idValueBold}>SOS-1024</Text>
            </View>
            <View style={styles.criticalBadge}>
              <Text style={styles.criticalBadgeText}>▲ CRITICAL</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <View style={styles.halfCol}>
              <Text style={styles.labelMuted}>Type</Text>
              <Text style={styles.valDarkBold}>Personal Safety{"\n"}Emergency</Text>
            </View>

            <View style={styles.halfCol}>
              <Text style={styles.labelMuted}>Verification Status</Text>
              <View style={styles.verifiedRow}>
                <Text style={styles.verifiedCheckIcon}>✓</Text>
                <Text style={styles.verifiedStatusText}>
                  Verified by Control Room
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card 2: Description */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionHeaderLabel}>DESCRIPTION</Text>
          <Text style={styles.descriptionBodyText}>
            "Full detailed citizen report text. Caller reports an immediate threat to personal safety. Suspect is still in the vicinity. Caller is hiding and requests immediate dispatch. No weapons explicitly mentioned but caller sounded extremely distressed."
          </Text>
        </View>

        {/* Card 3: Location Map Snippet */}
        <View style={styles.infoCard}>
          <View style={styles.mapSnippetBox}>
            <Image source={MAP_SNIPPET} style={styles.mapSnippetImg} resizeMode="cover" />
            <View style={styles.mapCenterPin}>
              <Text style={styles.mapPinEmoji}>📍</Text>
            </View>
          </View>

          <Text style={styles.sourceLabel}>Source & Location</Text>
          <Text style={styles.sourceValueBold}>Native Mobile SOS Trigger</Text>
          <Text style={styles.coordsText}>Lat: 11.0168,  Long: 76.9558</Text>
        </View>

        {/* Card 4: Timestamp */}
        <View style={styles.infoCard}>
          <View style={styles.timestampRow}>
            <Text style={styles.clockIcon}>🕒</Text>
            <Text style={styles.timestampLabel}>Timestamp</Text>
          </View>
          <Text style={styles.dateText}>01 Sep 2026</Text>
          <Text style={styles.timeText}>10:42:15 AM</Text>
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
  infoCard: {
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
  topIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelMuted: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '600',
    marginBottom: 2,
  },
  idValueBold: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000B58',
  },
  criticalBadge: {
    backgroundColor: '#FFEBEE',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  criticalBadgeText: {
    color: '#B6171E',
    fontSize: 11,
    fontWeight: '900',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F9',
    marginVertical: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCol: {
    width: '48%',
  },
  valDarkBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#191C1D',
    lineHeight: 18,
    marginTop: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
  verifiedCheckIcon: {
    fontSize: 14,
    color: '#000B58',
    fontWeight: '900',
    marginRight: 4,
  },
  verifiedStatusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000B58',
    lineHeight: 16,
    flex: 1,
  },
  sectionHeaderLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  descriptionBodyText: {
    fontSize: 13,
    color: '#191C1D',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  mapSnippetBox: {
    height: 150,
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
  mapCenterPin: {
    position: 'absolute',
    top: '40%',
    left: '46%',
  },
  mapPinEmoji: {
    fontSize: 24,
  },
  sourceLabel: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '500',
  },
  sourceValueBold: {
    fontSize: 14,
    fontWeight: '800',
    color: '#191C1D',
    marginTop: 2,
  },
  coordsText: {
    fontSize: 12,
    color: '#454652',
    fontFamily: 'monospace',
    marginTop: 4,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  clockIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  timestampLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#767683',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#191C1D',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000B58',
    marginTop: 2,
  },
});
