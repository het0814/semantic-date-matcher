import { MapPin } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-blue-100/20 to-purple-100/20 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {profile.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {profile.age} • {profile.gender} • {profile.location}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-600 leading-relaxed">{profile.about}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              What I'm Looking For
            </h3>
            <p className="text-gray-600 leading-relaxed">{profile.looking_for}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests?.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-pink-200/60 to-blue-200/60 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-white/50"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
