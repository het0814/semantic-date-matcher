'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ProfileCard } from '@/components/profile-card';
import { ProfileHeader } from '@/components/profile-header';
import type { Profile } from '@/lib/types';

export default function ViewProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile(userId);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-400 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Profile not found</p>
          <Link
            href="/"
            className="text-pink-500 hover:text-pink-700 font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfileHeader />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 py-12 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors inline-block"
          >
            ← Back
          </Link>
          <ProfileCard profile={profile} />
        </div>
      </div>
    </>
  );
}
