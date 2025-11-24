
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { GIT_COMMIT_HASH } from '../constants/gitInfo';
import { useTheme } from '../context/ThemeContext';

export default function About({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="information-circle" size={80} color={colors.primary} />
        <Text style={[styles.appName, { color: colors.text }]}>EquilibraMais</Text>
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          Seu companheiro de bem-estar
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Versão do App
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {Constants.expoConfig?.version || '1.0.0'}
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Build
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {Constants.expoConfig?.android?.versionCode || '1'}
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Git Commit Hash
          </Text>
          <Text style={[styles.infoValue, styles.monospace, { color: colors.text }]}>
            {GIT_COMMIT_HASH}
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            Plataforma
          </Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {Constants.platform?.ios ? 'iOS' : 'Android'}
          </Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={[styles.descriptionTitle, { color: colors.text }]}>
          Sobre o EquilibraMais
        </Text>
        <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
          Plataforma de monitoramento e promoção do bem-estar mental no ambiente de trabalho.
          {'\n\n'}
          Desenvolvido para ajudar profissionais a manterem o equilíbrio entre produtividade e saúde mental.
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.devsButton, { backgroundColor: colors.card, borderColor: colors.primary }]}
        onPress={() => navigation.navigate('Devs')}
      >
        <Ionicons name="people" size={24} color={colors.primary} />
        <Text style={[styles.devsButtonText, { color: colors.text }]}>
          Conheça a equipe
        </Text>
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.backButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          © 2025 EquilibraMais. Todos os direitos reservados.
        </Text>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          FIAP - Global Solution 2025
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginTop: 20,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  monospace: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 14,
  },
  descriptionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
  devsButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderWidth: 2,
  },
  devsButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
    marginLeft: 12,
  },
  backButton: {
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    gap: 5,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
