import HeaderDashed from "./HeaderDashed";
// import FetchWaitingMsg from "./FetchWaitingMsg";
// import FetchErrorMsg from "./FetchErrorMsg";
import CollectionCard from "./CollectionCard";
import { ShopContext } from "../context/ShopContext";
import { memo, useContext } from "react";

const LatestCollections = () => {
	const {productsData} = useContext(ShopContext);
	console.log(productsData);
	

	return (
		<section className="latest-collections mt-6">
			{/* Header with title and description */}
			<HeaderDashed
				head1="LATEST"
				head2="COLLECTIONS"
				paragraph="Discover our Latest Collections—fresh, trendy, and exclusively designed for the CICT community! From cutting-edge apparel to must-have accessories, each piece is crafted to showcase your tech spirit and CICT pride. Stay ahead of the trend and get your hands on the newest styles today!"
			/>
			<main className="d-flex row-gap-3 flex-wrap mt-5">
				{/* Conditional rendering based on loading and error states */}
				{
				// loading ? (
				// 	<FetchWaitingMsg />
				// ) : errorInFetch ? (
				// 	<FetchErrorMsg />
				// ) : (
					// Sort data by id and display the first 10 items
					productsData.sort((a,b) => {
						a = a.date;
						b = b.date;
						return b - a
					}).slice(0,10).map((product) => (
							<CollectionCard key={product._id} data={product} />
						))
				// )
				}
			</main>
		</section>
	);
};

export default memo(LatestCollections);
