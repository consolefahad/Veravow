import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ToastProvider } from "@/constants/ToastProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    HelveticaNow: require("../assets/fonts/helveticanowtext-bold.ttf"),
    SFProBold: require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    SFProSemibold: require("../assets/fonts/SF-Pro-Display-Semibold.otf"),
    SFProMedium: require("../assets/fonts/SF-Pro-Display-Medium.otf"),
    SFProRegular: require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ToastProvider>
    </ThemeProvider>
  );
}
