# Shared

Shared assets and utilities used across the platform.

## Structure

- `constants/` - Enums, magic numbers, label maps
- `types/` - TypeScript/JavaScript or Python type interfaces
- `templates/` - Notification templates (SMS, email)
- `language/` - JSON language files for multilingual chatbot

## Usage

### Constants
```javascript
import { USER_ROLES, NOTIFICATION_TYPES } from '@shared/constants';
```

### Types
```typescript
import type { User, Career, College } from '@shared/types';
```

### Templates
```javascript
import { emailTemplates } from '@shared/templates';
```
