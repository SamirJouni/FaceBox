import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageForm from "./components/ImageForm/ImageForm";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<Logo />
				<ImageForm />
			</div>
		);
	}
}

export default App;
