import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ReportList from '../components/Reports/ReportList';
import { reportService } from '../services/reportService';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await reportService.getAll();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (report) => {
    // TODO: Implement view report functionality
    console.log('View report:', report);
  };

  const handleDownload = async (reportId) => {
    try {
      await reportService.download(reportId);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ReportList
            reports={reports}
            onView={handleView}
            onDownload={handleDownload}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ReportsPage;

