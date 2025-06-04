import Heart from "@/assets/svgs/entry.svg";
import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useToast } from "@/constants/ToastProvider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Dummy text data
const textData = [
  {
    heading: "Love deeply.\nProtect clearly.\nBuilt for us.",
    description:
      "Veravow is the first prenup platform designed for 🌈 LGBTQ+ couples — emotionally intelligent, legally sound, and truly inclusive.",
  },
  {
    heading: "Your love story.\nYour protection.\nYour future.",
    description:
      "Create a prenuptial agreement that reflects your unique relationship and protects what matters most to both of you.",
  },
  {
    heading: "Simple. Secure.\nTailored for you.",
    description:
      "Navigate the complexities of love and law with confidence. Our platform makes prenups accessible and stress-free.",
  },
];

export default function Entry() {
  const { showToast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Create animated values for each indicator
  const indicatorAnimations = useRef(
    textData.map((_, index) => ({
      width: new Animated.Value(index === 0 ? 54 : 26),
      opacity: new Animated.Value(index === 0 ? 1 : 0.5),
      scale: new Animated.Value(index === 0 ? 1 : 0.8),
    }))
  ).current;

  // Animate indicators when currentIndex changes
  useEffect(() => {
    indicatorAnimations.forEach((animation, index) => {
      const isActive = index === currentIndex;

      Animated.parallel([
        Animated.timing(animation.width, {
          toValue: isActive ? 54 : 26,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animation.opacity, {
          toValue: isActive ? 1 : 0.5,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animation.scale, {
          toValue: isActive ? 1 : 0.8,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    });
  }, [currentIndex]);

  const handleSignin = () => {
    router.push("/auth/signin");
    showToast({
      type: "warning",
      text1: "Sign in successful",
      text2: "Welcome back!",
    });
  };

  const handleSignup = () => {
    router.push("/auth/signup");
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Update the animated value for real-time tracking
    scrollX.setValue(contentOffset.x);

    // Calculate current page for immediate indicator update
    const pageNum = Math.round(contentOffset.x / viewSize.width);

    // Only update state if page actually changed to avoid unnecessary re-renders
    if (pageNum !== currentIndex && pageNum >= 0 && pageNum < textData.length) {
      setCurrentIndex(pageNum);
    }
  };

  const renderIndicators = () => {
    return textData.map((_, index) => (
      <Animated.View
        key={index}
        style={[
          styles.indicator,
          {
            width: indicatorAnimations[index].width,
            opacity: indicatorAnimations[index].opacity,
            transform: [{ scale: indicatorAnimations[index].scale }],
          },
        ]}
      />
    ));
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
          colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"]}
          style={styles.gradientOverlay}
        />
      </ImageBackground>

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
        {/* Heart Icon */}
        <View style={styles.iconContainer}>
          <Heart />
        </View>

        {/* Screen Indicators */}
        <View style={styles.indicatorsContainer}>{renderIndicators()}</View>

        {/* Swipeable Text Container */}
        <View style={styles.textContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.textScrollView}
            contentContainerStyle={styles.textScrollContent}
          >
            {textData.map((text, index) => (
              <View key={index} style={styles.textSlide}>
                <ThemedText style={styles.mainHeading}>
                  {text.heading}
                </ThemedText>
                <ThemedText style={styles.description}>
                  {text.description}
                </ThemedText>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View>
          <CustomButton title={"Sign In"} onpress={handleSignin} />
          <View style={styles.signUpContainer}>
            <ThemedText style={styles.signUpText}>
              Create an account?{" "}
            </ThemedText>
            <TouchableOpacity activeOpacity={0.7} onPress={handleSignup}>
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
    backgroundColor: "#000",
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
    paddingTop: 80,
    paddingBottom: 50,
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    gap: 8,
  },
  indicator: {
    height: 6,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  textContainer: {
    alignItems: "center",
    height: 260,
  },
  textScrollView: {
    flex: 1,
  },
  textScrollContent: {
    alignItems: "center",
  },
  textSlide: {
    width: width - 48,
    alignItems: "center",
    justifyContent: "center",
  },
  mainHeading: {
    fontSize: 48,
    fontFamily: "HelveticaNow",
    textAlign: "center",
    lineHeight: 56,
    marginBottom: 24,
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    fontFamily: "SFProRegular",
    textAlign: "center",
    paddingHorizontal: 12,
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
