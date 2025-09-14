'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* App Icon */}
          <div className="mx-auto h-16 w-16 bg-black rounded-2xl flex items-center justify-center mb-8">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>

          {/* Welcome Text */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600 text-lg mb-8">
            Sign in to your expense tracker account
          </p>
        </div>

        {/* Sign In Button */}
        <div className="space-y-6">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/auth/login"
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
          >
            <span className="flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </span>
          </a>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-black hover:underline font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-black hover:underline font-medium">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Support Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            New to our platform?{' '}
            <a href="/support" className="text-black hover:underline font-medium">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 