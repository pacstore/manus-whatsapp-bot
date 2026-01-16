require('dotenv').config();
const express = require('express');
const { initBot } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Healthcheck endpoint (Railway precisa disso)
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    bot: 'Manus WhatsApp AI',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
  
  // Inicializar bot WhatsApp
  initBot();
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
