import CustomButton from "@/components/CustomButton";
import SocialSignin from "@/components/SocialSignin";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { AngleDown, EmailIcon, LockIcon } from "@/constants/SvgIcons";
import { useToast } from "@/constants/ToastProvider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
const { width, height } = Dimensions.get("window");

// US States data for dropdown
const statesData = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export default function SignUpScreen() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleCreateAccount = () => {};
  //   showToast({
  //     type: "warning",
  //     text1: "Sign in successful",
  //     text2: "Welcome back!",
  //   });
  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Images */}
      <ImageBackground
        source={require("@/assets/images/entrybg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]}
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      {/* Purple Gradient at Bottom Right Corner */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(121, 142, 255, 0.19)",
          "rgba(179, 144, 255, 0.4)",
          "rgba(179, 144, 255, 0.5)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9, 1]}
        style={styles.bottomGradient}
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Main Content */}
        <View style={styles.formContainer}>
          <ThemedText style={styles.title}>Sign up to Veravow</ThemedText>

          {/* Social Login Buttons */}
          <SocialSignin />

          {/* Divider */}
          <ThemedText style={styles.dividerText}>OR</ThemedText>

          {/* Form Fields */}
          <View style={styles.formFields}>
            <View style={styles.inputContainer}>
              {/* State Dropdown */}
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "rgba(255, 255, 255, 0.4)" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={statesData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select your state" : "..."}
                  searchPlaceholder="Search state..."
                  value={selectedState}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSelectedState(item.value);
                    setIsFocus(false);
                  }}
                  renderRightIcon={() => (
                    <View style={styles.dropdownIcon}>
                      <AngleDown />
                    </View>
                  )}
                />
              </View>

              {/* Email Input */}
              <View style={styles.emailInput}>
                <EmailIcon />
                <TextInput
                  style={styles.textInput}
                  placeholder="Your email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View style={styles.passwordInput}>
                <LockIcon />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <CustomButton
            title={"Create Account"}
            onpress={handleCreateAccount}
          />

          <View style={styles.signInContainer}>
            <ThemedText style={styles.signInText}>
              Already have an account?{" "}
            </ThemedText>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                router.push("/auth/signin");
              }}
            >
              <ThemedText style={styles.signInLink}>Sign in</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    width: width,
  },
  gradientOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: height * 0.7,
    width: width,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 50,
    justifyContent: "space-between",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "HelveticaNow",
    lineHeight: 38,
  },
  dividerText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "SFProRegular",
    color: Colors.gray300,
  },
  formFields: {
    width: "100%",
    gap: 16,
  },
  dropdownContainer: {
    marginBottom: 8,
  },
  dropdown: {
    height: 56,
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    overflow: "hidden",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
    fontFamily: "SFProRegular",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "SFProRegular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
  },
  dropdownIcon: {
    marginRight: 8,
  },
  dropdownIconText: {
    color: "#999",
    fontSize: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  emailInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.18)",
    gap: 12,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontFamily: "SFProRegular",
  },
  bottomActions: {
    width: "100%",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 16,
    fontFamily: "SFProMedium",
  },
  signInLink: {
    fontSize: 16,
    fontFamily: "SFProMedium",
  },
});
