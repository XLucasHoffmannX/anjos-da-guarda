import React from 'react';
import RouteBrowser from '../routes/RouteBrowser';

/* styles */
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataProvider from '../context/DataProvider';
import Notify from './components/Notify/Notify';

function App() {
  return (
    <div className='container_app'>
      <DataProvider>
        <Notify />
        <RouteBrowser />
      </DataProvider>
    </div>
  );
}

export default App;
