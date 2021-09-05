import React from "react";
import "../Styles/Home.css";
import HomeImgSlider from "./HomeImgSlider";
import MainCategories from "./MainCategories";
import mainCategoriesData from "../data/homeCategories.json";
import Product from "./Product";
import ProductsData from "../data/products.json";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Home() {
	console.log(mainCategoriesData)
	const history = useHistory();
	const user = useSelector(selectUser);

	return (
		<div className="home">
			<HomeImgSlider />
			<div className="home__categories">
				{
					mainCategoriesData.slice(0, 3).map(category => (
						<MainCategories 
							image={category.image}
							linkName={category.linkName}
							title={category.title}
							images={category.images}
						/>
					))	
				}

				<div className="home__categories__signin">
					{
						user ? <> </> : (
							<div>
								<h2> Sign in for the best experience </h2>
								<button onClick={() => history.push("/signin")}> Sign in securely </button>
							</div>
						)
					}

					<img 
						src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_D2_45M_en_US_1x._CB418309979_.jpg"
						alt=""
					/>
				</div>
				{
					mainCategoriesData.slice(3).map(category => (
						<MainCategories 
							image={category.image}
							linkName={category.linkName}
							title={category.title}
							images={category.images}
						/>
					))	
				}
			</div>

			<h2> Shop now </h2>

			<div className="home__products">
				{
					ProductsData.map(product => (
						<Product 
							name={product.name}
							rating={product.rating}
							price={product.price}
							image={product.image}
							id={product.id}
						/>
					))
				}
			</div>
		</div>
	)
}

export default Home;