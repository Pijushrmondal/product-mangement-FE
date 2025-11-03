import api from './api';

export const reportService = {
  generate: async (params = {}) => {
    const response = await api.post('/reports/generate', params);
    return response.data;
  },

  getJobStatus: async (jobId) => {
    const response = await api.get(`/reports/status/${jobId}`);
    return response.data;
  },

  getAllJobs: async () => {
    const response = await api.get('/reports/jobs');
    return response.data;
  },

  download: async (jobId) => {
    const response = await api.get(`/reports/download/${jobId}`, {
      responseType: 'blob'
    });
    
    // Determine file extension from content type or default to csv
    const contentType = response.headers['content-type'];
    let extension = 'csv';
    if (contentType?.includes('xlsx') || contentType?.includes('spreadsheet')) {
      extension = 'xlsx';
    } else if (contentType?.includes('csv')) {
      extension = 'csv';
    }
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `report-${jobId}.${extension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
};

