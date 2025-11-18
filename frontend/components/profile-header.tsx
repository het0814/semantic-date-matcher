'use client';

import Link from 'next/link';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProfileHeader() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Vibe Match
        </Link>
        <nav className="flex items-center gap-4">
          <Link 
            href="/matches" 
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Matches
          </Link>
          {userId && (
            <Link 
              href={`/profile/${userId}`}
              className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-white/80 px-4 py-2 rounded-full text-gray-700 hover:bg-white/70 transition-all"
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
