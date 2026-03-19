# Docker Configuration

Docker configuration files for the Career Guidance Platform.

## Structure

- `nginx/` - NGINX configuration for frontend/backend proxy
- `postgres/` - PostgreSQL init scripts and backups
- `mongo/` - MongoDB configuration
- `docker-compose.yml` - Full-stack services orchestration

## Quick Start

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build
```

## Services

- Frontend (client) - Port 3000
- Backend API (server) - Port 5000
- ML Recommender - Port 8001
- ML Dropout Predictor - Port 8002
- PostgreSQL - Port 5432
- MongoDB - Port 27017
- NGINX - Port 80

## Development

For development with hot reload:
```bash
docker-compose -f docker-compose.dev.yml up
```
