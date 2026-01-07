import { getCurrentUserRole } from "@/src/firebase/firestore";
import { router } from "expo-router";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebase/firebase";
import {
  addCity,
  addMonument,
  City,
  deleteCity,
  deleteMonument,
  getCities,
  getMonuments,
  Monument,
  updateCity,
  updateMonument,
} from "../src/firebase/firestore";

type TabType = "villes" | "monuments";

export default function AdminScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("monuments");
  
  // États pour les villes
  const [cities, setCities] = useState<City[]>([]);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [showCityForm, setShowCityForm] = useState(false);
  
  // États pour les monuments
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [editingMonument, setEditingMonument] = useState<Monument | null>(null);
  const [showMonumentForm, setShowMonumentForm] = useState(false);

  // Form data
  const [cityFormData, setCityFormData] = useState({
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

  const [monumentFormData, setMonumentFormData] = useState({
    name: "",
    cityId: "",
    description: "",
    hours: "",
    price: "",
    location: "",
    photos: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const role = await getCurrentUserRole();
        setIsAdmin(role === "admin");
        if (role !== "admin") {
          Alert.alert("Accès refusé", "Vous n'avez pas les droits d'administrateur.");
          router.replace("/(tabs)");
          return;
        }
        loadData();
      } else {
        router.replace("/login");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loadData = async () => {
    try {
      const [citiesData, monumentsData] = await Promise.all([
        getCities(),
        getMonuments(),
      ]);
      setCities(citiesData);
      setMonuments(monumentsData);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      Alert.alert("Erreur", "Impossible de charger les données.");
    }
  };

  // Fonctions pour les villes
  const handleAddCity = () => {
    setEditingCity(null);
    setCityFormData({
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
    setShowCityForm(true);
  };

  const handleEditCity = (city: City) => {
    setEditingCity(city);
    setCityFormData({
      name: city.name,
      description: city.description,
      history: city.history,
      specialties: city.specialties.join(", "),
      climate: city.climate,
      languages: city.languages.join(", "),
      tips: city.tips.join("\n"),
      isHostCity: city.isHostCity,
      image: city.image || "",
    });
    setShowCityForm(true);
  };

  const handleDeleteCity = (id: string) => {
    Alert.alert("Supprimer la ville", "Êtes-vous sûr ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteCity(id);
            Alert.alert("Succès", "Ville supprimée.");
            loadData();
          } catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer.");
          }
        },
      },
    ]);
  };

  const handleSubmitCity = async () => {
    if (!cityFormData.name || !cityFormData.description) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const cityData = {
        ...cityFormData,
        specialties: cityFormData.specialties.split(",").map((s) => s.trim()),
        languages: cityFormData.languages.split(",").map((l) => l.trim()),
        tips: cityFormData.tips.split("\n").filter((t) => t.trim()),
      };

      if (editingCity) {
        await updateCity(editingCity.id, cityData);
        Alert.alert("Succès", "Ville modifiée.");
      } else {
        await addCity(cityData);
        Alert.alert("Succès", "Ville ajoutée.");
      }

      setShowCityForm(false);
      loadData();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sauvegarder.");
    }
  };

  // Fonctions pour les monuments
  const handleAddMonument = () => {
    setEditingMonument(null);
    setMonumentFormData({
      name: "",
      cityId: "",
      description: "",
      hours: "",
      price: "",
      location: "",
      photos: "",
    });
    setShowMonumentForm(true);
  };

  const handleEditMonument = (monument: Monument) => {
    setEditingMonument(monument);
    setMonumentFormData({
      name: monument.name,
      cityId: monument.cityId,
      description: monument.description,
      hours: monument.hours,
      price: monument.price,
      location: monument.location,
      photos: monument.photos.join(", "),
    });
    setShowMonumentForm(true);
  };

  const handleDeleteMonument = (id: string) => {
    Alert.alert("Supprimer le monument", "Êtes-vous sûr ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMonument(id);
            Alert.alert("Succès", "Monument supprimé.");
            loadData();
          } catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer.");
          }
        },
      },
    ]);
  };

  const handleSubmitMonument = async () => {
    if (
      !monumentFormData.name ||
      !monumentFormData.cityId ||
      !monumentFormData.description
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const monumentData = {
        ...monumentFormData,
        photos: monumentFormData.photos
          ? monumentFormData.photos.split(",").map((url) => url.trim())
          : [],
      };

      if (editingMonument) {
        await updateMonument(editingMonument.id, monumentData);
        Alert.alert("Succès", "Monument modifié.");
      } else {
        await addMonument(monumentData);
        Alert.alert("Succès", "Monument ajouté.");
      }

      setShowMonumentForm(false);
      loadData();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sauvegarder.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Chargement...</Text>
      </View>
    );
  }

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Accès refusé</Text>
      </View>
    );
  }

  // Formulaire de ville
  if (showCityForm) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {editingCity ? "Modifier la ville" : "Ajouter une ville"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={cityFormData.name}
          onChangeText={(text) => setCityFormData({ ...cityFormData, name: text })}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={cityFormData.description}
          onChangeText={(text) =>
            setCityFormData({ ...cityFormData, description: text })
          }
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Histoire"
          value={cityFormData.history}
          onChangeText={(text) =>
            setCityFormData({ ...cityFormData, history: text })
          }
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Spécialités (séparées par des virgules)"
          value={cityFormData.specialties}
          onChangeText={(text) =>
            setCityFormData({ ...cityFormData, specialties: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Climat"
          value={cityFormData.climate}
          onChangeText={(text) =>
            setCityFormData({ ...cityFormData, climate: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Langues (séparées par des virgules)"
          value={cityFormData.languages}
          onChangeText={(text) =>
            setCityFormData({ ...cityFormData, languages: text })
          }
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Conseils (un par ligne)"
          value={cityFormData.tips}
          onChangeText={(text) => setCityFormData({ ...cityFormData, tips: text })}
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Image (URL)"
          value={cityFormData.image}
          onChangeText={(text) => setCityFormData({ ...cityFormData, image: text })}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setShowCityForm(false)}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmitCity}>
            <Text style={styles.buttonText}>
              {editingCity ? "Modifier" : "Ajouter"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Formulaire de monument
  if (showMonumentForm) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {editingMonument ? "Modifier le monument" : "Ajouter un monument"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={monumentFormData.name}
          onChangeText={(text) =>
            setMonumentFormData({ ...monumentFormData, name: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="ID de la ville"
          value={monumentFormData.cityId}
          onChangeText={(text) =>
            setMonumentFormData({ ...monumentFormData, cityId: text })
          }
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={monumentFormData.description}
          onChangeText={(text) =>
            setMonumentFormData({ ...monumentFormData, description: text })
          }
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Horaires"
          value={monumentFormData.hours}
          onChangeText={(text) =>
            setMonumentFormData({ ...monumentFormData, hours: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Prix"
          value={monumentFormData.price}
          onChangeText={(text) =>
            setMonumentFormData({ ...monumentFormData, price: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Localisation (URL)"
          value={monumentFormData.location}
          onChangeText={(text) =>
            setMonumentFormData({ ...monumentFormData, location: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Photos (URLs séparées par des virgules)"
          value={monumentFormData.photos}
          onChangeText={(text) =>
            setMonumentFormData({ ...monumentFormData, photos: text })
          }
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setShowMonumentForm(false)}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmitMonument}>
            <Text style={styles.buttonText}>
              {editingMonument ? "Modifier" : "Ajouter"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Vue principale
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Administration</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>Retour</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "villes" && styles.activeTab]}
          onPress={() => setActiveTab("villes")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "villes" && styles.activeTabText,
            ]}
          >
            Villes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "monuments" && styles.activeTab]}
          onPress={() => setActiveTab("monuments")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "monuments" && styles.activeTabText,
            ]}
          >
            Monuments
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === "villes" ? (
          <>
            <TouchableOpacity style={styles.addButton} onPress={handleAddCity}>
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
                      onPress={() => handleEditCity(item)}
                    >
                      <Text style={styles.actionButtonText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteCity(item.id)}
                    >
                      <Text style={styles.actionButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMonument}
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
                      onPress={() => handleEditMonument(item)}
                    >
                      <Text style={styles.actionButtonText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteMonument(item.id)}
                    >
                      <Text style={styles.actionButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        )}
      </View>
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
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#7A1F16",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#7A1F16",
    fontWeight: "700",
  },
  content: {
    flex: 1,
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
  message: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});

