// backend/src/services/aiMentor.service.ts
import OpenAI from 'openai';
import { prisma } from '../lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIMentorService {
  private static businessContext = {
    legal: `
      O'zbekiston tadbirkorlik qonunchiligi:
      - MChJ ro'yxatdan o'tkazish: 1 ish kuni, davlat boji 0 UZS (2024)
      - Yakka tartibdagi tadbirkor: onlayn ro'yxatdan o'tish mumkin
      - Soliq tizimlari: umumiy, soddalashtirilgan, patent
      - KVK (QQS) stavkasi: 12%
      - Jismoniy shaxslardan olinadigan daromad solig'i: 12%
    `,
    grants: `
      O'zbekistondagi asosiy grant dasturlari:
      - IT Park rezidentlik granti: $10,000 - $50,000
      - Innovatsion rivojlanish agentligi grantlari: 200M - 1.5B UZS
      - Xalqaro donorlar (UNDP, USAID, GIZ): turli yo'nalishlar
      - Qishloq xo'jaligi grantlari: fermerlik xo'jaliklari uchun
    `,
    marketing: `
      Raqamli marketing bo'yicha tavsiyalar:
      - Instagram va Telegram - O'zbekistonda eng samarali platformalar
      - Mahalliy influencerlar bilan hamkorlik
      - Uzum, Olx kabi marketpleyslardan foydalanish
    `,
  };
  
  static async sendMessage(userId: string, message: string, sessionId?: string) {
    try {
      // Get user context
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      
      // Get or create session
      let session = sessionId
        ? await prisma.chatSession.findUnique({ where: { id: sessionId } })
        : await prisma.chatSession.create({
            data: { userId, startedAt: new Date() },
          });
      
      // Save user message
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          role: 'user',
          content: message,
        },
      });
      
      // Get session history
      const history = await prisma.chatMessage.findMany({
        where: { sessionId: session.id },
        orderBy: { createdAt: 'asc' },
        take: 20,
      });
      
      // Build system prompt
      const systemPrompt = this.buildSystemPrompt(user);
      
      // Prepare messages for OpenAI
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...history.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: message },
      ];
      
      // Get AI response
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });
      
      const aiResponse = response.choices[0].message.content;
      
      // Save AI response
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          role: 'assistant',
          content: aiResponse,
        },
      });
      
      return {
        id: session.id,
        content: aiResponse,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('AI Mentor error:', error);
      throw new Error('Failed to get AI response');
    }
  }
  
  private static buildSystemPrompt(user: any): string {
    return `
      Siz ViloyatHub AI Mentori. Vazifangiz O'zbekiston tadbirkorlariga yordam berish.
      
      Foydalanuvchi ma'lumotlari:
      - Ism: ${user.name}
      - Viloyat: ${user.region || 'Noma\'lum'}
      - Biznes turi: ${user.business_type || 'Noma\'lum'}
      - Biznes nomi: ${user.business_name || 'Noma\'lum'}
      
      Bilimlar bazasi:
      ${Object.values(this.businessContext).join('\n')}
      
      Qoidalar:
      1. Faqat O'zbekiston qonunchiligi va biznes muhiti haqida maslahat bering
      2. Aniq raqamlar va manbalar keltiring
      3. Agar javobni bilmasangiz, "Kechirasiz, bu savolga hozircha javob bera olmayman. Iltimos, inson mentorga murojaat qiling" deb javob bering
      4. O'zbek tilida, sodda va tushunarli tilda javob bering
      5. Har doim ijobiy va rag'batlantiruvchi bo'ling
      6. Grantlar, kreditlar va davlat yordami haqida ma'lumot bering
      
      Javob uslubi:
      - Do'stona va samimiy
      - Qisqa va aniq
      - Kerakli joylarda emojilardan foydalaning
      - Muhim ma'lumotlarni qalin yoki kursiv bilan ajrating
    `;
  }
}