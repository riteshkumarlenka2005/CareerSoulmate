# Server

Backend API for the Career Guidance Platform.

## Structure

- `src/config/` - Database, authentication, and cloud configuration
- `src/controllers/` - Route logic for authentication, quiz, colleges, ML proxy
- `src/routes/` - REST API route definitions
- `src/middlewares/` - Authentication, error handling, request logging
- `src/models/` - Database models (PostgreSQL, MongoDB, etc.)
- `src/services/` - Business logic (quiz scoring, SMS alerts, job data)
- `src/utils/` - Helper functions (pagination, filters, etc.)
- `src/workers/` - Background jobs (data sync, ML retrain, reminders)
- `tests/unit/` - Unit tests
- `tests/integration/` - Integration tests

## Setup

```bash
npm install
npm run dev
```

## API Documentation

Coming soon...
