// Kovai Kaval Police Portal Theme Colors — #000666 Deep Navy Blue Design System

export const COLORS = {
  primary: '#000666',        // Deep Kovai Kaval Blue (#000666)
  primaryDark: '#000444',    // Darker Navy
  primaryLight: '#001A88',   // Royal Police Blue
  accent: '#000666',         // Active Action Button
  accentLight: '#EEF2FF',    // Light Blue Selection Pill
  
  // Alert Statuses
  critical: '#D32F2F',       // Emergency / High Priority Red
  criticalBg: '#FEF2F2',     // Red Alert Background
  warning: '#F59E0B',        // Medium Priority Amber
  warningBg: '#FFFBEB',      // Amber Alert Background
  success: '#10B981',        // Active / Resolved Green
  successBg: '#ECFDF5',      // Green Badge Background
  info: '#0284C7',           // Unit / Info Cyan
  infoBg: '#F0F9FF',

  // Duty Status Colors
  onDuty: '#10B981',
  available: '#059669',
  busy: '#F59E0B',
  offDuty: '#64748B',

  // UI Surfaces & Text
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  divider: '#F1F5F9',
  
  // Custom Map & Overlay Colors
  mapBg: '#E5E7EB',
  hotspotHigh: '#EF444499',
  hotspotMedium: '#F59E0B99',
  hotspotLow: '#10B98199',
};

export const SHADOWS = {
  small: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
