import React from 'react';

const ReportList = ({ reports, onDownload }) => {
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No reports found</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'processing':
      case 'pending':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.jobId || report.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Report {report.jobId || report.id}
                </h3>
                <span className={`text-sm font-semibold capitalize ${getStatusColor(report.status)}`}>
                  {report.status || 'Unknown'}
                </span>
              </div>
              {report.format && (
                <p className="text-gray-600 mb-2">
                  Format: <span className="font-semibold uppercase">{report.format}</span>
                </p>
              )}
              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                {report.createdAt && (
                  <span>
                    Created: {new Date(report.createdAt).toLocaleString()}
                  </span>
                )}
                {report.updatedAt && (
                  <span>
                    Updated: {new Date(report.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>
              {report.error && (
                <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-600">
                  {report.error}
                </div>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              {report.status === 'completed' && (
                <button
                  onClick={() => onDownload(report.jobId || report.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Download
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
