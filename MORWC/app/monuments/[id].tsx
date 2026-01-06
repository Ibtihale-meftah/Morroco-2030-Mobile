import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { cities } from "@/data/cities";
import { monuments } from "@/data/monuments";

export default function MonumentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const monument = monuments.find((m) => m.id === id);
  const city = cities.find((c) => c.id === monument?.cityId);

  if (!monument) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Monument non trouvé</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView
  style={styles.page}
  contentContainerStyle={styles.scrollContainer}
  showsVerticalScrollIndicator={false}
>

      {/* CARTE CENTRÉE */}
      <View style={styles.card}>
        {/* IMAGE */}
        <Image
          source={{
            uri: monument.photos?.[0] || "https://via.placeholder.com/900x500",
          }}
          style={styles.image}
          contentFit="cover"
        />

        {/* TITRE */}
        <ThemedText style={styles.title}>
          {monument.name}
        </ThemedText>

        <ThemedText style={styles.city}>
          {city?.name}
        </ThemedText>

        {/* DESCRIPTION */}
        <ThemedText style={styles.description}>
          {monument.description}
        </ThemedText>

        {/* INFOS */}
        <View style={styles.infoBox}>
          <Info label="Horaires" value={monument.hours} />
          <Info label="Prix d'entrée" value={monument.price} />
        </View>

        {/* BOUTON MAP */}
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => Linking.openURL(monument.location)}
        >
          <ThemedText style={styles.mapText}>
            Voir sur Google Maps
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* --------- COMPOSANT INFO --------- */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <ThemedText style={styles.infoLabel}>{label}</ThemedText>
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    </View>
  );
}

/* --------- STYLES --------- */
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F2F2F2", // gris clair, plus jaune
  },

  pageContent: {
    alignItems: "center", // centre horizontalement
    paddingVertical: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: 820,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 60,
    borderRadius: 16,
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#7A1F16",
    textAlign: "center",
    marginBottom: 6,
  },

  city: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginBottom: 22,
    fontStyle: "italic",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
  },

  infoBox: {
    gap: 16,
    marginBottom: 30,
  },

  infoRow: {
    backgroundColor: "#FAFAFA",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A1F16",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    color: "#333",
  },

  mapButton: {
    backgroundColor: "#7A1F16",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
scrollContainer: {
  flexGrow: 1,
  alignItems: "center",     // centré horizontalement
  paddingTop: 60,           // espace contrôlé en haut
  paddingBottom: 40,
},

  mapText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});