import React from "react";
import "../Styles/MainCategories.css";

function MainCategories({ title, linkName, image, images }) {
	return (
		<div className={images ? "mainCategories mainCategories__desktop" : "mainCategories"}>
			<h2> { title } </h2>
			{
				images ? (
					<div className="mainCategories__imagesContainer">
						{
							images.map(image => (
								<img src={image.image} alt="" />
							))
						}
					</div>
				) : (
					<img 
						src={image}
						alt=""
					/>
				)
			}
			<div> { linkName } </div>
		</div>
	)
}

export default MainCategories;