import { ThemedView } from "@/components/ThemedView";
import { hp, wp } from "@/constants/Dimensions";
import { font } from "@/constants/Fonts";
import { image } from "@/constants/Images";
import { svgIcon } from "@/constants/SvgIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function Entry() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Animation shared values
  const backgroundTranslateY = useSharedValue(-hp(100));
  const gradientTranslateY = useSharedValue(hp(100));
  const bgGradientOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const appNameScale = useSharedValue(0);
  const appNameOpacity = useSharedValue(0);
  const appNameTranslateY = useSharedValue(30);

  const startAnimationSequence = useCallback(() => {
    // Background image slides down from top
    backgroundTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    // Background gradient fades in
    bgGradientOpacity.value = withDelay(
      300,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      })
    );

    // Bottom gradient slides up from bottom
    gradientTranslateY.value = withDelay(
      400,
      withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.exp),
      })
    );

    // Logo appears with scale animation
    logoScale.value = withDelay(
      800,
      withSequence(
        withTiming(1.2, {
          duration: 400,
          easing: Easing.out(Easing.back(1.2)),
        }),
        withTiming(1, {
          duration: 200,
          easing: Easing.out(Easing.ease),
        })
      )
    );

    logoOpacity.value = withDelay(
      800,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      })
    );

    // App name appears with scale and slide animation
    appNameScale.value = withDelay(
      1200,
      withSequence(
        withTiming(1.1, {
          duration: 300,
          easing: Easing.out(Easing.back(1.1)),
        }),
        withTiming(1, {
          duration: 200,
          easing: Easing.out(Easing.ease),
        })
      )
    );

    appNameOpacity.value = withDelay(
      1200,
      withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      })
    );

    appNameTranslateY.value = withDelay(
      1200,
      withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      })
    );
  }, [
    backgroundTranslateY,
    gradientTranslateY,
    bgGradientOpacity,
    logoScale,
    logoOpacity,
    appNameScale,
    appNameOpacity,
    appNameTranslateY,
  ]);

  useEffect(() => {
    // Start animation sequence
    startAnimationSequence();

    const timer = setTimeout(() => {
      // router.push("/welcome");
    }, 3500);

    return () => clearTimeout(timer);
  }, [startAnimationSequence]);

  // Animated styles
  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: backgroundTranslateY.value }],
  }));

  const animatedBgGradientStyle = useAnimatedStyle(() => ({
    opacity: bgGradientOpacity.value,
  }));

  const animatedGradientStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: gradientTranslateY.value }],
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const animatedAppNameStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: appNameScale.value },
      { translateY: appNameTranslateY.value },
    ],
    opacity: appNameOpacity.value,
  }));

  return (
    <ThemedView style={styles.container}>
      {/* Background Image - Animated from top */}
      <Animated.View
        style={[styles.backgroundContainer, animatedBackgroundStyle]}
      >
        <ImageBackground
          source={image.background}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Background Gradient Overlay - Fades in */}
      <Animated.View
        style={[styles.bggradientContainer, animatedBgGradientStyle]}
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 1)",
            "rgba(0, 0, 0, 0.9)",
          ]}
          style={styles.bggradientOverlay}
        />
      </Animated.View>

      {/* Bottom Gradient - Animated from bottom */}
      <Animated.View style={[styles.gradientContainer, animatedGradientStyle]}>
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0, 0, 0, 0.7)",
            "rgba(121, 142, 255, 0.40)",
            "rgba(121, 142, 255, 0.40)",
            "rgba(179, 144, 255, 0.40)",
          ]}
          style={styles.gradientOverlay}
        />
      </Animated.View>

      {/* Logo Section - Animated */}
      <View style={styles.logoContainer}>
        <Animated.View style={[animatedLogoStyle]}>
          {svgIcon.appicon}
        </Animated.View>
        <Animated.Text style={[styles.appName, animatedAppNameStyle]}>
          veravow
        </Animated.Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: wp(100),
    height: hp(60),
  },
  bggradientContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(100),
    width: wp(100),
  },
  bggradientOverlay: {
    flex: 1,
  },
  gradientContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(90),
    width: wp(100),
  },
  gradientOverlay: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  appName: {
    fontSize: 28,
    fontFamily: font.bold,
    color: "#ffffff",
    letterSpacing: 2,
    textAlign: "center",
  },
});
