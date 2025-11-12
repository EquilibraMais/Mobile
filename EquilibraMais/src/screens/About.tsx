import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { GIT_COMMIT_HASH } from '../constants/gitInfo';


export default function About({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="information-circle" size={80} color="#6B8E65" />
        <Text style={styles.appName}>EquilibraMais</Text>
        <Text style={styles.tagline}>Seu companheiro de bem-estar</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Versão do App</Text>
          <Text style={styles.infoValue}>
            {Constants.expoConfig?.version || '1.0.0'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>
            {Constants.expoConfig?.android?.versionCode || '1'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Git Commit Hash</Text>
          <Text style={[styles.infoValue, styles.monospace]}>
            {GIT_COMMIT_HASH}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Plataforma</Text>
          <Text style={styles.infoValue}>
            {Constants.platform?.ios ? 'iOS' : 'Android'}
          </Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionTitle}>Sobre o EquilibraMais</Text>
        <Text style={styles.descriptionText}>
          Plataforma de monitoramento e promoção do bem-estar mental no ambiente de trabalho.
          {'\n\n'}
          Desenvolvido para ajudar profissionais a manterem o equilíbrio entre produtividade e saúde mental.
        </Text>
      </View>

      <View style={styles.teamSection}>
  <Text style={styles.teamTitle}>Equipe de Desenvolvimento</Text>
  
  <View style={styles.membersList}>
    <View style={styles.memberCard}>
      <Image 
        source={require('../../assets/gu.png')}
        style={styles.memberPhoto}
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>Gustavo de Aguiar Lima Silva</Text>
        <Text style={styles.memberRM}>RM: 557707</Text>
        <Text style={styles.memberClass}>Turma: 2TDSPF</Text>
      </View>
    </View>

    <View style={styles.memberCard}>
      <Image 
        source={require('../../assets/julio.png')}
        style={styles.memberPhoto}
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>Julio Cesar Conceição Rodrigues</Text>
        <Text style={styles.memberRM}>RM: 557298</Text>
        <Text style={styles.memberClass}>Turma: 2TDSPF</Text>
      </View>
    </View>

    <View style={styles.memberCard}>
      <Image 
        source={require('../../assets/matheus.png')}
        style={styles.memberPhoto}
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>Matheus de Freitas Silva</Text>
        <Text style={styles.memberRM}>RM: 552602</Text>
        <Text style={styles.memberClass}>Turma: 2TDSPF</Text>
      </View>
    </View>
  </View>

  <Text style={styles.projectInfo}>FIAP - Global Solution 2025</Text>
</View>

        
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 EquilibraMais. Todos os direitos reservados.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BAC9B2',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#333',
    marginTop: 20,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#555',
    marginTop: 8,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#E3E3E3',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#333',
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
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#555',
    lineHeight: 24,
  },
  creditsSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  creditsTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#666',
    marginBottom: 8,
  },
  creditsText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#333',
  },
  creditsSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#6B8E65',
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
    borderTopColor: '#9BB492',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  teamSection: {
  paddingHorizontal: 20,
  marginBottom: 30,
},
teamTitle: {
  fontSize: 20,
  fontFamily: 'Inter_700Bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: 20,
},
teamPhoto: {
  width: '100%',
  height: 200,
  borderRadius: 12,
  marginBottom: 20,
},
membersList: {
  gap: 15,
},
memberCard: {
  backgroundColor: '#E3E3E3',
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
  backgroundColor: '#BAC9B2',
  marginRight: 15,
},
memberInfo: {
  flex: 1,
},
memberName: {
  fontSize: 18,
  fontFamily: 'Inter_400Regular',
  color: '#333',
  marginBottom: 4,
},
memberRM: {
  fontSize: 14,
  fontFamily: 'Inter_600SemiBold',
  color: '#6B8E65',
  marginBottom: 2,
},
memberClass: {
  fontSize: 14,
  fontFamily: 'Inter_400Regular',
  color: '#666',
},
projectInfo: {
  fontSize: 14,
  fontFamily: 'Inter_600SemiBold',
  color: '#666',
  textAlign: 'center',
  marginTop: 20,
},

});
