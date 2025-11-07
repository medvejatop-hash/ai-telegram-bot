const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

app.use(express.json());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  try {
    const response = `✅ Бот работает! Вы написали: "${userMessage}"`;
    await bot.sendMessage(chatId, response);
    console.log('Сообщение отправлено');
  } catch (error) {
    console.log('Ошибка:', error);
  }
});

app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('🤖 Бот запущен!');
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен`);
});
