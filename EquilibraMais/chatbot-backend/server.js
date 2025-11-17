const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash-lite'
});

app.post('/chat', async (req, res) => {
  try {
    const { message, userId, checkIns } = req.body;

    console.log('📨 Recebida mensagem:', { userId, message });

    if (!message || !userId) {
      return res.status(400).json({ 
        error: 'Mensagem e userId são obrigatórios' 
      });
    }

    // Montar contexto
    let contextPrompt = `Você é o Equilíbrio, um assistente de bem-estar emocional no trabalho.
Seja empático, acolhedor e prático. Responda em até 3 parágrafos curtos.

${checkIns && checkIns.length > 0 ? `
Dados recentes do usuário:
${checkIns.slice(0, 3).map((c, i) => `
Check-in ${i + 1}:
- Humor: ${c.mood}/5, Energia: ${c.energy}/5, Carga: ${c.workload}/5, Sono: ${c.sleep}/5
${c.comments ? `- Nota: ${c.comments}` : ''}
`).join('\n')}
` : ''}

Pergunta: ${message}

Responda de forma amigável e útil:`;

    console.log('🤖 Enviando para Gemini...');

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('✅ Resposta gerada com sucesso!');

    res.json({
      success: true,
      message: text,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro no chatbot:', error.message);
    res.status(500).json({
      error: 'Erro ao processar mensagem',
      details: error.message,
    });
  }
});

app.post('/generate-plan', async (req, res) => {
  try {
    const { userId, checkIns } = req.body;

    if (!checkIns || checkIns.length === 0) {
      return res.status(400).json({
        error: 'É necessário ter pelo menos um check-in',
      });
    }

    // Calcular médias
    const avgMood = checkIns.reduce((acc, c) => acc + c.mood, 0) / checkIns.length;
    const avgEnergy = checkIns.reduce((acc, c) => acc + c.energy, 0) / checkIns.length;
    const avgWorkload = checkIns.reduce((acc, c) => acc + c.workload, 0) / checkIns.length;
    const avgSleep = checkIns.reduce((acc, c) => acc + c.sleep, 0) / checkIns.length;

    const prompt = `Analise estes dados de bem-estar corporativo e crie um plano personalizado:

MÉDIAS (${checkIns.length} check-ins):
- Humor: ${avgMood.toFixed(1)}/5
- Energia: ${avgEnergy.toFixed(1)}/5  
- Carga de trabalho: ${avgWorkload.toFixed(1)}/5
- Sono: ${avgSleep.toFixed(1)}/5

HISTÓRICO:
${checkIns.slice(0, 7).map((c, i) => `
Dia ${i + 1}: Humor ${c.mood}/5, Energia ${c.energy}/5, Carga ${c.workload}/5, Sono ${c.sleep}/5
${c.comments ? `Obs: ${c.comments}` : ''}`).join('\n')}

Crie um plano com:
1. **Diagnóstico** (1 parágrafo sobre os padrões identificados)
2. **3 Recomendações Práticas** (ações concretas e específicas)
3. **2 Metas Semanais** (objetivos realistas e mensuráveis)

Seja específico, motivador e use linguagem acessível. Gere o plano baseado no últimos 5 check-ins.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const plan = response.text();

    res.json({
      success: true,
      plan,
      metrics: {
        avgMood: avgMood.toFixed(1),
        avgEnergy: avgEnergy.toFixed(1),
        avgWorkload: avgWorkload.toFixed(1),
        avgSleep: avgSleep.toFixed(1),
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao gerar plano:', error.message);
    res.status(500).json({
      error: 'Erro ao gerar plano',
      details: error.message,
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    model: 'gemini-1.5-flash-latest',
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, () => {
  console.log(`🤖 Chatbot backend rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🤖 Modelo: gemini-1.5-flash-latest`);
  console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY ? '✅ Configurada' : '❌ Não encontrada'}`);
});
