import React, { useState, useEffect } from "react";
import "../Styles/Checkout.css";	
import { useSelector } from "react-redux";
import { getBasketTotalValue, selectBasket } from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../axios";
import CurrencyFormat from "react-currency-format";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function Checkout() {

	const basket = useSelector(selectBasket);
	const user = useSelector(selectUser); 
	const history = useHistory()

	const [error, setError] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [proccessing, setProccessing] = useState(false);
	const [confirmPayment, setConfirmPayment] = useState(false);

	const stripe = useStripe();
	const elements = useElements();

	const handleChange = (e) => {
		console.log(e);
		setConfirmPayment(true);
		setError("");
		if (e.error.message) {
		setConfirmPayment(true);
			setError(e.error.message);
			setConfirmPayment(false);
		} else {
			setError("")
			setConfirmPayment(true);
		}
	}

	console.log(error)

	useEffect(() => {
		const getClientSecret = async () => {
			// const response = await axios({
			// 	method: 'post',
			// 	url: `http://localhost:5000/payment/create?total=${getBasketTotalValue(basket) * 100}`
			// })
			axios.post(`/payment/create?total=${getBasketTotalValue(basket) * 100}`).then(response => {
				console.log('Hello world');
				setClientSecret(response.data.clientSecret);
			})
		}

		getClientSecret();
	}, [basket])

	//info about the order
	const [country, setCountry] = useState("Canada");
	const [fullName, setFullName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [addressLineOne, setAddressLineOne] = useState('');
	const [addressLineTwo, setAddressLineTwo] = useState('');
	const [postalCode, setPostalCode] = useState('');

	//Error variables
	const [countryError, setCountryError] = useState('');
	const [fullNameError, setFullNameError] = useState('');
	const [phoneNumberError, setPhoneNumberError] = useState('');
	const [addressError, setAddressError] = useState('');
	const [postalCodeError, setPostalCodeError] = useState('');

	

	const handlePayment = async () => {
		console.log("Hello world")
		if (fullName.length === 0) {
			setFullNameError("Please enter your full name (First name and last name)");
			if (phoneNumber.length) {
				setPhoneNumberError("")
			}
			if (addressLineOne.length) {
				setAddressError("")
			}
			if (postalCode.length) {
				setPostalCodeError("")
			}
			if (country.length) {
				setCountryError("")
			}
		} else if (phoneNumber.length === 0) {
			setPhoneNumberError("Please enter your phone number");
			if (fullName.length) {
				setFullNameError("")
			}
			if (addressLineOne.length) {
				setAddressError("")
			}
			if (postalCode.length) {
				setPostalCodeError("")
			}
			if (country.length) {
				setCountryError("")
			}
		} else if (addressLineOne.length === 0) {
			setAddressError("Please enter your devlivery address");
			if (fullName.length) {
				setFullNameError("")
			}
			if (phoneNumber.length) {
				setPhoneNumberError("")
			}
			if (postalCode.length) {
				setPostalCodeError("")
			}
			if (country.length) {
				setCountryError("")
			}
		} else if (postalCode.length === 0) {
			setPostalCodeError("Please enter your postal code");
			if (fullName.length) {
				setFullNameError("")
			}
			if (phoneNumber.length) {
				setPhoneNumberError("")
			}
			if (addressLineOne.length) {
				setAddressError("")
			}
			if (country.length) {
				setCountryError("")
			}
		} else if (country.length === 0) {
			setCountryError("Please select your country");
			if (fullName.length) {
				setFullNameError("")
			}
			if (phoneNumber.length) {
				setPhoneNumberError("")
			}
			if (addressLineOne.length) {
				setAddressError("")
			}
			if (postalCode.length) {
				setPostalCodeError("")
			}
		} else {
			setFullNameError("");
			setPhoneNumberError("");
			setAddressError("");
			setPostalCodeError("");
			setError("");
			setProccessing(true);
			setConfirmPayment(true);

			const payload = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement)
				}
			}).then(({ paymentIntent }) => {
				console.log(paymentIntent);
				setProccessing(false);
				setError("");
				setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
					orderItems: basket,
					orderSubtotal: getBasketTotalValue(basket),
					created: paymentIntent.created,
					fullName,
					country,
					phoneNumber,
					addressLineOne,
					addressLineTwo,
					postalCode,
					orderStatus: "proccessing",
					timestamp: serverTimestamp()
				}).then(() => {
					history.push("/orders");
				})
			}).catch(err => {
				console.log(err)
			})
		}
	}

	return (
		<div className="checkout">
			<img 
				src="data:image/png;base64,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"
				alt=""
				className="checkout__logo"
			/>
			<h1> Select a shipping address </h1>

			<div className="checkout__container">
				<h2> Add new address </h2>
				<form>	
					<label for="checkout-country"> Country/Region </label>
					<select 
						id="checkout-country" 
						value={country} 
						onChange={e => setCountry(e.target.value)}
					>
						<option value="Canada"> Canada </option>
						<option value="United Kingdom"> United Kingdom </option>
						<option value="United States"> United States </option>
						<option value="Australia"> Australia </option>
						<option value="New Zealand"> New Zealand </option>
					</select>

					{
						countryError.length ? (
							<p className="checkout__container__errorMessages"> { countryError } </p>
						) : <> </>
					}

					<label for="checkout-name"> Full name (First and Last name) </label>
					<input 
						id="checkout-name" 
						type="text" 
						value={fullName}
						onChange={e => setFullName(e.target.value)}
					/>
					{
						fullNameError.length ? (
							<p className="checkout__container__errorMessages"> { fullNameError } </p>
						) : <> </>
					}

					<label for="checkout-phone-number"> Phone number </label>
					<input 
						id="checkout-phone-number" 
						type="number"
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
					{
						phoneNumberError.length ? (
							<p className="checkout__container__errorMessages"> { phoneNumberError } </p>
						) : <> </>
					}
					<p> May be printed on label to assist delivery </p>
					<label for="checkout-address-1"> Address line 1 </label>
					<input 
						type="text" 
						value={addressLineOne}
						onChange={e => setAddressLineOne(e.target.value)}
						id="checkout-address-1" 
					/>

					{
						addressError.length ? (
							<p className="checkout__container__errorMessages"> { addressError } </p>
						) : <> </>
					}
					
					<label for="checkout-address-2"> Address line 2 (optional) </label>
					<input 
						type="text" 
						id="checkout-address-2" 
						value={addressLineTwo}
						onChange={e => setAddressLineTwo(e.target.value)}
					/>
					<label for="checkout-postal-code"> Postal code </label>
					<input 
						type="number" 
						id="checkout-postal-code" 
						value={postalCode}
						onChange={e => setPostalCode(e.target.value)}
					/>
					{
						postalCodeError.length ? (
							<p className="checkout__container__errorMessages"> { postalCodeError } </p>
						) : <> </>
					}
				</form>

				<div>
					<h2> Add a payment method </h2>
					<div> 
						Subtotal: 
							<CurrencyFormat
								renderText={value => (
									<span> ${ value } </span>
								)}
								value={getBasketTotalValue(basket)}
								thousandSeparator={true}
								decimalScale={2}
								displayType={"text"}
							/> 
					</div>
					<div className="checkout__container__paymentIcons">
						<img 
							src="https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png" 
							alt="" 
						/>
						<img 
							src="https://brandpalettes.com/wp-content/uploads/2020/05/mastercard-02.png"
							alt=""
						/>
					</div>
					<CardElement 
						className="payment-element"
						onChange={handleChange}
					/>
					{ error.length ? <div className="checkout__container__paymentError"> {error}  </div> : <> </> } 
					<button 
						onClick={handlePayment}
						disabled={!proccessing && !confirmPayment}
					> 
						{ proccessing ? "Proccessing" : "Confirm Order" } 
					</button>
				</div>
			</div>
		</div>	
	)
}

export default Checkout;