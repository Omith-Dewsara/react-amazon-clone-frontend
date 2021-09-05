import React, { useState } from "react";
import "../Styles/HomeImgSlider.css";
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

function HomeImgSlider() {
	let [currentScroll, setCurrentScroll] = useState(0);

	const scrollLeft = () => {
		const imgContainer = document.querySelector(".homeImgSlider__container");
		if (currentScroll === 0) {
			setCurrentScroll(imgContainer.clientWidth * 5)
			imgContainer.scrollTo(imgContainer.clientWidth * 5, 0)
		} else {
			setCurrentScroll(currentScroll -= imgContainer.clientWidth)
			imgContainer.scrollTo(currentScroll, 0)
		}
	}

	const scrollRight = () => {
		const imgContainer = document.querySelector(".homeImgSlider__container");
		if (currentScroll === imgContainer.clientWidth * 5) {
			setCurrentScroll(0)
			imgContainer.scrollTo(0, 0)
		} else {
			setCurrentScroll(currentScroll += imgContainer.clientWidth)
			imgContainer.scrollTo(currentScroll, 0)
		}
	}


	return (
		<div className="homeImgSlider">
			<button className="homeImgSlider__scrollLeftButton" onClick={scrollLeft}>
				<BsChevronLeft />
			</button>

			<div className="homeImgSlider__container">
				<img
					src="https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg"
					alt=""
				/>
				<img
					src="https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg"
					alt=""
				/>
				<img
					src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg"
					alt=""
				/>
				<img
					src="https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg"
					alt=""
				/>
				<img 
					src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
					alt=""
				/>
			</div>

			<button className="homeImgSlider__scrollRightButton" onClick={scrollRight}>
				<BsChevronRight />
			</button>
		</div>
	)
}

export default HomeImgSlider;