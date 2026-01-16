const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { askGroq } = require('./groq');

let client;

async function initBot() {
  console.log('🤖 Inicializando Manus WhatsApp Bot...');
  
  client = new Client({
    authStrategy: new LocalAuth({
      clientId: 'manus-bot'
    }),
    puppeteer: {
      headless: true,
      executablePath: '/usr/bin/chromium',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    }
  });

  // QR Code para conectar
  client.on('qr', (qr) => {
    console.log('\n📱 ESCANEIE O QR CODE ABAIXO COM SEU WHATSAPP:\n');
    qrcode.generate(qr, { small: true });
    console.log('\n💡 Abra WhatsApp > Aparelhos Conectados > Conectar aparelho\n');
  });

  // Bot conectado
  client.on('ready', () => {
    console.log('✅ Manus está ONLINE e pronto!');
    console.log('📞 Bot conectado ao WhatsApp');
  });

  // Bot autenticado
  client.on('authenticated', () => {
    console.log('🔐 Autenticação bem-sucedida!');
  });

  // Erro de autenticação
  client.on('auth_failure', (msg) => {
    console.error('❌ Falha na autenticação:', msg);
  });

  // Desconectado
  client.on('disconnected', (reason) => {
    console.log('⚠️ Bot desconectado:', reason);
    console.log('🔄 Tentando reconectar...');
  });

  // Receber mensagens
  client.on('message', async (message) => {
    try {
      // Ignorar mensagens de grupos
      const chat = await message.getChat();
      if (chat.isGroup) {
        console.log('📢 Mensagem de grupo ignorada');
        return;
      }

      // Ignorar mensagens do próprio bot
      if (message.fromMe) return;

      const userMessage = message.body.trim();
      const contact = await message.getContact();
      const contactName = contact.pushname || contact.number;
      
      console.log(`\n💬 Mensagem de ${contactName}: "${userMessage}"`);

      // Mostrar "digitando..."
      chat.sendStateTyping();

      // Perguntar pro Groq AI
      const response = await askGroq(userMessage);
      console.log(`🤖 Manus respondeu: "${response.substring(0, 50)}..."`);

      // Enviar resposta
      await message.reply(response);
    } catch (error) {
      console.error('❌ Erro ao processar mensagem:', error);
      await message.reply('Desculpe, ocorreu um erro. Tente novamente! 🤖');
    }
  });

  // Inicializar cliente
  await client.initialize();
}

module.exports = { initBot };
