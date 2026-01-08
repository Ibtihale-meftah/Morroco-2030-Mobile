import { router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../src/firebase/firebase";

export default function EditProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = auth.currentUser;
    if (!user) {
      router.replace("/login");
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          fullName: data.fullName || "",
          phone: data.phone || "",
          country: data.country || "",
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      Alert.alert("Erreur", "Impossible de charger les données.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      router.replace("/login");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        phone: formData.phone,
        country: formData.country,
        updatedAt: new Date(),
      });

      Alert.alert("Succès", "Profil mis à jour avec succès.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      Alert.alert("Erreur", "Impossible de mettre à jour le profil.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Modifier mon profil</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{auth.currentUser?.email}</Text>
        <Text style={styles.infoHint}>
          L'email ne peut pas être modifié depuis cette page
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Pays"
        value={formData.country}
        onChangeText={(text) => setFormData({ ...formData, country: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#7A1F16",
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#111",
    marginBottom: 4,
  },
  infoHint: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#7A1F16",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
