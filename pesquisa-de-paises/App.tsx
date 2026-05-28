import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

export default function App() {
  // Estados para buscar por Nome
  const [nameInput, setNameInput] = useState("");
  const [countryByName, setCountryByName] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [capitalInput, setCapitalInput] = useState("");
  const [countryByCapital, setCountryByCapital] = useState<any>(null);
  const [loadingCapital, setLoadingCapital] = useState(false);

  // Busca por Nome
  const searchByName = async () => {
    if (!nameInput.trim()) return;

    setLoading(true);
    setCountryByName(null);

    try {
      // Padronização usando toLowerCase
      const searchTerm = nameInput.toLowerCase();

      // Requisição de API
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,translations,maps",
      );
      if (!response.ok) throw new Error("Erro ao buscar lista de países");

      const data = await response.json();

      // Encontrando o país
      const foundCountries = data.filter((country: any) => {
        const ptCommon =
          country.translations &&
          country.translations.por &&
          country.translations.por.common
            ? country.translations.por.common.toLowerCase()
            : "";
        const enCommon =
          country.name && country.name.common
            ? country.name.common.toLowerCase()
            : "";

        return ptCommon.includes(searchTerm) || enCommon.includes(searchTerm);
      });

      // Se o array do filtro estiver vazio, acusa o erro
      if (foundCountries.length === 0) {
        throw new Error("País não encontrado. Verifique a ortografia.");
      }

      // Armazena o primeiro elemento no índice 0
      setCountryByName(foundCountries[0]);
    } catch (error) {
      Alert.alert("Erro", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  // Busca por Capital
  const searchByCapital = async () => {
    if (!capitalInput.trim()) return;

    setLoadingCapital(true);
    setCountryByCapital(null);

    // Requisição de API
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/capital/${capitalInput}`,
      );
      if (!response.ok)
        throw new Error("Capital não encontrada. Verifique a ortografia.");

      const data = await response.json();
      setCountryByCapital(data[0]);
    } catch (error) {
      Alert.alert("Erro", (error as Error).message);
    } finally {
      setLoadingCapital(false);
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
        <Button
          title="Buscar por Nome"
          onPress={searchByName}
          disabled={loading}
        />

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        )}

        {countryByName && !loading && (
          <View style={styles.resultContainer}>
            <Text style={styles.bold}>
              Nome Comum (Inglês):{" "}
              <Text style={styles.normal}>{countryByName.name.common}</Text>
            </Text>
            <Text style={styles.bold}>
              Nome em Português:{" "}
              <Text style={styles.normal}>
                {countryByName.translations?.por?.common}
              </Text>
            </Text>
            <Text style={styles.bold}>
              Nome em Russo:{" "}
              <Text style={styles.normal}>
                {countryByName.translations?.rus?.common}
              </Text>
            </Text>
            <Text style={styles.bold}>
              Link do Mapa:{" "}
              <Text style={styles.normal}>
                {countryByName.maps?.openStreetMaps}
              </Text>
            </Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Busca por Capital</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da capital (em inglês)..."
          value={capitalInput}
          onChangeText={setCapitalInput}
        />
        <Button
          title="Buscar por Capital"
          onPress={searchByCapital}
          disabled={loadingCapital}
        />

        {loadingCapital && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        )}

        {countryByCapital && !loadingCapital && (
          <View style={styles.resultContainer}>
            <Text style={styles.bold}>
              Nome Oficial:{" "}
              <Text style={styles.normal}>
                {countryByCapital.name.official}
              </Text>
            </Text>
            <Image
              source={{ uri: countryByCapital.flags.png }}
              style={styles.flag}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  resultContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
    width: "100%",
  },
  bold: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  normal: {
    fontWeight: "normal",
  },
  loader: {
    marginTop: 20,
  },

  flag: {
    width: "100%",
    height: 180,
    marginTop: 10,
    resizeMode: "contain",
  },
});
