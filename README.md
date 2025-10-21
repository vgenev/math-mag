# MathBuddy Tutor App - Next.js Edition

A web-based math tutor for 11-year-old Alex who loves soccer ⚽. Built with Next.js, TypeScript, Chakra UI, and LM Studio SDK.

## Features

- 🧮 Interactive AI math tutor (MathBuddy)
- ⚽ Personalized for Alex (soccer-themed encouragement)
- 📚 Specializes in subtraction with borrowing
- 🎯 Practice problems for addition, subtraction, multiplication, division
- 💬 Kid-friendly chat interface with blue/green bubbles
- 🌟 Parent tips sidebar
- 🚀 Uses LM Studio's TypeScript SDK (no CORS issues!)

## Setup Instructions

### 1. Install LM Studio

1. Download LM Studio from [lmstudio.ai](https://lmstudio.ai)
2. Load Phi-3 Mini Instruct model (GGUF, Q4_K_M recommended)
3. **Important:** Keep LM Studio running with the model loaded

### 2. Install Dependencies

```bash
cd math-tutor-nextjs
npm install
```

### 3. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

- **Frontend:** Next.js App Router with Chakra UI
- **API Route:** `/app/api/chat/route.ts` uses `@lmstudio/sdk` to communicate with LM Studio
- **No CORS issues:** The SDK runs on the server side, not in the browser
- **Type-safe:** Full TypeScript support throughout

## Project Structure

```
# 🪄 МатМаг — Math tutor (Next.js)

МатМаг е малко Next.js приложение — интерактивен чат-асистент за математика, създаден специално за 11-годишния Иси. Интерфейсът използва Chakra UI, Markdown рендеринг и KaTeX за красиви математически формули и сметки.

## Какво прави приложението
- Чат-бот (МатМаг) който дава обяснения, примери и задачи на български.
- Всяка сметка трябва да се показва само в Markdown code block (вж. секцията "Формат на отговорите").
- Поддържа LaTeX/KaTeX (rehype-katex) за формули и remark-gfm за Markdown синтаксис.
- Автоматично логване на разговорите към `/api/log` след всеки отговор.

## Основни зависимости
- Next.js (app router)
- Chakra UI
- react-markdown, remark-gfm, remark-math, rehype-katex
- OpenAI official SDK (или LM Studio при локален модел)

## Формат на отговорите (важно)
МатМаг е настроен с подробни правила — ключовото е:

- Всички сметки (аритметика, многоредови изчисления и т.н.) трябва да се показват *само* в Markdown code blocks, например:

```
      23
   -  8
   ----
      15
```

- За умножение използвай `.` или `x` (не използвай знаци като × или \cdot, те могат да развалят рендирането).
- Обясненията са извън code block-a и трябва да са кратки и приятелски (в примера в кода — обръщение към "Иси").

## Къде да конфигурираш API ключ или локален модел

- За ChatGPT / OpenAI: създай `.env.local` в проекта и добави:

```bash
OPENAI_API_KEY=sk-...
```

- За локален LM Studio (или друг локален OpenAI-совместим API): `app/api/chat/route.ts` има константа `USE_CHATGPT` — когато е `false`, клиентът използва `http://localhost:1234/v1` като `baseURL`.

- Файл `app/api/chat/route.ts` съдържа логика за избор между ChatGPT (OpenAI) и локален модел. Съобщенията, които се пращат към `/api/chat`, трябва да имат формата:

```json
{ "messages": [ { "role": "system|user|assistant", "content": "..." }, ... ] }
```

## API endpoints

- `POST /api/chat` — очаква `{ messages }`, върща `{ message: { role, content } }`. Използва OpenAI SDK или локален back-end според конфигурацията.
- `POST /api/log` — (в app code) автоматично се вика за да се запази лог на разговора; payload е `{ messages }`.

## Стартиране локално

1. Инсталирай зависимости:

```bash
npm install
# или: pnpm install
```

2. Добави `.env.local` с `OPENAI_API_KEY` (ако използваш ChatGPT)

3. Стартирай dev сървъра:

```bash
npm run dev
# или: pnpm dev
```

4. Посети: `http://localhost:3000`

## Забележки за разработчици
- Интерфейсът е реализиран в `app/page.tsx` — там ще намериш:
   - системния prompt (`SYSTEM_PROMPT`) с правилата за форматиране и насоки за обучение;
   - автоматично логване след всеки отговор (fetch към `/api/log`);
   - UI компонентите и поведенията (Chakra, Markdown рендеринг, KaTeX стили).

- Chat backend е в `app/api/chat/route.ts` — проверете `USE_CHATGPT` и `OPENAI_API_KEY`.

## Често срещани проблеми
- Ако получаваш грешка свързана с OpenAI: провери `OPENAI_API_KEY` и мрежовата връзка.
- Ако използваш локален LM Studio: увери се, че LM Studio върви на `http://localhost:1234` и `USE_CHATGPT` е `false`.

## Лиценз
Добави лиценз по избор (например MIT) като създадеш `LICENSE` файл.

---

Ако искаш, мога да разширя README с конкретни developer run-скриптове, инструкции за деплой (Vercel) или да добавя примерни .env файлове и CI workflow.
```

## Usage

1. Make sure LM Studio is running with a model loaded
2. Start the Next.js dev server: `npm run dev`
3. Open http://localhost:3000
4. Type math questions like:
   - "Explain 23 - 8"
   - "How do I solve 14 - 9?"
   - "Give me a quick quiz!"
5. MathBuddy will provide step-by-step explanations with encouragement

## Troubleshooting

**Error: "No models loaded in LM Studio"**
- Make sure LM Studio is running
- Load a model (Phi-3 Mini Instruct recommended)
- Restart the Next.js dev server

**Connection errors**
- Verify LM Studio is running
- Check that the model is loaded (green indicator in LM Studio)
- Try restarting both LM Studio and the Next.js dev server

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Chakra UI v3** - Component library
- **@lmstudio/sdk** - Official LM Studio TypeScript SDK
- **Tailwind CSS** - Utility-first CSS

## License

MIT
