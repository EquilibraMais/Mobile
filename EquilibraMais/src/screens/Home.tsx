import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Home({ navigation }: any) {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Plataforma Equilibra Mais! 🌟</Text>
      <Text style={styles.subtitle}>
        Estamos felizes em tê-lo aqui. Faça seu check-in diário e acompanhe sua evolução.
      </Text>

      <TouchableOpacity 
        style={styles.checkInButton}
        onPress={() => navigation.navigate('CheckIn')}
      >
        <Text style={styles.checkInButtonText}>Fazer Check-in Diário</Text>
      </TouchableOpacity>

      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#BAC9B2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  checkInButton: {
    backgroundColor: '#4b7bffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});