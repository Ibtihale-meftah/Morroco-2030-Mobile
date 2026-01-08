import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cities" />
      <Stack.Screen name="monuments" />
      <Stack.Screen name="add-city" />
      <Stack.Screen name="edit-city" />
      <Stack.Screen name="add-monument" />
      <Stack.Screen name="edit-monument" />
    </Stack>
  );
}

