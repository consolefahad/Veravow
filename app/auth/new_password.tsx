import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { LockIcon } from "@/constants/SvgIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if button should be disabled
  const isButtonDisabled = useMemo(() => {
    return !newPassword.trim() || !confirmPassword.trim();
  }, [newPassword, confirmPassword]);

  const handleResetPassword = async () => {
    if (isButtonDisabled) return;

    setLoading(true);
    try {
      // Add your password reset logic here
      // For example: await resetPassword(newPassword, confirmPassword);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push("/auth/signin");
    } catch (error) {
      console.error("Password reset failed:", error);
      // Handle error (show toast, alert, etc.)
    } finally {
      setLoading(false);
    }
  };

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
          <ThemedText style={styles.title}>Set new password</ThemedText>

          <ThemedText style={styles.subtitle}>
            In order to protect your account make sure your password:
          </ThemedText>

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <ThemedText style={styles.requirementText}>
              • Is at least 8 characters long
            </ThemedText>
            <ThemedText style={styles.requirementText}>
              • Does not match or significantly contain your email address.
            </ThemedText>
            <ThemedText style={styles.requirementText}>
              • Is unique and not used for other websites.
            </ThemedText>
          </View>

          {/* Password Form */}
          <View style={styles.formFields}>
            <View style={styles.inputContainer}>
              {/* New Password Input */}
              <View style={styles.passwordInput}>
                <LockIcon />
                <TextInput
                  style={styles.textInput}
                  placeholder="New Password"
                  placeholderTextColor="#999"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={true}
                  editable={!loading}
                />
              </View>

              {/* Confirm Password Input */}
              <View style={styles.confirmPasswordInput}>
                <LockIcon />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm New Password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                  editable={!loading}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <CustomButton
            title="Reset password"
            onpress={handleResetPassword}
            loading={loading}
            disabled={isButtonDisabled}
          />
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
    fontSize: 32,
    marginBottom: 16,
    fontFamily: "HelveticaNow",
    lineHeight: 38,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 24,
    fontFamily: "SFProRegular",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 22,
    width: "100%",
  },
  requirementsContainer: {
    width: "100%",
    marginBottom: 32,
  },
  requirementText: {
    fontSize: 14,
    fontFamily: "SFProRegular",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
    marginBottom: 8,
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
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.18)",
    gap: 12,
  },
  confirmPasswordInput: {
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
});
