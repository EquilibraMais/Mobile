import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { auth } from './firebase';

const firestore = getFirestore();

// ========================================
// 🔧 CONFIGURAÇÃO DA API
// ========================================
// Quando a API .NET estiver pronta, atualize esta URL:
const API_BASE_URL = 'https://sua-api.net/api'; // ← ATUALIZAR DEPOIS

// Escolha qual implementação usar:
const USE_API = false; // ← Mude para TRUE quando a API estiver pronta

// ========================================
// 📊 INTERFACE DE DADOS
// ========================================
export interface CheckInData {
  id?: string;
  userId: string;
  email?: string;
  mood: number;
  energy: number;
  workload: number;
  sleep: number;
  comments?: string;
  timestamp: string;
}

// ========================================
// 📥 BUSCAR CHECK-INS
// ========================================
export const getCheckIns = async (userId: string): Promise<CheckInData[]> => {
  
  // ✅ VERSÃO ATUAL - FIREBASE (FUNCIONANDO)
  if (!USE_API) {
    try {
      const checkinsRef = collection(firestore, 'checkins');
      const q = query(
        checkinsRef,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(20)
      );
      
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as CheckInData));
    } catch (error) {
      console.error('Erro ao buscar check-ins (Firebase):', error);
      return [];
    }
  }
  
  // 🔄 VERSÃO FUTURA - API .NET (COMENTADA)
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${userId}/checkins?limit=20`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await auth.currentUser?.getIdToken()}`, // Token JWT
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // Adaptar resposta da API para o formato esperado
    // Ajuste conforme a estrutura real da sua API:
    return data.checkins || data; // ou data.data, depende da estrutura
    
  } catch (error) {
    console.error('Erro ao buscar check-ins (API):', error);
    return [];
  }
  */
  
  return [];
};

// ========================================
// 💾 SALVAR CHECK-IN
// ========================================
export const saveCheckIn = async (data: Omit<CheckInData, 'id'>): Promise<void> => {
  
  // ✅ VERSÃO ATUAL - FIREBASE (FUNCIONANDO)
  if (!USE_API) {
    try {
      const checkinsRef = collection(firestore, 'checkins');
      await addDoc(checkinsRef, data);
      console.log('✅ Check-in salvo com sucesso no Firebase!');
    } catch (error) {
      console.error('Erro ao salvar check-in (Firebase):', error);
      throw error;
    }
    return;
  }
  
  // 🔄 VERSÃO FUTURA - API .NET (COMENTADA)
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/checkins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await auth.currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({
        userId: data.userId,
        email: data.email,
        mood: data.mood,
        energy: data.energy,
        workload: data.workload,
        sleep: data.sleep,
        comments: data.comments,
        timestamp: data.timestamp,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
    }

    console.log('✅ Check-in salvo com sucesso na API!');
    
  } catch (error) {
    console.error('Erro ao salvar check-in (API):', error);
    throw error;
  }
  */
};

// ========================================
// 🗑️ DELETAR CHECK-IN
// ========================================
export const deleteCheckIn = async (checkInId: string): Promise<void> => {
  
  // ✅ VERSÃO ATUAL - FIREBASE (FUNCIONANDO)
  if (!USE_API) {
    try {
      console.log('🔥 Deletando do Firebase - ID:', checkInId);
      
      if (!checkInId) {
        throw new Error('ID do check-in é obrigatório');
      }
      
      const checkInRef = doc(firestore, 'checkins', checkInId);
      await deleteDoc(checkInRef);
      console.log('✅ Check-in deletado com sucesso do Firebase!');
      
    } catch (error: any) {
      console.error('❌ Erro ao deletar check-in (Firebase):', error);
      throw error;
    }
    return;
  }
  
  // 🔄 VERSÃO FUTURA - API .NET (COMENTADA)
  /*
  try {
    console.log('🔥 Deletando da API - ID:', checkInId);
    
    if (!checkInId) {
      throw new Error('ID do check-in é obrigatório');
    }
    
    const response = await fetch(`${API_BASE_URL}/checkins/${checkInId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await auth.currentUser?.getIdToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    console.log('✅ Check-in deletado com sucesso da API!');
    
  } catch (error: any) {
    console.error('❌ Erro ao deletar check-in (API):', error);
    throw error;
  }
  */
};
