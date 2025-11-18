import { X, MapPin } from 'lucide-react';
import type { Match } from '@/lib/types';

interface MatchModalProps {
  match: Match | null;
  onClose: () => void;
}

export function MatchModal({ match, onClose }: MatchModalProps) {
  if (!match) return null;

  console.log('[v0] Match modal opened with data:', match);

  return (
    <div
      className="fixed inset-0 bg-pink-200/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white/50 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-blue-100/30 to-purple-100/30 rounded-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {match.name}
              </h3>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {match.age} • {match.gender} • {match.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-gradient-to-r from-pink-300/80 to-blue-300/80 backdrop-blur-sm text-white px-4 py-2 rounded-full inline-block border border-white/40">
              {Math.round((match.similarity || match.score || 0) * 100)}% Match
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">About</h4>
              <p className="text-gray-600 leading-relaxed">
                {match.about || 'No about information available'}
              </p>
            </div>

            {match.looking_for && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Looking For
                </h4>
                <p className="text-gray-600 leading-relaxed">{match.looking_for}</p>
              </div>
            )}

            {match.interests && match.interests.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {match.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-pink-200/60 to-blue-200/60 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-white/50"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
