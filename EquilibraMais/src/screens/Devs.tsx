import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function Devs({ navigation }: any) {
  const { colors } = useTheme();

  const teamMembers = [
    {
      name: 'Gustavo de Aguiar Lima Silva',
      rm: '557707',
      turma: '2TDSPF',
      photo: require('../../assets/gu.png'),
      github: "https://github.com/gudeaguiar",
      linkedin: "https://www.linkedin.com/in/gustavo-de-aguiar-sn160308/"
    },
    {
      name: 'Julio Cesar Conceição Rodrigues',
      rm: '557298',
      turma: '2TDSPF',
      photo: require('../../assets/julio.png'),
      github: "https://github.com/Julio-CRodrigues",
      linkedin: "https://www.linkedin.com/in/julio-cesar-rodrigues29/",
    },
    {
      name: 'Matheus de Freitas Silva',
      rm: '552602',
      turma: '2TDSPF',
      photo: require('../../assets/matheus.png'),
      github: "https://github.com/MatheusFreitasSilva",
      linkedin: "https://www.linkedin.com/in/matheus-freitas-9110a51b2/",
    },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir link:', err));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Ionicons name="people" size={60} color="#fff" />
        <Text style={styles.headerTitle}>Equipe de Desenvolvimento</Text>
        <Text style={styles.headerSubtitle}>
          FIAP - Global Solution 2025
        </Text>
      </View>

      <View style={styles.content}>
        {teamMembers.map((member, index) => (
          <View
            key={index}
            style={[styles.memberCard, { backgroundColor: colors.card }]}
          >
            <Image source={member.photo} style={styles.memberPhoto} />
            
            <View style={styles.memberInfo}>
              <Text style={[styles.memberName, { color: colors.text }]}>
                {member.name}
              </Text>
              <Text style={[styles.memberRM, { color: colors.primary }]}>
                RM: {member.rm}
              </Text>
              <Text style={[styles.memberClass, { color: colors.textSecondary }]}>
                Turma: {member.turma}
              </Text>

              <View style={styles.socialLinks}>
                <TouchableOpacity
                  style={[styles.socialButton, { backgroundColor: colors.primary }]}
                  onPress={() => openLink(member.github)}
                >
                  <Ionicons name="logo-github" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.socialButton, { backgroundColor: '#0077B5' }]}
                  onPress={() => openLink(member.linkedin)}
                >
                  <Ionicons name="logo-linkedin" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          © 2025 EquilibraMais | 2TDSPF
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  memberCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  memberPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  memberInfo: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  memberRM: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  memberClass: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
