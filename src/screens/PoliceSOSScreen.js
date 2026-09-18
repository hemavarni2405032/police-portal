// src/screens/PoliceSOSScreen.js
// Police-Side Citizen SOS Alerts Monitor Screen
// Matches exact existing Police App UI design, headers, and card layouts

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import sosService from '../services/sosService';
import { useLanguage } from '../context/LanguageContext';
import { t, translateStatus } from '../i18n/translations';

const BACK_ICON = require('../../assets/details/icon_back.png');
const WATERMARK_IMG = require('../../assets/dashboard/image1_0_1.jpg');

export default function PoliceSOSScreen({ onNavigate, onBack }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const [alerts, setAlerts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = sosService.subscribeToAlerts(setAlerts);
    return () => unsub();
  }, []);

  const filterTabs = ['ALL', 'ACTIVE', 'PATROL_DISPATCHED', 'RESOLVED'];

  const filteredAlerts = alerts.filter((item) => {
    if (activeFilter !== 'ALL' && item.status !== activeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.trackingToken?.toLowerCase().includes(q) ||
        item.citizenName?.toLowerCase().includes(q) ||
        item.citizenPhone?.toLowerCase().includes(q) ||
        item.locationName?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('dashboard'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CITIZEN SOS ALERTS</Text>

        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>
            {alerts.filter((s) => s.status === 'ACTIVE').length} ACTIVE
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <Image
          source={WATERMARK_IMG}
          style={styles.watermarkBg}
          resizeMode="contain"
          pointerEvents="none"
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search SOS token, citizen name, or location"
            placeholderTextColor="#767683"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearSearchText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.filterPill, isSelected && styles.filterPillActive]}
                  onPress={() => setActiveFilter(tab)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}>
                    {translateStatus(lang, tab)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Alerts List */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listInner}
          showsVerticalScrollIndicator={false}
        >
          {filteredAlerts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🛡️</Text>
              <Text style={styles.emptyTitle}>No SOS Alerts Found</Text>
              <Text style={styles.emptySub}>All citizen emergency response channels are clear.</Text>
            </View>
          ) : (
            filteredAlerts.map((item) => {
              const isActive = item.status === 'ACTIVE';
              const isDispatched = item.status === 'PATROL_DISPATCHED';

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.alertCard}
                  onPress={() => onNavigate && onNavigate('citizen_sos_details', { sosId: item.id })}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.accentBar,
                    isActive ? { backgroundColor: '#BA1A1A' } :
                    isDispatched ? { backgroundColor: '#00288E' } : { backgroundColor: '#00875A' }
                  ]} />

                  <View style={styles.cardInner}>
                    <View style={styles.cardTopRow}>
                      <Text style={styles.tokenText}>{item.trackingToken}</Text>
                      <View style={[
                        styles.statusPill,
                        isActive ? { backgroundColor: '#FEE2E2' } :
                        isDispatched ? { backgroundColor: '#E0E7FF' } : { backgroundColor: '#DCFCE7' }
                      ]}>
                        <Text style={[
                          styles.statusPillText,
                          isActive ? { color: '#BA1A1A' } :
                          isDispatched ? { color: '#00288E' } : { color: '#00875A' }
                        ]}>
                          {translateStatus(lang, item.status)}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.emergencyHeading}>{item.category}</Text>

                    <View style={styles.citizenMetaRow}>
                      <Text style={styles.citizenName}>Citizen: {item.citizenName}</Text>
                      <Text style={styles.citizenPhone}>{item.citizenPhone}</Text>
                    </View>

                    <View style={styles.locationRow}>
                      <Text style={styles.locPin}>📍</Text>
                      <Text style={styles.locText} numberOfLines={1}>{item.locationName}</Text>
                    </View>

                    <View style={styles.cardDivider} />

                    <View style={styles.bottomActionRow}>
                      {isDispatched ? (
                        <Text style={styles.unitStatusText}>
                          🚓 {item.dispatchedUnit || 'Patrol En Route'} • ETA: {item.etaSeconds ? `${Math.round(item.etaSeconds / 60)}m` : '5m'}
                        </Text>
                      ) : (
                        <Text style={styles.awaitingText}>
                          ⚠️ Awaiting Dispatch • GPS: ±{item.accuracyMeters || 4.5}m
                        </Text>
                      )}

                      <Text style={styles.actionLinkText}>VIEW DETAILS →</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
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
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerBadge: {
    backgroundColor: '#BA1A1A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF8FF',
    position: 'relative',
  },
  watermarkBg: {
    position: 'absolute',
    width: 440,
    height: 440,
    left: -25,
    top: 150,
    opacity: 0.05,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1A1C20',
  },
  clearSearchText: {
    fontSize: 14,
    color: '#767683',
    padding: 4,
  },
  filterTabsRow: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#000666',
    borderColor: '#000666',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#454652',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listScroll: {
    flex: 1,
  },
  listInner: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  cardInner: {
    padding: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tokenText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000666',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emergencyHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1C20',
    marginBottom: 4,
  },
  citizenMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  citizenName: {
    fontSize: 12,
    color: '#454652',
    fontWeight: '600',
  },
  citizenPhone: {
    fontSize: 12,
    color: '#5A5D6B',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locPin: {
    fontSize: 12,
    marginRight: 4,
  },
  locText: {
    fontSize: 12,
    color: '#5A5D6B',
    flex: 1,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginBottom: 8,
  },
  bottomActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000666',
  },
  awaitingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B6171E',
  },
  actionLinkText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000666',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: '#767683',
  },
});
