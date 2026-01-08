import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EVISAScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>eVisa</Text>

      <Text style={styles.description}>
        Gérez vos demandes de visa électronique ici.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/evisa")}
      >
        <Text style={styles.buttonText}>Demande eVisa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.secondaryText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6E7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7B1E16",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#7B1E16",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    marginTop: 10,
  },

  secondaryText: {
    color: "#7B1E16",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
