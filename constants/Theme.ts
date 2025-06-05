import { useColorScheme } from "react-native";
import { Colors } from "./Colors";
import { useBottomGradient, useOverlayGradient } from "./Gradients";

export const useTheme = () => {
  const colorScheme = useColorScheme();

  return {
    colors: Colors[colorScheme ?? "light"],
    gradients: {
      overlay: useOverlayGradient(),
      bottom: useBottomGradient(),
      // etc...
    },
    isDark: colorScheme === "dark",
  };
};
