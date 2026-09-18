// src/components/SharedHeader.js
// Reusable Shared Header across Police, Citizen, and Admin Portals

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';
import LanguageToggle from './LanguageToggle';
import PoliceLogo from './PoliceLogo';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

export default function SharedHeader({
  portalRole = 'police', // 'police' | 'citizen' | 'admin'
  title,
  subtitle,
  showBack = false,
  onBack,
  onSwitchPortal,
}) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        {/* Left Side: Back button or Compact Kovai Kaval Emblem & Title */}
        <View style={styles.leftGroup}>
          {showBack ? (
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
              <Text style={styles.backBtnIcon}>←</Text>
              <Text style={styles.backBtnText}>{tr('back')}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.brandRow}>
              <PoliceLogo size="small" darkText={false} />
            </View>
          )}
        </View>

        {/* Right Side: Shared Language Selector + Portal Role Badge */}
        <View style={styles.rightGroup}>
          <LanguageToggle darkBg={true} />

          {onSwitchPortal && (
            <TouchableOpacity style={styles.roleBadge} onPress={onSwitchPortal} activeOpacity={0.8}>
              <Text style={styles.roleBadgeText}>
                {portalRole === 'police' ? '👮 POLICE' : portalRole === 'admin' ? '⚖️ ADMIN' : '🏛️ CITIZEN'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Subheader / Page Title if provided */}
      {title ? (
        <View style={styles.titleRow}>
          <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
          {subtitle ? <Text style={styles.subtitleText} numberOfLines={1}>{subtitle}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000666',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  backBtnIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  roleBadgeText: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '800',
  },
  titleRow: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  subtitleText: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 1,
  },
});
