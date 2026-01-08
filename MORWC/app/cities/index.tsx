import { ThemedText } from "@/components/themed-text";
import { cities } from "@/data/cities";
import { Image } from "expo-image";
import { router } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CitiesScreen() {
  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`/cities/${item.id}`)}
        >
          {/* IMAGE */}
         <Image
  source={{
    uri: item.image
      ? item.image
      : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
  }}
  style={styles.image}
  resizeMode="cover"
/>


          {/* TEXTE */}
          <View style={styles.content}>
            <ThemedText
  type="subtitle"
  style={{ color: "#000" }}
>
  {item.name}
</ThemedText>

            <ThemedText style={styles.description} numberOfLines={3}>
              {item.description}
            </ThemedText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fefffcff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
  width: "100%",
  height: 180,
  borderTopLeftRadius: 14,
  borderTopRightRadius: 14,
},

  content: {
    padding: 14,
  },

  title: {
    marginBottom: 20,
  },

  description: {
    color: "#131111ff",
    lineHeight: 20,
  },
});