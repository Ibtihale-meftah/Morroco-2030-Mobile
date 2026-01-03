import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7A1F16",
        tabBarStyle: { height: 62 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="monuments"
        options={{
          title: "Monuments",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="FanID"
        options={{
          title: "FanId",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="id-card" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}