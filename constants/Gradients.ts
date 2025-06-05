// utils/gradients.ts
import { useColorScheme } from "@/hooks/useColorScheme";

export type GradientType = "overlay" | "bottom" | "header" | "card";

interface GradientConfig {
  dark: string[];
  light: string[];
}

// Define all your gradient configurations
const GRADIENT_CONFIGS: Record<GradientType, GradientConfig> = {
  overlay: {
    dark: ["rgba(0,0,0,0.2)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"],
    light: [
      "rgba(255,255,255,0.2)",
      "rgba(255,255,255,0.3)",
      "rgba(255,255,255,0.7)",
    ],
  },
  bottom: {
    dark: [
      "transparent",
      "rgba(121, 142, 255, 0.19)",
      "rgba(179, 144, 255, 0.4)",
      "rgba(179, 144, 255, 0.5)",
    ],
    light: [
      "transparent",
      "rgba(121, 142, 255, 0.1)",
      "rgba(179, 144, 255, 0.3)",
      "rgba(179, 144, 255, 0.4)",
    ],
  },
  header: {
    dark: ["rgba(0,0,0,0.8)", "rgba(0,0,0,0.6)", "transparent"],
    light: ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.6)", "transparent"],
  },
  card: {
    dark: ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)"],
    light: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)"],
  },
};

// Custom hook for theme-aware gradients
export const useThemeGradient = (type: GradientType): string[] => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";

  return GRADIENT_CONFIGS[type][theme];
};

// Direct function if you already have colorScheme
export const getThemeGradient = (
  type: GradientType,
  colorScheme: "light" | "dark"
): string[] => {
  return GRADIENT_CONFIGS[type][colorScheme];
};

// Specific gradient functions for common use cases
export const useOverlayGradient = () => useThemeGradient("overlay");
export const useBottomGradient = () => useThemeGradient("bottom");
export const useHeaderGradient = () => useThemeGradient("header");
export const useCardGradient = () => useThemeGradient("card");
