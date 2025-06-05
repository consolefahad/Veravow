import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { hp, Size, wp } from "@/constants/Dimensions";
import { font } from "@/constants/Fonts";
import { image } from "@/constants/Images";
import { EmailIcon } from "@/constants/SvgIcons";
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ResetPasswordScreen() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { gradients } = useTheme();
  const isButtonDisabled = useMemo(() => {
    return !email.trim();
  }, [email]);

  const handleResetPassword = async () => {
    if (isButtonDisabled) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast({
        type: "success",
        text1: "Reset link sent",
        text2: "Check your email for reset instructions",
      });

      router.push("/auth/new_password");
    } catch (error) {
      console.error("Reset password failed:", error);
      showToast({
        type: "error",
        text1: "Reset failed",
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
                <ThemedText style={styles.title}>
                  Forgot your password?
                </ThemedText>

                <ThemedText style={styles.subtitle}>
                  Reset link is on the way.
                </ThemedText>

                <View>
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
                  </View>
                </View>
              </View>

              <View style={styles.bottomActions}>
                <CustomButton
                  title="Reset Password"
                  onpress={handleResetPassword}
                  loading={loading}
                  disabled={isButtonDisabled}
                />

                <TouchableOpacity
                  style={styles.backToLoginContainer}
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push("/auth/signin");
                  }}
                >
                  <ThemedText style={styles.backToLoginText}>
                    Back to login
                  </ThemedText>
                </TouchableOpacity>
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
    fontSize: Size(7.5),
    textAlign: "center",
    marginBottom: hp(2),
    fontFamily: font.heading,
    lineHeight: Size(9.5),
  },
  subtitle: {
    fontSize: Size(4),
    textAlign: "center",
    marginBottom: hp(5),
    fontFamily: font.regular,
    lineHeight: Size(5.5),
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
  backToLoginContainer: {
    alignItems: "center",
    marginTop: hp(3),
  },
  backToLoginText: {
    fontSize: Size(4),
    fontFamily: font.regular,
  },
});
