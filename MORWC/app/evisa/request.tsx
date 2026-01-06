import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EVisaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>eVisa / AEVM</Text>

        <Text style={styles.text}>
          Le eVisa permet aux visiteurs étrangers d’entrer au Maroc sans se déplacer
          à l’ambassade.
        </Text>

        <Text style={styles.text}>
          L’AEVM est une autorisation électronique destinée aux pays éligibles.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.info}>Durée du séjour : jusqu’à 90 jours</Text>
          <Text style={styles.info}>Délai de traitement : 24 à 72 heures</Text>
          <Text style={styles.info}>Format : Autorisation électronique</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("./evisa/request")}
        >
          <Text style={styles.buttonText}>Faire une demande</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F6E7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#7A1F16",
    borderRadius: 20,
    padding: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 18,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 20,
  },
  infoBox: {
    marginTop: 16,
    marginBottom: 24,
  },
  info: {
    color: "#FFD700",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: "#7A1F16",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});