import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

export type ToastType = "success" | "error" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

const CustomToast: React.FC<ToastProps> = ({
  message,
  type,
  visible,
  onHide,
  duration = 3000,
}) => {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#1BC05D";
      case "warning":
        return "#EE9925";
      case "error":
        return "#FD4E4E";
      default:
        return "#7086FF";
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top:
      Platform.OS === "ios"
        ? StatusBar.currentHeight || 44
        : StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 9999,
    elevation: 9999,
  },
  message: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "SFProMedium",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default CustomToast;
