import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import CollectionCard from "../components/CollectionCard";
import HeaderDashed from "../components/HeaderDashed";
// import FetchErrorMsg from "../components/FetchErrorMsg";
import FetchWaitingMsg from "../components/FetchWaitingMsg";



// Dummy Fixed Data:
// import productsData from "../components/FixedData";


import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";

const ProductDetails = () => {
	const {productId} = useParams();
	const {productsData} = useContext(ShopContext);
	// ;
	// useEffect(() => console.log(productId), [productId])
	
	
	const [productData, setProductData] = useState(null);
	const [loading, setLoading] = useState(true);
	// const [fetchingError, setFetchingError] = useState(null);
	const [activeSize, setActiveSize] = useState(null);
	const [activeImage, setActiveImage] = useState(0);
	// const [allFetchedData, setAllFetchedData] = useState([]);
	
	useEffect(() => {
		console.log(productsData[0].image[0]);
		
		// setAllFetchedData(productsData);  // all products
		let data = productsData.find(obj => obj._id == productId);
		data = {...data, rating: {stars: 4.5, count: 122}};
		setProductData(data);             // the selected product
		setLoading(false);
	}, [productId, productsData]);


	// Function to find related products based on category
	const findRelatedProducts = () => {
		if (!productData || !productsData.length) {
			return <h1 className="text-center my-5">Loading...</h1>;
		}
		
		const relatedProducts = productsData.filter(
			(product) =>
				product.category === productData.category && product._id != productData._id
		);
		
		return (
			<main className="d-flex row-gap-3 flex-wrap mt-4">
			{relatedProducts.slice(0,5).map((pro,i) => {
								return <CollectionCard key={i} data={pro}/>
							})}
			</main>
		)
	};
	// console.log(findRelatedProducts());

	// console.log(productData);

	// useEffect(() => {
	// 	// Fetch all products for finding related products
	// 	fetch("http://localhost:3000/products")
	// 		.then((res) => res.json())
	// 		.then((json) => setAllFetchedData(json))
	// 		.catch((error) =>
	// 			console.error("Error fetching related products:", error)
	// 		);
	// }, []);





	// useEffect(() => {
	// 	// allFetchedData.filter(obj => )
	// 	// Fetch specific product details based on productId
	// 	fetch(`http://localhost:3000/products/${productId}`)
	// 		.then((res) => {
	// 			if (!res.ok) {
	// 				throw new Error("Network response was not ok");
	// 			}
	// 			return res.json();
	// 		})
	// 		.then((json) => {
	// 			json.rating = { count: 112, stars: 4 };   // Adding sample rating data
	// 			setProductData(json);
	// 			setLoading(false);
	// 			setActiveImage(0);
	// 		})
	// 		.catch((error) => {
	// 			setFetchingError(error);
	// 			setLoading(false);
	// 		});
	// }, [productId]);




	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="product-details overflow-hidden"
		>
			{loading ? (
				<FetchWaitingMsg />
			)  
			: (
				<div className="container mt-5">
					<main className="product-wrapper d-flex gap-3 gap-lg-5 flex-wrap align-items-start">
						{/* Product Images */}
						<figure className="d-flex flex-column flex-sm-row-reverse row-gap-3 column-gap-2 col-12 col-sm justify-content-sm-between">
							<img
								style={{ maxHeight: "390px" }}
								src={`${productData.image[activeImage]}`}
								className="col-12 col-sm-9"
								alt={productData.name}
							/>
							<div className="samples col-2 col-sm d-flex flex-sm-column gap-1">
								{productData.image.map((img, i) => (
									<img
										src={`${img}`}
										className={`w-100 trans-3 preview-img ${
											activeImage === i ? "active" : ""
										}`}
										alt={productData.name}
										key={i}
										role="button"
										onMouseOver={() => setActiveImage(i)}
									/>
								))}
							</div>
						</figure>
						{/* Product Info */}
						<article className="col-12 col-sm col-lg-8 mb-3">
							<h1 className="mt-3 mrt-0 fs-2">{productData.name}</h1>
							{/* Product Rating */}
							<div className="rating">
								<div className="stars mb-3">
									{Array(5)
										.fill()
										.map(
											(
												_,
												i // i >> 0 : 4
											) => (
												<i
													key={i}
													className={`bx bxs-star ${
														productData.rating.stars >= i + 1 ? "active" : ""
													}`}
												></i>
											)
										)}
									<span className="ms-2">({productData.rating.count})</span>
								</div>
								<span className="fw-bold fs-2 d-block mb-3">
									&#x24;{productData.price}
								</span>
							</div>
							{/* Product Description */}
							<p className="c-gray">{productData.description}</p>
							{/* Select Size */}
							<div className="select-size mt-4">
								<span className="c-gray fw-bold">Select Size</span>
								<div className="size-btns d-flex gap-2 mt-2">
									{productData.sizes.map((size, i) => {
										return (
											<span
												className={`d-block px-3 py-2 bg-m-gray border-gray trans-3 ${
													activeSize == size && "active"
												}`}
												role="button"
												key={i}
												onClick={() => setActiveSize(size)}
											>
												{size}
											</span>
										);
									})}
								</div>
							</div>
							{/* Add to Cart Button */}
							<button className="addcart-btn btn rounded-0 bg-black c-white mt-4 trans-3 mb-2 py-2 px-4">
								ADD TO CART
							</button>
							{/* Product Description and Reviews */}
							<ul className="features ps-0 mt-4 border-top pt-3">
								<li className="mb-1">100% Original product.</li>
								<li className="mb-1">
									Cash on delivery is available on this product.
								</li>
								<li className="mb-1">
									Easy return and exchange policy within 7 days.
								</li>
							</ul>
						</article>
					</main>
					{/* Product Description and Reviews */}
					<article className="description d-flex flex-column mt-6 mb-6">
						<ul className="d-flex ps-0 mb-0">
							<li className="py-2 px-4 border-gray fw-bold border-bottom-0 active">
								Description
							</li>
							<li className="py-2 px-4 border-gray border-start-0 border-bottom-0">
								Reviews ({productData.rating.count})
							</li>
						</ul>
						<div className="description-text border-gray p-3 c-gray">
						Explore the CICT Merch Collection, where style meets technology! Our products are thoughtfully designed for the CICT community, featuring high-quality materials and trendy designs that reflect the spirit of innovation. From comfortable apparel like tees, hoodies, and windbreakers, to functional accessories such as bags and stickers, each item is crafted to offer a perfect blend of durability and style. <br />
							<br />
							Show your CICT pride with every piece, whether you're on campus or out with friends. Our merch is made for those who live and breathe technology, offering a look that's as bold as the future of IT!
						</div>
					</article>
					{/* Related Products */}
					<div className="related-products  mt-5">
						<HeaderDashed
							head1="RELATED"
							head2="PRODUCTS"
							classStyle="mt-5 mb-3"
						/>
						{findRelatedProducts()}
					</div>
				</div>
			)}
		</motion.section>
	)
};

export default ProductDetails;
