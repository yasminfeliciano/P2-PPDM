import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Alert } from 'react-native';

export default function App() {
  // Estados para buscar por Nome
  const [nameInput, setNameInput] = useState('');
  const [countryByName, setCountryByName] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Busca por Nome
  const searchByName = async () => {
    if (!nameInput.trim()) return;
    
    setLoading(true);
    setCountryByName(null);
    
    try {
      // Requisição de API
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,translations,maps');
      if (!response.ok) throw new Error('Erro ao buscar lista de países');

      const data = await response.json();
            
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Países</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Busca por Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do país..."
          value={nameInput}
          onChangeText={setNameInput}
        />
        <Button title="Buscar por Nome" onPress={searchByName} disabled={loading} />

        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', 
  },
  loader: {
    marginTop: 20,
  }
});