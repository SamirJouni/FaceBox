import React from "react";

const Navigation = ({ isSignedin, onRouteChange }) => {
	if (isSignedin) {
		return (
			<nav style={{ display: "flex", justifyContent: "flex-end" }}>
				<p
					className="f3 link dim black underline pa3 pointer"
					onClick={() => onRouteChange("signin")}
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<div className='flex flex-row justify-end'>
				<nav style={{ display: "flex", justifyContent: "flex-end" }}>
					<p
						className="f3 link dim black underline pa3 pointer"
						onClick={() => onRouteChange("signin")}
					>
						Sign In
					</p>
				</nav>
				<nav style={{ display: "flex", justifyContent: "flex-end" }}>
					<p
						className="f3 link dim black underline pa3 pointer"
						onClick={() => onRouteChange("signup")}
					>
						Sign Up
					</p>
				</nav>
			</div>
		);
	}
};

export default Navigation;
