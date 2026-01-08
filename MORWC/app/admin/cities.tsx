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
import { City } from "@/src/firebase/firestore";

export default function AdminCities() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    getCurrentUserRole().then((role) => {
      if (role !== "admin") {
        router.replace("/(tabs)");
      } else {
        setAllowed(true);
        loadCities();
      }
    });
  }, []);

  const loadCities = async () => {
    try {
      const snap = await getDocs(collection(db, "cities"));
      setCities(snap.docs.map((d) => ({ id: d.id, ...d.data() } as City)));
    } catch (error) {
      console.error("Erreur lors du chargement des villes:", error);
      Alert.alert("Erreur", "Impossible de charger les villes.");
    }
  };

  const handleDelete = async (cityId: string) => {
    Alert.alert("Supprimer la ville", "Êtes-vous sûr ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "cities", cityId));
            loadCities();
            Alert.alert("Succès", "Ville supprimée.");
          } catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer la ville.");
          }
        },
      },
    ]);
  };

  if (!allowed) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des villes</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>Retour</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/admin/add-city")}
      >
        <Text style={styles.addButtonText}>+ Ajouter une ville</Text>
      </TouchableOpacity>

      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => router.push(`/admin/edit-city?id=${item.id}`)}
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

