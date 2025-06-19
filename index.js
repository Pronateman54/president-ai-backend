import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/ai/advice', async (req, res) => {
  const { topic } = req.body;

  try {
    const prompt = `As an AI political advisor, give strategic advice on the following issue: ${topic}`;
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });
    res.json({ advice: completion.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/ai/headline', async (req, res) => {
  const { situation } = req.body;

  try {
    const prompt = `Write a realistic news headline based on this presidential situation: ${situation}`;
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });
    res.json({ headline: completion.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('AI backend running on http://localhost:3000');
});
