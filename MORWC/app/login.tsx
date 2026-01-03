import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    // TODO: Implement login with Firebase
    console.log('Login:', email, password);
    // Simulate error
    if (email !== 'test@example.com') {
      setError('Email ou mot de passe incorrect.');
    } else {
      Alert.alert('Succès', 'Connexion réussie!');
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
    Alert.alert('Mot de passe oublié', 'Fonctionnalité à venir.');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Se connecter</ThemedText>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email ou nom d’utilisateur"
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