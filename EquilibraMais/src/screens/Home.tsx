import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Animated,
  Pressable,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useTheme } from '../context/ThemeContext';

export default function Home({ navigation }: any) {
  const { colors } = useTheme();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleLogoPress = () => {
    navigation.navigate('About');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable onPress={handleLogoPress}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('../../assets/logoequilibramais.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </Pressable>

      <Text style={[styles.title, { color: colors.text }]}>
        Bem-vindo ao EquilibraMais!
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Seu companheiro de bem-estar no trabalho.
        {'\n\n'}
        Por favor, navegue pelo menu abaixo para acessar as funcionalidades do app.
      </Text>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.card }]}
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { color: colors.textSecondary }]}>
          Sair da conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 280,
    height: 280,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 30,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
