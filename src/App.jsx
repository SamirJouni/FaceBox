import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageForm from "./components/ImageForm/ImageForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";
import "./App.css";

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
const app = new Clarifai.App({
	apiKey: 'ae065545ab8b471193bc116abcab07b2'
})
class App extends Component {
	constructor () {
		super();
		this.state = {
			linkToImage: ''
		}
	}

	handleLinkInput = e => {
		this.setState({linkToImage: e.target.value});
	}

	onSubmit = e => {
		e.preventDefault();
		app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
	}

	render() {
		return (
			<div>
				<Particles params={particlesParams} className="particles"/>
				<Navigation />
				<Logo />
				<Rank />
				<ImageForm onLinkInput={this.handleLinkInput} linkToImage={this.state.linkToImage} onSubmit={this.onSubmit}/>
				<FaceRecognition />
			</div>
		);
	}
}

export default App;
