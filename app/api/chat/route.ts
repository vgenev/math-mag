import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// За ChatGPT: Добави API key в .env.local:
// OPENAI_API_KEY=sk-...

// За LM Studio: Използвай localhost:1234
const USE_CHATGPT = true; // Смени на true за ChatGPT

const client = new OpenAI({
  baseURL: USE_CHATGPT ? undefined : 'http://localhost:1234/v1',
  apiKey: USE_CHATGPT ? process.env.OPENAI_API_KEY : 'not-needed',
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const response = await client.chat.completions.create({
      model: USE_CHATGPT ? 'gpt-4o' : 'local-model',
      messages: messages.map((m: any) => ({
        role: m.role as 'system' | 'user' | 'assistant',
        content: m.content,
      })),
      temperature: 0.7,
      max_tokens: 600,
    });

    const content = response.choices?.[0]?.message?.content || '';

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: content.trim(),
      },
    });
  } catch (error: any) {
    console.error('Error:', error);
    const errorMsg = USE_CHATGPT
      ? 'Не мога да се свържа с ChatGPT. Проверете API key-а.'
      : 'Не мога да се свържа с LM Studio. Сигурен ли си, че е стартиран?';
    return NextResponse.json(
      { error: error.message || errorMsg },
      { status: 500 }
    );
  }
}