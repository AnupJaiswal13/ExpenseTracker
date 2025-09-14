'use client';

export const LoginButton = () => {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a className="button__login" href="/api/auth/login">
      Log In
    </a>
  );
}; 