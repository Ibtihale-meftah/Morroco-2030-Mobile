import { router } from "expo-router";
import { deleteUser, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
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

export default function DeleteAccountScreen() {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const requiredText = "SUPPRIMER";

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erreur", "Aucun utilisateur connecté.");
      router.replace("/login");
      return;
    }

    if (confirmText !== requiredText) {
      Alert.alert(
        "Erreur",
        `Veuillez taper "${requiredText}" pour confirmer la suppression.`
      );
      return;
    }

    Alert.alert(
      "Confirmer la suppression",
      "Cette action est irréversible. Toutes vos données seront définitivement supprimées.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer définitivement",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              // 1. Supprimer le document Firestore
              await deleteDoc(doc(db, "users", user.uid));

              // 2. Supprimer le compte Auth
              await deleteUser(user);

              // 3. Déconnexion et redirection
              await signOut(auth);
              Alert.alert(
                "Compte supprimé",
                "Votre compte a été supprimé avec succès.",
                [
                  {
                    text: "OK",
                    onPress: () => router.replace("/login"),
                  },
                ]
              );
            } catch (error: any) {
              console.error("Erreur lors de la suppression:", error);
              let errorMessage = "Impossible de supprimer le compte.";

              if (error.code === "auth/requires-recent-login") {
                errorMessage =
                  "Pour des raisons de sécurité, vous devez vous reconnecter avant de supprimer votre compte.";
                Alert.alert("Reconnexion requise", errorMessage, [
                  {
                    text: "Se reconnecter",
                    onPress: () => {
                      signOut(auth);
                      router.replace("/login");
                    },
                  },
                  {
                    text: "Annuler",
                    style: "cancel",
                    onPress: () => router.back(),
                  },
                ]);
                return;
              }

              Alert.alert("Erreur", errorMessage);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Supprimer mon compte</Text>

      <View style={styles.warningBox}>
        <Text style={styles.warningIcon}>⚠️</Text>
        <Text style={styles.warningTitle}>Attention</Text>
        <Text style={styles.warningText}>
          Cette action est définitive et irréversible. Toutes vos données seront
          définitivement supprimées :
        </Text>
        <View style={styles.warningList}>
          <Text style={styles.warningItem}>• Votre profil utilisateur</Text>
          <Text style={styles.warningItem}>• Toutes vos données personnelles</Text>
          <Text style={styles.warningItem}>• Votre compte d'authentification</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Email associé</Text>
        <Text style={styles.infoValue}>{auth.currentUser?.email}</Text>
      </View>

      <View style={styles.confirmBox}>
        <Text style={styles.confirmLabel}>
          Pour confirmer, tapez <Text style={styles.confirmRequired}>{requiredText}</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder={requiredText}
          value={confirmText}
          onChangeText={setConfirmText}
          autoCapitalize="characters"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.deleteButton,
          (confirmText !== requiredText || loading) && styles.deleteButtonDisabled,
        ]}
        onPress={handleDeleteAccount}
        disabled={confirmText !== requiredText || loading}
      >
        <Text style={styles.deleteButtonText}>
          {loading ? "Suppression..." : "Supprimer définitivement mon compte"}
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
  warningBox: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F44336",
  },
  warningIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#C62828",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#C62828",
    marginBottom: 12,
    lineHeight: 20,
  },
  warningList: {
    marginLeft: 8,
  },
  warningItem: {
    fontSize: 14,
    color: "#C62828",
    marginBottom: 4,
    lineHeight: 20,
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
  confirmBox: {
    marginBottom: 20,
  },
  confirmLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  confirmRequired: {
    fontWeight: "700",
    color: "#C62828",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButtonDisabled: {
    backgroundColor: "#ccc",
  },
  deleteButtonText: {
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
