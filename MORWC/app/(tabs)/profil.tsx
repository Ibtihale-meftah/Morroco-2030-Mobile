import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/context";
import { getCurrentUserRole } from "@/src/firebase/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { auth } from "../../src/firebase/firebase";

const avatars = [
  require("../../assets/images/avatars/7309681.jpg"),
  require("../../assets/images/avatars/54b19ada-d53e-4ee9-8882-9dfed1bf1396.jpg"),
  require("../../assets/images/avatars/9440461.jpg"),
  require("../../assets/images/avatars/7450220.jpg"),
];

export default function ProfilScreen() {
  const { openLanguageModal } = useLanguage();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [avatarIndex, setAvatarIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    getCurrentUserRole().then(setRole);
  }, [user]);

  useEffect(() => {
    const loadAvatar = async () => {
      const saved = await AsyncStorage.getItem("avatarIndex");
      if (saved !== null) setAvatarIndex(Number(saved));
    };
    loadAvatar();
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  const selectAvatar = async () => {
    const next = avatarIndex === null ? 0 : (avatarIndex + 1) % avatars.length;
    setAvatarIndex(next);
    await AsyncStorage.setItem("avatarIndex", next.toString());
  };

  const items = [
    {
      label: "Modifier mon profil",
      onPress: () => router.push("../edit-profile"),
    },
    {
      label: "Modifier mon mot de passe",
      onPress: () => router.push("../reset-password"),
    },
    {
      label: "Sélectionner la langue",
      onPress: openLanguageModal,
    },
    {
      label: "Supprimer mon compte",
      onPress: () => router.push("../delete-account"),
    },
    ...(role === "admin"
      ? [
          {
            label: "🛠️ Administration",
            onPress: () => router.push("/admin"),
          },
        ]
      : []),
  ];

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(500)}
        style={styles.avatarWrap}
      >
        <TouchableOpacity onPress={selectAvatar}>
          <View style={styles.avatar}>
            {avatarIndex !== null ? (
              <Image source={avatars[avatarIndex]} style={styles.avatarImg} />
            ) : (
              <TranslatedText style={styles.avatarText}>👤</TranslatedText>
            )}
          </View>
        </TouchableOpacity>

        <TranslatedText style={styles.name}>
          {user?.email ?? ""}
        </TranslatedText>

        <TranslatedText style={styles.sub}>
          Appuie sur l’avatar pour changer
        </TranslatedText>
      </Animated.View>

      <View style={styles.list}>
        {items.map((it) => (
          <TouchableOpacity
            key={it.label}
            style={styles.item}
            onPress={it.onPress}
          >
            <TranslatedText style={styles.itemText}>
              {it.label}
            </TranslatedText>
            <TranslatedText style={styles.chevron}>›</TranslatedText>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.push("/logout")}
      >
        <TranslatedText style={styles.logoutText}>
          Déconnexion
        </TranslatedText>
        <TranslatedText style={styles.chevronWhite}>›</TranslatedText>
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
  avatarImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarText: { fontSize: 38 },
  name: { fontSize: 18, fontWeight: "700" },
  sub: { fontSize: 12, color: "#555" },
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