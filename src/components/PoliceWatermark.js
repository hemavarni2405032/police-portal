// src/components/PoliceWatermark.js
// Subtle background watermark component rendering official emblem across all screens

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PoliceWatermark() {
  return (
    <View style={styles.watermarkContainer} pointerEvents="none">
      <View style={styles.watermarkBadge}>
        <Text style={styles.watermarkIcon}>🏛️</Text>
        <Text style={styles.watermarkText}>TAMILNADU POLICE</Text>
        <Text style={styles.watermarkSub}>KOVAI KAVAL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    opacity: 0.04,
  },
  watermarkBadge: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 8,
    borderColor: '#000666',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  watermarkIcon: {
    fontSize: 100,
  },
  watermarkText: {
    color: '#000666',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 8,
  },
  watermarkSub: {
    color: '#000666',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
