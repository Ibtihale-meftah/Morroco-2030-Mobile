import { monuments } from "@/data/monuments";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function MonumentsScreen() {
  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={monuments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 16, marginBottom: 12, backgroundColor: "#eee" }}
            onPress={() => router.push(`/monuments/${item.id}`)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
