import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../services/firebase';
import { useTheme } from '../context/ThemeContext';

interface CheckInData {
  id: string;
  userId: string;
  mood: number;
  energy: number;
  workload: number;
  sleep: number;
  comments: string;
  timestamp: string;
}

export default function History({ navigation }: any) {
  const { colors } = useTheme();
  const [checkIns, setCheckIns] = useState<CheckInData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCheckIns();
  }, []);

  const fetchCheckIns = async () => {
    try {
      // TODO: Substituir por chamada à sua API
      const mockData: CheckInData[] = [
        {
          id: '1',
          userId: auth.currentUser?.uid || '',
          mood: 4,
          energy: 3,
          workload: 3,
          sleep: 4,
          comments: 'Dia produtivo!',
          timestamp: '2025-11-11T10:30:00',
        },
        {
          id: '2',
          userId: auth.currentUser?.uid || '',
          mood: 3,
          energy: 2,
          workload: 4,
          sleep: 3,
          comments: 'Um pouco cansado hoje',
          timestamp: '2025-11-10T09:15:00',
        },
        {
          id: '3',
          userId: auth.currentUser?.uid || '',
          mood: 5,
          energy: 5,
          workload: 2,
          sleep: 5,
          comments: 'Excelente dia!',
          timestamp: '2025-11-09T11:00:00',
        },
      ];

      setCheckIns(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar check-ins:', error);
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😟', '😐', '🙂', '😄'];
    return emojis[mood - 1] || '😐';
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderCheckInCard = ({ item }: { item: CheckInData }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={[styles.cardHeader, { borderBottomColor: colors.border }]}>
        <Text style={[styles.cardDate, { color: colors.textSecondary }]}>
          {formatDate(item.timestamp)}
        </Text>
        <Text style={styles.moodEmoji}>{getMoodEmoji(item.mood)}</Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metric}>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
            Humor
          </Text>
          <Text style={[styles.metricValue, { color: colors.primary }]}>
            {item.mood}/5
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
            Energia
          </Text>
          <Text style={[styles.metricValue, { color: colors.primary }]}>
            {item.energy}/5
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
            Carga
          </Text>
          <Text style={[styles.metricValue, { color: colors.primary }]}>
            {item.workload}/5
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
            Sono
          </Text>
          <Text style={[styles.metricValue, { color: colors.primary }]}>
            {item.sleep}/5
          </Text>
        </View>
      </View>

      {item.comments ? (
        <View style={[styles.commentsContainer, { borderTopColor: colors.border }]}>
          <Text style={[styles.commentsLabel, { color: colors.textSecondary }]}>
            Comentário:
          </Text>
          <Text style={[styles.commentsText, { color: colors.text }]}>
            {item.comments}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Carregando histórico...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.title}>Meu Histórico</Text>
        <Text style={styles.subtitle}>
          {checkIns.length} check-in{checkIns.length !== 1 ? 's' : ''} registrado{checkIns.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {checkIns.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Nenhum check-in ainda
          </Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Faça seu primeiro check-in para começar a acompanhar sua evolução!
          </Text>
          <TouchableOpacity
            style={[styles.emptyButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('CheckIn')}
          >
            <Text style={styles.emptyButtonText}>Fazer Check-in</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={checkIns}
          renderItem={renderCheckInCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  cardDate: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  moodEmoji: {
    fontSize: 32,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  commentsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  commentsLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  commentsText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  emptyButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
