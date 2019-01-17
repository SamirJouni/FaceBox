import React, { Component } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageForm from "./components/ImageForm/ImageForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";


const initialState = {
	linkToImage: "",
	boundingBox: {},
	route: "signin",
	isSignedin: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: ""
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			linkToImage: "",
			boundingBox: {},
			route: "signin",
			isSignedin: false,
			user: {
				id: "",
				name: "",
				email: "",
				entries: 0,
				joined: ""
			}
		};
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
		fetch("http://localhost:3000/imageurl", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				linkToImage: this.state.linkToImage
			})
		}).then(res => res.json())
			.then(res => {
				if (res) {
					fetch("http://localhost:3000/image", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(res => res.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, {entries: count}));
						})
						.catch(console.log);
				}
				this.findFaceLocation(res);
			})
			.catch(err => console.log(err));
	};

	handleRouteChange = route => {
		if (route === "home") {
			this.setState({ isSignedin: true });
		} else if (route === "signout") {
			this.setState(initialState);
		}
		this.setState({ route });
	};

	loadUser = data => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		});
	};

	render() {
		return (
			<div>
				<Navigation
					isSignedin={this.state.isSignedin}
					onRouteChange={this.handleRouteChange}
				/>
				{this.state.route === "home" ? (
					<React.Fragment>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImageForm
							onLinkInput={this.handleLinkInput}
							linkToImage={this.state.linkToImage}
							onSubmit={this.onSubmit}
						/>
						<FaceRecognition
							boundingBox={this.state.boundingBox}
							linkToImage={this.state.linkToImage}
						/>
					</React.Fragment>
				) : this.state.route === "signin" ? (
					<SignIn
						loadUser={this.loadUser}
						onRouteChange={this.handleRouteChange}
					/>
				) : (
					<SignUp
						onRouteChange={this.handleRouteChange}
						loadUser={this.loadUser}
					/>
				)}
			</div>
		);
	}
}

export default App;
