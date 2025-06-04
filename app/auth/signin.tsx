import CustomButton from "@/components/CustomButton";
import SocialSignin from "@/components/SocialSignin";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { EmailIcon, LockIcon } from "@/constants/SvgIcons";
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

const { width, height } = Dimensions.get("window");

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = () => {};

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
          <ThemedText style={styles.title}>Sign in to Veravow</ThemedText>

          {/* Social Login Buttons */}
          <SocialSignin />
          {/* Divider */}
          <ThemedText style={styles.dividerText}>
            or sign in with email
          </ThemedText>

          {/* Email and Password Form */}
          <View style={styles.formFields}>
            <View style={styles.inputContainer}>
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
                  placeholder="Enter Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
              </View>
            </View>

            {/* Forgot Password */}
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

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <CustomButton title={"Sign In"} onpress={handleSignin} />

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
  inputContainer: {
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.47",
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
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: "SFProRegular",
  },
  bottomActions: {
    width: "100%",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "SFProRegular",
  },
  signUpLink: {
    fontSize: 16,
    fontFamily: "SFProMedium",
  },
});
