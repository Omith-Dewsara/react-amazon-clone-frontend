import React from "react";
import FooterSectionOne from "./FooterSectionOne";
import FooterSectionTwo from "./FooterSectionTwo";
import FooterSectionThree from "./FooterSectionThree";
import FooterSectionFour from "./FooterSectionFour";
import "../Styles/Footer.css";

function Footer() {

	const scrollToTop = () => {
		window.scrollTo({
			top: 0
		});
	}

	return (
		<div className="footer">
			<div className="footer__backToTop" onClick={scrollToTop}> Back to top </div>
			<FooterSectionOne />
			<FooterSectionTwo />
			<FooterSectionThree />
			<FooterSectionFour />
		</div>
	)
}

export default Footer;