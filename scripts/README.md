# Scripts

Deployment, CI/CD, and utility scripts for the Career Guidance Platform.

## Available Scripts

### Deployment
- `deploy-staging.sh` - Deploy to staging environment
- `deploy-production.sh` - Deploy to production environment

### Database
- `backup-db.sh` - Backup databases
- `restore-db.sh` - Restore databases from backup

### CI/CD
- `build-all.sh` - Build all services
- `test-all.sh` - Run all tests
- `lint-all.sh` - Lint all code

### Utilities
- `seed-demo-data.sh` - Seed database with demo data
- `clean-cache.sh` - Clean all caches

## Usage

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run a script
./scripts/deploy-staging.sh
```
