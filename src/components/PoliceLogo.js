// src/components/PoliceLogo.js
// Official Tamil Nadu Police Emblem & Kovai Kaval Title component (#000666)

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const EMBLEM_IMG = require('../../assets/police_emblem.jpg');

export default function PoliceLogo({ size = 'medium', darkText = true }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const containerSize = isSmall ? 52 : isLarge ? 96 : 72;
  const imageSize = isSmall ? 46 : isLarge ? 86 : 64;

  return (
    <View style={styles.container}>
      {/* Tamil Nadu Police Emblem Badge matching Figma */}
      <View
        style={[
          styles.emblemOuterCircle,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
          },
        ]}
      >
        <View
          style={[
            styles.emblemInnerCircle,
            {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
            },
          ]}
        >
          <Image
            source={EMBLEM_IMG}
            style={{ width: imageSize, height: imageSize }}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Main App Title */}
      <Text
        style={[
          styles.titleText,
          darkText ? styles.textDark : styles.textLight,
          isSmall && styles.titleTextSmall,
          isLarge && styles.titleTextLarge,
        ]}
      >
        KOVAI KAVAL
      </Text>
      <Text
        style={[
          styles.subTitleText,
          isSmall && styles.subTitleTextSmall,
          isLarge && styles.subTitleTextLarge,
        ]}
      >
        கோவை காவல்
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemOuterCircle: {
    backgroundColor: '#EFECF5',
    borderWidth: 1,
    borderColor: 'rgba(198, 197, 212, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emblemInnerCircle: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  titleTextSmall: {
    fontSize: 13,
    letterSpacing: 1,
  },
  titleTextLarge: {
    fontSize: 22,
    letterSpacing: 2,
  },
  textDark: {
    color: '#000666',
  },
  textLight: {
    color: '#FFFFFF',
  },
  subTitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginTop: 2,
  },
  subTitleTextSmall: {
    fontSize: 10,
  },
  subTitleTextLarge: {
    fontSize: 14,
  },
});
