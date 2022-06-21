import React from 'react';
import RouteBrowser from '../routes/RouteBrowser';

/* styles */
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataProvider from '../context/DataProvider';


function App() {
  return (
    <DataProvider>
      <RouteBrowser />
    </DataProvider>
  );
}

export default App;
