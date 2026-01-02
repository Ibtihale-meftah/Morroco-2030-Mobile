import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { cities, City } from '@/data/cities';
import { Monument, monuments } from '@/data/monuments';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MonumentDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const monument = monuments.find((m: Monument) => m.id === id);

  if (!monument) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Monument non trouvé</ThemedText>
      </ThemedView>
    );
  }

  const city = cities.find((c: City) => c.id === monument.cityId);

  return (
    <ScrollView style={styles.container}>
      {/* IMAGE DU MONUMENT */}
      <Image
        source={{
          uri: monument.photos[0] || 'https://via.placeholder.com/600x400'
        }}
        style={styles.image}
      />

      <ThemedText type="title" style={styles.title}>
        {monument.name}
      </ThemedText>

      <ThemedText style={styles.city}>
        {city?.name}
      </ThemedText>

      <ThemedText style={styles.description}>
        {monument.description}
      </ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Horaires
      </ThemedText>
      <ThemedText>{monument.hours}</ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Prix d'entrée
      </ThemedText>
      <ThemedText>{monument.price}</ThemedText>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Localisation
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.link,
          { backgroundColor: Colors[colorScheme ?? 'light'].background }
        ]}
        onPress={() => Linking.openURL(monument.location)}
      >
        <ThemedText type="link">Voir sur Google Maps</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  city: {
    marginBottom: 16,
    fontStyle: 'italic',
  },
  description: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  link: {
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
});
