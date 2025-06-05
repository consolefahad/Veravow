import CustomButton from "@/components/CustomButton";
import SocialSignin from "@/components/SocialSignin";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { hp, Size, wp } from "@/constants/Dimensions";
import { font } from "@/constants/Fonts";
import { image } from "@/constants/Images";
import { AngleDown, EmailIcon, LockIcon } from "@/constants/SvgIcons";
import { useTheme } from "@/constants/Theme";
import { useToast } from "@/constants/ToastProvider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  BackHandler,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

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
  const [loading, setLoading] = useState(false);
  const { gradients } = useTheme();
  useEffect(() => {
    const backAction = () => {
      router.push("/");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const isButtonDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || !selectedState;
  }, [email, password, selectedState]);

  const handleCreateAccount = async () => {
    if (isButtonDisabled) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast({
        type: "success",
        text1: "Account created successfully",
        text2: "Welcome to Veravow!",
      });

      router.push("/auth/signin");
    } catch (error) {
      console.error("Account creation failed:", error);
      showToast({
        type: "error",
        text1: "Account creation failed",
        text2: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={image.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={gradients.overlay}
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      <LinearGradient
        colors={gradients.bottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9, 1]}
        style={styles.bottomGradient}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                <ThemedText style={styles.title}>Sign up to Veravow</ThemedText>

                <SocialSignin />

                <ThemedText style={styles.dividerText}>OR</ThemedText>

                <View style={styles.formFields}>
                  <View style={styles.inputContainer}>
                    <View style={styles.dropdownContainer}>
                      <Dropdown
                        style={[
                          styles.dropdown,
                          isFocus && {
                            borderColor: "rgba(255, 255, 255, 0.4)",
                          },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={statesData}
                        search
                        maxHeight={hp(37.5)}
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
                        disable={loading}
                      />
                    </View>

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
                        editable={!loading}
                      />
                    </View>

                    <View style={styles.passwordInput}>
                      <LockIcon />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        editable={!loading}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.bottomActions}>
                <CustomButton
                  title={"Create Account"}
                  onpress={handleCreateAccount}
                  loading={loading}
                  disabled={isButtonDisabled}
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.black,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: hp(60),
    width: wp(100),
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
    height: hp(70),
    width: wp(100),
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(7.5),
    paddingBottom: hp(6),
    justifyContent: "space-between",
    minHeight: hp(88),
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Size(8),
    textAlign: "center",
    marginBottom: hp(5),
    fontFamily: font.heading,
    lineHeight: Size(9.5),
  },
  dividerText: {
    fontSize: Size(4),
    textAlign: "center",
    marginBottom: hp(3),
    fontFamily: font.regular,
    color: Colors.gray300,
  },
  formFields: {
    width: "100%",
    gap: hp(2),
  },
  dropdownContainer: {
    marginBottom: hp(1),
  },
  dropdown: {
    height: hp(7),
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderBottomWidth: 1,
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    overflow: "hidden",
  },
  placeholderStyle: {
    fontSize: Size(4),
    color: "#999",
    fontFamily: font.regular,
  },
  selectedTextStyle: {
    fontSize: Size(4),
    color: "#fff",
    fontFamily: font.regular,
  },
  iconStyle: {
    width: wp(5),
    height: hp(2.5),
  },
  inputSearchStyle: {
    height: hp(5),
    fontSize: Size(4),
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: wp(2),
  },
  dropdownIcon: {
    marginRight: wp(2),
  },
  dropdownIconText: {
    color: "#999",
    fontSize: Size(3),
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: wp(5.5),
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  emailInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.18)",
    gap: wp(3),
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    gap: wp(3),
  },
  textInput: {
    flex: 1,
    fontSize: Size(4),
    color: "#fff",
    fontFamily: font.regular,
  },
  bottomActions: {
    width: "100%",
    paddingTop: hp(4),
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: Size(4),
    fontFamily: font.medium,
  },
  signInLink: {
    fontSize: Size(4),
    fontFamily: font.medium,
  },
});
