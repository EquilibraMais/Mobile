import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryDark: string;
  border: string;
  tabBar: string;
  header: string;
}

interface ThemeContextData {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  background: '#BAC9B2',
  card: '#E3E3E3',
  text: '#333',
  textSecondary: '#555',
  primary: '#6B8E65',
  primaryDark: '#8FAA85',
  border: '#9BB492',
  tabBar: '#E3E3E3',
  header: '#8FAA85',
};

const darkTheme: ThemeColors = {
  background: '#1a1a1a',
  card: '#2d2d2d',
  text: '#f0f0f0',
  textSecondary: '#b0b0b0',
  primary: '#8FAA85',
  primaryDark: '#6B8E65',
  border: '#404040',
  tabBar: '#2d2d2d',
  header: '#2d2d2d',
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('Erro ao carregar tema:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('@theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  };

  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
