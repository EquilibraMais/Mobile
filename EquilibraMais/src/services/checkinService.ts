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
    console.error('Erro ao buscar check-ins:', error);
    return [];
  }
};

export const saveCheckIn = async (data: Omit<CheckInData, 'id'>): Promise<void> => {
  try {
    const checkinsRef = collection(firestore, 'checkins');
    await addDoc(checkinsRef, data);
    console.log('✅ Check-in salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar check-in:', error);
    throw error;
  }
};

export const deleteCheckIn = async (checkInId: string): Promise<void> => {
  try {
    console.log('🔥 deleteCheckIn chamado com ID:', checkInId);
    
    if (!checkInId) {
      throw new Error('ID do check-in é obrigatório');
    }
    
    const checkInRef = doc(firestore, 'checkins', checkInId);
    console.log('📄 Referência criada:', checkInRef.path);
    
    await deleteDoc(checkInRef);
    console.log('✅ deleteDoc executado com sucesso!');
  } catch (error: any) {
    console.error('❌ Erro ao deletar check-in:', error);
    console.error('❌ Código do erro:', error.code);
    console.error('❌ Mensagem:', error.message);
    throw error;
  }
};