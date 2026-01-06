import { useState } from "react";

import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { cities } from "@/data/cities";
import { monuments } from "@/data/monuments";




export default function ItineraryScreen() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const city = cities.find((c) => c.id === selectedCity);
  const cityMonuments = monuments.filter(
    (m) => m.cityId === selectedCity
  );

  const createItinerary = () => {
    if (!selectedCity || cityMonuments.length === 0) {
      Alert.alert(
        "Itinéraire incomplet",
        "Veuillez sélectionner une ville."
      );
      return;
    }

    const message =
      `Ville : ${city?.name}\n` +
      `Monuments :\n` +
      cityMonuments.map((m) => `- ${m.name}`).join("\n") +
      `\n\nDurée estimée : ${cityMonuments.length} jour(s)`;

    Alert.alert("Votre itinéraire", message);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Itinerary Planner</Text>
      <Text style={styles.subtitle}>
        Planifiez votre voyage au Maroc pour la Coupe du Monde 2030
      </Text>

      {/* CITIES */}
      <Text style={styles.sectionTitle}>Choisir une ville</Text>

      <View style={styles.grid}>
        {cities.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[
              styles.cityCard,
              selectedCity === c.id && styles.cityActive,
            ]}
            onPress={() => setSelectedCity(c.id)}
          >
            <Text
              style={[
                styles.cityText,
                selectedCity === c.id && styles.cityTextActive,
              ]}
            >
              {c.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MONUMENTS */}
      {selectedCity && (
        <>
          <Text style={styles.sectionTitle}>Monuments à visiter</Text>

          {cityMonuments.map((m) => (
            <View key={m.id} style={styles.monumentCard}>
              <Text style={styles.monumentName}>{m.name}</Text>
              <Text style={styles.monumentDesc}>{m.description}</Text>
            </View>
          ))}
        </>
      )}

      {/* ACTION */}
      <TouchableOpacity style={styles.button} onPress={createItinerary}>
        <Text style={styles.buttonText}>Créer mon itinéraire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F5F5DC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7A1F16",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7A1F16",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 24,
  },
  cityCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    minWidth: "47%",
    alignItems: "center",
  },
  cityActive: {
    backgroundColor: "#7A1F16",
  },
  cityText: {
    fontWeight: "600",
    color: "#000",
  },
  cityTextActive: {
    color: "#fff",
  },
  monumentCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  monumentName: {
    fontWeight: "bold",
    color: "#7A1F16",
    marginBottom: 4,
  },
  monumentDesc: {
    color: "#555",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#7A1F16",
    padding: 18,
    borderRadius: 20,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});