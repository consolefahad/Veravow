import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";

export default function CustomButton({
  onpress,
  title,
  loading = false,
  disabled = false,
}) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.signInButton, isDisabled && styles.disabledButton]}
      activeOpacity={isDisabled ? 1 : 0.8}
      onPress={isDisabled ? null : onpress}
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
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: "#15161E",
    shadowOpacity: 0,
    elevation: 0,
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: "SFProBold",
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
    marginRight: 8,
  },
});
