import { useLanguage } from "@/context";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ProfilScreen() {
  const { openLanguageModal } = useLanguage();

  const items = [
    { label: "Modifier mon profil", onPress: () => {} },
    { label: "Modifier mon mot de passe", onPress: () => {} },
    { label: "Sélectionner la langue", onPress: openLanguageModal },
    { label: "Supprimer mon compte", onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}> user name </Text>
      </Animated.View>

      <View style={styles.list}>
        {items.map((it) => (
          <TouchableOpacity key={it.label} style={styles.item} onPress={it.onPress}>
            <Text style={styles.itemText}>{it.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logout} onPress={() => {}}>
        <Text style={styles.logoutText}>Déconnexion</Text>
        <Text style={styles.chevronWhite}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  avatarWrap: { alignItems: "center", marginTop: 10, marginBottom: 18 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#7A1F16",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: { fontSize: 38 },
  name: { fontSize: 18, fontWeight: "700" },
  list: { gap: 10 },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: { flex: 1, fontSize: 15 },
  chevron: { fontSize: 22, color: "#111" },
  logout: {
    marginTop: 18,
    backgroundColor: "#E6BFC0",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: { flex: 1, fontSize: 15, fontWeight: "700", color: "#af2a2aff" },
  chevronWhite: { fontSize: 22, color: "#b01313ff" },
});
