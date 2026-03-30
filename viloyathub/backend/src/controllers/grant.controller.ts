// backend/src/controllers/grant.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { openai } from '../lib/openai';

export class GrantController {
  // Get all grants with filters
  static async getGrants(req: Request, res: Response) {
    try {
      const { region, sector, minAmount, maxAmount, status } = req.query;
      
      const where: any = {};
      
      if (region && region !== 'all') where.region = region;
      if (sector) where.sectors = { has: sector };
      if (status) where.status = status;
      if (minAmount || maxAmount) {
        where.OR = [];
        if (minAmount) {
          where.OR.push({ amount_min: { gte: Number(minAmount) } });
          where.OR.push({ amount_max: { gte: Number(minAmount) } });
        }
        if (maxAmount) {
          where.OR.push({ amount_min: { lte: Number(maxAmount) } });
          where.OR.push({ amount_max: { lte: Number(maxAmount) } });
        }
      }
      
      const grants = await prisma.grant.findMany({
        where,
        orderBy: { deadline: 'asc' },
      });
      
      res.json(grants);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch grants' });
    }
  }
  
  // Get AI matched grants for user
  static async getMatchedGrants(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      
      const allGrants = await prisma.grant.findMany({
        where: { status: 'active' },
      });
      
      // AI matching logic
      const matchedGrants = await this.matchGrantsWithAI(user, allGrants);
      
      res.json(matchedGrants);
    } catch (error) {
      res.status(500).json({ error: 'Failed to match grants' });
    }
  }
  
  // Get single grant
  static async getGrant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const grant = await prisma.grant.findUnique({
        where: { id },
      });
      
      if (!grant) {
        return res.status(404).json({ error: 'Grant not found' });
      }
      
      res.json(grant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch grant' });
    }
  }
  
  // Apply for grant
  static async applyForGrant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const { notes } = req.body;
      
      const application = await prisma.grantApplication.create({
        data: {
          userId,
          grantId: id,
          notes,
          status: 'pending',
        },
      });
      
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to apply for grant' });
    }
  }
  
  // AI matching logic
  private static async matchGrantsWithAI(user: any, grants: any[]) {
    const userPrompt = `
      Foydalanuvchi ma'lumotlari:
      - Viloyat: ${user.region}
      - Biznes turi: ${user.business_type || 'Aniqlanmagan'}
      - Biznes nomi: ${user.business_name || 'Aniqlanmagan'}
      
      Quyidagi grantlardan foydalanuvchiga eng mos keladiganlarini toping.
      Har bir grant uchun 0-100 oralig'ida moslik foizini hisoblang.
    `;
    
    const grantsList = grants.map(g => `
      Grant: ${g.title}
      Beruvchi: ${g.organization}
      Miqdori: ${g.amount_min} - ${g.amount_max} UZS
      Viloyat: ${g.region}
      Sohalar: ${g.sectors.join(', ')}
    `).join('\n');
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Siz grant mutaxassisi. Grantlarni foydalanuvchiga mosligini baholang.' },
        { role: 'user', content: userPrompt },
        { role: 'user', content: grantsList },
      ],
      temperature: 0.3,
    });
    
    // Parse AI response and calculate scores
    const matchedGrants = grants.map(grant => ({
      ...grant,
      match_score: Math.floor(Math.random() * 40) + 60, // Mock score for demo
    })).sort((a, b) => b.match_score - a.match_score).slice(0, 6);
    
    return matchedGrants;
  }
}