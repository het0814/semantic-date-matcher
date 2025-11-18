const API_BASE_URL = 'http://localhost:8000';

export const api = {
  createProfile: async (data: {
    name: string;
    age: number;
    gender: string;
    location: string;
    about: string;
    looking_for: string;
    interests: string[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getProfile: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`);
    return response.json();
  },

  getMatches: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/match/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },
};
