import React, { useState, useEffect } from "react";
import "../Styles/Header.css";
import { Link, useHistory } from "react-router-dom";
import { selectBasket, getBasketTotalItems } from "../features/appSlice"
import { useSelector } from "react-redux";
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai';
import { MdShoppingCart } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { selectUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
	const [activeInput, setActiveInput] = useState(false);
	const user = useSelector(selectUser);

	const basket = useSelector(selectBasket);
	const history = useHistory();

	const setInput = (e) => {
		const input = document.querySelector(".header__search input");
		if (input === document.activeElement) {
			setActiveInput(true);
		} else {
			setActiveInput(false);
		}
	}

	const signOutUser = () => {
		if (user) {
			signOut(auth);
			history.push("/");
		}
	}

	useEffect(() => {
		window.addEventListener("click", () => {
			setInput();
		})
	}, [])

	return (
		<div className="header">
			<Link to="/">
				<img
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt=""
					className="header__logo"
				/>
			</Link>

			<div className="header__mobile">
				<Link to="/">
					<img
						src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
						alt=""
						className="header__logo__mobile"
					/>
				</Link>
				<div className="header__mobile__top">

					{
						user ? (
							<div className="header__mobile__top__signOut"  onClick={signOutUser}>
								<BsFillPersonFill style={{fontSize: "30px"}}/>
								<div>
									<div> { user.displayName } </div>
									<p> Sign out </p>
								</div>
							</div>

						) : (
							<Link to="/signin">
								<div className="header__mobile__top__signIn">
									<div> Sign In <AiOutlineRight /> </div>
									<BsFillPersonFill style={{fontSize: "30px"}}/>
								</div>
							</Link>
						)

					}
					<div className="header__option header__cart">
						<div className="header__cart__container">
							<div className="header__cartItemCount"> { getBasketTotalItems(basket) } </div>
							<Link to="basket">
							<MdShoppingCart style={{fontSize: "33px"}}/>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className={activeInput ? "header__search header__activeSearch" : "header__search"}>
				<select
					style={{borderRadius: activeInput ? "0" : "5px 0px 0px 5px"}}
				>
					<option> All </option>
					<option> Electronics </option>
					<option> Automotive </option>
					<option> Baby </option>
					<option> Computers </option>
					<option> Movies & TV </option>
				</select>

				<input type="text" onFocus={setInput} placeholder="Search Amazon" />
				
				<button 
					style={{borderRadius: activeInput ? "0" : "0 5px 5px 0"}}
				>
					{/* <SearchOutlinedIcon style={{fontSize: "34px"}} /> */}
					<AiOutlineSearch style={{fontSize: "25px"}} />
				</button>
			</div>

			<div className="header__options">
				<Link to={!user && "/signIn"} onClick={signOutUser}>
					<div className="header__option">
						<p> Hello, { user ? user.displayName : <span> Guest </span> } </p>
						<div> { user ? "Sign out" : "Sign in" } </div>
					</div>
				</Link>

				<Link to={user ? "/orders" : "/signin"}>
					<div className="header__option">
						<p> Returns </p>
						<div> & Orders </div>
					</div>
				</Link>

				<Link to="/basket">
					<div className="header__option header__cart">
						<div className="header__cart__container">
							<div className="header__cartItemCount"> { getBasketTotalItems(basket) } </div>
							<MdShoppingCart style={{fontSize: "33px"}} />
						</div>
						<div> Cart </div>
					</div>
				</Link>
			</div>

			<div className="header__mobile__options">
				<div onClick={() => history.push(user ? "/orders" : "/signin")}> Returns & Orders </div>
				<div> Best sellers </div>
				<div> Video </div>
				<div> Livestream </div>
				<div> New Releases </div>
				<div> Home </div>
				<div> Pharmacy </div>
				<div> Books </div>
				<div> Gift Cards </div>				
				<div> Health & Household </div>
				<div> Deals </div>
			</div>
		</div>
	)
}

export default Header;