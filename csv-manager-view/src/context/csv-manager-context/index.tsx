import React, { createContext, useContext, useState, useEffect } from 'react';
import { CsvContextProps, UploadCSVResponse } from '../../@types';
import { uploadCSVToServer } from '../../constants/serverFunctions';

export const CsvContext = createContext<CsvContextProps | undefined>(undefined);

export const CsvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [editedData, setEditedData] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [newColumnName, setNewColumnName] = useState<string>('');

  useEffect(() => {
    setEditedData(csvData);
  }, [csvData]);

  const handleEditChange = (rowIndex: number, columnKey: string, value: string) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][columnKey] = value;
    setEditedData(updatedData);
  };

  const handleUploadCSVToSever = async () => {
    const response: UploadCSVResponse = await uploadCSVToServer(editedData);
    if (response.status) {
      setMessage(response.message);
    }
  };

  const addRow = () => {
    if (editedData.length === 0) return;
    const newRow = Object.keys(editedData[0]).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, string>);
    setEditedData([...editedData, newRow]);
  };

  const addColumn = () => {
    if (!newColumnName.trim()) {
      alert('Please enter a valid column name.');
      return;
    }
    const newColumnKey = newColumnName.trim();
    const updatedData = editedData.map(row => ({ ...row, [newColumnKey]: '' }));
    setEditedData(updatedData);
    setNewColumnName('');
  };

  const deleteRow = (rowIndex: number) => {
    const updatedData = editedData.filter((_, index) => index !== rowIndex);
    setEditedData(updatedData);
  };

  const deleteColumn = (columnKey: string) => {
    const updatedData = editedData.map(row => {
      const { [columnKey]: _, ...rest } = row;
      return rest;
    });
    setEditedData(updatedData);
  };

  return (
    <CsvContext.Provider
      value={{
        csvData,
        editedData,
        message,
        newColumnName,
        setCsvData,
        setEditedData,
        setMessage,
        setNewColumnName,
        handleEditChange,
        handleUploadCSVToSever,
        addRow,
        addColumn,
        deleteRow,
        deleteColumn,
      }}
    >
      {children}
    </CsvContext.Provider>
  );
};

export const useCsvContext = () => {
  const context = useContext(CsvContext);
  if (!context) {
    throw new Error('useCsvContext must be used within a CsvProvider');
  }
  return context;
};
