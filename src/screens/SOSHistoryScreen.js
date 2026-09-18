import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACK_ICON = require('../../assets/details/icon_back.png');

export default function SOSHistoryScreen({ onNavigate, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const historyData = [
    {
      id: 'SOS-1001',
      status: 'RESOLVED',
      type: 'Medical Emergency',
      location: 'Saibaba Colony',
      date: '31 Aug 2026',
      accentColor: '#2E7D32',
    },
    {
      id: 'SOS-1002',
      status: 'RESOLVED',
      type: "Women's Safety",
      location: 'RS Puram',
      date: '31 Aug 2026',
      accentColor: '#2E7D32',
    },
    {
      id: 'SOS-1003',
      status: 'CANCELLED',
      type: 'Personal Safety',
      location: 'Gandhipuram',
      date: '30 Aug 2026',
      accentColor: '#767683',
    },
    {
      id: 'SOS-0998',
      status: 'RESOLVED',
      type: 'Traffic Emergency',
      location: 'Town Hall',
      date: '28 Aug 2026',
      accentColor: '#2E7D32',
    },
  ];

  const filteredData = historyData.filter((item) => {
    if (selectedFilter !== 'ALL' && item.status !== selectedFilter) return false;
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('sos_center'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>SOS HISTORY</Text>

        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search SOS ID, date or location"
          placeholderTextColor="#767683"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Pills */}
      <View style={styles.pillsRow}>
        {['ALL', 'RESOLVED', 'CANCELLED', 'FALSE ALARM'].map((pill) => (
          <TouchableOpacity
            key={pill}
            style={[
              styles.pillBtn,
              selectedFilter === pill && styles.pillBtnActive,
            ]}
            onPress={() => setSelectedFilter(pill)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pillBtnText,
                selectedFilter === pill && styles.pillBtnTextActive,
              ]}
            >
              {pill}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {filteredData.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={[styles.accentBar, { backgroundColor: item.accentColor }]} />
            <View style={styles.cardInner}>
              <View style={styles.cardTopRow}>
                <View style={styles.idStatusRow}>
                  <Text style={styles.historyIdText}>{item.id}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      item.status === 'RESOLVED' && styles.resolvedPill,
                      item.status === 'CANCELLED' && styles.cancelledPill,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        item.status === 'RESOLVED' && styles.resolvedPillText,
                        item.status === 'CANCELLED' && styles.cancelledPillText,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.moreOptionsBtn}>
                  <Text style={styles.moreOptionsText}>⋮</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.emergencyHeading}>{item.type}</Text>

              <View style={styles.cardBottomRow}>
                <View style={styles.metaCol}>
                  <Text style={styles.metaIcon}>📍</Text>
                  <Text style={styles.metaText}>{item.location}</Text>
                </View>

                <View style={styles.metaCol}>
                  <Text style={styles.metaIcon}>📅</Text>
                  <Text style={styles.metaText}>{item.date}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
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
  menuBtn: {
    padding: 6,
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#C6C5D4',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#191C1D',
  },
  clearIcon: {
    fontSize: 14,
    color: '#767683',
    padding: 4,
  },
  pillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pillBtn: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  pillBtnActive: {
    backgroundColor: '#000B58',
    borderColor: '#000B58',
  },
  pillBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#454652',
  },
  pillBtnTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  cardInner: {
    paddingLeft: 18,
    paddingRight: 14,
    paddingVertical: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  idStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIdText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000B58',
    marginRight: 8,
  },
  statusPill: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  resolvedPill: {
    backgroundColor: '#E8F5E9',
  },
  resolvedPillText: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: '800',
  },
  cancelledPill: {
    backgroundColor: '#ECECF0',
  },
  cancelledPillText: {
    color: '#767683',
    fontSize: 10,
    fontWeight: '800',
  },
  moreOptionsBtn: {
    padding: 4,
  },
  moreOptionsText: {
    fontSize: 18,
    color: '#767683',
    fontWeight: '800',
  },
  emergencyHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#191C1D',
    marginBottom: 10,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaCol: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#5A5D6B',
    fontWeight: '500',
  },
});
