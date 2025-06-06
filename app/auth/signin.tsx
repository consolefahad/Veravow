import CustomButton from "@/components/CustomButton";
import SocialSignin from "@/components/SocialSignin";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { hp, Size, wp } from "@/constants/Dimensions";
import { font } from "@/constants/Fonts";
import { image } from "@/constants/Images";
import { EmailIcon, LockIcon } from "@/constants/SvgIcons";
import { useTheme } from "@/constants/Theme";
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

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword] = useState(false);
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
    return !email.trim() || !password.trim();
  }, [email, password]);

  const handleSignin = async () => {
    if (isButtonDisabled) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/(tabs)");
    } catch (error) {
      console.error("Sign in failed:", error);
      // Handle error (show toast, alert, etc.)
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
                <ThemedText style={styles.title}>Sign in to Veravow</ThemedText>

                <SocialSignin />

                <ThemedText style={styles.dividerText}>
                  or sign in with email
                </ThemedText>

                <View style={styles.formFields}>
                  <View style={styles.inputContainer}>
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
                        placeholder="Enter Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        editable={!loading}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    activeOpacity={0.7}
                    onPress={() => {
                      router.push("/auth/reset_password");
                    }}
                  >
                    <ThemedText style={styles.forgotPasswordText}>
                      Forgot password?
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottomActions}>
                <CustomButton
                  title={"Sign In"}
                  onpress={handleSignin}
                  loading={loading}
                  disabled={isButtonDisabled}
                />

                <View style={styles.signUpContainer}>
                  <ThemedText style={styles.signUpText}>
                    Create an account?{" "}
                  </ThemedText>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      router.push("/auth/signup");
                    }}
                  >
                    <ThemedText style={styles.signUpLink}>Sign up</ThemedText>
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
  },
  formFields: {
    width: "100%",
    gap: hp(2),
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: wp(5.5),
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
    color: Colors.white,
    fontFamily: font.regular,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: hp(1),
  },
  forgotPasswordText: {
    fontSize: Size(4),
    color: Colors.white,
    fontFamily: font.regular,
  },
  bottomActions: {
    width: "100%",
    paddingTop: hp(4),
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: Size(4),
    fontFamily: font.regular,
  },
  signUpLink: {
    fontSize: Size(4),
    fontFamily: font.medium,
  },
});
