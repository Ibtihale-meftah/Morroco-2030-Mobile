import { db } from "@/src/firebase/firebase";
import { getCurrentUserRole } from "@/src/firebase/user";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddCity() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    history: "",
    specialties: "",
    climate: "",
    languages: "",
    tips: "",
    isHostCity: true,
    image: "",
  });

  useEffect(() => {
    getCurrentUserRole().then((role) => {
      if (role !== "admin") {
        router.replace("/(tabs)");
      } else {
        setAllowed(true);
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.description) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const cityData = {
        ...formData,
        specialties: formData.specialties
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        languages: formData.languages
          .split(",")
          .map((l) => l.trim())
          .filter((l) => l),
        tips: formData.tips
          .split("\n")
          .map((t) => t.trim())
          .filter((t) => t),
      };

      await addDoc(collection(db, "cities"), cityData);
      Alert.alert("Succès", "Ville ajoutée.");
      router.back();
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Erreur", "Impossible de sauvegarder.");
    }
  };

  if (!allowed) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajouter une ville</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom *"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description *"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        multiline
        numberOfLines={4}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Histoire"
        value={formData.history}
        onChangeText={(text) => setFormData({ ...formData, history: text })}
        multiline
        numberOfLines={4}
      />

      <TextInput
        style={styles.input}
        placeholder="Spécialités (séparées par des virgules)"
        value={formData.specialties}
        onChangeText={(text) => setFormData({ ...formData, specialties: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Climat"
        value={formData.climate}
        onChangeText={(text) => setFormData({ ...formData, climate: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Langues (séparées par des virgules)"
        value={formData.languages}
        onChangeText={(text) => setFormData({ ...formData, languages: text })}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Conseils (un par ligne)"
        value={formData.tips}
        onChangeText={(text) => setFormData({ ...formData, tips: text })}
        multiline
        numberOfLines={4}
      />

      <TextInput
        style={styles.input}
        placeholder="Image (URL)"
        value={formData.image}
        onChangeText={(text) => setFormData({ ...formData, image: text })}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Ville hôte</Text>
        <Switch
          value={formData.isHostCity}
          onValueChange={(value) =>
            setFormData({ ...formData, isHostCity: value })
          }
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#7A1F16",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    backgroundColor: "#7A1F16",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

