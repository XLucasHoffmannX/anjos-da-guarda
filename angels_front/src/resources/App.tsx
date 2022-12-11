import React from 'react';
import RouteBrowser from '../routes/RouteBrowser';

/* styles */
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataProvider from '../context/DataProvider';
import Notify from './components/Notify/Notify';
import Modals from './components/Modals/Modals';

function App() {
	let alarmTime:any = '11:51 AM';

	console.log(alarmTime);

	setInterval(() => {
		let date = new Date(),
			h:any = date.getHours(),
			m:any = date.getMinutes(),
			ampm:any = "AM";
		if (h >= 12) {
			h = h - 12;
			ampm = "PM";
		}

		h = h === 0 ? h = 12 : h;
		h = h < 10 ? "0" + h : h;
		m = m < 10 ? "0" + m : m;

		if (alarmTime === `${h}:${m} ${ampm}`) {
			console.log('alarme');
		}
	});

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
