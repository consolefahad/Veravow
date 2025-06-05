import {
  ChatIcon,
  ChecklistIcon,
  HomeIcon,
  MoreIcon,
} from "@/constants/SvgIcons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";

// Custom Tab Bar Icon
const CustomTabBarIcon = ({
  focused,
  icon: IconComponent,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  if (focused) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#E5E5E7",
          borderRadius: 50,
          paddingHorizontal: 20,
          paddingVertical: 15,
          minWidth: 109,
          justifyContent: "center",
        }}
      >
        <IconComponent width={20} height={20} color="#333333" />
        <Text
          style={{
            marginLeft: 8,
            fontSize: 14,
            fontWeight: "500",
            color: "#333333",
          }}
        >
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <IconComponent width={24} height={24} color="#8E8E93" />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#FFFFFF",
          borderRadius: 50,
          paddingHorizontal: 18,
          marginHorizontal: 24,
          marginBottom: Platform.OS === "ios" ? 30 : 20,
          paddingTop: 9,
          height: 56,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} icon={HomeIcon} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: "Checklist",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              icon={ChecklistIcon}
              title="Checklist"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} icon={ChatIcon} title="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon focused={focused} icon={MoreIcon} title="More" />
          ),
        }}
      />
    </Tabs>
  );
}
