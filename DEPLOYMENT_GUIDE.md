# 🚀 CampusCabs Deployment Guide for Vercel

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas** - Cloud database (free tier available)
3. **Google OAuth Credentials** - For Google login
4. **GitHub Repository** - Your code should be on GitHub

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password
5. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

## Step 2: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Add your production domains to authorized origins:
   - `https://your-frontend-domain.vercel.app`
   - `https://your-backend-domain.vercel.app`
3. Add redirect URIs:
   - `https://your-frontend-domain.vercel.app`
   - `https://your-frontend-domain.vercel.app/`

## Step 3: Deploy Backend First

### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to backend
cd Backend

# Deploy
vercel

# Follow the prompts:
# - Link to existing project: No
# - Project name: campuscabs-backend
# - Directory: ./
# - Override settings: No
```

### Option B: Deploy via GitHub
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set root directory to `Backend`
6. Add environment variables in Vercel dashboard

### Environment Variables for Backend
Add these in Vercel dashboard:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A random secret string
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `NODE_ENV`: production

## Step 4: Deploy Frontend

### Option A: Deploy via Vercel CLI
```bash
# Navigate to frontend
cd Frontend

# Deploy
vercel

# Follow the prompts:
# - Link to existing project: No
# - Project name: campuscabs-frontend
# - Directory: ./
# - Override settings: No
```

### Option B: Deploy via GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set root directory to `Frontend`
5. Add environment variables

### Environment Variables for Frontend
Add these in Vercel dashboard:
- `VITE_BACKEND_URL`: Your backend Vercel URL (e.g., https://campuscabs-backend.vercel.app)
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

## Step 5: Update Configuration Files

### Update Frontend vercel.json
Replace `your-backend-url.vercel.app` with your actual backend URL:
```json
{
  "env": {
    "VITE_BACKEND_URL": "https://your-actual-backend-url.vercel.app"
  }
}
```

### Update Backend CORS
In `Backend/index.js`, replace the frontend URL:
```javascript
origin: process.env.NODE_ENV === 'production' 
  ? ['https://your-actual-frontend-url.vercel.app', 'https://your-actual-frontend-url.vercel.app/']
  : 'http://localhost:5173',
```

## Step 6: Test Your Deployment

1. **Test Backend**: Visit your backend URL + `/api/auth/guest`
2. **Test Frontend**: Visit your frontend URL
3. **Test Google Login**: Try logging in with Google
4. **Test Guest Login**: Try the guest login feature

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your frontend URL is in the backend CORS configuration
2. **MongoDB Connection**: Check your MongoDB Atlas connection string and IP whitelist
3. **Google OAuth**: Ensure your production domains are added to Google Cloud Console
4. **Environment Variables**: Double-check all environment variables are set in Vercel

### Debug Steps:
1. Check Vercel function logs
2. Check browser console for errors
3. Verify environment variables are loaded
4. Test API endpoints directly

## Final Notes

- Your app will be available at: `https://your-frontend-domain.vercel.app`
- Backend API at: `https://your-backend-domain.vercel.app`
- Both will auto-deploy when you push to GitHub
- You can set up custom domains in Vercel dashboard

## Security Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] JWT secret is strong and unique
- [ ] Google OAuth domains updated
- [ ] Environment variables are secure
- [ ] CORS properly configured
- [ ] No sensitive data in code

🎉 **Your CampusCabs app is now live on Vercel!** 