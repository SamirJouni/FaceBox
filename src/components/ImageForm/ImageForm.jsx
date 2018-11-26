import React from 'react';
import "./ImageForm.css";

const ImageForm = ({onLinkInput, linkToImage, onSubmit}) => {
	return (
		<div className="flex justify-center items-center flex-column">
			<p className="f3">Show it an image and whitness the magic. Give it a try !</p>
			<div className="flex justify-center pa4 br3 shadow-5 form">
				<input type="text" className="f4 pa2 w-70 center" onChange={onLinkInput} value={linkToImage}/>
				<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
			</div>
		</div>
	 );
}

export default ImageForm;