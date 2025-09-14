'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";

// Custom hook to fetch user data from our API
function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/me', {
        cache: 'no-store' // Prevent caching to get fresh data
      });
      const data = await response.json();
      setUser(data.user);
      setError(data.error);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, isLoading, error, refetch: fetchUser };
}

export default function Dashboard() {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  // Debug logging for dashboard
  useEffect(() => {
    console.log('=== DASHBOARD DEBUG ===');
    console.log('User:', user);
    console.log('IsLoading:', isLoading);
    console.log('Error:', error);
    console.log('========================');
  }, [user, isLoading, error]);

  useEffect(() => {
    if (!isLoading && !user) {
      console.log('Dashboard: No user found, redirecting to home');
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  // If no user, redirect will happen via useEffect
  if (!user) return null;

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                {/* {user?.picture && (
                  <Image
                    src={user.picture}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )} */}
                <span className="text-gray-700">Hello, {user?.name || 'User'}!</span>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/api/auth/logout"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to your Expense Tracker!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Total Expenses</h3>
              <p className="text-2xl font-bold text-blue-600">$0.00</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">This Month</h3>
              <p className="text-2xl font-bold text-green-600">$0.00</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Categories</h3>
              <p className="text-2xl font-bold text-purple-600">0</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">User Profile</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> {user?.email || 'Not available'}</p>
              <p><strong>Name:</strong> {user?.name || 'Not available'}</p>
              <p><strong>Last Login:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 