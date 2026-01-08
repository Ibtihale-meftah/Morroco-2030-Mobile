import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { cities, City } from "@/data/cities";

export default function CityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const city = cities.find((c: City) => c.id === id);

  if (!city) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Ville non trouvée</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* IMAGE */}
      {city.image && (
       <Image
  source={{ uri: city.image }}
  style={styles.image}
  contentFit="cover"
  pointerEvents="none"
  transition={0}
/>


      )}

      <ThemedText
  type="title"
  style={[styles.title, { color: "#000" }]}
>
  {city.name}
</ThemedText>
<ThemedText style={[styles.description, { color: "#333" }]}>
  {city.description}
</ThemedText>
     <ThemedText
  type="subtitle"
  style={[styles.sectionTitle, { color: "#050505ff" }]}
>
  Histoire
</ThemedText>

<ThemedText style={{ color: "#333" }}>
  {city.history}
</ThemedText>

      
<ThemedText
  type="subtitle"
  style={[styles.sectionTitle, { color: "#040404ff" }]}
>
  Climat
</ThemedText>

<ThemedText style={{ color: "#333" }}>
  {city.climate}
</ThemedText>

<ThemedText style={{ color: "#333" }}>
  {city.specialties.join(", ")}
</ThemedText>

      <ThemedText
  type="subtitle"
  style={[styles.sectionTitle, { color: "#050505ff" }]}
>
  Langues parlées
</ThemedText>

<ThemedText style={{ color: "#333" }}>
  {city.languages.join(", ")}
</ThemedText>


     <ThemedText
  type="subtitle"
  style={[styles.sectionTitle, { color: "#0a0909ff" }]}
>
  Conseils pratiques
</ThemedText>

{city.tips.map((tip, index) => (
  <ThemedText
    key={index}
    style={[styles.tip, { color: "#333" }]}
  >
    • {tip}
  </ThemedText>
))}

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

 image: {
  width: "100%",
  height: 180,
  borderRadius: 16,
  marginBottom: 16,
  backgroundColor: "#eee",
},

  title: {
    marginBottom: 16,
  },

  description: {
    marginBottom: 16,
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },

  tip: {
    marginBottom: 4,
  },
});