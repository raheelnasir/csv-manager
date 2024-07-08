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
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};
