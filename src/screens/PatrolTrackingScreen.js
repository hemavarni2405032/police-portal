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

const { width, height } = Dimensions.get('window');

const BACK_ICON = require('../../assets/details/icon_back.png');
const TRACKING_MAP_BG = require('../../assets/map/image2_147_2015.png');

export default function PatrolTrackingScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('unit_details'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>PU-12 Tracking</Text>

        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Live Map Tracking View */}
      <View style={styles.mapContainer}>
        <Image
          source={TRACKING_MAP_BG}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.mapDarkOverlay} />

        {/* Route Visual Line Simulation */}
        <View style={styles.routeContainer}>
          <View style={[styles.routeCurve, { top: '30%', left: '46%', height: 180, width: 4 }]} />
          <View style={[styles.routeCurveDiagonal, { top: '22%', left: '50%', width: 80, height: 4 }]} />
        </View>

        {/* Destination: SOS-1024 */}
        <View style={styles.destinationPinBox}>
          <View style={styles.sosBadgeTop}>
            <Text style={styles.sosBadgeTopText}>SOS-1024</Text>
          </View>
          <View style={styles.sosTargetCircle}>
            <Text style={styles.sosTargetIcon}>✻</Text>
          </View>
        </View>

        {/* Origin / Current Vehicle Position: PU-12 */}
        <View style={styles.originPinBox}>
          <View style={styles.vehiclePulseCircle} />
          <View style={styles.vehiclePin}>
            <Text style={styles.vehiclePinText}>🚗</Text>
          </View>
          <View style={styles.vehicleLabel}>
            <Text style={styles.vehicleLabelText}>PU-12</Text>
          </View>
        </View>

        {/* Floating Bottom Tracking Card */}
        <View style={styles.trackingCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.titleCol}>
              <Text style={styles.cardTitle}>PU-12 En route to SOS-1024</Text>
              <View style={styles.trackingStatusRow}>
                <View style={styles.blueDot} />
                <Text style={styles.trackingStatusText}>Live Tracking Active</Text>
              </View>
            </View>

            <View style={styles.etaBadgeBox}>
              <Text style={styles.etaLabelSmall}>ETA</Text>
              <Text style={styles.etaValueBold}>06 <Text style={styles.etaUnitSmall}>min</Text></Text>
            </View>
          </View>

          {/* Progress Bar (60% completed) */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View style={styles.progressBarFill} />
            </View>
            <View style={styles.metricsRow}>
              <Text style={styles.metricText}>1.2 km covered</Text>
              <Text style={styles.metricText}>0.8 km remaining</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.viewSosBtn}
              onPress={() => onNavigate && onNavigate('sos_details')}
              activeOpacity={0.75}
            >
              <Text style={styles.viewSosIcon}>👁️</Text>
              <Text style={styles.viewSosBtnText}>VIEW SOS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewOfficerBtn}
              onPress={() => onNavigate && onNavigate('unit_details')}
              activeOpacity={0.8}
            >
              <Text style={styles.viewOfficerIcon}>🪪</Text>
              <Text style={styles.viewOfficerBtnText}>VIEW OFFICER</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  moreBtn: {
    padding: 6,
  },
  moreIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  mapDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 10, 25, 0.45)',
  },
  routeContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  routeCurve: {
    position: 'absolute',
    backgroundColor: '#2563EB',
    borderRadius: 2,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  routeCurveDiagonal: {
    position: 'absolute',
    backgroundColor: '#2563EB',
    transform: [{ rotate: '-35deg' }],
    borderRadius: 2,
  },
  destinationPinBox: {
    position: 'absolute',
    top: '20%',
    right: '24%',
    alignItems: 'center',
  },
  sosBadgeTop: {
    backgroundColor: '#B6171E',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  sosBadgeTopText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  sosTargetCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#B6171E',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B6171E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  sosTargetIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  originPinBox: {
    position: 'absolute',
    bottom: 230,
    left: '42%',
    alignItems: 'center',
  },
  vehiclePulseCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
    top: -5,
  },
  vehiclePin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000B58',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  vehiclePinText: {
    fontSize: 18,
  },
  vehicleLabel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#000B58',
  },
  vehicleLabelText: {
    color: '#000B58',
    fontSize: 10,
    fontWeight: '800',
  },
  trackingCard: {
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
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  titleCol: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#191C1D',
  },
  trackingStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
    marginRight: 6,
  },
  trackingStatusText: {
    fontSize: 11,
    color: '#454652',
    fontWeight: '600',
  },
  etaBadgeBox: {
    backgroundColor: '#E8ECF8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  etaLabelSmall: {
    fontSize: 9,
    fontWeight: '800',
    color: '#000B58',
    letterSpacing: 0.5,
  },
  etaValueBold: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000B58',
  },
  etaUnitSmall: {
    fontSize: 10,
    fontWeight: '700',
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E2E7',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#000B58',
    borderRadius: 3,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricText: {
    fontSize: 11,
    color: '#767683',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewSosBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#E8ECF2',
    paddingVertical: 12,
    marginRight: 8,
  },
  viewSosIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  viewSosBtnText: {
    color: '#191C1D',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  viewOfficerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#000B58',
    paddingVertical: 12,
    marginLeft: 8,
  },
  viewOfficerIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  viewOfficerBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
