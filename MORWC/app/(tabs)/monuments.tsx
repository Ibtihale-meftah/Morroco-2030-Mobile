import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TranslatedText from "@/components/TranslatedText";
import { Colors } from "@/constants/theme";
import { cities } from "@/data/cities";
import { Monument, monuments } from "@/data/monuments";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function MonumentsScreen() {
  const colorScheme = useColorScheme();

  const renderMonument = ({ item }: { item: Monument }) => {
    const city = cities.find((c) => c.id === item.cityId);

    return (
      <Link href={`/monuments/${item.id}`} asChild>
        <TouchableOpacity
          style={[
            styles.monumentItem,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
          ]}
        >
          <ThemedText type="subtitle">
            <TranslatedText>{item.name}</TranslatedText>
          </ThemedText>

          <ThemedText>
            <TranslatedText>{city?.name ?? ""}</TranslatedText>
          </ThemedText>

          <ThemedText>
            <TranslatedText>{item.description}</TranslatedText>
          </ThemedText>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        <TranslatedText>Monuments et Lieux Touristiques</TranslatedText>
      </ThemedText>

      <FlatList
        data={monuments}
        renderItem={renderMonument}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  monumentItem: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
});


