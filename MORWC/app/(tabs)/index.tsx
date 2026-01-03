import TranslatedText from "@/components/TranslatedText";
import { router } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp, SlideInRight } from "react-native-reanimated";
import wcImage from "../../assets/images/wc.png";

export default function HomeTab() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 20 }}>
      <ImageBackground source={wcImage} style={styles.hero}>
        <View style={styles.overlay} />

        <Animated.Text entering={FadeInUp.duration(700)} style={styles.heroTitle}>
          VIBREZ{"\n"}CÉLÉBREZ{"\n"}MOROCCO 2030
        </Animated.Text>
      </ImageBackground>

      <View style={styles.section}>
        <TranslatedText style={styles.sectionTitle}>
          NOS SERVICES
        </TranslatedText>

        <View style={styles.grid}>
          <Animated.View entering={SlideInRight.duration(450)}>
            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/cities")}
            >
              <Animated.Text style={styles.icon}>🏙️</Animated.Text>
              <TranslatedText style={styles.cardText}>
                Villes
              </TranslatedText>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={SlideInRight.delay(120).duration(450)}>
            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/monuments")}
            >
              <Animated.Text style={styles.icon}>🏛️</Animated.Text>
              <TranslatedText style={styles.cardText}>
                Monuments
              </TranslatedText>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.bigCards}>
          <Animated.View entering={FadeInUp.delay(150).duration(500)}>
            <TouchableOpacity
              style={styles.bigCard}
              onPress={() => router.push("/login")}
            >
              <Animated.Text style={styles.bigCardIcon}>🔐</Animated.Text>
              <TranslatedText style={styles.bigCardText}>
                Se connecter
              </TranslatedText>
              <Animated.Text style={styles.bigCardArrow}>↗</Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(250).duration(500)}>
            <TouchableOpacity
              style={styles.bigCard}
              onPress={() => router.push("/register")}
            >
              <Animated.Text style={styles.bigCardIcon}>📖</Animated.Text>
              <TranslatedText style={styles.bigCardText}>
                Créer un compte
              </TranslatedText>
              <Animated.Text style={styles.bigCardArrow}>↗</Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  hero: {
    height: 340,
    justifyContent: "flex-end",
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(185, 60, 46, 0.75)",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6c0e06ff",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },
  serviceCard: {
    width: 160,
    backgroundColor: "#7A1F16",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
    color: "#fff",
  },
  cardText: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "800",
  },
  bigCards: {
    gap: 12,
  },
  bigCard: {
    backgroundColor: "#7A1F16",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  bigCardIcon: {
    color: "#fff",
    fontSize: 22,
    marginRight: 12,
  },
  bigCardText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    flex: 1,
  },
  bigCardArrow: {
    color: "#1c4926ff",
    fontSize: 22,
    fontWeight: "800",
  },
});
