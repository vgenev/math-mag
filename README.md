# 🪄 МатМаг — интерактивен чат-асистент за математика

МатМаг е Next.js приложение с български интерфейс, което осигурява чат за обяснения, примерни задачи и интерактивно обучение по математика.

## Какво прави
- Дава обяснения и решения на математически задачи на български.
- Винаги показва сметките в Markdown code block (за по-добро четене и оформление).
- Поддържа KaTeX за формули и markdown разширения (GFM).
- Автоматично записва лог на разговора към `/api/log`.

## Конфигурация на AI бекенда

- Ако използваш ChatGPT (OpenAI): създай файл `.env.local` в корена на проекта и добави:

```bash
OPENAI_API_KEY=sk-...
```

- Ако искаш да използваш локален модел (LM Studio или подобен), в `app/api/chat/route.ts` промени `USE_CHATGPT` на `false`. В този режим бекендът използва `http://localhost:1234/v1` като `baseURL`.

## API ендпойнти
- `POST /api/chat` — изпраща разговор (`{ messages }`) към модела и връща `{ message: { role, content } }`.
- `POST /api/log` — (извиква се автоматично от клиента) записва разговорите; payload: `{ messages }`.

## Стартиране локално (инструкции)

1) Инсталирай зависимости:

```bash
cd math-tutor-nextjs
npm install
# или: pnpm install
```

2) Конфигурирай `.env.local` (ако използваш OpenAI):

```bash
# пример
OPENAI_API_KEY=sk-...
```

3) Стартирай dev сървъра:

```bash
npm run dev
# или: pnpm dev
```

4) Отвори в браузър: http://localhost:3000

## Къде да погледнеш кода
- Клиент (UI и логика): `app/page.tsx` — съдържа системния prompt (`SYSTEM_PROMPT`), UI и логиката за изпращане на съобщения.
- Chat backend: `app/api/chat/route.ts` — избор между OpenAI и локален модел (променливата `USE_CHATGPT`).

## Често срещани грешки и съвети
- Ако получаваш грешка при свързване към OpenAI: провери `OPENAI_API_KEY` и интернет връзката.
- Ако използваш локален LM Studio: увери се, че услугата работи на `http://localhost:1234` и че `USE_CHATGPT` е `false`.

---

README е възстановен и локализиран на български. Ако искаш, мога да добавя примерен `.env.example`, GitHub Actions workflow, или инструкции за деплой (Vercel). # MathBuddy Tutor App - Next.js Edition

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
# 🪄 МатМаг — интерактивен чат-асистент за математика

МатМаг е Next.js приложение с български интерфейс, което осигурява чат за обяснения, примерни задачи и интерактивно обучение по математика.

## Какво прави
- Дава обяснения и решения на математически задачи на български.
- Винаги показва сметките в Markdown code block (за по-добро четене и оформление).
- Поддържа KaTeX за формули и markdown разширения (GFM).
- Автоматично записва лог на разговора към `/api/log`.

## Конфигурация на AI бекенда

- Ако използваш ChatGPT (OpenAI): създай файл `.env.local` в корена на проекта и добави:

```bash
OPENAI_API_KEY=sk-...
```

- Ако искаш да използваш локален модел (LM Studio или подобен), в `app/api/chat/route.ts` промени `USE_CHATGPT` на `false`. В този режим бекендът използва `http://localhost:1234/v1` като `baseURL`.

## API ендпойнти
- `POST /api/chat` — изпраща разговор ({ messages }) към модела и връща `{ message: { role, content } }`.
- `POST /api/log` — (извиква се автоматично от клиента) записва разговорите; payload: `{ messages }`.

## Стартиране локално (инструкции)

1) Инсталирай зависимости:

```bash
npm install
# или: pnpm install
```

2) Добави `.env.local` и настрои `OPENAI_API_KEY` (ако използваш ChatGPT):

```bash
# пример
OPENAI_API_KEY=sk-...
```

3) Стартирай dev сървъра:

```bash
npm run dev
# или: pnpm dev
```

4) Отвори в браузър: http://localhost:3000

## Къде да погледнеш кода
- UI и логика на клиента: `app/page.tsx` (там е системният prompt, UI компонентите и логиката за изпращане на съобщения).
- Chat backend: `app/api/chat/route.ts` (избор между OpenAI и локален модел).

## Често срещани грешки и съвети
- Ако получаваш грешка при свързване към OpenAI: провери `OPENAI_API_KEY` и интернет връзката.
- Ако използваш локален LM Studio: увери се, че услугата работи на `http://localhost:1234` и че `USE_CHATGPT` е `false`.

---

Готово — README е локализиран на български и съдържа ясни инструкции за стартиране. Ако искаш, мога да добавя примерен `.env.example`, CI workflow или инструкции за деплой (Vercel/GitHub Pages). 
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
