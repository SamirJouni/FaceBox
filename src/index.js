import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "tachyons";
import * as serviceWorker from './serviceWorker';
import Particles from "react-particles-js";
const particlesParams = {
	particles: {
			number: {
				value: 80,
				density: {
					enable: true,
					value_area: 800
				}
			}
		}
};
ReactDOM.render(
	<React.Fragment>
		<Particles params={particlesParams} className="particles"/>
		<App />
	</React.Fragment>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
