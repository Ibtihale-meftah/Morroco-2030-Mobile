import TranslatedText from "@/components/TranslatedText";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ServicesScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <TranslatedText style={styles.title}>
        NOS SERVICES
      </TranslatedText>

      <View style={styles.grid}>
        <Animated.View entering={FadeInUp.duration(450)}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/cities")}
          >
            <Animated.Text style={styles.icon}>🏙️</Animated.Text>
            <TranslatedText style={styles.label}>
              Villes
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(80).duration(450)}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/monuments")}
          >
            <Animated.Text style={styles.icon}>🏛️</Animated.Text>
            <TranslatedText style={styles.label}>
              Monuments
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(240).duration(450)}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/map")}
          >
            <Animated.Text style={styles.icon}>📍</Animated.Text>
            <TranslatedText style={styles.label}>
              Carte
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 18, fontWeight: "800", color: "#7A1F16", marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 14 },
  card: {
    width: "47%",
    backgroundColor: "#7A1F16",
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: "center",
  },
  icon: { fontSize: 28, color: "#fff" },
  label: { marginTop: 8, color: "#fff", fontWeight: "800" },
});
