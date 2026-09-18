// src/components/SplashScreen.js
// Official Splash Screen matching "Html → Body.svg" exactly

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SPLASH_EMBLEM = require('../../assets/splash_emblem.jpg');
const SPLASH_SKYLINE = require('../../assets/splash_skyline.png');

export default function SplashScreen({ onFinish }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Smooth Fade In
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    // Auto-advance to next screen after loading
    const timer = setTimeout(() => {
      onFinish && onFinish();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      {/* City Skyline Silhouette Background at the Bottom */}
      <Image
        source={SPLASH_SKYLINE}
        style={styles.skylineBackground}
        resizeMode="stretch"
      />

      <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
        {/* Upper Center: Official Police Emblem */}
        <View style={styles.emblemShadowBox}>
          <View style={styles.emblemContainer}>
            <Image
              source={SPLASH_EMBLEM}
              style={styles.emblemImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Titles Group */}
        <View style={styles.textGroup}>
          <Text style={styles.brandTitle}>KOVAI KAVAL</Text>
          <Text style={styles.portalSubtitle}>POLICE PORTAL</Text>

          {/* Secure • Trusted • Official Access */}
          <View style={styles.taglineRow}>
            <Text style={styles.taglineWord}>Secure</Text>
            <View style={styles.taglineDot} />
            <Text style={styles.taglineWord}>Trusted</Text>
            <View style={styles.taglineDot} />
            <Text style={styles.taglineWord}>Official Access</Text>
          </View>
        </View>
      </Animated.View>

      {/* Bottom Section: Loader & Copyright */}
      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
        <ActivityIndicator size="small" color="#1A237E" />
        <Text style={styles.loadingText}>Loading...</Text>
        <Text style={styles.copyrightText}>© 2024 Coimbatore City Police</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 40,
  },
  skylineBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    height: 192,
    opacity: 0.5,
    pointerEvents: 'none',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emblemShadowBox: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  emblemContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  emblemImage: {
    width: 150,
    height: 150,
  },
  textGroup: {
    alignItems: 'center',
    marginTop: 32,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A237E',
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  portalSubtitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#454652',
    letterSpacing: 4,
    textAlign: 'center',
    marginTop: 8,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  taglineWord: {
    fontSize: 12,
    color: '#767683',
    fontWeight: '500',
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#767683',
    marginHorizontal: 10,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 24,
    zIndex: 2,
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#454652',
    marginTop: 8,
  },
  copyrightText: {
    fontSize: 11,
    color: '#767683',
    marginTop: 18,
    textAlign: 'center',
  },
});
