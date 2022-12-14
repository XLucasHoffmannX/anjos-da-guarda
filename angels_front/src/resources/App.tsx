import React from 'react';
import RouteBrowser from '../routes/RouteBrowser';

/* styles */
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataProvider from '../context/DataProvider';
import Notify from './components/Notify/Notify';
import Modals from './components/Modals/Modals';

function App() {
	
	return (
		<div className='container_app'>
			<DataProvider>
				<Modals />
				<Notify />
				<RouteBrowser />
			</DataProvider>
		</div>
	);
}

export default App;
