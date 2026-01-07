import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../src/firebase/firebase";

export default function TabsLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

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
        name="fan-id"
        options={{
          title: "Fan ID",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="id-card" color={color} size={size} />
          ), href: user ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="evisa"
        options={{
          title: "eVisa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ), href: user ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="itineraire"
        options={{
          title: "Itinéraire",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ), href: user ? undefined : null,
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          href: user ? undefined : null,
        }}
      />
    </Tabs>
  );
}
