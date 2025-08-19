# KeyBank - Secure API Key Management System

A comprehensive full-stack application for securely storing, organizing, and managing API keys with enterprise-grade encryption and authentication.

## 🚀 Features

### Core Functionality
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **AES-256 Encryption**: Industry-standard encryption for API key storage
- **Category Organization**: Organize keys by service type (Payment, Cloud, etc.)
- **Search & Filter**: Find keys quickly with advanced filtering
- **Copy-to-Clipboard**: Secure one-click copying with visual feedback
- **Audit Trail**: Track when keys were last accessed

### Security Features
- Rate limiting to prevent brute force attacks
- Input validation and sanitization
- CORS protection
- Helmet.js security headers
- Environment-based configuration
- Soft delete for data recovery
- No logging of sensitive data

### User Experience
- Clean, responsive design
- Real-time search and filtering
- Visual category indicators
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Mobile-optimized interface

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **crypto** for AES-256 encryption
- **express-validator** for input validation
- **express-rate-limit** for API protection

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons
- **Context API** for state management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (connection string provided)

### Quick Start

1. **Clone and Install**
   ```bash
   # Dependencies are already installed via the artifact
   ```

2. **Environment Configuration**
   - The `.env` file is already configured with your MongoDB connection
   - **IMPORTANT**: Change the `JWT_SECRET` and `ENCRYPTION_KEY` in production

3. **Start the Application**
   ```bash
   npm run dev
   ```

   This starts both the backend server (port 3001) and frontend (port 5173)

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api

## 🗃️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### ApiKeys Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  description: String,
  category: String (enum),
  service: String,
  encryptedKey: String,
  iv: String,
  isActive: Boolean,
  lastUsed: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Implementation

### Encryption
- **Algorithm**: AES-256-CBC
- **Key Derivation**: scrypt with salt
- **IV Generation**: Crypto-secure random bytes
- **Storage**: Encrypted key and IV stored separately

### Authentication
- **Password Hashing**: bcrypt with 12 rounds
- **JWT Tokens**: 24-hour expiry
- **Token Validation**: Middleware on protected routes
- **Session Management**: Client-side token storage

### API Security
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Configured for development/production
- **Headers**: Security headers via Helmet.js

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### API Key Management
- `GET /api/keys` - List user's API keys
- `GET /api/keys/:id` - Get specific key (decrypted)
- `POST /api/keys` - Create new API key
- `PUT /api/keys/:id` - Update key metadata
- `DELETE /api/keys/:id` - Soft delete key
- `GET /api/keys/stats/categories` - Get category statistics

## 🎨 UI Components

### Pages
- **Login/Register**: Authentication forms with validation
- **Dashboard**: Main interface with sidebar and key list
- **Header**: Navigation and user menu

### Components
- **ApiKeyList**: Displays keys with actions
- **AddApiKey**: Modal form for creating keys
- **AuthContext**: Global authentication state

## 🚀 Deployment

### Environment Variables for Production
```bash
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret-key
ENCRYPTION_KEY=your-32-character-encryption-key
NODE_ENV=production
PORT=3001
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 🔧 Configuration

### Categories
Available API key categories:
- Payment
- Social Media
- Cloud Services
- Analytics
- Email
- SMS
- Database
- Other

### Rate Limits
- General API: 100 requests/15 minutes
- Configurable per endpoint

## 🛡️ Security Best Practices

1. **Never log actual API key values**
2. **Use HTTPS in production**
3. **Regularly rotate JWT secrets**
4. **Monitor for unusual access patterns**
5. **Backup encrypted data securely**
6. **Validate all inputs server-side**
7. **Use environment variables for secrets**

## 📊 Features Roadmap

- [ ] Two-factor authentication
- [ ] API key expiration dates
- [ ] Team collaboration features
- [ ] Export/import functionality
- [ ] Advanced audit logs
- [ ] API usage analytics
- [ ] Key rotation reminders

## 🤝 Contributing

1. Follow existing code style and patterns
2. Add tests for new features
3. Update documentation
4. Ensure security best practices

## 📄 License

Private project - All rights reserved.

---

**Note**: This application handles sensitive data. Ensure proper security measures are in place before deploying to production.