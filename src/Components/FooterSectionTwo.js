import React from "react";
import "../Styles/FooterSectionTwo.css";
import { FaGlobe } from "react-icons/fa";

function FooterSectionTwo() {
	return (
		<div className="footerSectionTwo">
			<img 
				src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
				alt=""
				className="footerSectionTwo__amazonLogo"
			/>

			<div>
				<button> <FaGlobe style={{marginRight: "10px"}}/> English </button>
				<button> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg" alt="" />Canada </button>
			</div>

		</div>
	)
}

export default FooterSectionTwo;