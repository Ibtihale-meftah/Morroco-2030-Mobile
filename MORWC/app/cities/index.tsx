import { ThemedText } from "@/components/themed-text";
import { cities } from "@/data/cities";
import { router } from "expo-router";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CitiesScreen() {
  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push(`/cities/${item.id}`)}>
          {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
          <View style={styles.textBlock}>
            <ThemedText type="subtitle">{item.name}</ThemedText>
            <ThemedText>{item.description}</ThemedText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 24 },
  card: { borderRadius: 16, overflow: "hidden", backgroundColor: "#7e5f5fff", marginBottom: 14, borderWidth: 1, borderColor: "#3e2929ff" },
  image: { width: "100%", height: 160 },
  textBlock: { padding: 14 },
});
