import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICON_HOME = require('../../assets/nav/icon_home.png');
const ICON_CASES = require('../../assets/nav/icon_cases.png');
const ICON_SOS = require('../../assets/nav/icon_sos.png');
const ICON_MAP = require('../../assets/nav/icon_map.png');
const ICON_PROFILE = require('../../assets/nav/icon_profile.png');

export default function BottomNavigation({ activeTab, onSelectTab }) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 10 : 6);
  const tabs = [
    {
      key: 'dashboard',
      label: 'Home',
      icon: ICON_HOME,
      iconStyle: { width: 22, height: 20 },
    },
    {
      key: 'case_management',
      label: 'Cases',
      icon: ICON_CASES,
      iconStyle: { width: 20, height: 21 },
    },
    {
      key: 'sos_center',
      label: 'SOS',
      icon: ICON_SOS,
      iconStyle: { width: 21, height: 21 },
      badge: '6',
    },
    {
      key: 'live_map',
      label: 'Map',
      icon: ICON_MAP,
      iconStyle: { width: 23, height: 21 },
    },
    {
      key: 'station_details',
      label: 'Profile',
      icon: ICON_PROFILE,
      iconStyle: { width: 22, height: 22 },
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.barContainer, { paddingBottom: bottomPadding, height: 58 + bottomPadding }]}>
        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.key ||
            (tab.key === 'dashboard' && activeTab === 'home') ||
            (tab.key === 'case_management' && (activeTab === 'cases' || activeTab === 'case_details')) ||
            (tab.key === 'live_map' && activeTab === 'map') ||
            (tab.key === 'sos_center' && activeTab === 'sos');

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => onSelectTab(tab.key)}
              activeOpacity={0.7}
            >
              {/* Icon Container with optional SOS badge */}
              <View style={styles.iconBox}>
                <Image
                  source={tab.icon}
                  style={[
                    tab.iconStyle,
                    { tintColor: isActive ? '#000666' : '#444653' },
                  ]}
                  resizeMode="contain"
                />
                {tab.badge && (
                  <View style={styles.badgePill}>
                    <Text style={styles.badgeText}>{tab.badge}</Text>
                  </View>
                )}
              </View>

              {/* Label */}
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>

              {/* Active Indicator Dot */}
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 70,
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#C6C5D4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    height: '100%',
  },
  iconBox: {
    width: 28,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#000666',
    fontWeight: '800',
  },
  tabLabelInactive: {
    color: '#444653',
    fontWeight: '600',
    opacity: 0.85,
  },
  activeDot: {
    position: 'absolute',
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000666',
  },
  badgePill: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
