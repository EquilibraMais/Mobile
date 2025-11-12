import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { auth } from '../services/firebase';
import { useTheme } from '../context/ThemeContext';

export default function CheckIn({ navigation }: any) {
  const { colors } = useTheme();
  const [mood, setMood] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [workload, setWorkload] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [comments, setComments] = useState('');

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😄'];

  const handleSubmit = async () => {
    if (mood === 0 || energy === 0 || workload === 0 || sleep === 0) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const checkInData = {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      mood,
      energy,
      workload,
      sleep,
      comments,
      timestamp: new Date().toISOString(),
    };

    console.log('Dados do check-in:', checkInData);

    Alert.alert(
      'Check-in registrado!',
      'Seus dados foram salvos com sucesso.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );

    // Limpa o formulário
    setMood(0);
    setEnergy(0);
    setWorkload(0);
    setSleep(0);
    setComments('');
  };

  const renderSelector = (
    title: string,
    value: number,
    setValue: (val: number) => void,
    options: string[]
  ) => (
    <View style={[styles.selectorContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.selectorTitle, { color: colors.text }]}>{title}</Text>
      <View style={styles.optionsRow}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              { backgroundColor: colors.background },
              value === index + 1 && { backgroundColor: colors.primary },
            ]}
            onPress={() => setValue(index + 1)}
          >
            <Text
              style={[
                styles.optionText,
                { color: colors.text },
                value === index + 1 && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.title}>Check-in Diário</Text>
        <Text style={styles.subtitle}>
          Como você está se sentindo hoje?
        </Text>
      </View>

      {/* Humor */}
      <View style={[styles.selectorContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.selectorTitle, { color: colors.text }]}>
          Como está seu humor?
        </Text>
        <View style={styles.emojiRow}>
          {moodEmojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.emojiButton,
                { backgroundColor: colors.background },
                mood === index + 1 && { backgroundColor: colors.primary },
              ]}
              onPress={() => setMood(index + 1)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Energia */}
      {renderSelector(
        'Nível de energia',
        energy,
        setEnergy,
        ['1', '2', '3', '4', '5']
      )}

      {/* Carga de trabalho */}
      {renderSelector(
        'Carga de trabalho',
        workload,
        setWorkload,
        ['1', '2', '3', '4', '5']
      )}

      {/* Qualidade do sono */}
      {renderSelector(
        'Qualidade do sono',
        sleep,
        setSleep,
        ['1', '2', '3', '4', '5']
      )}

      {/* Comentários */}
      <View style={[styles.commentsContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.selectorTitle, { color: colors.text }]}>
          Comentários (opcional)
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Escreva algo sobre como está se sentindo..."
          placeholderTextColor={colors.textSecondary}
          value={comments}
          onChangeText={setComments}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, { backgroundColor: colors.primary }]} 
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Salvar Check-in</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
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
  selectorContainer: {
    padding: 20,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 15,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiButton: {
    padding: 10,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentsContainer: {
    padding: 20,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  submitButton: {
    padding: 16,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  bottomSpacing: {
    height: 30,
  },
});
