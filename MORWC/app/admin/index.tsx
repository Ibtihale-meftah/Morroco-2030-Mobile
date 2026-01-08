import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { getCurrentUserRole } from "@/src/firebase/user";

export default function AdminHome() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentUserRole().then((role) => {
      if (role !== "admin") {
        router.replace("/(tabs)");
      } else {
        setAllowed(true);
      }
    });
  }, []);

  if (!allowed) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/admin/cities")}
        >
          <Text style={styles.menuIcon}>🏙️</Text>
          <Text style={styles.menuText}>Gérer les villes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/admin/monuments")}
        >
          <Text style={styles.menuIcon}>🏛️</Text>
          <Text style={styles.menuText}>Gérer les monuments</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7A1F16",
    marginBottom: 30,
    marginTop: 20,
  },
  menu: {
    gap: 16,
  },
  menuItem: {
    backgroundColor: "#F3F4F6",
    padding: 20,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuIcon: {
    fontSize: 32,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  backButton: {
    marginTop: 30,
    backgroundColor: "#7A1F16",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

