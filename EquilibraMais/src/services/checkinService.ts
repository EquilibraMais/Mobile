
import { getFirestore, collection, query, where, orderBy, limit, getDocs, addDoc } from 'firebase/firestore';
import { auth } from './firebase';

const firestore = getFirestore();

export interface CheckInData {
  id?: string;
  userId: string;
  mood: number;
  energy: number;
  workload: number;
  sleep: number;
  comments?: string;
  timestamp: string;
}

//const API_URL = 'https://nossa-api-aqui.com';

export const getCheckIns = async (userId: string): Promise<CheckInData[]> => {
  try {
    const checkinsRef = collection(firestore, 'checkins');
    const q = query(
      checkinsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(7)
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as CheckInData));
  } catch (error) {
    console.error('Erro ao buscar check-ins:', error);
    return [];
  }
};

export const saveCheckIn = async (data: Omit<CheckInData, 'id'>): Promise<void> => {
  try {
    const checkinsRef = collection(firestore, 'checkins');
    await addDoc(checkinsRef, data);
  } catch (error) {
    console.error('Erro ao salvar check-in:', error);
    throw error;
  }
};
