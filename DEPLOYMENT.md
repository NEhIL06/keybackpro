# Vercel Deployment Guide

## Prerequisites
1. Make sure you have a Vercel account
2. Install Vercel CLI: `npm i -g vercel`
3. Ensure your MongoDB database is accessible from external connections

## Step 1: Environment Variables Setup

In your Vercel dashboard, go to your project settings and add these environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
ENCRYPTION_KEY=your-32-character-encryption-key-here
NODE_ENV=production
```

Note: `ENCRYPTION_KEY` must be exactly the same as the one used when encrypting your existing keys locally. If it differs, decryption will fail and you won't be able to view/copy keys.

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: Using GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push

## Step 3: Verify Deployment

1. Check your API health endpoint: `https://yourdomain.vercel.app/api/health`
2. Test your authentication endpoints
3. Verify the frontend is working

## Common Issues & Solutions

### Issue: Server not responding
- **Solution**: Check that your `vercel.json` is properly configured
- **Solution**: Ensure environment variables are set correctly

### Issue: MongoDB connection failed
- **Solution**: Verify your MongoDB URI is correct and accessible
- **Solution**: Check if your MongoDB cluster allows external connections

### Issue: Build fails
- **Solution**: Ensure all dependencies are in `package.json`
- **Solution**: Check that the `vercel-build` script works locally

## Project Structure for Vercel

```
├── server/           # Backend API (serverless functions)
├── src/             # Frontend React code
├── dist/            # Built frontend (generated)
├── vercel.json      # Vercel configuration
└── package.json     # Dependencies and scripts
```

## API Endpoints

Your API will be available at:
- `https://yourdomain.vercel.app/api/auth/*`
- `https://yourdomain.vercel.app/api/keys/*`
- `https://yourdomain.vercel.app/api/health`

## Frontend

Your React app will be served from the root domain and will handle client-side routing automatically. 