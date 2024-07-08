import React from 'react';
import './App.css';
import { CSVManager } from './pages/csv-manager';
import { CsvProvider } from './context';

function App() {
  return (
    <CsvProvider>
      <main>
        <CSVManager />
      </main>
    </CsvProvider>
  );
}

export default App;
