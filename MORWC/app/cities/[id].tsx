import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { cities, City } from '@/data/cities';

export default function CityDetailScreen() {
  const { id } = useLocalSearchParams();
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
      <ThemedText type="title" style={styles.title}>{city.name}</ThemedText>
      <ThemedText style={styles.description}>{city.description}</ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Histoire</ThemedText>
      <ThemedText>{city.history}</ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Spécialités culturelles</ThemedText>
      <ThemedText>{city.specialties.join(', ')}</ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Climat</ThemedText>
      <ThemedText>{city.climate}</ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Langues parlées</ThemedText>
      <ThemedText>{city.languages.join(', ')}</ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Conseils pratiques</ThemedText>
      {city.tips.map((tip: string, index: number) => (
        <ThemedText key={index} style={styles.tip}>• {tip}</ThemedText>
      ))}
    </ScrollView>
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