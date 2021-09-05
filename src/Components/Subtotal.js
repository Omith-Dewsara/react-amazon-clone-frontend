import React from "react";
import "../Styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { selectBasket, getBasketTotalValue, getBasketTotalItems } from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Subtotal() {
	const basket = useSelector(selectBasket);
	const user = useSelector(selectUser);

	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={value => (
					<>
						<h2> Subtotal ({ getBasketTotalItems(basket) } items): <strong> { value } </strong> </h2>
						<div>
							<input id="gift" type="checkbox" />
							<label for="gift"> This order contains a gift </label>
						</div>
						<Link to={ user ? "/checkout" : "/signin" }> <button disabled={!basket.length}> Proceed to checkout </button> </Link>
					</>
				)}
				thousandSeparator={true}
				prefix={"$"}
				displayType={"text"}
				value={getBasketTotalValue(basket)}
				decimalScale={2}
			/>
		</div>
	)
}

export default Subtotal;