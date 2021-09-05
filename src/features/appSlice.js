import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	basket: []
}

export const getBasketTotalItems = (basket) => basket?.reduce((amount, item) => item.items + amount, 0);
export const getBasketTotalValue = (basket) => basket?.reduce((amount, item) => item.totalPrice + amount, 0);

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			const isInTheBasket = state.basket.some(item => item.id === action.payload.id);

			if (isInTheBasket) {
				state.basket.map(item => {
					if (item.id === action.payload.id) {
						item.items += 1;
						item.totalPrice += item.price;
					}
				})
			} else {
				state.basket.push(action.payload);
			}
		},
		removeOneItem: (state, action) => {
			if (state.basket.length) {
				state.basket.forEach(item => {
					if (item.id === action.payload.id) {
						if (item.items > 1) {
							item.items -= 1;
							item.totalPrice -= item.price;
						} 
					}
				})
			}
		},
		removeItem: (state, action) => {
			console.log(action.payload)
			// if (state.basket.length) {
			// 	state.basket.forEach((item) => {
			// 		if (item.id === action.payload.id) {
			// 			item.delete();
			// 		}
			// 	})
			// }
			return {
				...state,
				basket: state.basket.filter(item => item.id !== action.payload.id)
			}
		}
	}
})


export const { addToBasket, removeOneItem, removeItem } = appSlice.actions;
export const selectBasket = state => state.app.basket;

export default appSlice.reducer;