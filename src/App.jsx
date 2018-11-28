import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageForm from "./components/ImageForm/ImageForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";
import "./App.css";

const app = new Clarifai.App({
	apiKey: "ae065545ab8b471193bc116abcab07b2"
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			linkToImage: "",
			boundingBox: {}
		};
	}

	findFaceLocation = data => {};
	handleLinkInput = e => {
		this.setState({ linkToImage: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.linkToImage)
			.then(res => {
				this.findFaceLocation(res);
			})
			.catch(err => console.log(err));
	};
	render() {
		return (
			<div>
				<Navigation />
				<Logo />
				<Rank />
				<ImageForm
					onLinkInput={this.handleLinkInput}
					linkToImage={this.state.linkToImage}
					onSubmit={this.onSubmit}
				/>
				<FaceRecognition linkToImage={this.state.linkToImage} />
			</div>
		);
	}
}

export default App;
