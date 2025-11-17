// chatbot-backend/test-gemini.js

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

async function test() {
  try {
    console.log('🧪 Testando gemini-2.5-flash-lite');
    console.log('🔑 API Key:', process.env.GEMINI_API_KEY?.substring(0, 15) + '...');
    
    const result = await model.generateContent('Responda apenas: OK');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Funcionou! Resposta:', text);
    console.log('✅ API Key válida e modelo funcionando!');
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Detalhes completos:', error);
  }
}

test();
