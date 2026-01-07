import TranslatedText from "@/components/TranslatedText";
import {
    StyleSheet,
    View
} from "react-native";

export default function ItineraireScreen() {
  return (
    <View style={styles.container}>
      <TranslatedText style={styles.title}>Itinéraire</TranslatedText>
      <TranslatedText style={styles.description}>
        Planifiez et consultez vos itinéraires ici.
      </TranslatedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center" },
});
