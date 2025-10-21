import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Създай logs папка ако не съществува
    const logsDir = join(process.cwd(), 'logs');
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }

    // Име на файла с дата и час
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const filename = `conversation-${dateStr}-${timeStr}.json`;
    const filepath = join(logsDir, filename);

    // Подготви данните
    const logData = {
      timestamp: now.toISOString(),
      date: dateStr,
      time: timeStr,
      student: 'Искрен (Иси)',
      messages: messages,
      totalMessages: messages.length,
    };

    // Запази във файл
    await writeFile(filepath, JSON.stringify(logData, null, 2), 'utf-8');

    // Също добави към общ лог файл
    const allLogsFile = join(logsDir, 'all-conversations.jsonl');
    const logLine = JSON.stringify(logData) + '\n';
    
    if (existsSync(allLogsFile)) {
      const existing = await readFile(allLogsFile, 'utf-8');
      await writeFile(allLogsFile, existing + logLine, 'utf-8');
    } else {
      await writeFile(allLogsFile, logLine, 'utf-8');
    }

    return NextResponse.json({ 
      success: true, 
      filename,
      message: 'Разговорът е запазен!' 
    });
  } catch (error: any) {
    console.error('Log error:', error);
    return NextResponse.json(
      { error: error.message || 'Грешка при запазване на лог' },
      { status: 500 }
    );
  }
}