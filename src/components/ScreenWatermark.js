// src/components/ScreenWatermark.js
// Refined Background matching "Sign-In Method Selection (Refined Background).svg"

import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ScreenWatermark() {
  return (
    <View style={styles.backgroundContainer} pointerEvents="none">
      <View style={styles.watermarkWrapper}>
        <Image
          source={require('../../assets/police_watermark.jpg')}
          style={styles.watermarkEmblem}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FBF8FF',
    zIndex: 0,
  },
  watermarkWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermarkEmblem: {
    width: Math.min(width * 0.9, 390),
    height: Math.min(width * 0.9, 390),
    opacity: 0.08,
  },
});
