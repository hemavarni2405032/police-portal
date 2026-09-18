import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EMBLEM_IMG = require('../../assets/police_emblem.jpg');
const WATERMARK_IMG = require('../../assets/police_watermark.jpg');
const PHONE_ICON = require('../../assets/icon_phone.png');
const EMAIL_ICON = require('../../assets/icon_email.png');
const SHIELD_ICON = require('../../assets/icon_shield.png');
const ARROW_ICON = require('../../assets/icon_arrow.png');
const LOCK_ICON = require('../../assets/icon_lock.png');
const SUCCESS_BADGE_IMG = require('../../assets/auth_success_badge.png');
const BACK_ARROW_ICON = require('../../assets/icon_back_arrow.png');
const SMS_ICON = require('../../assets/icon_sms_message.png');
const SHIELD_CHECK_ICON = require('../../assets/icon_shield_check.png');

export default function AuthScreens({ onLoginSuccess }) {
  const [step, setStep] = useState('welcome'); // welcome | phone | email | otp | success
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['4', '8', '2', '6']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(44);

  React.useEffect(() => {
    let interval = null;
    if (step === 'otp') {
      setCountdown(44);
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step]);

  React.useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => {
        onLoginSuccess && onLoginSuccess();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, onLoginSuccess]);

  const handleSendOtp = () => {
    if (step === 'phone') {
      if (!phone || phone.trim().length === 0) {
        setPhoneError('Please enter your registered mobile number');
        return;
      }
      if (phone.trim().length < 10) {
        setPhoneError('Please enter a valid 10-digit mobile number');
        return;
      }
    }
    setPhoneError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 600);
  };

  // STEP 1: WELCOME SCREEN - EXACT MATCH TO FIGMA DESIGN
  if (step === 'welcome') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#FBF8FF" />
        <View style={styles.container}>
          {/* Watermark background */}
          <Image
            source={WATERMARK_IMG}
            style={styles.watermarkBg}
            resizeMode="contain"
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Top Section */}
            <View style={styles.topSection}>
              {/* Outer emblem container (96x96 circle) */}
              <View style={styles.emblemOuterCircle}>
                <View style={styles.emblemInnerCircle}>
                  <Image
                    source={EMBLEM_IMG}
                    style={styles.emblemImage}
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Title */}
              <Text style={styles.portalTitle}>KOVAI KAVAL</Text>

              {/* Officer Portal Pill Badge */}
              <View style={styles.officerBadgePill}>
                <Image
                  source={SHIELD_ICON}
                  style={styles.badgeShieldIcon}
                  resizeMode="contain"
                />
                <Text style={styles.officerBadgeText}>OFFICER PORTAL</Text>
              </View>

              {/* Heading */}
              <Text style={styles.welcomeHeading}>Welcome, Officer</Text>

              {/* Subheading */}
              <Text style={styles.welcomeSubheading}>
                Sign in securely to access the administrative services and tools.
              </Text>
            </View>

            {/* Selection Options */}
            <View style={styles.cardsSection}>
              {/* Card 1: Mobile Number */}
              <TouchableOpacity
                style={styles.methodCard}
                activeOpacity={0.8}
                onPress={() => setStep('phone')}
              >
                <View style={styles.cardIconBox}>
                  <Image
                    source={PHONE_ICON}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Continue with Mobile Number</Text>
                  <Text style={styles.cardSubtitle}>
                    Receive a one-time password (OTP) through SMS.
                  </Text>
                </View>
                <Image
                  source={ARROW_ICON}
                  style={styles.cardArrow}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Card 2: Email */}
              <TouchableOpacity
                style={styles.methodCard}
                activeOpacity={0.8}
                onPress={() => setStep('email')}
              >
                <View style={styles.cardIconBox}>
                  <Image
                    source={EMAIL_ICON}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Continue with Email</Text>
                  <Text style={styles.cardSubtitle}>
                    Receive a one-time password (OTP) through email.
                  </Text>
                </View>
                <Image
                  source={ARROW_ICON}
                  style={styles.cardArrow}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Security & Disclaimer Notice */}
            <View style={styles.securitySection}>
              <TouchableOpacity
                style={styles.securityPill}
                onPress={() => onLoginSuccess && onLoginSuccess()}
                activeOpacity={0.7}
              >
                <Image
                  source={LOCK_ICON}
                  style={styles.lockIcon}
                  resizeMode="contain"
                />
                <Text style={styles.securityText}>Secure Officer Access</Text>
              </TouchableOpacity>

              <Text style={styles.disclaimerLine}>
                Authorized Coimbatore City Police personnel only.
              </Text>
              <Text style={styles.disclaimerLine}>
                Unauthorized access is strictly prohibited.
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Copyright Bar */}
          <View style={styles.bottomBar}>
            <Text style={styles.bottomBarText}>© Coimbatore City Police</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // STEP 2: PHONE INPUT SCREEN (EXACT MATCH TO Mobile Frame Container.svg)
  if (step === 'phone') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#FBF8FF" />
        <View style={styles.container}>
          {/* Watermark with exact 10% transparency from Mobile Frame Container.svg */}
          <Image
            source={WATERMARK_IMG}
            style={styles.watermarkBgPhone}
            resizeMode="contain"
          />

          <ScrollView
            contentContainerStyle={styles.scrollContentForm}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Top Back Arrow */}
            <TouchableOpacity
              style={styles.backArrowBtn}
              onPress={() => setStep('welcome')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Image
                source={BACK_ARROW_ICON}
                style={styles.backArrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Circular Police Emblem (96x96 with 80x80 inner) */}
            <View style={styles.topSection}>
              <View style={styles.emblemOuterCircle}>
                <View style={styles.emblemInnerCircle80}>
                  <Image
                    source={EMBLEM_IMG}
                    style={styles.emblemImage80}
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Title */}
              <Text style={styles.portalTitle}>KOVAI KAVAL</Text>
            </View>

            {/* Main Form Card (Matching Mobile Frame Container) */}
            <View style={styles.mobileFormCard}>
              <Text style={styles.mobileFormHeading}>
                Enter Your Mobile{'\n'}Number
              </Text>
              <Text style={styles.mobileFormSub}>
                We'll send a one-time password to verify your identity.
              </Text>

              <Text style={styles.mobileInputLabel}>Registered Mobile Number</Text>
              <View style={styles.mobileInputRow}>
                <View style={styles.mobileCountryBox}>
                  <Text style={styles.mobileCountryText}>+91</Text>
                </View>
                <TextInput
                  style={styles.mobileInputField}
                  placeholder="Enter registered mobile number"
                  placeholderTextColor="#767683"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={(val) => {
                    setPhone(val);
                    if (phoneError) setPhoneError('');
                  }}
                />
              </View>

              {phoneError ? (
                <Text style={styles.errorText}>⚠️ {phoneError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.mobileSendOtpBtn}
                onPress={handleSendOtp}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.mobileSendOtpText}>SEND OTP</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.mobileSmsHelper}>
                An OTP will be sent to your registered police mobile number via SMS.
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Footer with Copyright & Links */}
          <View style={styles.mobileFooterBox}>
            <Text style={styles.mobileCopyrightText}>© Coimbatore City Police</Text>
            <View style={styles.mobileFooterLinks}>
              <Text style={styles.mobileLinkText}>Privacy Policy</Text>
              <Text style={styles.mobileLinkDivider}>•</Text>
              <Text style={styles.mobileLinkText}>Terms of Service</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // STEP 3: EMAIL INPUT SCREEN
  if (step === 'email') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#FBF8FF" />
        <View style={styles.container}>
          {/* Watermark with exact 10% transparency from Mobile Frame Container.svg */}
          <Image
            source={WATERMARK_IMG}
            style={styles.watermarkBgPhone}
            resizeMode="contain"
          />

          <ScrollView
            contentContainerStyle={styles.scrollContentForm}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <TouchableOpacity
              style={styles.backArrowBtn}
              onPress={() => setStep('welcome')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Image
                source={BACK_ARROW_ICON}
                style={styles.backArrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={styles.topSection}>
              <View style={styles.emblemOuterCircle}>
                <View style={styles.emblemInnerCircle80}>
                  <Image
                    source={EMBLEM_IMG}
                    style={styles.emblemImage80}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text style={styles.portalTitle}>KOVAI KAVAL</Text>
            </View>

            <View style={styles.mobileFormCard}>
              <Text style={styles.mobileFormHeading}>
                Enter Your Official{'\n'}Email Address
              </Text>
              <Text style={styles.mobileFormSub}>
                We'll send a one-time password to verify your official credentials.
              </Text>

              <Text style={styles.mobileInputLabel}>Official Police Email</Text>
              <View style={styles.mobileEmailRow}>
                <TextInput
                  style={styles.mobileEmailField}
                  placeholder="officer@tnpolice.gov.in"
                  placeholderTextColor="#767683"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <TouchableOpacity
                style={styles.mobileSendOtpBtn}
                onPress={handleSendOtp}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.mobileSendOtpText}>SEND OTP</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.mobileSmsHelper}>
                An OTP will be sent to your official police email address.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.mobileFooterBox}>
            <Text style={styles.mobileCopyrightText}>© Coimbatore City Police</Text>
            <View style={styles.mobileFooterLinks}>
              <Text style={styles.mobileLinkText}>Privacy Policy</Text>
              <Text style={styles.mobileLinkDivider}>•</Text>
              <Text style={styles.mobileLinkText}>Terms of Service</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // STEP 4: OTP VERIFICATION SCREEN (EXACT MATCH TO Authentication Successful (Refined Background).svg OTP Design)
  if (step === 'otp') {
    const activeIdx = otp.findIndex((d) => !d) === -1 ? 5 : otp.findIndex((d) => !d);

    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#FBF8FF" />
        <View style={styles.container}>
          {/* Watermark with exact 6% transparency from SVG */}
          <Image
            source={WATERMARK_IMG}
            style={styles.watermarkBgExact6}
            resizeMode="contain"
          />

          <ScrollView
            contentContainerStyle={styles.scrollContentForm}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Top Back Arrow */}
            <TouchableOpacity
              style={styles.backArrowBtn}
              onPress={() => setStep('welcome')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Image
                source={BACK_ARROW_ICON}
                style={styles.backArrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Circular Police Emblem */}
            <View style={styles.topSection}>
              <View style={styles.emblemOuterCircle}>
                <View style={styles.emblemInnerCircle80}>
                  <Image
                    source={EMBLEM_IMG}
                    style={styles.emblemImage80}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text style={styles.portalTitle}>KOVAI KAVAL</Text>
            </View>

            {/* Form Content */}
            <View style={styles.otpFormCenter}>
              <Text style={styles.otpHeading}>Verify Your Identity</Text>
              <Text style={styles.otpSubheading}>
                Enter the 6-digit OTP sent to your registered{'\n'}contact.
              </Text>

              {/* Notification Pill (Matching Figma 284x34) */}
              <View style={styles.otpPillBox}>
                <Image
                  source={SMS_ICON}
                  style={styles.otpPillIcon}
                  resizeMode="contain"
                />
                <Text style={styles.otpPillText}>
                  OTP sent via SMS to +91 {phone ? `XXXXX ${phone.slice(-5)}` : 'XXXXX XXXXX'}
                </Text>
              </View>

              {/* Hidden text input for typing 4-digit OTP */}
              <TextInput
                style={styles.hiddenOtpInput}
                keyboardType="number-pad"
                maxLength={4}
                value={otp.join('')}
                onChangeText={(val) => {
                  const arr = ['', '', '', ''];
                  for (let i = 0; i < val.length && i < 4; i++) {
                    arr[i] = val[i];
                  }
                  setOtp(arr);
                }}
                autoFocus={true}
              />

              {/* 4 Digit OTP Boxes (48x56 each, 20px gap matching Figma) */}
              <View style={styles.otpBoxesRow4}>
                {otp.map((digit, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <View
                      key={idx}
                      style={[
                        styles.otpBoxSingle,
                        isActive ? styles.otpBoxActive : null,
                      ]}
                    >
                      <Text style={styles.otpDigitText}>{digit || ''}</Text>
                    </View>
                  );
                })}
              </View>

              {/* Live Resend OTP Timer */}
              {countdown > 0 ? (
                <Text style={styles.resendOtpTimerText}>
                  ⏱ Resend OTP in 00:{countdown < 10 ? '0' : ''}{countdown}
                </Text>
              ) : (
                <TouchableOpacity onPress={() => setCountdown(44)} style={{ marginBottom: 26 }}>
                  <Text style={styles.resendOtpActionText}>
                    🔄 Resend OTP Now
                  </Text>
                </TouchableOpacity>
              )}

              {/* Primary Verify Button (Width: 252, Height: 48) */}
              <TouchableOpacity
                style={styles.otpVerifyBtn}
                onPress={handleVerifyOtp}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Image
                      source={SHIELD_CHECK_ICON}
                      style={styles.shieldCheckBtnIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.otpVerifyBtnText}>VERIFY OTP</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Secondary Button: Change Mobile Number / Email */}
              <TouchableOpacity
                style={styles.otpChangeMethodBtn}
                onPress={() => setStep(phone ? 'phone' : 'email')}
                activeOpacity={0.8}
              >
                <Text style={styles.otpChangeMethodText}>
                  Change Mobile Number / Email
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Bottom Footer */}
          <View style={styles.mobileFooterBox}>
            <Text style={styles.mobileCopyrightText}>© Coimbatore City Police</Text>
            <View style={styles.mobileFooterLinks}>
              <Text style={styles.mobileLinkText}>Privacy Policy</Text>
              <Text style={styles.mobileLinkDivider}>•</Text>
              <Text style={styles.mobileLinkText}>Terms of Service</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // STEP 5: SUCCESS SCREEN (EXACT MATCH TO Authentication Successful (Refined Background).svg)
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBF8FF" />
      <View style={[styles.container, styles.successCenter]}>
        {/* Faint Police Emblem Watermark at 6% opacity */}
        <Image
          source={WATERMARK_IMG}
          style={styles.watermarkBgSuccess}
          resizeMode="contain"
        />

        {/* 96x96 Checkmark Badge from Figma SVG */}
        <View style={styles.successBadgeContainer}>
          <Image
            source={SUCCESS_BADGE_IMG}
            style={styles.successBadgeImage}
            resizeMode="contain"
          />
        </View>

        {/* Title in #000666 */}
        <Text style={styles.successTitle}>Authentication Successful</Text>

        {/* Subtitle in #454652 */}
        <Text style={styles.successSub}>
          Welcome to Coimbatore Kovai Kaval
        </Text>

        {/* Transition Loading Spinner in #000666 */}
        <ActivityIndicator size="small" color="#000666" style={{ marginTop: 24 }} />

        {/* Enter Portal Button */}
        <TouchableOpacity
          style={[styles.primaryBtn, { width: 220, marginTop: 24 }]}
          onPress={onLoginSuccess}
        >
          <Text style={styles.primaryBtnText}>ENTER PORTAL →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF8FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF8FF',
    justifyContent: 'space-between',
  },
  watermarkBg: {
    position: 'absolute',
    width: 380,
    height: 380,
    alignSelf: 'center',
    top: 180,
    opacity: 0.08,
    pointerEvents: 'none',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emblemOuterCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFECF5',
    borderWidth: 1,
    borderColor: 'rgba(198, 197, 212, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emblemInnerCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  emblemImage: {
    width: 86,
    height: 86,
  },
  emblemInnerCircle80: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  emblemImage80: {
    width: 80,
    height: 80,
  },
  portalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 1.5,
    marginTop: 14,
    textAlign: 'center',
  },
  officerBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 35, 126, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(0, 6, 102, 0.12)',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginTop: 8,
    alignSelf: 'center',
  },
  badgeShieldIcon: {
    width: 13,
    height: 13,
    marginRight: 6,
  },
  officerBadgeText: {
    color: '#000666',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  welcomeHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1B21',
    marginTop: 22,
    textAlign: 'center',
  },
  welcomeSubheading: {
    fontSize: 13.5,
    lineHeight: 19,
    color: '#454652',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
  },
  cardsSection: {
    width: '100%',
    marginTop: 8,
    marginBottom: 24,
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 6, 102, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIcon: {
    width: 22,
    height: 22,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1B1B21',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#454652',
    marginTop: 3,
    lineHeight: 16,
  },
  cardArrow: {
    width: 10,
    height: 14,
    marginLeft: 8,
  },
  securitySection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  securityPill: {
    backgroundColor: '#EAE7EF',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  lockIcon: {
    width: 14,
    height: 16,
    marginRight: 8,
  },
  securityText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#454652',
  },
  disclaimerLine: {
    fontSize: 11,
    lineHeight: 16,
    color: '#767683',
    textAlign: 'center',
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(198, 197, 212, 0.35)',
    backgroundColor: '#FBF8FF',
    paddingVertical: 12,
    alignItems: 'center',
  },
  bottomBarText: {
    color: '#454652',
    fontSize: 11.5,
    fontWeight: '400',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000666',
  },
  topSectionSmall: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emblemOuterCircleSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFECF5',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 6,
  },
  emblemImageSmall: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  portalTitleSmall: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 1,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C6C5D4',
    padding: 20,
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 8,
  },
  formHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1B1B21',
    textAlign: 'center',
  },
  formSub: {
    fontSize: 12.5,
    color: '#454652',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 17,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B1B21',
    marginBottom: 6,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
  },
  countryCodeBox: {
    backgroundColor: '#EFECF5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#C6C5D4',
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000666',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1B1B21',
  },
  emailInputBox: {
    borderWidth: 1,
    borderColor: '#C6C5D4',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
  },
  textInputField: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1B1B21',
  },
  primaryBtn: {
    backgroundColor: '#000666',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  helperNote: {
    fontSize: 11,
    color: '#767683',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 15,
  },
  otpNoticePill: {
    backgroundColor: 'rgba(26, 35, 126, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 18,
    alignSelf: 'center',
  },
  otpNoticeText: {
    fontSize: 11.5,
    color: '#000666',
    fontWeight: '600',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpBox: {
    width: 44,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C6C5D4',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  otpBoxFilled: {
    borderColor: '#000666',
    backgroundColor: '#FFFFFF',
  },
  otpBoxDigit: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000666',
  },
  timerNotice: {
    fontSize: 12,
    color: '#767683',
    textAlign: 'center',
    marginBottom: 20,
  },
  switchMethodBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  switchMethodText: {
    color: '#1A237E',
    fontSize: 12.5,
    fontWeight: '700',
  },
  watermarkBgSuccess: {
    position: 'absolute',
    width: 380,
    height: 380,
    alignSelf: 'center',
    top: 180,
    opacity: 0.06,
    pointerEvents: 'none',
  },
  successCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  successBadgeContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  successBadgeImage: {
    width: 96,
    height: 96,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 15,
    color: '#454652',
    marginTop: 10,
    textAlign: 'center',
  },
  scrollContentForm: {
    paddingHorizontal: 21,
    paddingTop: 8,
    paddingBottom: 24,
  },
  backArrowBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  backArrowIcon: {
    width: 18,
    height: 18,
  },
  watermarkBgPhone: {
    position: 'absolute',
    width: 465,
    height: 465,
    alignSelf: 'center',
    top: 189,
    opacity: 0.1,
    pointerEvents: 'none',
  },
  mobileFormCard: {
    backgroundColor: 'transparent',
    paddingHorizontal: 2,
    paddingTop: 16,
    paddingBottom: 20,
    marginTop: 4,
  },
  mobileFormHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1B21',
    textAlign: 'center',
    lineHeight: 28,
  },
  mobileFormSub: {
    fontSize: 13.5,
    color: '#454652',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 26,
    lineHeight: 19,
    paddingHorizontal: 10,
  },
  mobileInputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B1B21',
    marginBottom: 8,
  },
  mobileInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    borderRadius: 8,
    height: 56,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  mobileCountryBox: {
    width: 64,
    height: '100%',
    backgroundColor: '#F5F2FB',
    borderRightWidth: 1,
    borderRightColor: '#C6C5D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileCountryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B1B21',
  },
  mobileInputField: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
    fontSize: 14.5,
    color: '#1B1B21',
  },
  mobileEmailRow: {
    borderWidth: 1,
    borderColor: '#C6C5D4',
    borderRadius: 8,
    height: 56,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  mobileEmailField: {
    paddingHorizontal: 14,
    fontSize: 14.5,
    color: '#1B1B21',
  },
  mobileSendOtpBtn: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#000666',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  mobileSendOtpText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: 1,
  },
  mobileSmsHelper: {
    fontSize: 11.5,
    color: '#454652',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  mobileFooterBox: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(198, 197, 212, 0.3)',
    backgroundColor: '#FBF8FF',
    paddingVertical: 14,
    alignItems: 'center',
  },
  mobileCopyrightText: {
    color: '#454652',
    fontSize: 11.5,
    fontWeight: '400',
  },
  mobileFooterLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    gap: 12,
  },
  mobileLinkText: {
    color: '#454652',
    opacity: 0.8,
    fontSize: 11,
  },
  mobileLinkDivider: {
    color: '#454652',
    opacity: 0.5,
    fontSize: 10,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  watermarkBgExact6: {
    position: 'absolute',
    width: 447,
    height: 447,
    alignSelf: 'center',
    top: 198,
    opacity: 0.06,
    pointerEvents: 'none',
  },
  otpFormCenter: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
  },
  otpHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1B21',
    textAlign: 'center',
    marginTop: 18,
  },
  otpSubheading: {
    fontSize: 13.5,
    color: '#454652',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 19,
  },
  otpPillBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F2FB',
    borderWidth: 1,
    borderColor: 'rgba(198, 197, 212, 0.3)',
    borderRadius: 8,
    height: 36,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  otpPillIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  otpPillText: {
    fontSize: 12,
    color: '#1B1B21',
    fontWeight: '500',
  },
  hiddenOtpInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0.01,
  },
  otpBoxesRow4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 22,
  },
  otpBoxesRow6: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  resendOtpActionText: {
    fontSize: 12.5,
    color: '#000666',
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  otpBoxSingle: {
    width: 48,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#FBF8FF',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  otpBoxActive: {
    borderColor: '#000666',
    borderWidth: 1.5,
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  otpDigitText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B21',
  },
  resendOtpTimerText: {
    fontSize: 12.5,
    color: '#5D5F5F',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 26,
  },
  otpVerifyBtn: {
    width: 252,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#000666',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  shieldCheckBtnIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  otpVerifyBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: 1,
  },
  otpChangeMethodBtn: {
    width: 252,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#C6C5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpChangeMethodText: {
    color: '#1B1B21',
    fontSize: 13,
    fontWeight: '600',
  },
});
