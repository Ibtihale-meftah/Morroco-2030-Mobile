import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ItineraryScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.Text
        entering={FadeInUp.duration(700)}
        style={[styles.title, { color: theme.text }]}
      >
        Itinerary Planner
      </Animated.Text>

      <Animated.Text
        entering={FadeInUp.delay(200).duration(700)}
        style={[styles.text, { color: theme.text }]}
      >
        Plan your trip across Morocco for the 2030 World Cup.
        {"\n\n"}
        Choose cities, discover monuments, and build your personalized journey.
      </Animated.Text>

      <Animated.View
        entering={FadeInUp.delay(400).duration(700)}
        style={styles.box}
      >
        <Text style={styles.boxText}>Feature coming soon</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  box: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#C1272D",
  },
  boxText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
