// src/screens/ChatBot.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { auth } from '../services/firebase';
import { sendMessage, generatePersonalizedPlan } from '../services/chatbotService';
import { getCheckIns, CheckInData } from '../services/checkinService';
import ChatMessage from '../components/ChatMessage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatBot({ navigation }: any) {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkIns, setCheckIns] = useState<CheckInData[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Carregar check-ins ao montar o componente
  useEffect(() => {
    loadCheckIns();
    // Mensagem de boas-vindas
    addMessage('assistant', 'Olá! 👋 Sou o Equilíbrio, seu assistente de bem-estar. Como posso te ajudar hoje?');
  }, []);

  const loadCheckIns = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const data = await getCheckIns(userId);
        setCheckIns(data);
      }
    } catch (error) {
      console.error('Erro ao carregar check-ins:', error);
    }
  };

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = inputText.trim();
    setInputText('');
    
    // Adiciona mensagem do usuário
    addMessage('user', userMessage);
    
    setLoading(true);

    try {
      const userId = auth.currentUser?.uid || 'anonymous';
      
      // Envia para o backend com contexto de check-ins
      const response = await sendMessage(userMessage, userId, checkIns);
      
      // Adiciona resposta do assistente
      addMessage('assistant', response);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      addMessage('assistant', 'Desculpe, ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (checkIns.length === 0) {
      Alert.alert(
        'Sem dados suficientes',
        'Você precisa ter pelo menos um check-in registrado para gerar um plano personalizado.'
      );
      return;
    }

    setLoading(true);
    addMessage('user', 'Gere um plano personalizado para mim');

    try {
      const userId = auth.currentUser?.uid || 'anonymous';
      const { plan, metrics } = await generatePersonalizedPlan(userId, checkIns);
      
      const planMessage = `📊 **Plano Personalizado**\n\nBasedo em ${checkIns.length} check-ins:\n- Humor: ${metrics.avgMood}/5\n- Energia: ${metrics.avgEnergy}/5\n- Carga: ${metrics.avgWorkload}/5\n- Sono: ${metrics.avgSleep}/5\n\n${plan}`;
      
      addMessage('assistant', planMessage);
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
      addMessage('assistant', 'Desculpe, não consegui gerar seu plano personalizado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll ao adicionar mensagem
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Ionicons name="leaf" size={28} color="#fff" />
          <Text style={styles.headerTitle}>Equilíbrio</Text>
        </View>
        <TouchableOpacity onPress={handleGeneratePlan} style={styles.planButton}>
          <Ionicons name="sparkles" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage
            role={item.role}
            content={item.content}
            timestamp={item.timestamp}
          />
        )}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Pensando...
          </Text>
        </View>
      )}

      {/* Input */}
      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: inputText.trim() ? colors.primary : colors.border },
          ]}
          onPress={handleSend}
          disabled={!inputText.trim() || loading}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 70,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  planButton: {
    padding: 5,
  },
  messagesList: {
    paddingVertical: 15,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
