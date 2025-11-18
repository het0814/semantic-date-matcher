import { Heart, User, Search } from 'lucide-react';
import Link from 'next/link';

export function HomeHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <Link href="/profile/me">
          <button className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            <User className="w-6 h-6 text-gray-700 relative z-10" />
          </button>
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto flex-1 flex flex-col justify-center">
        <div className="mb-8 inline-block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <Heart className="w-20 h-20 text-pink-400 mx-auto mb-4 animate-pulse relative z-10" />
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
          Find Your Vibe Match
        </h1>
        <p className="text-xl text-gray-500 mb-12 font-light">
          Connect with people who resonate with your energy
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create-profile">
            <button className="relative bg-white/40 backdrop-blur-xl border border-white/60 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <User className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Create Profile</span>
            </button>
          </Link>
          <Link href="/matches">
            <button className="relative bg-white/40 backdrop-blur-xl border border-white/60 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Search className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Find Matches</span>
            </button>
          </Link>
        </div>
      </div>
      
      <div className="w-full text-center pb-6">
        <p className="text-gray-500 text-sm font-light">
          Powered by Moorcheh AI
        </p>
      </div>
    </div>
  );
}
