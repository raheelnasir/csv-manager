import React from 'react';
import { CsvEditor, CsvFileUploader } from '../../components';
import { useCsvContext } from '../../custom-hooks/use-csv-manager';

export const CSVManager: React.FC = () => {
  const { csvData } = useCsvContext();

  return (
    <div className="min-h-screen sm:py-12">
      <div className="relative">
        <div className="relative shadow-lg sm:rounded-3xl">
          <h1 className="text-3xl font-extrabold text-center mb-6">CSV Editor</h1>
          {!csvData.length ? (
            <CsvFileUploader />
          ) : (
            <CsvEditor />
          )}
        </div>
      </div>
    </div>
  );
};
