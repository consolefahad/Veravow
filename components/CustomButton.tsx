import { Colors } from "@/constants/Colors";
import { hp, Size, wp } from "@/constants/Dimensions";
import { font } from "@/constants/Fonts";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface CustomButtonProps {
  onpress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function CustomButton({
  onpress,
  title,
  loading = false,
  disabled = false,
}: CustomButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.signInButton, isDisabled && styles.disabledButton]}
      activeOpacity={isDisabled ? 1 : 0.8}
      onPress={isDisabled ? undefined : onpress}
      disabled={isDisabled}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color="#fff"
            style={styles.loadingIndicator}
          />
          <ThemedText
            style={[
              styles.signInButtonText,
              isDisabled && styles.disabledButtonText,
            ]}
          >
            Loading...
          </ThemedText>
        </View>
      ) : (
        <ThemedText
          style={[
            styles.signInButtonText,
            isDisabled && styles.disabledButtonText,
          ]}
        >
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: Colors.primary,
    paddingVertical: hp(2),
    paddingHorizontal: wp(8),
    borderRadius: wp(3),
    alignItems: "center",
    marginBottom: hp(2.5),
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.3,
    shadowRadius: wp(2),
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: "#15161E",
    shadowOpacity: 0,
    elevation: 0,
  },
  signInButtonText: {
    fontSize: Size(4),
    fontFamily: font.bold,
    color: "#fff",
  },
  disabledButtonText: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingIndicator: {
    marginRight: wp(2),
  },
});
