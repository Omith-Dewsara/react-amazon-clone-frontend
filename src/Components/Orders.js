import React, { useState, useEffect } from "react";
import "../Styles/Orders.css";
import Order from "./Order";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Orders() {
	const user = useSelector(selectUser); 

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			onSnapshot(collection(db, "users", user.uid, "orders"), orderBy("timestamp", "desc"), snapshot => {
				setOrders(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
			})
			console.log(user.uid)
		}
	}, [user])

	return (
		<div className="orders">
			<h1> Your Orders </h1>
			<div className="orders__container">
				{
					orders.map(({id, data}) => (
						<Order 
							key={id}	
							id={id}
							addressLineOne={data.addressLineOne}
							addressLineTwo={data.addressLineTwo}
							created={data.created}
							fullName={data.fullName}
							subtotal={data.orderSubtotal}
							orderItems={data.orderItems}
							phoneNumber={data.phoneNumber}
							postalCode={data.postalCode}
							country={data.country}
							orderStatus={data.orderStatus}
						/>
					))
				}
			</div>
		</div>
	)
}

export default Orders;