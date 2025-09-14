import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Extract the auth action from the URL path
  const authAction = pathname.split('/').pop();

  
  try {
    switch (authAction) {
      case 'login':
        // Manual redirect to Auth0 login
        const loginUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?` + 
          `response_type=code&` +
          `client_id=${process.env.AUTH0_CLIENT_ID}&` +
          `redirect_uri=${encodeURIComponent(`${process.env.APP_BASE_URL}/api/auth/callback`)}&` +
          `scope=openid profile email&` +
          `state=${Math.random().toString(36)}`;
        return NextResponse.redirect(loginUrl);
      
      case 'logout':
        // Clear the session cookie and redirect to Auth0 logout URL
        const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(process.env.APP_BASE_URL || 'http://localhost:3000')}`;
        const logoutResponse = NextResponse.redirect(logoutUrl);
        
        // Clear the session cookie
        logoutResponse.cookies.set('auth0_session', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 0,
          path: '/'
        });
        
        console.log('Session cookie cleared, redirecting to Auth0 logout');
        return logoutResponse;
      
      case 'callback':
        // Handle the callback from Auth0
        try {
          const code = url.searchParams.get('code');
          const error = url.searchParams.get('error');
          
          if (error) {
            console.log('Auth0 callback error:', error);
            return NextResponse.redirect(`${process.env.APP_BASE_URL}?error=${error}`);
          }
          
          if (!code) {
            console.log('No authorization code in callback');
            return NextResponse.redirect(`${process.env.APP_BASE_URL}?error=missing_code`);
          }
          
          // Exchange authorization code for tokens
          const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              client_id: process.env.AUTH0_CLIENT_ID,
              client_secret: process.env.AUTH0_CLIENT_SECRET,
              code: code,
              redirect_uri: `${process.env.APP_BASE_URL}/api/auth/callback`,
            }),
          });
          
          if (!tokenResponse.ok) {
            throw new Error(`Token exchange failed: ${tokenResponse.status}`);
          }
          
          const tokens = await tokenResponse.json();
          console.log('Tokens received:', { 
            hasAccessToken: !!tokens.access_token,
            hasIdToken: !!tokens.id_token 
          });
          
          // Get user info from Auth0
          const userResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`,
            },
          });
          
          if (!userResponse.ok) {
            throw new Error(`User info fetch failed: ${userResponse.status}`);
          }
          
          const user = await userResponse.json();
          console.log('User data received:', { email: user.email, name: user.name });
          
          // Create session (simplified - in production use encrypted cookies)
          const sessionData = {
            user: user,
            accessToken: tokens.access_token,
            idToken: tokens.id_token,
            expiresAt: Date.now() + (tokens.expires_in * 1000),
          };
          
          // Set session cookie and redirect to dashboard
          const callbackResponse = NextResponse.redirect(`${process.env.APP_BASE_URL}/dashboard`);
          
          // Store session data as JSON without URL encoding (NextResponse handles encoding)
          callbackResponse.cookies.set('auth0_session', JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: tokens.expires_in || 3600,
            path: '/'
          });
          
          console.log('Session cookie set, redirecting to dashboard');
          return callbackResponse;
          
        } catch (error) {
          console.error('Callback error:', error);
          return NextResponse.redirect(`${process.env.APP_BASE_URL}?error=callback_failed`);
        }
      
      case 'me':
        // Return user profile information from session cookie
        try {
          const cookieHeader = request.headers.get('cookie');
          console.log('Cookies received:', cookieHeader);
          
          if (!cookieHeader) {
            return NextResponse.json({ 
              user: null, 
              isLoading: false, 
              error: null 
            });
          }
          
          // Parse cookies to find auth0_session
          const cookies = cookieHeader.split(';').map(c => c.trim());
          const sessionCookie = cookies.find(cookie => cookie.startsWith('auth0_session='));
          console.log('Session cookie found:', !!sessionCookie);
          
          if (!sessionCookie) {
            return NextResponse.json({ 
              user: null, 
              isLoading: false, 
              error: null 
            });
          }
          
          // Extract cookie value and handle different encoding scenarios
          const cookieValue = sessionCookie.split('=')[1];
          let sessionData;
          
          console.log('Raw cookie value:', cookieValue.substring(0, 50) + '...');
          
          try {
            // Try parsing directly first (if NextResponse handled encoding properly)
            sessionData = JSON.parse(cookieValue);
            console.log('Direct JSON parse successful');
          } catch (firstError) {
            try {
              // If direct parsing fails, try URL decoding first
              const decodedValue = decodeURIComponent(cookieValue);
              sessionData = JSON.parse(decodedValue);
              console.log('URL decoded JSON parse successful');
            } catch (secondError) {
              console.error('Both parsing attempts failed:', { firstError, secondError });
              throw new Error('Failed to parse session cookie');
            }
          }
          
          console.log('Session data parsed successfully, user:', sessionData.user?.email);
          
          // Check if session is expired
          if (Date.now() > sessionData.expiresAt) {
            console.log('Session expired');
            return NextResponse.json({ 
              user: null, 
              isLoading: false, 
              error: 'Session expired' 
            });
          }
          
          return NextResponse.json({ 
            user: sessionData.user, 
            isLoading: false, 
            error: null 
          });
          
        } catch (error) {
          console.error('Profile error:', error);
          return NextResponse.json({ 
            user: null, 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      
      default:
        return new NextResponse('Not Found', { status: 404 });
    }
  } catch (error) {
    console.error('Auth route error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 