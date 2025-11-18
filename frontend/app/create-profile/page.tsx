'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function CreateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    about: '',
    looking_for: '',
    interests: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileData = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        location: formData.location,
        about: formData.about,
        looking_for: formData.looking_for,
        interests: formData.interests
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
      };
      const result = await api.createProfile(profileData);
      const userId = result.user_id || result.id || result.userId || result._id;
      localStorage.setItem('userId', userId);
      router.push(`/profile/${userId}`);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors inline-block"
        >
          ← Back
        </Link>
        <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-blue-100/20 to-purple-100/20 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Your Profile
            </h2>
            <p className="text-gray-600 mb-8">Tell us about yourself</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50 outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 outline-none transition"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 outline-none transition"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:border-purple-300 focus:ring-2 focus:ring-purple-200/50 outline-none transition"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About Me
                </label>
                <textarea
                  name="about"
                  required
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50 outline-none transition resize-none"
                  placeholder="Tell us about yourself (at least 10 characters)..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What I'm Looking For
                </label>
                <textarea
                  name="looking_for"
                  required
                  value={formData.looking_for}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 outline-none transition resize-none"
                  placeholder="Describe your ideal match (at least 10 characters)..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interests
                </label>
                <input
                  type="text"
                  name="interests"
                  required
                  value={formData.interests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:border-purple-300 focus:ring-2 focus:ring-purple-200/50 outline-none transition"
                  placeholder="hiking, coffee, books (comma-separated)"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full bg-white/50 backdrop-blur-xl border border-white/80 text-gray-700 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/40 via-blue-200/40 to-purple-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                    <span className="relative z-10">Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Create Profile</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
