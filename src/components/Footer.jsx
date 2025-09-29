import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
// Import Tooltip directly from Bootstrap
import { Tooltip } from "bootstrap";

const Footer = () => {
	const [currentYear, setCurrentYear] = useState(null);

	// Set the current year
	const getCurrentYear = () => {
		const dateNow = new Date();
		setCurrentYear(dateNow.getFullYear());
	};

	useEffect(() => {
		// Initialize Bootstrap tooltips
		const tooltipTriggerList = document.querySelectorAll(
			'[data-bs-toggle="tooltip"]'
		);
		const tooltipList = [...tooltipTriggerList].map(
			(tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
		);

		getCurrentYear();

		// Cleanup tooltips on component unmount
		return () => {
			tooltipList.forEach((tooltip) => tooltip.dispose());
		};
	}, []);

	return (
		<footer className="mt-5 sec-padd" id="footer">
			<div className="container d-flex flex-wrap">
				<main className="col-12">
					<div className="row row-gap-5">
						{/* Logo and Description */}
						<article className="col-12 col-lg-6 text-center">
						<Link to="/" className="logo text-decoration-none text-dark d-flex align-items-center">
  <img
    src="https://user-images.githubusercontent.com/7346165/68545613-a48ad480-0409-11ea-8319-6f2364a0eed5.png"
    alt="CICT Logo"
    style={{ height: '40px', marginRight: '10px' }} // Adjust the size and spacing as needed
  />
  <h3 className="fs-3 mb-0 d-flex align-items-center">
    CICT <span className="fw-medium c-pink" style={{ marginLeft: '5px' }}>Collectives</span>
  </h3>
</Link>

							<p className="mt-3">
							Welcome to CICT Collectives, the ultimate online destination for all things CICT! Whether you're a student, faculty member, or proud supporter of the College of Information and Communications Technology, we've got the gear to show off your CICT pride. From stylish apparel to must-have accessories, each item is designed to reflect the spirit, creativity, and innovation of our tech-driven community. Become a CICTzen family and wear your passion for technology with pride!
							</p>
						</article>

						{/* Social Links */}
						<div className="social col-12 col-lg text-center">
							<h3>COMPANY</h3>
							<ul className="ps-0 mt-3">
								<li>
									<NavLink
										to="/"
										className="text-decoration-none c-gray d-inline-block p-1 px-5"
									>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/about"
										className="text-decoration-none c-gray d-inline-block p-1 px-5"
									>
										About us
									</NavLink>
								</li>
								<li className="c-gray p-1">Delivery</li>
								<li className="c-gray p-1">Privacy Policy</li>
							</ul>
						</div>

						{/* Contact Information */}
						<div className="address col-12 col-lg text-center">
							<h3 className="mb-3">GET IN TOUCH</h3>
							<ul className="d-flex flex-column align-items-center align-items-lg-start ps-0 gap-2">
								<li className="c-gray">(033) 320 0870</li>
								<li>
									<a
										className="c-gray text-decoration-none hover-underline"
										href="mailto:cict@wvsu.edu.ph"
										title="get in touch"
									>
										cict@wvsu.edu.ph
									</a>
								</li>
								<li>
									<a
										href="https://www.facebook.com/cictwvsu"
										target="_blank"
										title="Go To Facebook"
										className="text-decoration-none c-gray"
									>
										Facebook Page
									</a>
								</li>
							</ul>
						</div>
					</div>
				</main>

			
			</div>
		</footer>
	);
};

export default Footer;
