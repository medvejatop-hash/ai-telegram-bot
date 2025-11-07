const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 10000;

// Инициализация бота
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

app.use(express.json());

// Обработчик сообщений от Telegram
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  console.log('📨 Получено сообщение:', userMessage);
  
  try {
    const response = `🤖 Бот отвечает! Вы написали: "${userMessage}"`;
    await bot.sendMessage(chatId, response);
    console.log('✅ Ответ отправлен:', response);
  } catch (error) {
    console.log('❌ Ошибка:', error);
  }
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('🔄 Получен webhook от Telegram');
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Главная страница
app.get('/', (req, res) => {
  res.send('🤖 Бот запущен!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
