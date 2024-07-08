import React from 'react';
import { CSVLink } from 'react-csv';
import { useCsvContext } from '../../custom-hooks/use-csv-manager';

export const CsvEditor: React.FC = () => {
  const {
    editedData,
    message,
    newColumnName,
    setNewColumnName,
    handleEditChange,
    handleUploadCSVToSever,
    addRow,
    addColumn,
    deleteRow,
    deleteColumn,
  } = useCsvContext();

  if (editedData.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(editedData[0]).map((key) => ({ label: key, key }));

  return (
    <div className="p-4">
      <div className="flex space-x-4 my-2 justify-end">
        <button
          onClick={handleUploadCSVToSever}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
        <CSVLink
          data={editedData}
          headers={headers}
          filename="edited_data.csv"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download CSV
        </CSVLink>
        <button
          onClick={addRow}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Row
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            placeholder="Column Name"
            className="border p-2 rounded"
          />
          <button
            onClick={addColumn}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Column
          </button>
        </div>
      </div>
      {message && <p className="text-amber-500">{message}</p>}

      <table className="w-full mb-4 table-auto">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(editedData[0]).map((key) => (
              <th key={key} className="border p-2 relative">
                {key}
                <button
                  onClick={() => deleteColumn(key)}
                  className="absolute right-0 top-0 bg-red-500 text-white p-1 rounded-bl"
                >
                  X
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {editedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key) => (
                <td key={key} className="border p-2">
                  <input
                    type="text"
                    value={row[key]}
                    onChange={(e) => handleEditChange(rowIndex, key, e.target.value)}
                    className="bg-white border w-[150px] rounded px-3 py-1"
                  />
                </td>
              ))}
              <td>
                <button
                  onClick={() => deleteRow(rowIndex)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete Row
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
