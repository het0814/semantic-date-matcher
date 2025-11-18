'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { MatchCard } from '@/components/match-card';
import { MatchModal } from '@/components/match-modal';
import { ProfileHeader } from '@/components/profile-header';
import type { Match } from '@/lib/types';

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please create a profile first');
        router.push('/create-profile');
        return;
      }

      try {
        const data = await api.getMatches(userId);
        console.log('[v0] Fetched matches data:', data);
        const matchesArray = data.matches || data || [];
        console.log('[v0] Matches array:', matchesArray);
        if (matchesArray.length > 0) {
          console.log('[v0] First match sample:', matchesArray[0]);
        }
        setMatches(matchesArray);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-pink-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Finding your matches...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfileHeader />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 py-12 px-4 pt-24">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors inline-block"
          >
            ← Back
          </Link>

          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Matches
          </h2>

          {matches.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
              <p className="text-gray-600">No matches found yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match, idx) => (
                <MatchCard key={idx} match={match} onClick={setSelectedMatch} />
              ))}
            </div>
          )}
        </div>

        <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      </div>
    </>
  );
}
