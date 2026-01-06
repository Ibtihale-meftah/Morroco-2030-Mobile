import { LanguageProvider } from "@/context";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LanguageModal from "./modal";

function AppHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>MOROCCOGo 2030</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack
        screenOptions={{
          header: () => <AppHeader />,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="fan-id" />
        <Stack.Screen name="evisa/index" />
        <Stack.Screen name="evisa/request" />
      </Stack>

      <LanguageModal />
    </LanguageProvider>
  );
}



const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#7A1F16",
  },
  logo: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  langBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  langText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 6,
  },
  langArrow: {
    color: "#fff",
    fontSize: 12,
    marginTop: 1,
  },
  bellBtn: {
    padding: 6,
    borderRadius: 10,
  },
  bell: {
    fontSize: 18,
    color: "#fff",
  },
});
