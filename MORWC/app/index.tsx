import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  hero: {
    height: 320,
    justifyContent: "flex-end",
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(122,31,22,0.75)",
  },
  heroText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#7A1F16",
  },
  services: {
    flexDirection: "row",
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#7A1F16",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cardIcon: {
    fontSize: 28,
    color: "#fff",
  },
  cardText: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "bold",
  },
});