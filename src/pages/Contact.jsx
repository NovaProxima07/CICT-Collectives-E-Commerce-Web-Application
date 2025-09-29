import { motion } from "framer-motion";
import mainImg from "../assets/contact_img.jpg";
import DescribedImage from "../components/DescribedImage";
import SubscriptionForm from "../components/SubscriptionForm";
import HeaderDashed from "../components/HeaderDashed";

const Contact = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="contact-page text-center py-3 pt-5"
		>
			<div className="container">
				{/* Header with dashed style */}
				<HeaderDashed head1="CONTACT" head2="US" classStyle="fw-normal fs-3" />
				
				{/* Described Image Section */}
				<DescribedImage
					img={mainImg}
					imgTitle="desk image"
					styleInLarge="justify-content-center column-gap-xl-4"
					styleImg="col-xl-5"
					styleText="col-xl-5"
					sideText={
						<>
							{/* Store Information */}
							<div className="our-store">
								<h3 className="c-d-gray">Main Office</h3>
								<address className="my-4">
									<span>West Visayas State University - Iloilo City Campus</span>
									<br />
									<span> Luna St, La Paz, Iloilo City, 5000 Iloilo</span>
								</address>
								<div className="telephone">
									Tel: (415) 555-0132
									<br />
									Email: admin@cict-collectives.com
								</div>
							</div>
							{/* Careers Information */}
							<div className="careers mt-5">
								<h4 className="c-d-gray">Careers at CICT Collectives</h4>
								<span className="d-block my-4">
									Learn more about our teams and job openings.
								</span>
								<button className="btn py-3 px-4 border-out-d-gray rounded-0">
									Explore Jobs
								</button>
							</div>
						</>
					}
				/>

				{/* Subscription Form */}
				<SubscriptionForm />
			</div>
		</motion.div>
	);
};

export default Contact;
