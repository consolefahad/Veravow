import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#8B7FD9", "#A8C5F0"]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.logoContainer}>
                <Ionicons name="diamond" size={20} color="white" />
              </View>
              <Text style={styles.appName}>Vera Assistent</Text>
            </View>
            <View style={styles.notificationContainer}>
              <Ionicons name="notifications" size={20} color="white" />
              <View style={styles.notificationDot} />
            </View>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome 👋</Text>
          </View>

          {/* Cards Container */}
          <View style={styles.cardsContainer}>
            {/* Questionnaire Card */}
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardIcon}>
                  <Ionicons name="flash" size={24} color="#8B7FD9" />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>
                    Fill out your questionnaire
                  </Text>
                  <Text style={styles.cardDescription}>
                    Select your prenup terms. Our easy process walks you through
                    state compliant options and disclosures.
                  </Text>
                </View>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start</Text>
                  <Ionicons name="chevron-forward" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Invite Partner Card */}
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardIcon}>
                  <Ionicons name="heart" size={24} color="#8B7FD9" />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Invite your partner</Text>
                  <Text style={styles.cardDescription}>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur
                  </Text>
                </View>
                <TouchableOpacity style={styles.inviteButton}>
                  <Ionicons name="add" size={16} color="#333" />
                  <Text style={styles.inviteButtonText}>Invite</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  appName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  notificationContainer: {
    position: "relative",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4444",
  },
  welcomeSection: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: "700",
    color: "white",
    lineHeight: 56,
  },
  cardsContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  startButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  inviteButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inviteButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },
});
