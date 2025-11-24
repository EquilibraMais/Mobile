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


const API_BASE_URL = 'https://equilibramais/api/v2/relatorios/humor';

const USE_API = true;

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


export const getCheckIns = async (userId: string): Promise<CheckInData[]> => {
  
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
    
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${userId}/checkins?limit=20`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await auth.currentUser?.getIdToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    return data.checkins || data;
    
  } catch (error) {
    console.error('Erro ao buscar check-ins (API):', error);
    return [];
  }
  
  return [];
};


export const saveCheckIn = async (data: Omit<CheckInData, 'id'>): Promise<void> => {
  
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
  
};


export const deleteCheckIn = async (checkInId: string): Promise<void> => {
  
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
};
