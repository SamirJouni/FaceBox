import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = props => {
	return (
		<div className="flex justify-center items-center center mt4 ma">
			<div className="relative">
				<img
					id="providedImage"
					src={props.linkToImage}
					alt=""
					width="500px"
					height="auto"
				/>
				<div
					className="bounding-box"
					style={{
						top: props.boundingBox.top,
						left: props.boundingBox.left,
						right: props.boundingBox.right,
						bottom: props.boundingBox.bottom
					}}
				/>
			</div>
		</div>
	);
};

export default FaceRecognition;
