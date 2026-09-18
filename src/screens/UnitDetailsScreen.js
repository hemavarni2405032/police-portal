import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BACK_ICON = require('../../assets/details/icon_back.png');
const OFFICER_KUMAR = require('../../assets/map/image3_147_2015.jpg');
const MAP_SNIPPET = require('../../assets/map/image2_147_2015.png');

export default function UnitDetailsScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#000666" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (onBack ? onBack() : onNavigate && onNavigate('live_map'))}
          activeOpacity={0.7}
        >
          <Image source={BACK_ICON} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>UNIT DETAILS</Text>

        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: Unit Identification */}
        <View style={styles.unitHeaderCard}>
          <View style={styles.unitShieldCircle}>
            <Text style={styles.unitShieldEmoji}>🛡️</Text>
          </View>

          <Text style={styles.unitNameTitle}>PU-12</Text>
          <Text style={styles.unitTypeSub}>Patrol Unit</Text>

          <View style={styles.enRouteBadge}>
            <View style={styles.redDot} />
            <Text style={styles.enRouteText}>EN ROUTE</Text>
          </View>
        </View>

        {/* Card 2: Current Assignment with ETA & Map */}
        <View style={styles.assignmentCard}>
          <View style={styles.assignmentHeaderBar}>
            <Text style={styles.assignmentHeaderIcon}>📢</Text>
            <Text style={styles.assignmentHeaderTitle}>CURRENT ASSIGNMENT</Text>
          </View>

          <View style={styles.assignmentBody}>
            <View style={styles.assignmentMetaRow}>
              <View style={styles.assignmentLeftCol}>
                <Text style={styles.assignmentIncidentId}>SOS-1024</Text>
                <View style={styles.locationPinRow}>
                  <Text style={styles.locationPinEmoji}>📍</Text>
                  <Text style={styles.assignmentLocation}>Gandhipuram</Text>
                </View>
              </View>

              <View style={styles.etaBox}>
                <Text style={styles.etaNumber}>06</Text>
                <Text style={styles.etaUnit}>MINS ETA</Text>
              </View>
            </View>

            {/* Map Snippet Preview */}
            <TouchableOpacity
              style={styles.mapSnippetContainer}
              onPress={() => onNavigate && onNavigate('patrol_tracking')}
              activeOpacity={0.85}
            >
              <Image source={MAP_SNIPPET} style={styles.mapSnippetImg} resizeMode="cover" />
              <View style={styles.mapSnippetOverlay} />
              <View style={styles.mapRouteOverlay}>
                <View style={styles.routePillTag}>
                  <Text style={styles.routePillTagText}>Live Route to SOS</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 3: Personnel On Board */}
        <View style={styles.personnelCard}>
          <Text style={styles.personnelSectionHeader}>PERSONNEL ON BOARD</Text>

          <View style={styles.officerRow}>
            <Image
              source={OFFICER_KUMAR}
              style={styles.officerPhoto}
              resizeMode="cover"
            />

            <View style={styles.officerInfoCol}>
              <Text style={styles.officerNameText}>Inspector Kumar</Text>
              <Text style={styles.officerRoleText}>Lead Officer • ID: TN-9942</Text>
            </View>

            <TouchableOpacity style={styles.phoneCallBtn} activeOpacity={0.7}>
              <Text style={styles.phoneIcon}>📞</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.viewSosBtn}
          onPress={() => onNavigate && onNavigate('sos_details')}
          activeOpacity={0.75}
        >
          <Text style={styles.viewSosIcon}>📄</Text>
          <Text style={styles.viewSosText}>VIEW SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.trackUnitBtn}
          onPress={() => onNavigate && onNavigate('patrol_tracking')}
          activeOpacity={0.8}
        >
          <Text style={styles.trackUnitIcon}>🎯</Text>
          <Text style={styles.trackUnitText}>TRACK UNIT</Text>
        </TouchableOpacity>
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
  bellBtn: {
    padding: 6,
  },
  bellIcon: {
    fontSize: 18,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F3F4F9',
  },
  scrollInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  unitHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unitShieldCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#000B58',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  unitShieldEmoji: {
    fontSize: 28,
  },
  unitNameTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000B58',
    letterSpacing: 0.5,
  },
  unitTypeSub: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 10,
  },
  enRouteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D32F2F',
    marginRight: 6,
  },
  enRouteText: {
    color: '#D32F2F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  assignmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  assignmentHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFCDD2',
  },
  assignmentHeaderIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  assignmentHeaderTitle: {
    color: '#D32F2F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  assignmentBody: {
    padding: 14,
  },
  assignmentMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  assignmentLeftCol: {
    flex: 1,
  },
  assignmentIncidentId: {
    fontSize: 18,
    fontWeight: '900',
    color: '#191C1D',
  },
  locationPinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationPinEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  assignmentLocation: {
    fontSize: 13,
    color: '#454652',
    fontWeight: '600',
  },
  etaBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#D32F2F',
    lineHeight: 24,
  },
  etaUnit: {
    fontSize: 9,
    fontWeight: '800',
    color: '#D32F2F',
    letterSpacing: 0.5,
  },
  mapSnippetContainer: {
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E232A',
  },
  mapSnippetImg: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  mapSnippetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 11, 88, 0.25)',
  },
  mapRouteOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routePillTag: {
    backgroundColor: 'rgba(0, 11, 88, 0.85)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  routePillTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  personnelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E2E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  personnelSectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#454652',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  officerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  officerPhoto: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
  },
  officerInfoCol: {
    flex: 1,
  },
  officerNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#191C1D',
  },
  officerRoleText: {
    fontSize: 12,
    color: '#767683',
    fontWeight: '500',
    marginTop: 2,
  },
  phoneCallBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECECF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    fontSize: 18,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E7',
  },
  viewSosBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#000B58',
    paddingVertical: 12,
    marginRight: 8,
  },
  viewSosIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  viewSosText: {
    color: '#000B58',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  trackUnitBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#000B58',
    paddingVertical: 12,
    marginLeft: 8,
  },
  trackUnitIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  trackUnitText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
