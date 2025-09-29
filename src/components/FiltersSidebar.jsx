import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const  FiltersSidebar = ({ filterByData }) => {
	// State to show/hide category filter (for small screens)
	const [showCategory, setShowCategory] = useState(false);       
	// State for selected categories and types
	const [activeCategories, setActiveCategories] = useState([]);
	const [activeTypes, setActiveTypes] = useState([]);
	const {search} = useContext(ShopContext)

	// Trigger filter function whenever categories or types change
	useEffect(() => {
		filterByData({categories: activeCategories, types: activeTypes});
	}, [activeCategories, activeTypes, search])

	// Toggle selected categories
	const manageActiveCategories = (e) => {
		const value = e.target.value;
		setActiveCategories(prev => prev.includes(value)? prev.filter(el => el !== value) : [...prev, value]);
	}

	// Toggle selected types
	const manageActiveTypes = (e) => {
		const value = e.target.value;
		setActiveTypes(prev => prev.includes(value)? prev.filter(el => el !== value) : [...prev, value]);
	}

	return (
		<aside className="filters-sidebar col-12 col-md-4 col-lg-3 col-xxl-2">
			{/* Toggle button for small screens */}
			<h3
				className="small-screen fw-normal fs-4 d-flex align-items-center gap-2 fit-content p-2 trans-3 rounded"
				role="button"
				aria-expanded={showCategory}
				onClick={() => setShowCategory((prev) => !prev)}
			>
				FILTERS
				<i
					className={`fs-2 mt-1 c-gray bx bxs-chevron-right ${
						showCategory && "active"
					}`}
				></i>
			</h3>

			{/* Filters label for large screens */}
			<h3 className="large-screen fw-normal fs-4 d-none mt-2">FILTERS</h3>
			
			{/* Category filter */}
			<div
				className={`category border rounded p-3 mt-405 ${
					showCategory ? "d-block" : "d-none"
				}`}
			>
				<h4 className="fs-6 mb-205">CATEGORIES</h4>
				<ul className="list-unstyled mb-0">
					<li>
						<input type="checkbox" name="category" id="men" value="Men" onClick={manageActiveCategories} aria-label="Men category" />
						<label className="ps-2 mt-1 fw-light" htmlFor="men">
							T-Shirts
						</label>
					</li>
					<li>
						<input type="checkbox" name="category" id="women" value="Women" onClick={manageActiveCategories} aria-label="Women category" />
						<label className="ps-2 mt-1 fw-light" htmlFor="women">
							Jackets
						</label>
					</li>
					<li>
						<input type="checkbox" name="category" id="kids" value="Kids" onClick={manageActiveCategories} aria-label="Kids category" />
						<label className="ps-2 mt-1 fw-light" htmlFor="kids">
							Others
						</label>
					</li>
				</ul>
			</div>

			{/* Type filter */}
			
		</aside>
	);
};

export default FiltersSidebar;
