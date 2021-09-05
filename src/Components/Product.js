import React from "react";
import "../Styles/Product.css";
import { addToBasket } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { MdStar } from 'react-icons/md';
import { useHistory } from "react-router-dom";

function Product({ image, name, price, rating, id }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const addToCart = () => {
		dispatch(addToBasket({
			image,
			name,
			price,
			rating,
			id,
			items: 1,
			totalPrice: price
		}))
	}

	const buyNow = () => {
		dispatch(addToBasket({
			image,
			name,
			price,
			rating,
			id,
			items: 1,
			totalPrice: price
		}))
		history.push("/basket");
	}

	return (
		<div className="product">
			<img 
				src={image}
				alt=""
			/>
			<div className="product__info">
				<p> { name } </p>
				<div className="product__rating"> 
					{
						Array(rating).fill().map((_, i) => (
							<MdStar style={{color: "#FFA41C", fontSize: "20px"}} />
						))
					}

				</div>
				<div className="product__price"> ${price} </div>
				<div className="product__info__buttons">
					<button 
						className="product__info__buttons__addToBasketButton"
						onClick={addToCart}
					> 
						Add to basket 
					</button>
					<button 
						className="product__info__buttons__butNowButton"
						onClick={buyNow}
					>
						Buy now
					</button>
				</div>
			</div>
		</div>
	)
}

export default Product;