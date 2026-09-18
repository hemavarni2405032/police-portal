// src/components/LanguageToggle.js
// Reusable Language Toggle matching Kovai Kaval design system [ EN | தமிழ் ]

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle({ darkBg = false }) {
  const { lang, setLang } = useLanguage();

  return (
    <View style={[styles.pillContainer, darkBg && styles.pillContainerDark]}>
      <TouchableOpacity
        style={[styles.segment, lang === 'en' && styles.segmentActive]}
        onPress={() => setLang('en')}
        activeOpacity={0.85}
      >
        <Text style={[styles.segmentText, lang === 'en' && styles.segmentTextActive]}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.segment, lang === 'ta' && styles.segmentActive]}
        onPress={() => setLang('ta')}
        activeOpacity={0.85}
      >
        <Text style={[styles.segmentText, lang === 'ta' && styles.segmentTextActive]}>தமிழ்</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF2FF',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  pillContainerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  segment: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  segmentActive: {
    backgroundColor: '#000666',
  },
  segmentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000666',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
});
