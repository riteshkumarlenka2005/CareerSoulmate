# Database

Database migrations, seeders, and schemas for the Career Guidance Platform.

## Structure

- `migrations/` - Versioned database migration files
- `seeders/` - Initial seed data (AISHE, NSQF, NCS mock data)
- `schemas/` - SQL or ORM-based models
  - `postgres/` - PostgreSQL schemas
  - `mongo/` - MongoDB schemas
  - `graph/` - Neo4j graph database schemas

## Setup

### PostgreSQL
```bash
# Run migrations
npm run migrate

# Seed database
npm run seed
```

### MongoDB
```bash
# Run seeders
npm run seed:mongo
```

## Migration Commands

```bash
# Create new migration
npm run migrate:create migration_name

# Run migrations
npm run migrate:up

# Rollback migrations
npm run migrate:down
```
