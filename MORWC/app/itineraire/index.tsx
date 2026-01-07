import { StyleSheet, Text, View } from "react-native";

export default function ItineraireScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itinéraire</Text>
      <Text style={styles.description}>
        Planifiez et consultez vos itinéraires ici.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6E7",
    justifyContent: "center",
    alignItems: "center",
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
  },
});
