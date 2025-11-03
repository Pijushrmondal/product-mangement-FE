import api from './api';

export const bulkUploadService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getJobStatus: async (jobId) => {
    const response = await api.get(`/bulk-upload/status/${jobId}`);
    return response.data;
  },

  getAllJobs: async () => {
    const response = await api.get('/bulk-upload/jobs');
    return response.data;
  }
};

