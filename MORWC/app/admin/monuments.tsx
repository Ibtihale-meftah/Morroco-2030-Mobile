import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { getCurrentUserRole } from "@/src/firebase/user";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/src/firebase/firebase";
import { Monument } from "@/src/firebase/firestore";

export default function AdminMonuments() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [monuments, setMonuments] = useState<Monument[]>([]);

  useEffect(() => {
    getCurrentUserRole().then((role) => {
      if (role !== "admin") {
        router.replace("/(tabs)");
      } else {
        setAllowed(true);
        loadMonuments();
      }
    });
  }, []);

  const loadMonuments = async () => {
    try {
      const snap = await getDocs(collection(db, "monuments"));
      setMonuments(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Monument))
      );
    } catch (error) {
      console.error("Erreur lors du chargement des monuments:", error);
      Alert.alert("Erreur", "Impossible de charger les monuments.");
    }
  };

  const handleDelete = async (monumentId: string) => {
    Alert.alert("Supprimer le monument", "Êtes-vous sûr ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "monuments", monumentId));
            loadMonuments();
            Alert.alert("Succès", "Monument supprimé.");
          } catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer le monument.");
          }
        },
      },
    ]);
  };

  if (!allowed) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des monuments</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>Retour</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/admin/add-monument")}
      >
        <Text style={styles.addButtonText}>+ Ajouter un monument</Text>
      </TouchableOpacity>

      <FlatList
        data={monuments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.cardSubtext}>Ville: {item.cityId}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() =>
                  router.push(`/admin/edit-monument?id=${item.id}`)
                }
              >
                <Text style={styles.actionButtonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.actionButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#7A1F16",
  },
  backButton: {
    color: "#7A1F16",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#7A1F16",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7A1F16",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

