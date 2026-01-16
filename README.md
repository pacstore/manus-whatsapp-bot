# 🤖 Manus - WhatsApp AI Bot

Bot de WhatsApp com IA usando Groq (Llama 3.1 70B) hospedado no Railway.

## 🚀 Deploy Rápido no Railway

### 1️⃣ Fork este repositório
- Clique em **"Fork"** (canto superior direito)
- Copie para sua conta GitHub

### 2️⃣ Criar projeto no Railway
1. Acesse [railway.app](https://railway.app)
2. Clique em **"New Project"**
3. Escolha **"Deploy from GitHub repo"**
4. Selecione **"manus-whatsapp-bot"**

### 3️⃣ Configurar variáveis de ambiente
No Railway, vá em **"Variables"** e adicione:
```
GROQ_API_KEY=sua_chave_aqui
PORT=3000
```

**Como pegar a GROQ_API_KEY:**
1. Acesse [console.groq.com](https://console.groq.com)
2. Login com Google
3. Vá em "API Keys" → "Create API Key"
4. Copie a chave (começa com `gsk_...`)

### 4️⃣ Deploy automático! ✅
- Railway vai fazer deploy automaticamente
- Aguarde ~2 minutos
- Veja os logs em tempo real

### 5️⃣ Conectar WhatsApp
1. Abra os logs do Railway
2. Procure pelo **QR Code**
3. Escaneie com WhatsApp (celular → Aparelhos conectados)
4. Pronto! Bot conectado! 🎉

## 📱 Como usar

Mande mensagem pro número conectado:
- `oi` - Manus responde!
- `@manus sua pergunta` - Pergunta algo
- Qualquer mensagem é respondida pela IA

## 🎯 Recursos

✅ IA conversacional (Groq Llama 3.1 70B)  
✅ Respostas rápidas (~2-3 segundos)  
✅ Sempre ativo (Railway não dorme)  
✅ Logs em tempo real  
✅ Auto-reconecta se cair  

## 💰 Custos

**100% GRATUITO:**
- Railway: $5/mês grátis (renova automaticamente)
- Groq: 30 req/min grátis
- GitHub: grátis sempre

## 🆘 Problemas comuns

**QR Code não aparece?**
- Aguarde 1-2 minutos após deploy
- Verifique os logs do Railway

**Bot não responde?**
- Confira se `GROQ_API_KEY` está correta
- Veja os logs de erro no Railway

## 📝 Licença

MIT - Faça o que quiser! 🎉
