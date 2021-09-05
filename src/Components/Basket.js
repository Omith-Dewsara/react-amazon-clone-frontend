import React from "react";
import "../Styles/Basket.css";
import BasketItem from "./BasketItem";
import EmptyCart from "./EmptyCart";
import Subtotal from "./Subtotal";
import { selectBasket } from "../features/appSlice";
import { useSelector } from "react-redux";

function Basket() {
	const basket = useSelector(selectBasket);

	return (
		<div className="basket">
			{
				basket.length === 0 ? <EmptyCart /> : (
					<div className="basket__items">
						<h1> Shopping Cart </h1>
						{
							basket?.map((item) => (
								<BasketItem 
									image={item.image}
									name={item.name}
									price={item.price}							
									items={item.items}
									id={item.id}
								/>
							))
						}
					</div>
				)	
			}

			<Subtotal />
			
		</div>
	)
}

export default Basket;