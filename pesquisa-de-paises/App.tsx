import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ResultadoNome = {
  nomeComum: string;
  nomeOficial: string;
  nomeRusso: string;
  openStreetMaps: string;
};

type ResultadoCapital = {
  nomeOficial: string;
  bandeiraPng: string;
};
