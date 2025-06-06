import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { hp, Size, wp } from "@/constants/Dimensions";
import { font } from "@/constants/Fonts";
import { image } from "@/constants/Images";
import { svgIcon } from "@/constants/SvgIcons";
import { useTheme } from "@/constants/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedReanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { gradients } = useTheme();

  // Heart animation values
  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);
  const heartPulse = useSharedValue(1);

  // Create animated values for each indicator
  const indicatorAnimations = useRef(
    textData.map((_, index) => ({
      width: new Animated.Value(index === 0 ? wp(14) : wp(7)),
      opacity: new Animated.Value(index === 0 ? 1 : 0.5),
      scale: new Animated.Value(index === 0 ? 1 : 0.8),
    }))
  ).current;

  // Heart animation effect
  useEffect(() => {
    // Initial appearance animation
    heartOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      })
    );

    heartScale.value = withDelay(
      500,
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

    // Continuous heartbeat pulse
    heartPulse.value = withDelay(
      1200,
      withRepeat(
        withSequence(
          withTiming(1.15, {
            duration: 600,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 600,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1, // Infinite repeat
        false
      )
    );
  }, [heartOpacity, heartPulse, heartScale]);

  // Animate indicators when currentIndex changes
  useEffect(() => {
    indicatorAnimations.forEach((animation, index) => {
      const isActive = index === currentIndex;

      Animated.parallel([
        Animated.timing(animation.width, {
          toValue: isActive ? wp(14) : wp(7),
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
  }, [currentIndex, indicatorAnimations]);

  const handleSignin = () => {
    router.push("/auth/signin");
  };

  const handleSignup = () => {
    router.push("/auth/signup");
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    scrollX.setValue(contentOffset.x);

    const pageNum = Math.round(contentOffset.x / viewSize.width);

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

  // Animated heart style
  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      opacity: heartOpacity.value,
      transform: [{ scale: heartScale.value * heartPulse.value }],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Images */}
      <ImageBackground
        source={image.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={gradients.overlay as readonly [string, string, ...string[]]}
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      <LinearGradient
        colors={gradients.bottom as readonly [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.7, 0.9, 1]}
        style={styles.bottomGradient}
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Animated Heart Icon */}
        <View style={styles.iconContainer}>
          <AnimatedReanimated.View style={animatedHeartStyle}>
            {svgIcon.heart}
          </AnimatedReanimated.View>
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
    // backgroundColor: "#000",
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(10),
    paddingBottom: hp(6),
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: hp(7.5),
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
    gap: wp(2),
  },
  indicator: {
    height: hp(0.75),
    borderRadius: wp(1),
    backgroundColor: "#fff",
  },
  textContainer: {
    alignItems: "center",
    height: hp(32.5),
  },
  textScrollView: {
    flex: 1,
  },
  textScrollContent: {
    alignItems: "center",
  },
  textSlide: {
    width: wp(88),
    alignItems: "center",
    justifyContent: "center",
  },
  mainHeading: {
    fontSize: Size(12),
    fontFamily: font.heading,
    textAlign: "center",
    lineHeight: Size(14),
    marginBottom: hp(3),
    letterSpacing: -1,
  },
  description: {
    fontSize: Size(4),
    fontFamily: font.regular,
    textAlign: "center",
    paddingHorizontal: wp(3),
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: Size(4),
    fontFamily: font.regular,
  },
  signUpLink: {
    fontSize: Size(4),
    fontFamily: font.medium,
  },
});
