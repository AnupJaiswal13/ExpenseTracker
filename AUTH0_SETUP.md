# Auth0 Setup for Expense Tracker

This project uses Auth0 for authentication. Follow these steps to set up Auth0 for your application.

## Prerequisites

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new application in your Auth0 dashboard

## Configuration

### 1. Auth0 Dashboard Setup

1. Go to your Auth0 Dashboard
2. Navigate to Applications → Applications
3. Click "Create Application"
4. Choose "Regular Web Applications"
5. Select "Next.js" as the technology

### 2. Application Settings

Configure the following in your Auth0 application settings:

**Allowed Callback URLs:**
```
http://localhost:3000/api/auth/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000
```

**Allowed Web Origins:**
```
http://localhost:3000
```

### 3. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
AUTH0_SECRET=your-long-random-secret-here
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
```

**Where to find these values:**
- `AUTH0_SECRET`: Generate a long random string (use `openssl rand -hex 32`)
- `AUTH0_BASE_URL`: Your application URL (http://localhost:3000 for development)
- `AUTH0_ISSUER_BASE_URL`: Your Auth0 domain (found in Application Settings)
- `AUTH0_CLIENT_ID`: Found in Application Settings → Basic Information
- `AUTH0_CLIENT_SECRET`: Found in Application Settings → Basic Information

## Features Implemented

- ✅ Login/Logout functionality
- ✅ Protected routes
- ✅ User profile display
- ✅ Session management
- ✅ Responsive UI with Tailwind CSS

## Usage

### Login/Logout
- Users can log in by clicking the "Login" button
- After authentication, users will be redirected back to the application
- Users can log out by clicking the "Logout" button

### User Information
- User profile information is displayed when logged in
- Includes user name, email, and profile picture
- User session is automatically managed

## Components

- `LoginButton`: Reusable login button component
- `LogoutButton`: Reusable logout button component  
- `UserProfile`: Displays user information and logout option

## API Routes

- `/api/auth/[...auth0]`: Handles all Auth0 authentication routes
  - `/api/auth/login`: Initiates login flow
  - `/api/auth/logout`: Handles logout
  - `/api/auth/callback`: Handles Auth0 callback
  - `/api/auth/me`: Returns user information

## Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`

3. Start the development server:
```bash
npm run dev
```

4. Navigate to `http://localhost:3000`

## Production Deployment

When deploying to production:

1. Update `AUTH0_BASE_URL` to your production domain
2. Update the Allowed Callback URLs, Logout URLs, and Web Origins in your Auth0 dashboard
3. Ensure all environment variables are set in your hosting platform

## Troubleshooting

- **"Invalid state" error**: Check that your `AUTH0_SECRET` is set and is a long random string
- **Callback URL mismatch**: Verify that your callback URLs match exactly in Auth0 dashboard and `.env.local`
- **CORS issues**: Ensure your domain is added to Allowed Web Origins in Auth0 dashboard 