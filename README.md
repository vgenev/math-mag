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
math-tutor-nextjs/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint using LM Studio SDK
│   ├── page.tsx                   # Main chat interface
│   └── layout.tsx                 # Root layout
├── package.json
└── README.md
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
