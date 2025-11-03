import api from './api';

export const categoryService = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/categories', {
      params: { page, limit }
    });
    return response.data;
  },

  getAllList: async () => {
    const response = await api.get('/categories/all/list');
    return response.data;
  },

  search: async (query, page = 1, limit = 10) => {
    const response = await api.get('/categories/search', {
      params: { query, page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  getCount: async () => {
    const response = await api.get('/categories/count/total');
    return response.data;
  }
};

