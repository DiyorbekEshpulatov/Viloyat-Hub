# Viloyat-Hub Deployment Guide

## Project Overview

**Viloyat-Hub** is a complete Next.js 15 entrepreneurship platform for Uzbekistan with bilingual support (Uzbek & English).

## Features Implemented

### Core Modules
- **Grant Navigator** - Search, filter, and apply for grants across regions
- **AI Mentor** - Interactive AI-powered mentorship chatbot
- **Marketplace** - Product/service listings and discovery
- **Mentorship Program** - Connect with experienced mentors
- **User Authentication** - Secure login/signup system
- **User Dashboard** - Personal profile and settings

### Design & UX
- Robot-style system header with animated status indicator
- Nano Technologies showcase section
- Responsive mobile-first design
- Professional color scheme with semantic tokens
- Smooth animations and transitions
- Bilingual UI (Uzbek/English) with language switcher

### Technology Stack
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with semantic tokens
- **i18n:** next-intl for internationalization
- **Icons:** Lucide React
- **Database Ready:** PostgreSQL schema included

## Project Structure

```
viloyat-hub/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Root redirect
│   ├── globals.css             # Global styles
│   └── [locale]/
│       ├── layout.tsx          # Localized layout
│       ├── page.tsx            # Home page (2 versions)
│       ├── grants/
│       │   ├── page.tsx        # Grant navigator
│       │   └── [id]/page.tsx   # Grant details
│       ├── mentor/page.tsx     # AI mentor
│       ├── marketplace/        # Marketplace
│       ├── mentorship/         # Mentorship system
│       ├── login/page.tsx      # Login page
│       └── signup/page.tsx     # Signup page
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   └── LanguageSwitcher.tsx    # Language selector
├── hooks/
│   └── useAuth.ts              # Authentication hook
├── utils/
│   ├── api.ts                  # API utilities
│   └── auth.ts                 # Auth functions
├── types/
│   └── index.ts                # TypeScript types
├── messages/
│   ├── en.json                 # English translations
│   └── uz.json                 # Uzbek translations
├── public/
│   └── index.html              # Static HTML landing (fallback)
├── scripts/
│   ├── init-db.sql             # Database schema
│   └── seed-db.sql             # Seed data
├── middleware.ts               # i18n middleware
├── next.config.ts              # Next.js config
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── vercel.json                 # Vercel deployment
└── package.json                # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/DiyorbekEshpulatov/Viloyat-Hub.git
cd Viloyat-Hub

# Install dependencies
npm install --legacy-peer-deps

# Set up environment (optional)
cp .env.example .env.local
```

### Development

```bash
# Start dev server
npm run dev

# Server runs on http://localhost:3000
# Open http://localhost:3000/en for English
# Open http://localhost:3000/uz for Uzbek
```

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment Options

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm install -g vercel
vercel

# Or link existing project
vercel link
vercel deploy
```

Vercel configuration is included in `vercel.json` for optimal deployment.

### Other Platforms

The project can be deployed to any Node.js hosting platform:
- AWS Amplify
- AWS App Runner
- Google Cloud Run
- Azure App Service
- DigitalOcean App Platform
- Railway.app
- Render.com

## Environment Variables

Create a `.env.local` file for local development:

```env
# Database (optional - for now)
DATABASE_URL=postgresql://user:password@localhost:5432/viloyat_hub

# API Keys (to be added)
GROQ_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000

# Email Service (optional)
EMAIL_FROM=noreply@viloyat-hub.uz
```

See `.env.example` for complete list.

## Database Setup

SQL migration scripts are included in `/scripts`:

1. `init-db.sql` - Creates all tables and relationships
2. `seed-db.sql` - Populates sample data

To set up PostgreSQL database:

```bash
# Using psql
psql -U postgres -d viloyat_hub -f scripts/init-db.sql
psql -U postgres -d viloyat_hub -f scripts/seed-db.sql

# Or with Neon/Vercel Postgres through web interface
```

## Available Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

## Features Roadmap

### Completed ✓
- [x] Next.js 15 setup with TypeScript
- [x] Bilingual support (Uzbek/English)
- [x] Core page structure and layouts
- [x] Robot-style header design
- [x] Nano Technologies section
- [x] Database schema design
- [x] Authentication system setup
- [x] Component architecture

### In Development
- [ ] Backend API routes
- [ ] Database integration
- [ ] Groq AI integration for mentor
- [ ] User authentication flow
- [ ] File uploads (Vercel Blob)
- [ ] Email notifications

### Future Enhancements
- [ ] Payment processing (Stripe)
- [ ] Advanced search and filtering
- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Admin panel

## Troubleshooting

### Build Issues
If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Rebuild
npm run build
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Dependencies Conflicts
The project uses `--legacy-peer-deps` for compatibility:
```bash
npm install --legacy-peer-deps
```

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## Support

For issues and questions:
- GitHub Issues: https://github.com/DiyorbekEshpulatov/Viloyat-Hub/issues
- Email: support@viloyat-hub.uz

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Uzbekistan Government
- Entrepreneurship Support Centers
- All contributors and mentors

---

**Viloyat-Hub** - Empowering entrepreneurs across Uzbekistan 🚀
