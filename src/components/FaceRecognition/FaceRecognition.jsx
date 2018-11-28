import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = props => {
	return (
		<div className="flex justify-center items-center mt4 ma">
			<img
				id="providedImage"
				src={props.linkToImage}
				alt=""
				width="500px"
				height="auto"
			/>
			<div className="bounding-box"></div>
		</div>
	);
};

export default FaceRecognition;
