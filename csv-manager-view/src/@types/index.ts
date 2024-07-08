export interface CsvFileUploaderProps {
    setCsvData: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface CsvEditorProps {
    csvData: any[];
    setCsvData: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface UploadCSVResponse {
    data: any;
    status: boolean;
    message: string;

}


export interface CsvContextProps {
    csvData: any[];
    editedData: any[];
    message: string;
    newColumnName: string;
    setCsvData: (data: any[]) => void;
    setEditedData: (data: any[]) => void;
    setMessage: (msg: string) => void;
    setNewColumnName: (name: string) => void;
    handleEditChange: (rowIndex: number, columnKey: string, value: string) => void;
    handleUploadCSVToSever: () => void;
    addRow: () => void;
    addColumn: () => void;
    deleteRow: (rowIndex: number) => void;
    deleteColumn: (columnKey: string) => void;
  }