'use client';

import { signOut, useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1f1e1d] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1f1e1d] text-white">
        <p>No active session.</p>
      </div>
    );
  }

  const username = session.user.name || session.user.username || 'User';
  const email = session.user.email || 'No email available';

  return (
    <div className="min-h-screen bg-[#1f1e1d] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-[#262624] p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div>
          <p className="text-sm text-zinc-400">Username</p>
          <p className="text-base">{username}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Email</p>
          <p className="text-base break-all">{email}</p>
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full rounded-lg bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
