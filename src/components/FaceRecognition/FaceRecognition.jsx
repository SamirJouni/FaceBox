import React from "react";

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
		</div>
	);
};

export default FaceRecognition;
