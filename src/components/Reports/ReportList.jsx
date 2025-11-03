import React from 'react';

const ReportList = ({ reports, onView, onDownload }) => {
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No reports found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{report.name}</h3>
              <p className="text-gray-600 mt-2">{report.description}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span>Type: {report.type}</span>
                <span>Created: {new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onView(report)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => onDownload(report.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;

