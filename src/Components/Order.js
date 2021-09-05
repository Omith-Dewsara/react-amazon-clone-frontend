import React, { useState } from "react";
import "../Styles/Order.css";
import BasketItem from "./BasketItem";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Order({addressLineOne, id, addressLineTwo, created, country, fullName, subtotal, orderItems, phoneNumber, postalCode, orderStatus}) {

	const [cancelOrder, setCancelOrder] = useState(false);
	const user = useSelector(selectUser);

	const handleClick = () => {
		console.log("Hello world")
		updateDoc(doc(db, "users", user.uid, "orders", id), {
			orderStatus: "Cancelled"
		}).then(() => {
			setCancelOrder(false);
		})
	}

	return (
		<div className="order">
			<div className="order__info">
				<div>
					<h3> Order id </h3>
					<p> { id } </p>
				</div>
				<div>
					<h3> Order Date </h3>
					<p> { moment.unix(created).format('MMMM Do YYYY, h:mma') } </p>
				</div>
				<div>
					<h3> Total price </h3>
					<p> ${ subtotal } </p>
				</div>
				<div>
					<h3> Full name </h3>
					<p> { fullName } </p>
				</div>
				<div>
					<h3> Devlivery address </h3>
					<p> 
						{ addressLineOne }, 
						{addressLineTwo.length ? <p> { addressLineTwo }</p> : <> </>}
						<p> { country } </p>
					</p>
				</div>
				<div>
					<h3> Postal code </h3>
					<p> { postalCode } </p>
				</div>
				<div>
					<h3> Phone number </h3>
					<p> { phoneNumber } </p>
				</div>
				<div>
					<h3> Order status </h3>
					<p style={{color: orderStatus === "Cancelled" ? "#FF0033" : "#48B02C"}}> 
						{ 
							orderStatus === "Cancelled" ? ( 
								<span style={{color: "#FF0033"}}> Cancelled  </span>
							) : orderStatus 
						} 
					</p>
				</div>
			</div>

			<div>
				<h3> Order items </h3>
				<div>
					{
						orderItems.map(item => (
							<BasketItem 
								key={item.id}
								image={item.image}
								items={item.items}
								price={item.price}
								ordered={true}
								name={item.name}
							/>
						))	
					}
				</div>
			</div>

			<div className="order__cancellationMessage" style={{display: cancelOrder ? "flex" : "none"}}>
				<h2> Are you sure you need to cancel this Order? </h2>
				<div>
					<button 
						className="order__cancellationMessage__yesButton"
						onClick={handleClick}
					> 
						Yes 
					</button>
					<button 
						className="order__cancellationMessage__noButton"
						onClick={() => setCancelOrder(false)}
					> 
						No 
					</button>
				</div>
			</div>

			{
				orderStatus !== "Cancelled" ? <button onClick={() => setCancelOrder(true)}> Cancel Order </button> : <> </>
			}
		</div>
	)
}

export default Order;