import React from "react";
import "../Styles/BasketItem.css";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { addToBasket, removeOneItem, removeItem } from "../features/appSlice";

function BasketItem({ image, name, price, items, id, ordered }) {
	const dispatch = useDispatch();
	
	const addItem = () => {
		dispatch(addToBasket({
			id
		}))
	}

	const removeSignleItem = () => {
		dispatch(removeOneItem({
			id
		}))
	}

	const removeTheItem = () => {
		dispatch(removeItem({
			id
		}))
	}

	return (
		<div className="basketItem">
			<div className="basketItem__left">
				<img 
					src={image}
					alt=""
				/>
			</div>
			<div className="basketItem__right">
				<div className="basketItem__right__info">
					<div className="basketItem__name"> { name } </div>
					<div className="basketItem__price"> ${ price } </div>
					
					{	
						ordered ? (
							<div className="basketItem__orderedQty"> Qty: { items } </div>
						) : (
							<div className="basketItem__qty">
								<p> Qty: </p>
								<div>
									<button 
										className="basketItem__remove"
										onClick={removeSignleItem}
									> 
										<AiOutlineMinus />
									</button>

									<div> { items } </div>
									<button 
										className="basketItem__add"
										onClick={addItem}
									> 
										<AiOutlinePlus />
									</button>
								</div>
							</div>
						)
					}
				</div>
				{
					ordered ? (
						<> </>
					) : (
						<button onClick={removeTheItem}> Remove from basket </button>
					)
				}
			</div>
		</div>
	)
}

export default BasketItem;