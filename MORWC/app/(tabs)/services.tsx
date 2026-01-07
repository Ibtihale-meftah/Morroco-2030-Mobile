import TranslatedText from "@/components/TranslatedText";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ServicesScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <TranslatedText style={styles.title}>
        NOS SERVICES
      </TranslatedText>

      <View style={styles.servicesGrid}>
        <Animated.View entering={FadeInUp.duration(450)}>
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => router.push("/cities")}
          >
            <Text style={styles.icon}>🏙️</Text>
            <TranslatedText style={styles.label}>
              Villes
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(80).duration(450)}>
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => router.push("/monuments")}
          >
            <Text style={styles.icon}>🏛️</Text>
            <TranslatedText style={styles.label}>
              Monuments
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(160).duration(450)}>
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => router.push("/itinerary")}
          >
            <Text style={styles.icon}>🗺️</Text>
            <TranslatedText style={styles.label}>
              Itinéraires
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(240).duration(450)}>
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => router.push("/fan-id")}
          >
            <Text style={styles.icon}>🎫</Text>
            <TranslatedText style={styles.label}>
              Fan ID
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(320).duration(450)}>
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => router.push("/evisa")}
          >
            <Text style={styles.icon}>🧾</Text>
            <TranslatedText style={styles.label}>
              eVisa / AEVM
            </TranslatedText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 110,
    backgroundColor: "#F5F5DC",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7A1F16",
    marginBottom: 12,
    textAlign: "center",
  },

  servicesGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

serviceCard: {
  width: "48%",          // 2 cartes par ligne
  backgroundColor: "#7A1F16",
  borderRadius: 18,
  paddingVertical: 24,
  paddingHorizontal: 12,
  alignItems: "center",
  justifyContent: "center",
  minHeight: 140,
  marginBottom: 16,      // espace vertical entre lignes
},

 icon: {
  fontSize: 40,
  marginBottom: 10,
},

label: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
  textAlign: "center",
},

  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

});