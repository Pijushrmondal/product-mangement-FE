import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BulkUploadForm from '../components/BulkUpload/BulkUploadForm';
import { bulkUploadService } from '../services/bulkUploadService';

const BulkUploadPage = () => {
  const handleUpload = async (file) => {
    try {
      await bulkUploadService.uploadProducts(file);
      alert('Products uploaded successfully!');
    } catch (error) {
      console.error('Error uploading products:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Bulk Upload Products</h1>
        <div className="max-w-2xl">
          <BulkUploadForm onUpload={handleUpload} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BulkUploadPage;

