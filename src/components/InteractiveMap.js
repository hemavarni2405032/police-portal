import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

export default function InteractiveMap({
  height = 240,
  showHotspots = true,
  activeSelectedSOS = 'SOS-1024',
  onSelectMarker,
  showRoute = true,
}) {
  return (
    <View style={[styles.container, { height }]}>
      {/* Coimbatore Grid Map Pattern Overlay */}
      <View style={styles.gridOverlay}>
        <View style={[styles.gridLine, { top: '20%' }]} />
        <View style={[styles.gridLine, { top: '40%' }]} />
        <View style={[styles.gridLine, { top: '60%' }]} />
        <View style={[styles.gridLine, { top: '80%' }]} />
        <View style={[styles.gridLineVert, { left: '25%' }]} />
        <View style={[styles.gridLineVert, { left: '50%' }]} />
        <View style={[styles.gridLineVert, { left: '75%' }]} />
      </View>

      {/* Main Location Watermark & Landmarks */}
      <Text style={styles.mapLabelBig}>கோயம்புத்தூர்</Text>
      <Text style={styles.mapLabelSub}>COIMBATORE</Text>
      <Text style={[styles.landmarkLabel, { top: '15%', left: '20%' }]}>THUDIYALUR</Text>
      <Text style={[styles.landmarkLabel, { top: '35%', left: '60%' }]}>GANDHIPURAM PS</Text>
      <Text style={[styles.landmarkLabel, { top: '65%', left: '15%' }]}>RS PURAM</Text>
      <Text style={[styles.landmarkLabel, { top: '75%', left: '55%' }]}>PEELAMEDU</Text>
      <Text style={[styles.landmarkLabel, { top: '88%', left: '40%' }]}>TOWN HALL</Text>

      {/* Hotspot Circles */}
      {showHotspots && (
        <>
          <View style={[styles.hotspot, { top: '30%', left: '45%', width: 70, height: 70, backgroundColor: 'rgba(239, 68, 68, 0.25)' }]} />
          <View style={[styles.hotspot, { top: '60%', left: '20%', width: 50, height: 50, backgroundColor: 'rgba(245, 158, 11, 0.2)' }]} />
        </>
      )}

      {/* Route Line Simulation */}
      {showRoute && (
        <View style={styles.routeContainer}>
          <View style={[styles.routeSegment, { top: '38%', left: '42%', width: 60, height: 3, transform: [{ rotate: '25deg' }] }]} />
          <View style={[styles.routeSegment, { top: '46%', left: '50%', width: 50, height: 3, transform: [{ rotate: '-45deg' }] }]} />
        </View>
      )}

      {/* Police Station Marker */}
      <View style={[styles.markerBox, { top: '30%', left: '62%' }]}>
        <View style={styles.stationPin}>
          <Text style={styles.pinIcon}>🛡️</Text>
        </View>
        <Text style={styles.pinLabel}>Gandhipuram PS</Text>
      </View>

      {/* Active SOS Critical Marker */}
      <TouchableOpacity
        style={[styles.markerBox, { top: '34%', left: '38%' }]}
        onPress={() => onSelectMarker && onSelectMarker('SOS-1024')}
      >
        <View style={[styles.sosPulse, styles.pulseAnimation]} />
        <View style={styles.sosPin}>
          <Text style={styles.pinIconAlert}>🚨</Text>
        </View>
        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>SOS-1024</Text>
          <Text style={styles.calloutSub}>Cross Cut Rd</Text>
        </View>
      </TouchableOpacity>

      {/* Patrol Unit Marker */}
      <View style={[styles.markerBox, { top: '55%', left: '48%' }]}>
        <View style={styles.unitPin}>
          <Text style={styles.unitPinText}>PU-12</Text>
        </View>
        <Text style={styles.unitLabel}>En Route (06m)</Text>
      </View>

      {/* Map Map Overlay Bar Controls */}
      <View style={styles.controlBar}>
        <View style={styles.liveTag}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE GPS TRACKING</Text>
        </View>
        <Text style={styles.mapTime}>Updated 10:48 AM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#CBD5E1',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  gridLineVert: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  mapLabelBig: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    fontSize: 22,
    fontWeight: '900',
    color: 'rgba(15, 23, 42, 0.15)',
    letterSpacing: 2,
  },
  mapLabelSub: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(15, 23, 42, 0.25)',
    letterSpacing: 1.5,
  },
  landmarkLabel: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  hotspot: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  routeContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  routeSegment: {
    position: 'absolute',
    backgroundColor: '#2563EB',
    borderStyle: 'dashed',
    borderRadius: 2,
  },
  markerBox: {
    position: 'absolute',
    alignItems: 'center',
  },
  stationPin: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinIcon: {
    fontSize: 12,
  },
  pinLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    borderRadius: 3,
    marginTop: 2,
  },
  sosPulse: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(211, 47, 47, 0.35)',
  },
  sosPin: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.critical,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinIconAlert: {
    fontSize: 12,
  },
  callout: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.critical,
  },
  calloutTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.critical,
  },
  calloutSub: {
    fontSize: 8,
    color: COLORS.textSecondary,
  },
  unitPin: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  unitPinText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  unitLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.accent,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  controlBar: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  mapTime: {
    color: COLORS.textMuted,
    fontSize: 9,
  },
});
