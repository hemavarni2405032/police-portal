import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Previous Screens & Components (Completely Preserved)
import SplashScreen from './src/components/SplashScreen';
import AuthScreens from './src/screens/AuthScreens';
import OfficersScreen from './src/screens/OfficersScreen';
import WomenSafetyScreen from './src/screens/WomenSafetyScreen';

// Figma DashBoard.svg & Details.svg Screens
import DashboardScreen from './src/screens/DashboardScreen';
import StationDetailsScreen from './src/screens/StationDetailsScreen';
import JurisdictionScreen from './src/screens/JurisdictionScreen';
import CaseManagementScreen from './src/screens/CaseManagementScreen';
import AICaseAnalysisScreen from './src/screens/AICaseAnalysisScreen';
import AICaseAnalysisDomesticScreen from './src/screens/AICaseAnalysisDomesticScreen';
import CaseDetailsScreen from './src/screens/CaseDetailsScreen';
import ComplainantScreen from './src/screens/ComplainantScreen';
import EvidenceViewerScreen from './src/screens/EvidenceViewerScreen';
import CaseW1042Screen from './src/screens/CaseW1042Screen';
import CaseReportScreen from './src/screens/CaseReportScreen';

// Live Map Incident Screens (Live Map Incident.svg)
import LiveMapScreen from './src/screens/LiveMapScreen';
import LiveCaseSearchScreen from './src/screens/LiveCaseSearchScreen';
import UnitDetailsScreen from './src/screens/UnitDetailsScreen';
import PatrolTrackingScreen from './src/screens/PatrolTrackingScreen';
import CrimeHotspotScreen from './src/screens/CrimeHotspotScreen';

// SOS Emergency Response Screens (SOS.svg)
import SOSCenterScreen from './src/screens/SOSCenterScreen';
import ActiveAlertsScreen from './src/screens/ActiveAlertsScreen';
import SOSDetailsScreen from './src/screens/SOSDetailsScreen';
import CitizenInfoScreen from './src/screens/CitizenInfoScreen';
import SOSFullDetailsScreen from './src/screens/SOSFullDetailsScreen';
import LiveSOSLocationScreen from './src/screens/LiveSOSLocationScreen';
import SOSHistoryScreen from './src/screens/SOSHistoryScreen';
import PoliceUnitsScreen from './src/screens/PoliceUnitsScreen';
import DispatchScreen from './src/screens/DispatchScreen';

// Group 9 Bottom Navigation Bar & Quick Navigator
import BottomNavigation from './src/components/BottomNavigation';
import QuickScreenNavigator from './src/components/QuickScreenNavigator';

// Citizen App Integration Screens & Real-Time Sync
import PoliceSOSScreen from './src/screens/PoliceSOSScreen';
import PoliceSOSDetailsScreen from './src/screens/PoliceSOSDetailsScreen';
import PoliceServiceRequestsScreen from './src/screens/PoliceServiceRequestsScreen';
import PoliceServiceRequestDetailsScreen from './src/screens/PoliceServiceRequestDetailsScreen';
import SeniorCitizenCareScreen from './src/screens/SeniorCitizenCareScreen';
import SeniorCitizenDetailsScreen from './src/screens/SeniorCitizenDetailsScreen';
import LHMSDetailsScreen from './src/screens/LHMSDetailsScreen';
import CitizenSyncSimulatorModal from './src/components/CitizenSyncSimulatorModal';
import { LanguageProvider } from './src/context/LanguageContext';

