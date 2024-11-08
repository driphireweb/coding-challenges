# Advocate Search Platform

A full-stack application for searching and filtering mental health advocates based on their specialties, location, and expertise.

## Features

### Search Capabilities
- Full-text search across advocate profiles with PostgreSQL GIN indexing
- Real-time search with debouncing
- Search through names, cities, degrees, and specialties
- Server-side search filtering with proper tsquery formatting

### Data Display
- Responsive table layout with proper loading states
- Color-coded specialty badges with dynamic mapping
- Hover-based specialty expansion for overflow items
- Formatted phone numbers
- Loading states and skeletons

### Technical Stack
- Next.js 14 with App Router
- PostgreSQL with Drizzle ORM
- Docker containerization
- TypeScript
- Tailwind CSS with shadcn/ui components

## Quick Start

The entire application can be started with a single command:

```bash
docker compose up
```

This will:
1. Start PostgreSQL database
2. Run migrations automatically
3. Seed the database with sample advocates
4. Start the Next.js development server

The application will be available at `http://localhost:3000`

## Database Schema

The application uses PostgreSQL with Drizzle ORM. Here's the schema:

```typescript
const advocates = pgTable(
  'advocates',
  {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    city: text('city').notNull(),
    degree: text('degree').notNull(),
    specialties: jsonb('payload').default([]).notNull(),
    yearsOfExperience: integer('years_of_experience').notNull(),
    phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  }
)
```

### Search Index
The application uses a GIN index for full-text search:

```sql
CREATE INDEX IF NOT EXISTS "advocates_search_idx" ON "advocates" 
USING btree (to_tsvector('english',
  coalesce("first_name", '') || ' ' ||
  coalesce("last_name", '') || ' ' ||
  coalesce("city", '') || ' ' ||
  coalesce("degree", '')
));
```

## API Endpoints

### GET /api/advocates
Fetches advocates with optional search parameter:
```typescript
// Example search query
GET /api/advocates?search=anxiety new york

// Response format
{
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "city": "New York",
      "degree": "MD",
      "specialties": ["Anxiety", "Depression"],
      "yearsOfExperience": 10,
      "phoneNumber": "5551234567"
    }
  ]
}
```

### POST /api/seed
Seeds the database with sample advocate data:
```bash
curl -X POST http://localhost:3000/api/seed
```

## Manual Development Setup

If you prefer to run components individually:

1. Install dependencies:
```bash
pnpm install
```

2. Start the database:
```bash
docker compose up db -d
```

3. Run migrations:
```bash
pnpm migrate:up
```

4. Seed the database:
```bash
curl -X POST http://localhost:3000/api/seed
```

5. Start the development server:
```bash
pnpm dev
```

## Environment Variables

Create a `.env` file with:
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/solaceassignment
```

## Project Structure
```
/src
  /app
    /api
      /advocates    # Search API endpoints
      /seed        # Database seeding
    /components    # React components
  /db
    /seed         # Seed data
    schema.ts     # Database schema
    migrate.ts    # Migration logic
/drizzle          # Migration files
```

## Available Scripts

```json
{
  "scripts": {
    "dev": "concurrently \"pnpm run build:watch\" \"next dev\"",
    "build": "next build && tsc --project tsconfig.server.json",
    "migrate:up": "tsx ./src/db/migrate.ts",
    "generate": "drizzle-kit generate",
    "seed": "node dist/db/seed/advocates.js"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT