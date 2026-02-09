import React, { useState, useEffect } from "react";
import { generatePDF, checkResumeOverflow } from "../utils/pdfGenerator";

const ResumeCustomizer = () => {
  const [showOverflowWarning, setShowOverflowWarning] = useState(false);

  useEffect(() => {
    // Check for overflow when component mounts
    const hasOverflow = checkResumeOverflow();
    setShowOverflowWarning(hasOverflow);
  }, []);

  const handleDownloadPDF = () => {
    const hasOverflow = checkResumeOverflow();
    if (hasOverflow) {
      setShowOverflowWarning(true);
      // Auto-hide warning after 5 seconds
      setTimeout(() => setShowOverflowWarning(false), 5000);
    }
    generatePDF();
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Customizer</h3>
      
      {showOverflowWarning && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Content Overflow Warning</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  The resume content may exceed the single page limit. Consider reducing some details 
                  or bullet points for optimal formatting. The PDF will still be generated but may not 
                  fit perfectly on one page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Configuration</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Single-page format optimized</li>
            <li>• Monospace font for better readability</li>
            <li>• Compact spacing and layout</li>
            <li>• Technical skills moved to top</li>
            <li>• Key projects in 2-column layout</li>
          </ul>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="w-full bg-stone-900 text-stone-50 px-6 py-3 text-sm uppercase tracking-wider font-medium hover:bg-stone-800 transition-all duration-200 rounded-md"
        >
          Download Single-Page Resume
        </button>

        <div className="text-xs text-gray-500 text-center">
          Resume will be generated as a single-page PDF with optimized formatting
        </div>
      </div>
    </div>
  );
};

export default ResumeCustomizer;
