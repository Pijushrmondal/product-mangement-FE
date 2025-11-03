import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
    }
    if (response.data.user?.id) {
      localStorage.setItem('userId', response.data.user.id);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
    }
    if (response.data.user?.id) {
      localStorage.setItem('userId', response.data.user.id);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

