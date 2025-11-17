const CHATBOT_API_URL = 'http://10.0.2.2:3000';
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface CheckInData {
  mood: number;
  energy: number;
  workload: number;
  sleep: number;
  comments?: string;
  timestamp: string;
}

export const sendMessage = async (
  message: string,
  userId: string,
  checkIns?: CheckInData[]
): Promise<string> => {
  try {
    const response = await fetch(`${CHATBOT_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userId,
        checkIns,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar mensagem');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Erro no chatbot:', error);
    throw error;
  }
};

export const generatePersonalizedPlan = async (
  userId: string,
  checkIns: CheckInData[]
): Promise<{ plan: string; metrics: any }> => {
  try {
    const response = await fetch(`${CHATBOT_API_URL}/generate-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        checkIns,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar plano');
    }

    const data = await response.json();
    return {
      plan: data.plan,
      metrics: data.metrics,
    };
  } catch (error) {
    console.error('Erro ao gerar plano:', error);
    throw error;
  }
};
