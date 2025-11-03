import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BulkUploadForm from "../components/BulkUpload/BulkUploadForm";
import { bulkUploadService } from "../services/bulkUploadService";

const BulkUploadPage = () => {
  const [jobStatus, setJobStatus] = useState(null);
  const [polling, setPolling] = useState(false);

  const pollJobStatus = async (jobId) => {
    try {
      const status = await bulkUploadService.getJobStatus(jobId);
      setJobStatus(status);

      if (status.status === "completed" || status.status === "failed") {
        setPolling(false);
        return;
      }

      // Continue polling if job is still processing
      setTimeout(() => pollJobStatus(jobId), 2000);
    } catch (error) {
      console.error("Error polling job status:", error);
      setPolling(false);
    }
  };

  const handleUpload = async (file) => {
    try {
      setJobStatus(null);
      const response = await bulkUploadService.uploadFile(file);
      const jobId = response.jobId;

      if (jobId) {
        setPolling(true);
        pollJobStatus(jobId);
      } else {
        alert("Upload initiated! Job ID not returned.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(error.response?.data?.message || "Failed to upload file");
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Bulk Upload Products</h1>
        <div className="max-w-2xl mb-6">
          <BulkUploadForm onUpload={handleUpload} />
        </div>

        {jobStatus && (
          <div className="max-w-2xl bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Upload Status</h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`capitalize ${
                    jobStatus.status === "completed"
                      ? "text-green-600"
                      : jobStatus.status === "failed"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {jobStatus.status}
                </span>
              </p>
              {jobStatus.progress && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{jobStatus.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${jobStatus.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {jobStatus.message && (
                <p className="text-sm text-gray-600">{jobStatus.message}</p>
              )}
              {jobStatus.status === "completed" && jobStatus.result && (
                <div className="mt-4 p-4 bg-green-50 rounded">
                  <p className="text-sm">
                    <span className="font-semibold">Success:</span>{" "}
                    {jobStatus.result.success || 0} products uploaded
                  </p>
                  {jobStatus.result.errors &&
                    jobStatus.result.errors.length > 0 && (
                      <p className="text-sm text-red-600 mt-2">
                        <span className="font-semibold">Errors:</span>{" "}
                        {jobStatus.result.errors.length} rows failed
                      </p>
                    )}
                </div>
              )}
              {jobStatus.status === "failed" && jobStatus.error && (
                <div className="mt-4 p-4 bg-red-50 rounded">
                  <p className="text-sm text-red-600">{jobStatus.error}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BulkUploadPage;
