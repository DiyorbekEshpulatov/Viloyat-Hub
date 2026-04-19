# Viloyat-Hub: Uzbekistan Entrepreneurship Platform

Modern, bilingual entrepreneurship platform powered by Next.js 15, designed to empower entrepreneurs across Uzbekistan's regions with grants, AI mentorship, and marketplace opportunities.

## Features

### Core Modules
- **Grant Navigator** - Search and apply for grants by category and region
- **AI Mentor** - Interactive chatbot for business guidance powered by AI
- **Marketplace** - Connect with buyers and suppliers for products/services
- **Mentorship Program** - Connect with experienced entrepreneurs and mentors

### Technical Highlights
- **Bilingual Support** - Full Uzbek (O'zbek) and English language support
- **Modern Stack** - Next.js 15 with React 18, TypeScript, Tailwind CSS
- **Responsive Design** - Mobile-first approach supporting all device sizes
- **i18n Ready** - next-intl for internationalization across all pages

## Project Structure

```
/app                 # Next.js app directory
  /[locale]         # Locale-based routing (en, uz)
    /page.tsx       # Home page
    /login          # Login page
    /signup         # Registration page
    /grants         # Grant navigator
    /mentor         # AI mentor chatbot
    /marketplace    # Marketplace listings
    /mentorship     # Mentorship program
/components         # Reusable React components
  - Navbar.tsx      # Navigation header
  - LanguageSwitcher.tsx
/hooks              # Custom React hooks
  - useAuth.ts      # Authentication hook
/utils              # Utility functions
  - auth.ts         # Auth helpers
  - api.ts          # API client
/types              # TypeScript type definitions
/messages           # i18n translation files
  - en.json         # English translations
  - uz.json         # Uzbek translations
/scripts            # Database and utility scripts
  - init-db.sql     # Database schema
  - seed-db.sql     # Sample data
```

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# Database (optional - for future integration)
DATABASE_URL=your_database_url

# API endpoints
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Tailwind & Styling
- **Design System**: `/app/globals.css` contains CSS variables for theming
- **Color Scheme**: 
  - Primary: Blue (208 100% 50%)
  - Secondary: Dark Gray (218 14% 13%)
  - Accent: Yellow/Gold (45 100% 50%)

### i18n Configuration
- **Supported Locales**: `en`, `uz`
- **Default Locale**: `en`
- **Configuration**: `/i18n.ts` and `/next.config.ts`

## Database Schema

The project includes a comprehensive PostgreSQL schema in `/scripts/init-db.sql`:

- **users** - User accounts and profiles
- **grants** - Grant listings
- **grant_applications** - Grant applications
- **mentors** - Mentor profiles
- **mentorship_sessions** - Mentorship bookings
- **marketplace_items** - Product/service listings
- **regional_map_points** - Geographic data

Run migrations:
```bash
# Create tables (requires database connection)
psql -f scripts/init-db.sql

# Seed sample data
psql -f scripts/seed-db.sql
```

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **State Management**: React Hooks + Context
- **HTTP Client**: Fetch API / Axios
- **Database**: PostgreSQL (ready for integration)

## API Integration

The app is structured to integrate with any backend API. Key client functions in `/utils/api.ts`:

```typescript
// Fetch grants
GET /api/grants?category=tech&region=tashkent

// Create application
POST /api/grants/{grantId}/apply

// Get mentors
GET /api/mentors

// Mentor chat
POST /api/mentor/chat
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support or questions:
- GitHub Issues: Use the issues tab
- Documentation: Check `/app` directory comments
- Contact: DiyorbekEshpulatov

---

**Version**: 1.0.0  
**Last Updated**: April 19, 2026  
**Status**: Active Development
