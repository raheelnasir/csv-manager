import React from 'react';
import Papa from 'papaparse';
import { useCsvContext } from '../../custom-hooks/use-csv-manager';

export const CsvFileUploader: React.FC = () => {
  const { setCsvData } = useCsvContext();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
        },
        header: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <label htmlFor="file-upload" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50">
        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 3a2 2 0 012-2h8a2 2 0 012 2v6h2V3a4 4 0 00-4-4H6a4 4 0 00-4 4v14a4 4 0 004 4h8a4 4 0 004-4v-6h-2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V3z" clip-rule="evenodd"></path>
          <path fill-rule="evenodd" d="M10 15a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clip-rule="evenodd"></path>
          <path fill-rule="evenodd" d="M7 10a1 1 0 011-1h3a1 1 0 110 2H8a1 1 0 01-1-1z" clip-rule="evenodd"></path>
        </svg>
        <span className="mt-2 text-sm text-gray-600">Click to upload a CSV file</span>
        <input id="file-upload" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
      </label>
    </div>

  );
};
