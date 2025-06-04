import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { EmailIcon } from "@/constants/SvgIcons";
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

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");

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
          <ThemedText style={styles.title}>Forgot your password?</ThemedText>

          <ThemedText style={styles.subtitle}>
            Reset link is on the way.
          </ThemedText>

          {/* Email Form */}
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
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.resetButton}
            activeOpacity={0.8}
            onPress={() => {
              router.push("/auth/new_password");
            }}
          >
            <ThemedText
              style={styles.resetButtonText}
              lightColor="#fff"
              darkColor="#fff"
            >
              Reset Password
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToLoginContainer}
            activeOpacity={0.7}
            onPress={() => {
              router.push("/auth/signin");
            }}
          >
            <ThemedText
              style={styles.backToLoginText}
              lightColor="rgba(255,255,255,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              Back to login
            </ThemedText>
          </TouchableOpacity>
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
    paddingTop: 100,
    paddingBottom: 50,
    justifyContent: "space-between",
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "HelveticaNow",
    lineHeight: 38,
    color: Colors.white,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "SFProRegular",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 22,
  },
  formFields: {
    width: "100%",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  emailInput: {
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
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SFProRegular",
  },
  backToLoginContainer: {
    alignItems: "center",
  },
  backToLoginText: {
    fontSize: 16,
    fontFamily: "SFProRegular",
  },
});
