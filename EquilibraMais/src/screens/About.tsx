import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image
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

      <View style={styles.teamSection}>
        <Text style={[styles.teamTitle, { color: colors.text }]}>
          Equipe de Desenvolvimento
        </Text>
        
        <View style={styles.membersList}>
          <View style={[styles.memberCard, { backgroundColor: colors.card }]}>
            <Image 
              source={require('../../assets/gu.png')}
              style={styles.memberPhoto}
            />
            <View style={styles.memberInfo}>
              <Text style={[styles.memberName, { color: colors.text }]}>
                Gustavo de Aguiar Lima Silva
              </Text>
              <Text style={[styles.memberRM, { color: colors.primary }]}>
                RM: 557707
              </Text>
              <Text style={[styles.memberClass, { color: colors.textSecondary }]}>
                Turma: 2TDSPF
              </Text>
            </View>
          </View>

          <View style={[styles.memberCard, { backgroundColor: colors.card }]}>
            <Image 
              source={require('../../assets/julio.png')}
              style={styles.memberPhoto}
            />
            <View style={styles.memberInfo}>
              <Text style={[styles.memberName, { color: colors.text }]}>
                Julio Cesar Conceição Rodrigues
              </Text>
              <Text style={[styles.memberRM, { color: colors.primary }]}>
                RM: 557298
              </Text>
              <Text style={[styles.memberClass, { color: colors.textSecondary }]}>
                Turma: 2TDSPF
              </Text>
            </View>
          </View>

          <View style={[styles.memberCard, { backgroundColor: colors.card }]}>
            <Image 
              source={require('../../assets/matheus.png')}
              style={styles.memberPhoto}
            />
            <View style={styles.memberInfo}>
              <Text style={[styles.memberName, { color: colors.text }]}>
                Matheus de Freitas Silva
              </Text>
              <Text style={[styles.memberRM, { color: colors.primary }]}>
                RM: 552602
              </Text>
              <Text style={[styles.memberClass, { color: colors.textSecondary }]}>
                Turma: 2TDSPF
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.projectInfo, { color: colors.textSecondary }]}>
          FIAP - Global Solution 2025
        </Text>
      </View>

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
  teamSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  teamTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  membersList: {
    gap: 15,
  },
  memberCard: {
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  memberPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  memberRM: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  memberClass: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  projectInfo: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    marginTop: 20,
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
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
