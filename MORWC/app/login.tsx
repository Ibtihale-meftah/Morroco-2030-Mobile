import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { auth } from "../src/firebase/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      Alert.alert("Succès", "Connexion réussie");
      router.replace("/(tabs)");
    } catch (err: any) {
      console.log(err.code);

      if (err.code === "auth/user-not-found") {
        setError("Utilisateur introuvable.");
      } else if (err.code === "auth/wrong-password") {
        setError("Mot de passe incorrect.");
      } else if (err.code === "auth/invalid-email") {
        setError("Email invalide.");
      } else {
        setError("Erreur de connexion.");
      }
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Mot de passe oublié", "Fonctionnalité à venir.");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Se connecter
      </ThemedText>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff', // Changed background color to white
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#000', // Changed text color to black
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#000', // Changed text color to black
  },
  button: {
    backgroundColor: '#7A1F16',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgot: {
    color: '#7A1F16',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});