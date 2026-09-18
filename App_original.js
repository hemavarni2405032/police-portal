import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { COLORS } from './src/theme/colors';

// Import Screens
import AuthScreens from './src/screens/AuthScreens';
import DashboardScreen from './src/screens/DashboardScreen';
import LiveMapScreen from './src/screens/LiveMapScreen';
import SOSCenterScreen from './src/screens/SOSCenterScreen';
import OfficersScreen from './src/screens/OfficersScreen';
import WomenSafetyScreen from './src/screens/WomenSafetyScreen';
import CaseManagementScreen from './src/screens/CaseManagementScreen';
import AICaseAnalysisScreen from './src/screens/AICaseAnalysisScreen';
import EvidenceViewerScreen from './src/screens/EvidenceViewerScreen';

// Import Navigation Bar
import BottomNavigation from './src/components/BottomNavigation';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const handleNavigate = (screenKey) => {
    setCurrentScreen(screenKey);
  };

  const handleTabSelect = (tabKey) => {
    switch (tabKey) {
      case 'dashboard':
        setCurrentScreen('dashboard');
        break;
      case 'sos':
        setCurrentScreen('sos');
        break;
      case 'map':
        setCurrentScreen('map');
        break;
      case 'cases':
        setCurrentScreen('cases');
        break;
      case 'officers':
        setCurrentScreen('officers');
        break;
      case 'women_safety':
        setCurrentScreen('women_safety');
        break;
      default:
        setCurrentScreen('dashboard');
        break;
    }
  };

  // Determine active tab for Bottom Navigation
  const getActiveTabKey = () => {
    if (['dashboard', 'all_features', 'station_details'].includes(currentScreen)) return 'dashboard';
    if (['sos', 'sos_detail', 'dispatch'].includes(currentScreen)) return 'sos';
    if (['map', 'tracking', 'hotspots'].includes(currentScreen)) return 'map';
    if (['cases', 'case_detail'].includes(currentScreen)) return 'cases';
    if (['officers', 'officer_profile', 'leaderboard', 'performance'].includes(currentScreen)) return 'officers';
    if (['women_safety'].includes(currentScreen)) return 'women_safety';
    return 'dashboard';
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <AuthScreens onLoginSuccess={() => setIsAuthenticated(true)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.body}>
        {currentScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} />}
        {currentScreen === 'map' && <LiveMapScreen onNavigate={handleNavigate} />}
        {currentScreen === 'sos' && <SOSCenterScreen onNavigate={handleNavigate} />}
        {currentScreen === 'sos_detail' && <SOSCenterScreen onNavigate={handleNavigate} />}
        {currentScreen === 'dispatch' && <SOSCenterScreen onNavigate={handleNavigate} />}
        {currentScreen === 'officers' && <OfficersScreen onNavigate={handleNavigate} />}
        {currentScreen === 'officer_profile' && <OfficersScreen onNavigate={handleNavigate} />}
        {currentScreen === 'women_safety' && <WomenSafetyScreen onNavigate={handleNavigate} />}
        {currentScreen === 'cases' && <CaseManagementScreen onNavigate={handleNavigate} />}
        {currentScreen === 'ai_analysis' && <AICaseAnalysisScreen onNavigate={handleNavigate} />}
        {currentScreen === 'evidence' && <EvidenceViewerScreen onNavigate={handleNavigate} />}

        {/* Fallback routing for extra feature keys */}
        {['analytics', 'audit_log', 'settings'].includes(currentScreen) && (
          <DashboardScreen onNavigate={handleNavigate} />
        )}
      </View>

      {/* Global Bottom Tab Bar Navigation */}
      <BottomNavigation activeTab={getActiveTabKey()} onSelectTab={handleTabSelect} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
