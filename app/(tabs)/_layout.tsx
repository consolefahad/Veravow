import {
  ChatIcon,
  ChecklistIcon,
  HomeIcon,
  MoreIcon,
} from "@/constants/SvgIcons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");
const wp = (percentage: number): number => (screenWidth * percentage) / 100;

interface IconProps {
  width: number;
  height: number;
  color: string;
}

const Home: React.FC<IconProps> = () => <HomeIcon />;
const Checklist: React.FC<IconProps> = () => <ChecklistIcon />;
const Chat: React.FC<IconProps> = () => <ChatIcon />;
const More: React.FC<IconProps> = () => <MoreIcon />;

interface TabItem {
  name: string;
  icon: React.FC<IconProps>;
  key: string;
}

const FloatingTabBar: React.FC<BottomTabBarProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const panRef = useRef<PanGestureHandler>(null);

  const tabData: TabItem[] = [
    { name: "Home", icon: Home, key: "index" },
    { name: "Checklist", icon: Checklist, key: "checklist" },
    { name: "Chat", icon: Chat, key: "chat" },
    { name: "More", icon: More, key: "settings" },
  ];

  // Animation values for each tab
  const indicatorAnimations = useRef(
    tabData.map((_, index) => ({
      width: new Animated.Value(index === 0 ? wp(22) : wp(12)),
      opacity: new Animated.Value(index === 0 ? 1 : 0.6),
      scale: new Animated.Value(index === 0 ? 1 : 0.85),
      backgroundColor: new Animated.Value(index === 0 ? 1 : 0),
    }))
  ).current;

  // Update animations when active tab changes
  useEffect(() => {
    indicatorAnimations.forEach((animation, index) => {
      const isActive = index === currentIndex;

      Animated.parallel([
        Animated.timing(animation.width, {
          toValue: isActive ? wp(24) : wp(12),
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animation.opacity, {
          toValue: isActive ? 1 : 0.6,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animation.scale, {
          toValue: isActive ? 1 : 0.85,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animation.backgroundColor, {
          toValue: isActive ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    });
  }, [currentIndex, indicatorAnimations]);

  // Handle tab press
  const handleTabPress = (index: number, routeName: string): void => {
    setCurrentIndex(index);
    navigation.navigate(routeName);
  };

  // Handle swipe gesture
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any): void => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      const tabWidth = screenWidth / 4;

      let newIndex = currentIndex;

      if (Math.abs(translationX) > tabWidth / 3 || Math.abs(velocityX) > 500) {
        if (translationX > 0 && currentIndex > 0) {
          newIndex = currentIndex - 1;
        } else if (translationX < 0 && currentIndex < tabData.length - 1) {
          newIndex = currentIndex + 1;
        }
      }

      // Reset translation and update tab
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        navigation.navigate(tabData[newIndex].key);
      }
    }
  };

  const renderTabItem = (tab: TabItem, index: number) => {
    const IconComponent = tab.icon;
    const isActive = index === currentIndex;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleTabPress(index, tab.key)}
        style={styles.tabItem}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.tabContainer,
            {
              width: indicatorAnimations[index].width,
              opacity: indicatorAnimations[index].opacity,
              transform: [{ scale: indicatorAnimations[index].scale }],
              backgroundColor: indicatorAnimations[
                index
              ].backgroundColor.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", "#E5E5E7"],
              }),
            },
          ]}
        >
          <IconComponent
            width={isActive ? 20 : 24}
            height={isActive ? 20 : 24}
            color={isActive ? "#333333" : "#8E8E93"}
          />
          {isActive && (
            <Animated.Text
              style={[
                styles.tabText,
                {
                  opacity: indicatorAnimations[index].opacity,
                },
              ]}
            >
              {tab.name}
            </Animated.Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={styles.floatingTabBar}>
        <View style={styles.tabBarContent}>
          {tabData.map((tab, index) => renderTabItem(tab, index))}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: "Checklist",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "More",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  floatingTabBar: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 1000,
  },
  tabBarContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minHeight: 44,
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});
