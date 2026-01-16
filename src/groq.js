const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function askGroq(userMessage) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Você é Manus, um assistente virtual inteligente e prestativo.
          
Características:
- Responda de forma natural, amigável e concisa
- Use emojis quando apropriado 😊
- Seja direto e objetivo
- Se não souber algo, seja honesto
- Ajude com qualquer dúvida ou tarefa

Importante:
- Respostas CURTAS (máximo 3-4 linhas no WhatsApp)
- Se precisar explicar muito, divida em mensagens menores
- Use linguagem informal e brasileira`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1
    });

    return completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';

  } catch (error) {
    console.error('❌ Erro ao chamar Groq API:', error.message);
    
    if (error.message.includes('API key')) {
      return '❌ Erro de configuração. Verifique a GROQ_API_KEY.';
    }
    
    if (error.message.includes('rate limit')) {
      return '⏳ Muitas requisições. Aguarde um momento e tente novamente.';
    }
    
    return 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente! 🤖';
  }
}

module.exports = { askGroq };
```

**Commit new file**

---

## ✅ PRONTO! TODOS OS ARQUIVOS CRIADOS!

Seu repositório agora tem:
```
manus-whatsapp-bot/
├── README.md
├── package.json
├── .gitignore
├── .env.example
└── src/
    ├── index.js
    ├── bot.js
    └── groq.js
