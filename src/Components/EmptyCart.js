import React from "react";
import "../Styles/EmptyCart.css";
import emptyCartImg from "../assets/empty-cart.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function EmptyCart() {
	const user = useSelector(selectUser);

	return (
		<div className="emptyCart">
			<div className="emptyCart__left">
				<img 
					src={emptyCartImg}
					alt=""
					className="basket__emptyImg"
				/>
			</div>
			<div className="emptyCart__right">
				<h1> Your Amazon Cart is empty </h1>
				<Link to="/"> <div> Shop now </div> </Link>
				{
					user ? <> </> : (
						<div className="emptyCart__right__buttons">
							<Link to="/signin">
								<button className="emptyCart__right__buttons__signIn__button"> 	
									Sign in to your account 
								</button>
							</Link>
							<Link to="/signup">
								<button className="emptyCart__right__buttons__signUp__button"> 
									Sign up now 
								</button>
							</Link>
						</div>
					)
				}
			</div>	
		</div>
	)
}

export default EmptyCart;