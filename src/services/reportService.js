import api from './api';

export const reportService = {
  getAll: async () => {
    const response = await api.get('/reports');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  generate: async (type, params = {}) => {
    const response = await api.post('/reports/generate', { type, ...params });
    return response.data;
  },

  download: async (id) => {
    const response = await api.get(`/reports/${id}/download`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `report-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

