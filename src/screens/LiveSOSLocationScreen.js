import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const BACK_ICON = require('../../assets/details/icon_back.png');
const MAP_BG = require('../../assets/map/image0_147_2015.png');

export default function LiveSOSLocationScreen({ onNavigate, onBack }) {
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

        <Text style={styles.headerTitle}>LIVE SOS LOCATION</Text>
      </View>

      {/* Map Area */}
      <View style={styles.mapArea}>
        <Image source={MAP_BG} style={styles.mapImg} resizeMode="cover" />
        <View style={styles.mapDarkOverlay} />

        {/* SOS Pulse & Target Pin */}
        <View style={styles.sosPinCenter}>
          <View style={styles.sosOuterPulse} />
          <View style={styles.sosInnerRedCircle}>
            <Text style={styles.sosAsterisk}>✻</Text>
          </View>
        </View>

        {/* Patrol Unit Shield Pin */}
        <View style={styles.patrolUnitPin}>
          <View style={styles.unitShieldBadge}>
            <Text style={styles.shieldEmoji}>🛡️</Text>
          </View>
        </View>

        {/* Right Map Controls */}
        <View style={styles.rightControls}>
          <View style={styles.zoomControlPill}>
            <TouchableOpacity style={styles.zoomBtn}>
              <Text style={styles.zoomBtnText}>+</Text>
            </TouchableOpacity>
            <View style={styles.zoomDivider} />
            <TouchableOpacity style={styles.zoomBtn}>
              <Text style={styles.zoomBtnText}>−</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.roundControlBtn} activeOpacity={0.7}>
            <Text style={styles.roundBtnText}>⌖</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundControlBtn} activeOpacity={0.7}>
            <Text style={styles.roundBtnText}>❖</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Bottom Card */}
        <View style={styles.bottomCard}>
          <View style={styles.cardTopRow}>
            <View>
              <Text style={styles.sosIdTitle}>SOS-1024</Text>
              <Text style={styles.locationSubText}>Gandhipuram</Text>
            </View>
            <View style={styles.criticalBadge}>
              <Text style={styles.criticalBadgeText}>▲ CRITICAL</Text>
            </View>
          </View>

          {/* Dotted Route Progression Line */}
          <View style={styles.dottedProgressRow}>
            <View style={styles.carDot}>
              <Text style={styles.carDotEmoji}>🚗</Text>
            </View>
            <View style={styles.dottedLine}>
              <Text style={styles.dotsText}>••••••••••••••••••••••••••••••••</Text>
            </View>
          </View>

          {/* Responding Unit Box */}
          <View style={styles.respondingUnitCard}>
            <View style={styles.unitShieldCircle}>
              <Text style={styles.unitShieldText}>🛡️</Text>
            </View>

            <View style={styles.unitTextCol}>
              <Text style={styles.unitLabelSmall}>Responding Unit</Text>
              <Text style={styles.unitNameBold}>PU-12 (Interceptor)</Text>
            </View>

            <View style={styles.etaCol}>
              <Text style={styles.etaLabelSmall}>ETA</Text>
              <Text style={styles.etaTimeBold}>06 min</Text>
            </View>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.trackUnitBtn}
              onPress={() => onNavigate && onNavigate('patrol_tracking')}
              activeOpacity={0.8}
            >
              <Text style={styles.trackBtnIcon}>🎯</Text>
              <Text style={styles.trackBtnText}>TRACK UNIT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.directionsBtn}
              onPress={() => onNavigate && onNavigate('patrol_tracking')}
              activeOpacity={0.75}
            >
              <Text style={styles.directionsBtnIcon}>↱</Text>
              <Text style={styles.directionsBtnText}>DIRECTIONS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.phoneBtn} activeOpacity={0.7}>
              <Text style={styles.phoneIcon}>📞</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  mapArea: {
    flex: 1,
    backgroundColor: '#080C14',
    position: 'relative',
    overflow: 'hidden',
  },
  mapImg: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  mapDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 10, 25, 0.45)',
  },
  sosPinCenter: {
    position: 'absolute',
    top: '44%',
    left: '46%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosOuterPulse: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(182, 23, 30, 0.3)',
  },
  sosInnerRedCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#B6171E',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B6171E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  sosAsterisk: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  patrolUnitPin: {
    position: 'absolute',
    top: '30%',
    right: '25%',
  },
  unitShieldBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldEmoji: {
    fontSize: 16,
  },
  rightControls: {
    position: 'absolute',
    right: 16,
    top: 100,
    alignItems: 'center',
  },
  zoomControlPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: 44,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  zoomBtn: {
    width: 44,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#191C1D',
  },
  zoomDivider: {
    width: 32,
    height: 1,
    backgroundColor: '#E2E2E7',
  },
  roundControlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  roundBtnText: {
    fontSize: 18,
    color: '#191C1D',
    fontWeight: '700',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  sosIdTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#191C1D',
  },
  locationSubText: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '600',
    marginTop: 2,
  },
  criticalBadge: {
    backgroundColor: '#FFEBEE',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  criticalBadgeText: {
    color: '#B6171E',
    fontSize: 10,
    fontWeight: '900',
  },
  dottedProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  carDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECECF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  carDotEmoji: {
    fontSize: 12,
  },
  dottedLine: {
    flex: 1,
    overflow: 'hidden',
  },
  dotsText: {
    color: '#C6C5D4',
    letterSpacing: 2,
    fontSize: 10,
  },
  respondingUnitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  unitShieldCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  unitShieldText: {
    fontSize: 16,
  },
  unitTextCol: {
    flex: 1,
  },
  unitLabelSmall: {
    fontSize: 10.5,
    color: '#767683',
    fontWeight: '500',
  },
  unitNameBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#191C1D',
    marginTop: 1,
  },
  etaCol: {
    alignItems: 'flex-end',
  },
  etaLabelSmall: {
    fontSize: 9,
    fontWeight: '700',
    color: '#767683',
  },
  etaTimeBold: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000B58',
    marginTop: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackUnitBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000B58',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 6,
  },
  trackBtnIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  directionsBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#000B58',
    borderRadius: 8,
    paddingVertical: 11,
    marginRight: 6,
  },
  directionsBtnIcon: {
    color: '#000B58',
    fontSize: 13,
    fontWeight: '900',
    marginRight: 4,
  },
  directionsBtnText: {
    color: '#000B58',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  phoneBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E8ECF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    fontSize: 16,
  },
});
