import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { getCurrentUserRole } from "@/src/firebase/user";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/src/firebase/firebase";

export default function AddMonument() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    cityId: "",
    description: "",
    hours: "",
    price: "",
    location: "",
    photos: "",
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
    if (!formData.name || !formData.cityId || !formData.description) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const monumentData = {
        ...formData,
        photos: formData.photos
          ? formData.photos.split(",").map((url) => url.trim()).filter((url) => url)
          : [],
      };

      await addDoc(collection(db, "monuments"), monumentData);
      Alert.alert("Succès", "Monument ajouté.");
      router.back();
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Erreur", "Impossible de sauvegarder.");
    }
  };

  if (!allowed) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajouter un monument</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom *"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="ID de la ville *"
        value={formData.cityId}
        onChangeText={(text) => setFormData({ ...formData, cityId: text })}
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
        style={styles.input}
        placeholder="Horaires"
        value={formData.hours}
        onChangeText={(text) => setFormData({ ...formData, hours: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Prix"
        value={formData.price}
        onChangeText={(text) => setFormData({ ...formData, price: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Localisation (URL)"
        value={formData.location}
        onChangeText={(text) => setFormData({ ...formData, location: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Photos (URLs séparées par des virgules)"
        value={formData.photos}
        onChangeText={(text) => setFormData({ ...formData, photos: text })}
      />

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

