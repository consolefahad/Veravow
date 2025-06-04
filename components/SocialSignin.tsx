import { AppleIcon, GoogleIcon } from "@/constants/SvgIcons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function SocialSignin() {
  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
        <GoogleIcon size={20} />
        <ThemedText
          style={styles.socialButtonText}
          lightColor="#fff"
          darkColor="#fff"
        >
          Sign in with Google
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
        <AppleIcon size={20} color="#fff" />
        <ThemedText
          style={styles.socialButtonText}
          lightColor="#fff"
          darkColor="#fff"
        >
          Sign in with Apple
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  socialContainer: {
    width: "100%",
    marginBottom: 30,
    gap: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SFProRegular",
  },
});
