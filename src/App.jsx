import React, { Component } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
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
			boundingBox: {},
			route: "signin",
			isSignedin: false
		};
	}
	componentDidMount() {
			fetch('http://localhost:3000/')
			.then(res => res.json())
			.then(console.log)
	}

	findFaceLocation = data => {
		const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("providedImage");
		const width = Number(image.width);
		const height = Number(image.height);

		const boundingBox = {
			left: faceBox.left_col * width,
			top: faceBox.top_row * height,
			right: width - faceBox.right_col * width,
			bottom: height - faceBox.bottom_row * height
		};
		this.setState({ boundingBox });
	};

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

	handleRouteChange = (route) => {
		if(route === 'home') {
			this.setState({isSignedin: true})
		} else if (route === 'signout') {
			this.setState({isSignedin: false})
		}
		this.setState({route});
	}

	render() {
		return (
			<div>
				<Navigation isSignedin={this.state.isSignedin} onRouteChange={this.handleRouteChange}/>
				{ this.state.route === 'home' ?
					<React.Fragment>
						<Logo />
						<Rank />
						<ImageForm
							onLinkInput={this.handleLinkInput}
							linkToImage={this.state.linkToImage}
							onSubmit={this.onSubmit}
						/>
						<FaceRecognition
							boundingBox={this.state.boundingBox}
							linkToImage={this.state.linkToImage}
						/>
					</React.Fragment> :
					(
						this.state.route === 'signin' ?
						<SignIn onRouteChange={this.handleRouteChange}/>
						: <SignUp onRouteChange={this.handleRouteChange}/>
					)
				}
			</div>
		);
	}
}

export default App;