function MainApp() {
  const insets = useSafeAreaInsets();
  const [showSplash, setShowSplash] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showSimulatorModal, setShowSimulatorModal] = useState(false);

  // Dynamic clearance matching the safe height of Group 9 Bottom Navigation
  const bottomBarClearance = 58 + Math.max(insets.bottom, Platform.OS === 'ios' ? 10 : 6);

  // Navigation Stack History: each item is { screen: string, params: object }
  const [navStack, setNavStack] = useState([{ screen: 'dashboard', params: {} }]);

  const currentRoute = navStack[navStack.length - 1] || { screen: 'dashboard', params: {} };
  const currentScreen = currentRoute.screen;

  // 1. Push navigation (supports params and history)
  const pushScreen = useCallback((screenKey, params = {}) => {
    if (screenKey === 'logout' || screenKey === 'auth') {
      setIsAuthenticated(false);
      setNavStack([{ screen: 'dashboard', params: {} }]);
      return;
    }
    if (screenKey === 'splash') {
      setShowSplash(true);
      return;
    }

    setIsAuthenticated(true);

    // Prevent duplicate push of current screen with identical params
    setNavStack((prev) => {
      const top = prev[prev.length - 1];
      if (top && top.screen === screenKey && JSON.stringify(top.params) === JSON.stringify(params)) {
        return prev;
      }
      return [...prev, { screen: screenKey, params }];
    });
  }, []);

  // 2. Go Back navigation (returns to exact prior screen)
  const goBack = useCallback(() => {
    if (navStack.length > 1) {
      setNavStack((prev) => prev.slice(0, prev.length - 1));
      return true;
    } else {
      // If at root of sub-screen stack, return to dashboard
      if (currentScreen !== 'dashboard') {
        setNavStack([{ screen: 'dashboard', params: {} }]);
        return true;
      }
      return false; // at dashboard root
    }
  }, [navStack.length, currentScreen]);

  // 3. Tab Switcher via BottomNavigation (Group 9.svg)
  const handleTabSelect = useCallback((tabKey) => {
    // Reset navigation stack to root tab for clean, instant switching
    setNavStack([{ screen: tabKey, params: {} }]);
  }, []);

  // 4. Hardware Back Button Listener (Android)
  useEffect(() => {
    const onHardwareBack = () => {
      if (showSplash) return false;
      if (!isAuthenticated) return false;
      return goBack();
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onHardwareBack);
    return () => sub.remove();
  }, [showSplash, isAuthenticated, goBack]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setNavStack([{ screen: 'dashboard', params: {} }]);
  };

  // Determine active tab for BottomNavigation highlighting
  const getActiveTab = () => {
    if (currentScreen === 'dashboard') return 'dashboard';
    if (['case_management', 'cases', 'case_details', 'complainant', 'evidence', 'evidence_list', 'case_report', 'citizen_service_requests', 'citizen_service_details', 'senior_citizen_care', 'senior_citizen_details'].includes(currentScreen)) {
      return 'case_management';
    }
    if (['sos_center', 'sos', 'active_alerts', 'sos_details', 'citizen_info', 'sos_emergency_details', 'live_sos_location', 'sos_history', 'dispatch', 'citizen_sos_screen', 'citizen_sos_details'].includes(currentScreen)) {
      return 'sos_center';
    }
    if (['live_map', 'map', 'jurisdiction', 'live_case_search', 'unit_details', 'patrol_tracking', 'crime_hotspots', 'hotspots'].includes(currentScreen)) {
      return 'live_map';
    }
    if (['station_details', 'officers', 'officer_profile', 'police_units'].includes(currentScreen)) {
      return 'station_details';
    }
    return 'dashboard';
  };

  // 1. Initial Splash Screen
  if (showSplash) {
    return (
      <View style={styles.appContainer}>
        <StatusBar style="light" backgroundColor="#000666" />
        <SplashScreen onFinish={() => setShowSplash(false)} />
        <QuickScreenNavigator
          currentScreen="splash"
          onSelectScreen={(key) => {
            setShowSplash(false);
            pushScreen(key);
          }}
        />
      </View>
    );
  }

  // 2. Authentication Flow (Previous AuthScreens)
  if (!isAuthenticated) {
    return (
      <View style={styles.appContainer}>
        <StatusBar style="light" backgroundColor="#000666" />
        <AuthScreens onLoginSuccess={handleLoginSuccess} />
        <QuickScreenNavigator
          currentScreen="auth"
          onSelectScreen={pushScreen}
        />
      </View>
    );
  }

  // 3. Authenticated Application Flow with Navigation Stack & Group 9 Bottom Bar
  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" backgroundColor="#000666" />

      {/* Screen Content Area with safe bottom clearance for Group 9 Navigation */}
      <View style={[styles.screenWrapper, { paddingBottom: bottomBarClearance }]}>
        {/* Screen 1: All Features Dashboard (Figma Screen 1) */}
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={() => {
              setIsAuthenticated(false);
              setNavStack([{ screen: 'dashboard', params: {} }]);
            }}
          />
        )}

        {/* Screen 2: Station Details & Hub (Figma Screen 2 / Details.svg / Screen 6) */}
        {currentScreen === 'station_details' && (
          <StationDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 3: Jurisdiction & Dispatch (Figma Screen 3) */}
        {currentScreen === 'jurisdiction' && (
          <JurisdictionScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 4: Case Management (Figma Screen 4) */}
        {(currentScreen === 'case_management' || currentScreen === 'cases') && (
          <CaseManagementScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 5: AI Case Analysis - Cyber Fraud (Figma Screen 5) */}
        {currentScreen === 'ai_analysis' && (
          <AICaseAnalysisScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 6 & 7: Case Details #CMP-2047 (Figma Screen 6 & 7) */}
        {currentScreen === 'case_details' && (
          <CaseDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 8: Complainant Profile - Arun Kumar (Figma Screen 8) */}
        {currentScreen === 'complainant' && (
          <ComplainantScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 9 & 12: Evidence Details / CCTV Player (Figma Screen 9 & 12) */}
        {currentScreen === 'evidence' && (
          <EvidenceViewerScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
            initialMode="detail"
          />
        )}

        {/* Screen 10: AI Domestic Violence Analysis (Figma Screen 10) */}
        {currentScreen === 'ai_domestic' && (
          <AICaseAnalysisDomesticScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 11: Case W-1042 Details (Figma Screen 11) */}
        {currentScreen === 'case_w1042' && (
          <CaseW1042Screen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 13: Evidence Multi-Tab List (Figma Screen 13) */}
        {currentScreen === 'evidence_list' && (
          <EvidenceViewerScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
            initialMode="list"
          />
        )}

        {/* Screen 14: Case Reports & Analytics (Figma Screen 14) */}
        {(currentScreen === 'case_report' || currentScreen === 'analytics') && (
          <CaseReportScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* ======================================================== */}
        {/* LIVE MAP INCIDENT SCREENS (Live Map Incident.svg)         */}
        {/* ======================================================== */}
        {/* Screen 3 & 1: Live Incident Map Overview & Map Filters */}
        {(currentScreen === 'live_map' || currentScreen === 'map') && (
          <LiveMapScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 2: Live Case Analysis & Search */}
        {currentScreen === 'live_case_search' && (
          <LiveCaseSearchScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 4: Unit Details (PU-12 En Route) */}
        {currentScreen === 'unit_details' && (
          <UnitDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 5: PU-12 Live Route Tracking */}
        {(currentScreen === 'patrol_tracking' || currentScreen === 'live_tracking') && (
          <PatrolTrackingScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Screen 7: Crime Hotspot Analysis */}
        {(currentScreen === 'crime_hotspots' || currentScreen === 'hotspots') && (
          <CrimeHotspotScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* ======================================================== */}
        {/* SOS EMERGENCY RESPONSE SCREENS (SOS.svg)                  */}
        {/* ======================================================== */}
        {/* SOS Screen 1: Emergency Response Center Hub */}
        {(currentScreen === 'sos_center' || currentScreen === 'sos') && (
          <SOSCenterScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 2: Active Alerts List & Search */}
        {currentScreen === 'active_alerts' && (
          <ActiveAlertsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 3 & 4: SOS-1024 Incident Details & Location */}
        {currentScreen === 'sos_details' && (
          <SOSDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 5: Citizen Information (Ananya R) */}
        {currentScreen === 'citizen_info' && (
          <CitizenInfoScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 6: Emergency Details Report */}
        {currentScreen === 'sos_emergency_details' && (
          <SOSFullDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 7: Live SOS Location & Pulse */}
        {currentScreen === 'live_sos_location' && (
          <LiveSOSLocationScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 8: SOS History */}
        {currentScreen === 'sos_history' && (
          <SOSHistoryScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 9: Police Units Roster */}
        {currentScreen === 'police_units' && (
          <PoliceUnitsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* SOS Screen 11, 12, 13: Dispatch Unit & Confirm & Success Flow */}
        {currentScreen === 'dispatch' && (
          <DispatchScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Officers on Duty Roster */}
        {currentScreen === 'officers' && (
          <OfficersScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Women & Child Safety Division */}
        {currentScreen === 'women_safety' && (
          <WomenSafetyScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* ======================================================== */}
        {/* CITIZEN APP INTEGRATION SCREENS                           */}
        {/* ======================================================== */}
        {currentScreen === 'citizen_sos_screen' && (
          <PoliceSOSScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {currentScreen === 'citizen_sos_details' && (
          <PoliceSOSDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {currentScreen === 'citizen_service_requests' && (
          <PoliceServiceRequestsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {currentScreen === 'citizen_service_details' && (
          <PoliceServiceRequestDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Dedicated Senior Citizen Care Screens (Citizen App Submissions) */}
        {currentScreen === 'senior_citizen_care' && (
          <SeniorCitizenCareScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {currentScreen === 'senior_citizen_details' && (
          <SeniorCitizenDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}

        {/* Dedicated Locked House Monitoring System (LHMS) Details */}
        {currentScreen === 'lhms_details' && (
          <LHMSDetailsScreen
            route={currentRoute}
            params={currentRoute.params}
            onNavigate={pushScreen}
            onBack={goBack}
          />
        )}
      </View>

      {/* Group 9.svg Bottom Navigation Bar with Safe Bottom Area */}
      <BottomNavigation
        activeTab={getActiveTab()}
        onSelectTab={handleTabSelect}
      />

      {/* Floating Quick Screen Navigator for fast testing in Expo Go */}
      <QuickScreenNavigator
        currentScreen={currentScreen}
        onSelectScreen={pushScreen}
      />

      {/* Floating 2-Way Citizen Sync Simulator Pill for mobile testing in Expo Go */}
      <View style={styles.floatingSyncContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.floatingSyncPill}
          onPress={() => setShowSimulatorModal(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.floatingSyncPillText}>⚡ 2-WAY SYNC</Text>
        </TouchableOpacity>
      </View>

      <CitizenSyncSimulatorModal
        visible={showSimulatorModal}
        onClose={() => setShowSimulatorModal(false)}
        onNavigate={pushScreen}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#000666',
  },
  screenWrapper: {
    flex: 1,
  },
  floatingSyncContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    zIndex: 9999,
    elevation: 10,
  },
  floatingSyncPill: {
    backgroundColor: '#BA1A1A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  floatingSyncPillText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});