import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebase/firebase";

export default function ResetPasswordScreen() {
  const [loading, setLoading] = useState(false);

  const handleSendResetEmail = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      Alert.alert("Erreur", "Aucun utilisateur connecté.");
      router.replace("/login");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      Alert.alert(
        "Email envoyé",
        "Un email de réinitialisation a été envoyé à " + user.email + ". Vérifiez votre boîte de réception.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: any) {
      console.error("Erreur:", error);
      let errorMessage = "Impossible d'envoyer l'email de réinitialisation.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "Utilisateur introuvable.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Trop de tentatives. Veuillez réessayer plus tard.";
      }

      Alert.alert("Erreur", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Réinitialiser le mot de passe</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Email associé</Text>
        <Text style={styles.infoValue}>{auth.currentUser?.email}</Text>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          Un email contenant un lien de réinitialisation sera envoyé à votre
          adresse email. Cliquez sur le lien dans l'email pour créer un nouveau
          mot de passe.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSendResetEmail}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Envoi..." : "Envoyer l'email de réinitialisation"}
        </Text>
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
  },
  descriptionBox: {
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 14,
    color: "#1976D2",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#7A1F16",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
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
});
