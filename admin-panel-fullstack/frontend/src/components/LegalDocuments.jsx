import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";

const LegalDocuments = ({ docs }) => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handlePreview = (fileUrl) => {
    setSelectedPdf(fileUrl);
  };

  return (
    <div className="p-4">
      {/* List of documents */}
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-4">Legal Documents</h1>
        <div className="space-y-4">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className="p-4 border rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{doc.title}</h2>
                <p className="text-gray-600">{doc.description}</p>
              </div>
              <button
                onClick={() => handlePreview(doc.fileName || doc.fileUrl)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer */}
      {selectedPdf && (
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">PDF Preview</h2>
          <Document
            file={selectedPdf}
            onLoadError={(error) =>
              console.error("Error while loading PDF:", error)
            }
            className="overflow-auto"
          >
            {/* Render the first 5 pages of the PDF */}
            {[1, 2, 3, 4, 5].map((pageNumber) => (
              <Page
                key={pageNumber}
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mb-4"
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default LegalDocuments;
