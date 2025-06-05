import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { hp, Size, wp } from "@/constants/Dimensions";
import { font } from "@/constants/Fonts";
import { image } from "@/constants/Images";
import { LockIcon } from "@/constants/SvgIcons";
import { useTheme } from "@/constants/Theme";
import { useToast } from "@/constants/ToastProvider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function NewPasswordScreen() {
  const { showToast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { gradients } = useTheme();
  const isButtonDisabled = useMemo(() => {
    return !newPassword.trim() || !confirmPassword.trim();
  }, [newPassword, confirmPassword]);

  const handleResetPassword = async () => {
    if (isButtonDisabled) return;

    if (newPassword !== confirmPassword) {
      showToast({
        type: "error",
        text1: "Passwords don't match",
        text2: "Please make sure both passwords are identical",
      });
      return;
    }

    if (newPassword.length < 8) {
      showToast({
        type: "error",
        text1: "Password too short",
        text2: "Password must be at least 8 characters long",
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast({
        type: "success",
        text1: "Password reset successful",
        text2: "You can now sign in with your new password",
      });

      router.push("/auth/signin");
    } catch (error) {
      console.error("Password reset failed:", error);
      showToast({
        type: "error",
        text1: "Password reset failed",
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
        // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                <ThemedText style={styles.title}>Set new password</ThemedText>

                <ThemedText style={styles.subtitle}>
                  In order to protect your account make sure your password:
                </ThemedText>

                <View style={styles.requirementsContainer}>
                  <ThemedText style={styles.requirementText}>
                    • Is at least 8 characters long
                  </ThemedText>
                  <ThemedText style={styles.requirementText}>
                    • Does not match or significantly contain your email
                    address.
                  </ThemedText>
                  <ThemedText style={styles.requirementText}>
                    • Is unique and not used for other websites.
                  </ThemedText>
                </View>

                <View style={styles.formFields}>
                  <View style={styles.inputContainer}>
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

              <View style={styles.bottomActions}>
                <CustomButton
                  title="Reset password"
                  onpress={handleResetPassword}
                  loading={loading}
                  disabled={isButtonDisabled}
                />
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
    paddingTop: hp(12.5),
    paddingBottom: hp(6),
    justifyContent: "space-between",
    minHeight: hp(88),
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: Size(8),
    marginBottom: hp(2),
    fontFamily: font.heading,
    lineHeight: Size(9.5),
  },
  subtitle: {
    fontSize: Size(4),
    textAlign: "left",
    marginBottom: hp(3),
    fontFamily: font.regular,
    lineHeight: Size(5.5),
    width: "100%",
  },
  requirementsContainer: {
    width: "100%",
    marginBottom: hp(4),
  },
  requirementText: {
    fontSize: Size(3.5),
    fontFamily: font.regular,
    lineHeight: Size(5),
    marginBottom: hp(1),
  },
  formFields: {
    width: "100%",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: wp(5.5),
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.18)",
    gap: wp(3),
  },
  confirmPasswordInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    gap: wp(3),
  },
  textInput: {
    flex: 1,
    fontSize: Size(4),
    fontFamily: font.regular,
  },
  bottomActions: {
    width: "100%",
    paddingTop: hp(4),
  },
});
