import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EVisaScreen() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    nationality: "",
    passport: "",
    arrival: "",
    departure: "",
    email: "",
  });

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>eVisa / AEVM</Text>

        {!showForm && !submitted && (
          <>
            <Text style={styles.paragraph}>
              Le eVisa permet aux visiteurs étrangers d’entrer au Maroc sans se
              déplacer à l’ambassade.
            </Text>

            <Text style={styles.paragraph}>
              L’AEVM est une autorisation électronique destinée aux pays éligibles.
            </Text>

            <Text style={styles.info}>Durée du séjour : jusqu’à 90 jours</Text>
            <Text style={styles.info}>Délai : 24 à 72 heures</Text>
            <Text style={styles.info}>Format : Autorisation électronique</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowForm(true)}
            >
              <Text style={styles.buttonText}>Faire une demande</Text>
            </TouchableOpacity>
          </>
        )}

        {showForm && !submitted && (
          <>
            <Text style={styles.sectionTitle}>Formulaire de demande</Text>

            <TextInput
              placeholder="Nom complet"
              style={styles.input}
              onChangeText={(v) => setForm({ ...form, fullname: v })}
            />
            <TextInput
              placeholder="Nationalité"
              style={styles.input}
              onChangeText={(v) => setForm({ ...form, nationality: v })}
            />
            <TextInput
              placeholder="Numéro de passeport"
              style={styles.input}
              onChangeText={(v) => setForm({ ...form, passport: v })}
            />
            <TextInput
              placeholder="Date d’arrivée"
              style={styles.input}
              onChangeText={(v) => setForm({ ...form, arrival: v })}
            />
            <TextInput
              placeholder="Date de départ"
              style={styles.input}
              onChangeText={(v) => setForm({ ...form, departure: v })}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(v) => setForm({ ...form, email: v })}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Envoyer la demande</Text>
            </TouchableOpacity>
          </>
        )}

        {submitted && (
          <>
            <Text style={styles.sectionTitle}>Demande envoyée</Text>

            <Text style={styles.status}>
              Statut : En attente de traitement
            </Text>

            <Text style={styles.paragraph}>
              Votre demande eVisa est en cours de traitement.
              Le délai estimé est de 24 à 72 heures.
            </Text>

            <Text style={styles.warning}>
              Le Fan ID sera activé après validation du eVisa.
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5DC",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#7A1F16",
    borderRadius: 20,
    padding: 24,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  paragraph: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    color: "#eff1e9ff",
    textAlign: "center",
    marginBottom: 6,
  },
  sectionTitle: {
    color: "#e5e4dfff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#d0ccb3ff",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 16,
  },
  buttonText: {
    color: "#7A1F16",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  status: {
    color: "#18ea96ff",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  warning: {
    color: "#ddd6aeff",
    textAlign: "center",
    marginTop: 10,
  },
});