// src/screens/PoliceServiceRequestsScreen.js
// Police Integration Screen: Citizen E-Services & Applications List
// Matches exact existing Police App UI design, layout, filters, search, and cards

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import serviceRequestService from '../services/serviceRequestService';
import { useLanguage } from '../context/LanguageContext';
import { t, translateStatus } from '../i18n/translations';

const BACK_ICON = require('../../assets/details/icon_back.png');
const USER_ICON = require('../../assets/details/icon_user.png');
const HOUSE_ICON = require('../../assets/icon_house.png');
const PIN_ICON = require('../../assets/details/icon_pin.png');

export default function PoliceServiceRequestsScreen({ route, params, onNavigate, onBack }) {
  const { lang } = useLanguage();
  const tr = (key) => t(lang, key);

  const initialCat = (params && (params.initialCategory || params.category)) ||
                     (route && route.params && (route.params.initialCategory || route.params.category)) ||
                     'ALL';

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState(initialCat);

  useEffect(() => {
    const passedCat = (params && (params.initialCategory || params.category)) ||
                      (route && route.params && (route.params.initialCategory || route.params.category));
    if (passedCat) {
      setActiveCategory(passedCat);
    }
  }, [params, route?.params]);

  useEffect(() => {
    const unsub = serviceRequestService.subscribeToRequests(setRequests);
    return () => unsub();
  }, []);


  const statusFilters = ['ALL', 'SUBMITTED', 'IN_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];

  const effectiveCategory =
    (params && (params.initialCategory || params.category)) ||
    (route && route.params && (route.params.initialCategory || route.params.category)) ||
    activeCategory ||
    'ALL';

  const matchesCategory = (itemServiceType, cat) => {
    if (!cat || cat === 'ALL') return true;
    const sType = (itemServiceType || '').toUpperCase();
    const cType = cat.toUpperCase();
    if (sType === cType) return true;
    if (cType === 'LHMS' && (sType === 'LHMS' || sType === 'LOCKED_HOUSE' || sType.includes('LOCKED_HOUSE') || sType.includes('LHMS'))) return true;
    if (cType === 'LOST_ITEMS' && (sType === 'LOST_ITEMS' || sType === 'LOST_ITEM' || sType.includes('LOST'))) return true;
    if (cType === 'WOMEN_NIGHT_ESCORT' && (sType === 'WOMEN_NIGHT_ESCORT' || sType === 'WOMEN_SAFETY_ESCORT' || sType === 'NIGHT_ESCORT' || sType.includes('ESCORT') || sType.includes('WOMEN_SAFETY'))) return true;
    if (cType === 'CYBER_COMPLAINTS' && (sType === 'CYBER_COMPLAINTS' || sType === 'CYBER_COMPLAINT' || sType.includes('CYBER'))) return true;
    if (cType === 'TRACK_MY_TRIP' && (sType === 'TRACK_MY_TRIP' || sType === 'TRACK_TRIP' || sType.includes('TRIP'))) return true;
    if (cType === 'SENIOR_CITIZEN_CARE' && (sType === 'SENIOR_CITIZEN_CARE' || sType === 'SENIOR_CARE' || sType.includes('SENIOR'))) return true;
    return false;
  };

  const filteredRequests = requests.filter((item) => {
    if (activeStatus !== 'ALL' && item.status.toUpperCase() !== activeStatus) return false;
    if (!matchesCategory(item.serviceType, effectiveCategory)) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.trackingToken?.toLowerCase().includes(q) ||
        item.applicantName?.toLowerCase().includes(q) ||
        item.applicantPhone?.toLowerCase().includes(q) ||
        item.serviceTitle?.toLowerCase().includes(q) ||
        item.jurisdictionStation?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'IN_REVIEW':
        return { bg: '#EDE9FE', text: '#6D28D9' };
      case 'ASSIGNED':
        return { bg: '#E0F2FE', text: '#0369A1' };
      case 'IN_PROGRESS':
        return { bg: '#E0E7FF', text: '#00288E' };
      case 'RESOLVED':
        return { bg: '#DCFCE7', text: '#00875A' };
      default:
        return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const getHeaderTitle = (cat) => {
    switch (cat) {
      case 'LHMS':
        return 'LOCKED HOUSE (LHMS)';
      case 'LOST_ITEMS':
        return 'LOST ITEMS';
      case 'WOMEN_NIGHT_ESCORT':
        return 'NIGHT ESCORT / WOMEN SAFETY';
      case 'SENIOR_CITIZEN_CARE':
        return 'SENIOR CITIZEN CARE';
      case 'TRACK_MY_TRIP':
        return 'TRACK MY TRIP';
      case 'CYBER_COMPLAINTS':
        return 'CYBER COMPLAINTS';
      default:
        return 'SERVICE REQUESTS';
    }
  };

  const getSectionTitle = (cat) => {
    switch (cat) {
      case 'LHMS':
        return 'LOCKED HOUSE (LHMS) CASES';
      case 'LOST_ITEMS':
        return 'LOST ITEM CASES';
      case 'WOMEN_NIGHT_ESCORT':
        return 'NIGHT ESCORT REQUESTS';
      case 'SENIOR_CITIZEN_CARE':
        return 'SENIOR CITIZEN CARE CASES';
      case 'TRACK_MY_TRIP':
        return 'TRACK MY TRIP REQUESTS';
      case 'CYBER_COMPLAINTS':
        return 'CYBER COMPLAINT CASES';
      default:
        return 'SUBMITTED CASES';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Header matching existing style */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('dashboard'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{getHeaderTitle(effectiveCategory)}</Text>

        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{filteredRequests.length}</Text>
        </View>
      </View>

      <View style={styles.container}>
        {/* Search Bar matching existing style */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tracking token (TN-KVK-...), citizen or phone"
            placeholderTextColor="#767683"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Status Filter Tabs for this specific feature */}
        <View style={styles.filterTabsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {statusFilters.map((tab) => {
              const isSelected = activeStatus === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.filterPill, isSelected && styles.filterPillActive]}
                  onPress={() => setActiveStatus(tab)}
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

        {/* Feature Section Header — Category selector completely removed */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>{getSectionTitle(effectiveCategory)}</Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>{filteredRequests.length} CASES</Text>
          </View>
        </View>
        <View style={styles.sectionDivider} />


        {/* List of Citizen Requests */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listInner}
          showsVerticalScrollIndicator={false}
        >
          {filteredRequests.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Image source={HOUSE_ICON} style={styles.emptyIcon} resizeMode="contain" />
              <Text style={styles.emptyTitle}>
                {effectiveCategory === 'LHMS' ? 'No LHMS cases filed yet.' : 'No Matching Requests'}
              </Text>
              <Text style={styles.emptySub}>
                {effectiveCategory === 'LHMS'
                  ? 'Locked House Monitoring requests submitted by citizens will appear here in real-time.'
                  : 'Try searching another token or selecting All filters.'}
              </Text>
            </View>
          ) : (
            filteredRequests.map((item) => {
              const badge = getBadgeStyle(item.status);
              const isLHMS = item.serviceType === 'LHMS' || effectiveCategory === 'LHMS';
              const targetScreen = isLHMS ? 'lhms_details' : 'citizen_service_details';

              const itemAddress =
                item.formData?.address ||
                (item.formData?.houseNo ? `${item.formData.houseNo}, ${item.formData.area || ''}` : null) ||
                item.address;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.caseCard}
                  onPress={() => onNavigate && onNavigate(targetScreen, { caseId: item.id })}
                  activeOpacity={0.8}
                >
                  {/* Top: Tracking Token & Status */}
                  <View style={styles.cardTop}>
                    <View style={styles.tokenPill}>
                      <Text style={styles.tokenPillText}>{item.trackingToken}</Text>
                    </View>
                    <View style={[styles.statusTag, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.statusTagText, { color: badge.text }]}>
                        {translateStatus(lang, item.status)}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.caseTitle}>{item.serviceTitle}</Text>

                  <View style={styles.applicantMetaRow}>
                    <Text style={styles.applicantName}>
                      Applicant: <Text style={styles.boldText}>{item.applicantName}</Text>
                    </Text>
                    <Text style={styles.applicantPhone}>{item.applicantPhone}</Text>
                  </View>

                  {itemAddress ? (
                    <Text style={styles.addressLine} numberOfLines={2}>
                      Address: <Text style={styles.boldText}>{itemAddress}</Text>
                    </Text>
                  ) : null}

                  <View style={styles.stationRow}>
                    <Image source={PIN_ICON} style={styles.pinIcon} resizeMode="contain" />
                    <Text style={styles.stationName} numberOfLines={1}>
                      {item.jurisdictionStation}
                    </Text>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.cardBottomRow}>
                    <View style={styles.officerRow}>
                      <Image source={USER_ICON} style={styles.userIcon} resizeMode="contain" />
                      <Text style={styles.officerText}>
                        Officer: <Text style={styles.boldText}>{item.assignedOfficer || 'Unassigned'}</Text>
                      </Text>
                    </View>

                    <Text style={styles.viewActionText}>[MANAGE] →</Text>
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
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  countBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  countBadgeText: {
    color: '#001A5E',
    fontSize: 11,
    fontWeight: '900',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF8FF',
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
  clearIcon: {
    fontSize: 14,
    color: '#767683',
    padding: 4,
  },
  filterTabsRow: {
    paddingHorizontal: 16,
    marginBottom: 6,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A1C20',
    letterSpacing: 0.5,
  },
  sectionBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  sectionBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000666',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E2E2EC',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  listScroll: {
    flex: 1,
  },
  listInner: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2EC',
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tokenPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tokenPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000666',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusTagText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  caseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1C20',
    marginBottom: 4,
  },
  applicantMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  applicantName: {
    fontSize: 12,
    color: '#454652',
  },
  applicantPhone: {
    fontSize: 11.5,
    color: '#5A5D6B',
  },
  boldText: {
    fontWeight: '800',
    color: '#1A1C20',
  },
  stationName: {
    fontSize: 11.5,
    color: '#5A5D6B',
    marginBottom: 8,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
    marginBottom: 8,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  officerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 12,
    height: 14,
    marginRight: 6,
    tintColor: '#767683',
  },
  officerText: {
    fontSize: 12,
    color: '#5A5D6B',
  },
  viewActionText: {
    color: '#000666',
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1C20',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: '#767683',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 44,
    height: 44,
    tintColor: '#94A3B8',
    marginBottom: 8,
  },
  addressLine: {
    fontSize: 12,
    color: '#454652',
    marginBottom: 4,
  },
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pinIcon: {
    width: 11,
    height: 11,
    tintColor: '#5A5D6B',
    marginRight: 4,
  },
});
