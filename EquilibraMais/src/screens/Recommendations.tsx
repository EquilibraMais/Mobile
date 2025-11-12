import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export default function Recommendations({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Energia', 'Foco', 'Relaxamento', 'Corpo'];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      category: 'Energia',
      title: 'Pausa Ativa de 5 Minutos',
      description: 'Levante-se, alongue braços e pernas, faça uma caminhada breve pelo escritório.',
      duration: '5 min',
      icon: '⚡',
    },
    {
      id: '2',
      category: 'Relaxamento',
      title: 'Respiração 4-7-8',
      description: 'Inspire por 4s, segure por 7s, expire por 8s. Repita 4 vezes para reduzir ansiedade.',
      duration: '2 min',
      icon: '🧘',
    },
    {
      id: '3',
      category: 'Corpo',
      title: 'Alongamento de Pescoço',
      description: 'Incline a cabeça para cada lado por 15s. Ajuda a aliviar tensão do trabalho no computador.',
      duration: '1 min',
      icon: '💆',
    },
    {
      id: '4',
      category: 'Foco',
      title: 'Técnica Pomodoro',
      description: 'Trabalhe focado por 25 minutos, depois faça uma pausa de 5 minutos.',
      duration: '25 min',
      icon: '🍅',
    },
    {
      id: '5',
      category: 'Energia',
      title: 'Hidrate-se',
      description: 'Beba um copo de água. A desidratação reduz energia e concentração.',
      duration: '1 min',
      icon: '💧',
    },
    {
      id: '6',
      category: 'Relaxamento',
      title: 'Meditação Guiada',
      description: 'Feche os olhos, respire profundamente e focalize no presente por alguns minutos.',
      duration: '10 min',
      icon: '🌸',
    },
    {
      id: '7',
      category: 'Corpo',
      title: 'Exercício de Vista',
      description: 'Regra 20-20-20: a cada 20 min, olhe para algo a 20 metros de distância por 20s.',
      duration: '1 min',
      icon: '👁️',
    },
    {
      id: '8',
      category: 'Foco',
      title: 'Organize sua Mesa',
      description: 'Um ambiente organizado melhora a clareza mental e produtividade.',
      duration: '5 min',
      icon: '📋',
    },
  ];

  const filteredRecommendations =
    selectedCategory === 'Todos'
      ? recommendations
      : recommendations.filter((rec) => rec.category === selectedCategory);

  const renderRecommendationCard = (item: Recommendation) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{item.icon}</Text>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.tryButton}>
        <Text style={styles.tryButtonText}>Experimentar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recomendações</Text>
        <Text style={styles.subtitle}>
          Práticas para melhorar seu bem-estar
        </Text>
      </View>

      {/* Filtros de categoria */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de recomendações */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredRecommendations.map(renderRecommendationCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BAC9B2',
  },
  header: {
    backgroundColor: '#669168',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.95,
  },
  categoriesContainer: {
    maxHeight: 40,
    marginTop: 15,
  },
  categoriesContent: {
    paddingHorizontal: 15,
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E3E3E3',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#6B8E65',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#555',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#E3E3E3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6B8E65',
    textTransform: 'uppercase',
  },
  durationBadge: {
    backgroundColor: '#BAC9B2',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#4A5A45',
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  tryButton: {
    backgroundColor: '#6B8E65',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
});
