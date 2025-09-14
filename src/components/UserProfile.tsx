'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { LogoutButton } from './LogoutButton';

export default function UserProfile() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">Hello, {user.name}!</span>
      <LogoutButton />
    </div>
  );
} 