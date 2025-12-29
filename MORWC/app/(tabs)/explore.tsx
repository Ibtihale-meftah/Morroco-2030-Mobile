import { Link } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { cities } from '@/data/cities';
import { Monument, monuments } from '@/data/monuments';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MonumentsScreen() {
  const colorScheme = useColorScheme();

  const renderMonument = ({ item }: { item: Monument }) => {
    const city = cities.find(c => c.id === item.cityId);
    return (
      <Link href={`/monuments/${item.id}`} asChild>
        <TouchableOpacity style={[styles.monumentItem, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          <ThemedText>{city?.name}</ThemedText>
          <ThemedText>{item.description}</ThemedText>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Monuments et Lieux Touristiques</ThemedText>
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
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  monumentItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
});
