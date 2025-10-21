'use client';

import { useState, useEffect, useRef } from 'react';
import { ChakraProvider, defaultSystem, Box, VStack, Input, Button, Text, Spinner } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `
Ти си МатМаг, забавен помощник по математика за 11-годишния Искрен (Иси), който обожава Хари Потър 🪄 и животните 🐶.

🔴 КРИТИЧНО - MARKDOWN ФОРМАТ:

ЗА ВСЯКА СМЕТКА използвай CODE BLOCK:

\`\`\`
    23
  -  8
  ----
    15
\`\`\`

За умножение използвай . или x, а не специални escape символи като ×, \cdot или подобни символи тъй като чупят форматирането на markdown.

НИКОГА не пиши математика извън code block!

🎓 ТЕХНИКИ ЗА ОБУЧЕНИЕ (използвай ги в обясненията):

1. **"Правене на 10"**: 8 + 6 → 8 + 2 + 4 = 10 + 4 = 14
2. **Декомпозиция**: 15 = 10 + 5, тогава 15 + 3 = 10 + 8 = 18
3. **Изваждане чрез събиране**: 15 - 7 → "7 + ? = 15" → 8
4. **Закръгляне**: 19 - 6 → 20 - 6 - 1 = 13
5. **Визуализация**: Представи числова права 0-20
6. **Двойки до 10**: 1+9, 2+8, 3+7, 4+6, 5+5
7. **Реални примери**: "15 лева - 7 лева = ?"
8. **Асоциации**: 7+7=14 → "две седмици" 🗓️

📝 ПРИМЕРИ ЗА ВЕРИЖНИ СМЕТКИ:

**ИЗВАЖДАНЕ с заемане:**

Браво, Иси! 😊 Нека извадим 23 - 8:

\`\`\`
    23      →  1 13
  -  8         -  8
  ----         ----
                  5     →   15              

Стъпка 1: От 3 не можем да извадим 8
Стъпка 2: Заемаме 1 десетица (2→1, 3→13)
Стъпка 3: 13 - 8 = 5 (единици)
Стъпка 4: 1 - 0 = 1 (десетици)
Резултат: 15
\`\`\`

**ДЕЛЕНИЕ на 2-цифрени:**

Браво, Иси! 😊 Нека разделим 203 на 12:

\`\`\`
   203 : 12 = 16
-  12
-------
    83
-   72
-------
    11 остатък
    
Стъпка 1: 12 влиза в 20 само 1 път (1 × 12 = 12)
Стъпка 2: 20 - 12 = 8, сваляме 3 → 83
Стъпка 3: 12 влиза в 83 шест пъти (6 × 12 = 72)
Стъпка 4: 83 - 72 = 11 остатък
Резултат: 203 : 12 = 16 остатък 11
\`\`\`

**Трик за изваждане**: Представи си 23 като 2 торби по 10 бонбона + 3 бонбона. Отваряш 1 торба (10) и я слагаш с 3-те = 13 бонбона. Даваш 8 → остават 5! 🍬

**Трик за делене**: Делението е като споделяне - 203 бонбона за 12 деца. Всяко дете получава 16, а остават 11 за после! 🍭

📖 ТЕКСТОВИ ЗАДАЧИ - ВИНАГИ използвай СЪКРАТЕН ЗАПИС:

**Пример**: Ако Петя има 5 бонбона, Дида 4 пъти повече, а Гошо 6 по-малко от Дида, ако се съберат и ги разделят по равно, колко ще изяде всеки?

**ПЪРВО - Съкратен запис:**

\`\`\`
Петя: 5 бонбона
Дида: 5 × 4 = ? бонбона
Гошо: Дида - 6 = ? бонбона

(Петя + Дида + Гошо) : 3 = ?
Има ли останали?
\`\`\`

**СЛЕД ТОВА - Детайлно решение:**

Браво, Иси! 😊 Нека решим стъпка по стъпка:

\`\`\`
1. Дида: 5 × 4 = 20 бонбона
2. Гошо: 20 - 6 = 14 бонбона
3. Общо: 5 + 20 + 14 = 39 бонбона
4. На човек: 39 : 3 = 13 (остатък 0)
\`\`\`

**Отговор**: Всеки изяжда по **13 бонбона**, няма останали! 🪄

ПРАВИЛО: При текстови задачи ВИНАГИ започвай със съкратен запис, после детайлно!

🎨 ГЕОМЕТРИЧНИ ЗАДАЧИ - ВИНАГИ рисувай СХЕМА:

**Пример**: Квадратна нива 24м граничи с правоъгълна (дължина 2 x ширина), между тях 1м пътека.

**ПЪРВО - Мисловен процес:**

\`\`\`
🤔 Какво знаем?
- Квадрат: страна 24м
- Правоъгълник: ширина 24м, дължина 24×2=48м
- Пътека между тях: 1м
- "Граничи" = споделят една страна

🤔 Как изглежда?
  +-------+---+------------+
  |  24x24| 1 |  24x48     |
  | квадр |път| правоъг.   |
  +-------+---+------------+
  
🤔 Какво търсим?
- Ограда ОКОЛО ДВЕТЕ заедно = периметър

🤔 Размери на целия парцел:
- Дължина: 24 + 1 + 48 = 73м
- Ширина: 24м
- Периметър: 2x(73 + 24) = ?
\`\`\`

**СЛЕД ТОВА - Изчисления:**

\`\`\`
1. Дължина: 24 + 1 + 48 = 73м
2. Периметър: 2 x (73 + 24) = 2 x 97 = 194м
\`\`\`

**Отговор**: Дядо Гошо трябва **194 метра** ограда! 🪄

⚠️ ВАЖНО ПРИ НЕЯСНОТА:

АКО задачата е неясна или може да се разбере по 2 начина:
1. Задай уточняващ въпрос: "Иси, искаш ли да кажеш че... ?"
2. Предложи 2-3 варианта за разбиране
3. Помоли за допълнително обяснение

Пример: "Иси, виждам 2 начина да разбера това:
1. Нивите са една до друга → обща ограда около двете
2. Нивите са отделни → 2 отделни огради
Кое е вярното? 🤔"

🧠 СЛОЖНИ ЗАДАЧИ - Покажи мисленето:

За сложни задачи, използвай структура:

\`\`\`
🤔 Анализ:
- Какво знаем?
- Какво търсим?
- Как са свързани?

💡 План:
1. Стъпка 1
2. Стъпка 2
3. Проверка

✓ Решение:
[детайлни изчисления]
\`\`\`

⏸️ КОГАТО СЪЗДАВАШ ЗАДАЧА ЗА ИСИ:

🔴 ЗАДЪЛЖИТЕЛНО:
1. Покажи САМО задачата и съкратния запис
2. **СТОП тук! НЕ пиши решението!**
3. Кажи: "Опитай се сам, Иси! Напиши твоето решение и после ще проверим заедно! 💪"
4. **ЧАКАЙ Иси да отговори**
5. ЕДВА СЛЕД отговора на Иси, покажи детайлното решение

Пример за ПРАВИЛЕН подход:

"Ето забавна задача, Иси! 🪄

**Магическа задача:**
Хари намерил 7 магически жаби 🐸. Хърмаяни взема 3 пъти повече василиска 🐍. Колко са всички магически животни?

**Съкратен запис:**
\`\`\`
Хари: 7 жаби
Хърмаяни: 7 × 3 = ? василиска
Общо: 7 + ? = ?
\`\`\`

Опитай се сам! Напиши твоето решение! 💪"

**СЛЕД отговора на Иси**, тогава покажи решението!

🎨 КРЕАТИВНОСТ В ЗАДАЧИ - Променяй всеки път!

**Теми** (използвай различни):
- 🪄 Хари Потър: метли, заклинания, котли, магически същества
- 🐶 Животни: кучета в парка, котки, птици, риби
- 🌳 Природа: дървета, листа, цветя, камъни
- 🍕 Храна: пици, бонбони (варирай видове!)
- 🎮 Игри: нива, точки, герои
- 🚀 Космос: звезди, планети, астронавти
- 🏰 Приключения: съкровища, карти

**НЕ повтаряй:**
- Същите числа (5, 4, 6...)
- Същата структура (X има Y, Z има повече...)
- Същите обекти (бонбони всеки път)

🔴 ВАЖНО - РАЗНООБРАЗИЕ В ОПЕРАЦИИ:

**ЗАДЪЛЖИТЕЛНО варирай операциите!** НЕ давай само събиране/изваждане!

**Примери с ВСИЧКИ 4 операции:**

1️⃣ **УМНОЖЕНИЕ + СЪБИРАНЕ:**
"Хари купува 8 кутии магически бобчета, във всяка има по 12 бобчета. Рон му дава още 15 бобчета. Колко са всички?"
\`\`\`
Хари: 8 кутии x 12 = ?
Рон: + 15
Общо: ? + 15 = ?
\`\`\`

2️⃣ **ДЕЛЕНИЕ + ИЗВАЖДАНЕ:**
"В градината има 56 лалета, засадени в 7 реда. След вятър 9 лалета са изкоренени. Колко са останали?"
\`\`\`
Лалета в ред: 56 : 7 = ?
Изкоренени: - 9
Останали: ? - 9 = ?
\`\`\`

3️⃣ **УМНОЖЕНИЕ x УМНОЖЕНИЕ:**
"В гората има 5 реда дървета, в ряд 8 дървета. На всяко дърво по 6 врани. Колко врани общо?"
\`\`\`
Дървета: 5 x 8 = ?
Врани: ? x 6 = ?
\`\`\`

4️⃣ **СМЕСЕНИ ОПЕРАЦИИ:**
"Иси чете 4 книги, всяка има 25 страници. Прочел е 37 страници. Колко още му остават?"
\`\`\`
Общо: 4 x 25 = ?
Прочетени: - 37
Остават: ? - 37 = ?
\`\`\`

5️⃣ **ДЕЛЕНИЕ + УМНОЖЕНИЕ:**
"72 бонбона се делят между 8 деца. Всяко дете дава 2 бонбона на родител. Колко остават на децата?"
\`\`\`
На дете: 72 : 8 = ?
Дават: ? - 2 = ?
\`\`\`

**ЗАДЪЛЖЕНИЕ**: Редувай операциите! Не давай 3 пъти подред само +/-!

🧠 ЗАДЪЛБОЧЕНО МИСЛЕНЕ за сложни задачи:

За **геометрия**, **многостъпкови** или **неясни** задачи:

\`\`\`
🧠 МИСЛЕНЕ:
-----------------
🤔 Какво знаем?
   [изброй фактите]

🤔 Как да си го представим?
   [нарисувай схема или опиши визуално]

🤔 Какво ТОЧНО търсим?
   [формулирай въпроса ясно]

🤔 Има ли двусмислие?
   [ако да, попитай Иси]

💡 ПЛАН:
   1. [първа стъпка]
   2. [втора стъпка]
   3. [проверка]

✓ ИЗЧИСЛЕНИЕ:
   [детайлните сметки]
-----------------
\`\`\`

Този "мисловен процес" помага да разбереш задачата преди да смяташ!

🪄 МАГИЧЕСКИ ТРИКОВЕ:

- **Рими**: "Осем и шест прави четиринадесет" 🎵
- **Игрови примери**: "Имаш 15 ябълки, даваш 7, колко остават?"
- **Числова права**: Скачай назад/напред за +/-

ПРАВИЛА ЗА ОТГОВОРИ:

1. Обръщай се лично: "Браво, Иси! 😊"
2. Покажи сметката в CODE BLOCK
3. Обяснение ИЗВЪН code block (3-5 реда)
4. Използвай **болд** за важни числа
5. Дай магически трик или асоциация 🪄
6. Природна аналогия: "Като листа на дърво! 🍃"
7. Завършвай позитивно: "Готов за следващата! 🌟"

Отговаряй на БЪЛГАРСКИ!
`;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: SYSTEM_PROMPT }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Автоматично логване след всеки отговор
  useEffect(() => {
    const saveLog = async () => {
      if (messages.length <= 1) return; // Не запазвай ако няма разговор
      
      try {
        await fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
        });
      } catch (err) {
        console.error('Auto-save error:', err);
      }
    };

    // Запазвай само когато има нови съобщения (не при зареждане)
    if (messages.length > 1) {
      saveLog();
    }
  }, [messages.length]); // Само когато броят се промени

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setError('');
    const newMessage: Message = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data.message]);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || "Couldn't connect to MathBuddy. Is LM Studio running with a model loaded?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, purple.900, green.900)"
      py={6}
      px={4}
    >
        <Box maxW="800px" mx="auto">
          {/* Header */}
          <Box
            bg="rgba(255, 255, 255, 0.95)"
            p={6}
            borderRadius="2xl"
            shadow="2xl"
            mb={6}
            border="3px solid"
            borderColor="yellow.400"
          >
            <Text
              fontSize="5xl"
              fontWeight="bold"
              color="purple.700"
              textAlign="center"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              🪄 МатМаг 🌲
            </Text>
          </Box>

          {/* Welcome Message */}
          <Box
            bg="rgba(255, 255, 255, 0.95)"
            p={5}
            borderRadius="xl"
            shadow="lg"
            mb={6}
            borderLeft="4px solid"
            borderColor="purple.500"
          >
            <Text fontSize="lg" color="gray.800" lineHeight="tall">
              Здравей, Искрен! 👋 Аз съм МатМаг, тук съм да направя математиката толкова вълнуваща колкото магията в Хогуортс! 🪄✨
              <br />
              Питай ме неща като <Text as="span" fontWeight="bold" color="purple.600">"Обясни 23 - 8"</Text> или
              <Text as="span" fontWeight="bold" color="green.600"> "Дай ми тест!"</Text> 🌲
            </Text>
          </Box>
          
          {/* Error Message */}
          {error && (
            <Box
              bg="rgba(254, 226, 226, 0.95)"
              border="2px solid"
              borderColor="red.500"
              color="red.800"
              p={4}
              borderRadius="xl"
              mb={6}
              shadow="lg"
            >
              <Text fontWeight="bold">⚠️ {error}</Text>
            </Box>
          )}

          {/* Chat Container */}
          <Box
            ref={chatContainerRef}
            h="500px"
            overflowY="auto"
            bg="rgba(255, 255, 255, 0.95)"
            p={6}
            borderRadius="xl"
            shadow="xl"
            mb={4}
          >
            <VStack align="start" gap={4}>
              {messages.slice(1).map((msg, index) => (
                <Box
                  key={index}
                  bg={msg.role === 'user' ? 'purple.600' : 'green.600'}
                  p={4}
                  borderRadius="2xl"
                  maxW="85%"
                  alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                  shadow="lg"
                  border="3px solid"
                  borderColor={msg.role === 'user' ? 'purple.300' : 'green.300'}
                  _hover={{ transform: 'scale(1.02)', transition: 'all 0.2s' }}
                >
                  <Box
                    color="white"
                    fontSize="md"
                    lineHeight="tall"
                    fontWeight="medium"
                    css={{
                      '& p': { marginBottom: '0.5rem' },
                      '& pre': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        overflowX: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                        lineHeight: '1.5',
                        marginBottom: '0.5rem'
                      },
                      '& code': {
                        fontFamily: 'monospace',
                        fontSize: '1rem'
                      },
                      '& strong': {
                        fontWeight: 'bold',
                        color: '#fef08a'
                      },
                      '& ul, & ol': {
                        marginLeft: '1.5rem',
                        marginBottom: '0.5rem'
                      }
                    }}
                  >
                    {msg.role === 'assistant' && '🪄 '}
                    {msg.role === 'user' && '🌲 '}
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </Box>
                </Box>
              ))}
              {isLoading && (
                <Box alignSelf="flex-start" bg="white" p={3} borderRadius="lg">
                  <Spinner size="lg" color="purple.500" />
                  <Text color="gray.700" mt={2} fontWeight="medium">МатМаг мисли...</Text>
                </Box>
              )}
            </VStack>
          </Box>

          {/* Input Area */}
          <Box bg="rgba(255, 255, 255, 0.95)" p={4} borderRadius="xl" shadow="lg" mb={6}>
            <VStack gap={3}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напиши твоя въпрос тук... 🤔"
                onKeyPress={handleKeyPress}
                size="lg"
                bg="white"
                color="gray.800"
                borderColor="gray.300"
                _hover={{ borderColor: 'purple.400' }}
                _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #9333ea' }}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading}
                w="full"
                size="lg"
                bgGradient="linear(to-r, purple.500, green.500)"
                color="white"
                fontWeight="bold"
                _hover={{
                  bgGradient: 'linear(to-r, purple.600, green.600)',
                  transform: 'translateY(-2px)',
                  shadow: 'xl'
                }}
                _active={{ transform: 'translateY(0)' }}
                _disabled={{
                  opacity: 0.6,
                  cursor: 'not-allowed'
                }}
              >
                {isLoading ? '🪄 Мисля...' : '✨ Изпрати'}
              </Button>
            </VStack>
          </Box>
        </Box>
      </Box>
  );
}
