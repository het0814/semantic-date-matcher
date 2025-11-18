import { MapPin } from 'lucide-react';
import type { Match } from '@/lib/types';

interface MatchCardProps {
  match: Match;
  onClick: (match: Match) => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  return (
    <div
      onClick={() => onClick(match)}
      className="relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{match.name}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {match.age} • {match.location}
            </p>
          </div>
          <div className="bg-gradient-to-r from-pink-300/80 to-blue-300/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/40">
            {Math.round((match.similarity || match.score || 0) * 100)}%
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {match.about}
        </p>
      </div>
    </div>
  );
}
