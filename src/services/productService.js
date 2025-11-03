import api from './api';

export const productService = {
  getAll: async (params = {}) => {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      categoryName,
      sortByPrice,
      ...rest
    } = params;
    
    const queryParams = {
      page,
      limit,
      ...(search && { search }),
      ...(categoryId && { categoryId }),
      ...(categoryName && { categoryName }),
      ...(sortByPrice && { sortByPrice }),
      ...rest
    };

    const response = await api.get('/products', { params: queryParams });
    return response.data;
  },

  getByCategory: async (categoryId, page = 1, limit = 10) => {
    const response = await api.get(`/products/category/${categoryId}`, {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  createWithImage: async (formData) => {
    const response = await api.post('/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
  },

  updateWithImage: async (id, formData) => {
    const response = await api.patch(`/products/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  getCount: async () => {
    const response = await api.get('/products/count/total');
    return response.data;
  }
};

