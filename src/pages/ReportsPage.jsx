import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ReportList from '../components/Reports/ReportList';
import { reportService } from '../services/reportService';
import { categoryService } from '../services/categoryService';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    format: 'csv',
    categoryName: '',
    minPrice: '',
    maxPrice: '',
    startDate: '',
    endDate: ''
  });
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    fetchReports();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentJob && currentJob.status !== 'completed' && currentJob.status !== 'failed') {
      const interval = setInterval(() => {
        pollJobStatus(currentJob.jobId);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentJob]);

  const fetchReports = async () => {
    try {
      const response = await reportService.getAllJobs();
      const data = Array.isArray(response) ? response : (response.data || []);
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllList();
      const data = Array.isArray(response) ? response : (response.data || []);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const pollJobStatus = async (jobId) => {
    try {
      const status = await reportService.getJobStatus(jobId);
      setCurrentJob({ ...status, jobId: jobId });
      
      if (status.status === 'completed' || status.status === 'failed') {
        setGenerating(false);
        fetchReports();
      }
    } catch (error) {
      console.error('Error polling job status:', error);
      setGenerating(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setGenerating(true);
      const params = {
        format: formData.format,
        ...(formData.categoryName && { categoryName: formData.categoryName }),
        ...(formData.minPrice && { minPrice: parseFloat(formData.minPrice) }),
        ...(formData.maxPrice && { maxPrice: parseFloat(formData.maxPrice) }),
        ...(formData.startDate && { startDate: formData.startDate }),
        ...(formData.endDate && { endDate: formData.endDate })
      };

      const response = await reportService.generate(params);
      if (response.jobId) {
        setCurrentJob({ jobId: response.jobId, status: 'processing' });
        pollJobStatus(response.jobId);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error generating report:', error);
      alert(error.response?.data?.message || 'Failed to generate report');
      setGenerating(false);
    }
  };

  const handleDownload = async (jobId) => {
    try {
      await reportService.download(jobId);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert(error.response?.data?.message || 'Failed to download report');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reports</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Generate Report
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Generate Report</h2>
            <form onSubmit={handleGenerate}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Format</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="csv">CSV</option>
                    <option value="xlsx">XLSX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Category (Optional)</label>
                  <select
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Min Price (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.minPrice}
                    onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Max Price (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.maxPrice}
                    onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Start Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">End Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={generating}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {generating ? 'Generating...' : 'Generate Report'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {currentJob && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Current Job Status</h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{' '}
                <span className={`capitalize ${
                  currentJob.status === 'completed' ? 'text-green-600' :
                  currentJob.status === 'failed' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {currentJob.status}
                </span>
              </p>
              {currentJob.status === 'completed' && (
                <button
                  onClick={() => handleDownload(currentJob.jobId)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-2"
                >
                  Download Report
                </button>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <ReportList
            reports={reports}
            onDownload={handleDownload}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ReportsPage;
