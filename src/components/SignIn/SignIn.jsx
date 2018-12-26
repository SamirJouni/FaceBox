import React, { Component } from "react";

class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: ""
		};
	}

	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};
	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};
	handleSubmit = () => {
		fetch("http://localhost:3000/signin", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(res => res.json())
		.then( data => {
			if (data === 'signedin') {
				this.props.onRouteChange("home");
			}
		});
	};
	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center flex justify-center items-center">
				<main className="pa4 black-80">
					<div className="measure flex justify-center items-center flex-column">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									value={this.state.email}
									onChange={this.handleEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									value={this.state.password}
									onChange={this.handlePasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="signin"
								onClick={this.handleSubmit}
							/>
						</div>
						<div className="lh-copy mt3">
							<p
								className="f6 link dim black db pointer"
								onClick={() => onRouteChange("signup")}
							>
								Sign Up
							</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default SignIn;
