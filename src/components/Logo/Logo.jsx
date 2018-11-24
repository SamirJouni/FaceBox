import React from "react";
import Tilt from "react-tilt";
import './Logo.css';
import Icon from './Icon.png';

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt
				className="Tilt br2 shadow-2 flex items-center justify-center"
				options={{ max: 55 }}
				style={{ height: 150, width: 150 }}
			>
				<div className="Tilt-inner flex"><img src={Icon} alt="Icon of the website."/></div>
			</Tilt>
		</div>
	);
};

export default Logo;
