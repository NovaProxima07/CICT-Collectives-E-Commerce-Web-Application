import { motion } from "framer-motion";
import HeaderDashed from "../components/HeaderDashed";
import mainImg from "../assets/about_img.png";
import SubscriptionForm from "../components/SubscriptionForm";
import DescribedImage from "../components/DescribedImage";

const About = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="about-page text-center py-3 pt-5"
		>
			<div className="container">
				{/* Page header with dashed styling */}
				<HeaderDashed head1="ABOUT" head2="US" classStyle="fw-normal fs-3" />
				
				{/* Main image with descriptive text */}
				<DescribedImage img={mainImg} imgTitle="clothes image" 
				styleInLarge="column-gap-xl-4"
				styleImg="col-xl-5"
				styleText="col-xl-6"
				sideText={					
					<>
					<p>
					CICT Collective was created out of a passion for celebrating the vibrant spirit of the College of Information and Communications Technology. Our journey began with a simple vision: to offer CICT students, faculty, and alumni a place where they can find exclusive, high-quality merchandise that reflects the dynamic world of technology and innovation. Whether you're walking through campus or attending a tech event, our goal is to provide products that let you showcase your school pride in style.
						<br />
						<br />
						Since our launch, we’ve dedicated ourselves to curating a diverse collection of apparel, accessories, and other merchandise that embody the essence of the CICT community. With a focus on premium quality and cutting-edge designs, our products are crafted to not only reflect the values of our college but also provide the comfort and functionality needed for everyday use. At CICT Collect, we strive to offer the perfect blend of fashion, technology, and school spirit for every member of our community.
					</p>
					{/* Mission statement */}
					<div className="mission">
						<h4 className="my-3 mt-4 c-black">Our Mission</h4>
						<p className="mb-0">
						Our mission is simple: To provide the CICT community with premium, trendy, and affordable merchandise that embodies the essence of technology, innovation, and school pride. We aim to create a connection between CICT students, alumni, and faculty through our carefully curated collections that reflect the energy and spirit of our college.
						</p>
					</div>
					</>}/>

				{/* Why Choose Us section */}
				<section className="choose-us mt-6">
					<HeaderDashed head1="WHY" head2="CHOOSE US" />
					<div className="pros mt-4">
						<div className="row row-gap-4">
							{/* Each article represents a benefit */}
							<article className="col-12 col-lg-4">
							<div className="text-start border rounded p-4 h-100">
								<h4 className="fs-6 fw-bold">Quality Assurance:</h4>
								<p className="c-mm-gray mb-0 mt-4">
								We believe in offering only the best to our customers. Every item at CICT Collect undergoes rigorous quality checks to ensure durability, comfort, and design excellence. From fabric to finish, we ensure that each product meets the highest standards, so you can proudly wear your CICT pride.
								</p>
							</div>
							</article>
							<article className="col-12 col-lg-4">
							<div className="text-start border rounded p-4 h-100">
								<h4 className="fs-6 fw-bold">Convenience:</h4>
								<p className="c-mm-gray mb-0 mt-4">
								Shopping with us is easy and hassle-free. Our online store is designed with your convenience in mind, offering a smooth browsing experience, simple ordering process, and fast shipping. Whether you’re shopping from campus or home, you can count on us to deliver your CICT merch right to your door.
								</p>
							</div>
							</article>
							<article className="col-12 col-lg-4">
							<div className="text-start border rounded p-4 h-100">
								<h4 className="fs-6 fw-bold">Exceptional Customer Service:</h4>
								<p className="c-mm-gray mb-0 mt-4">
								At CICT Collect, customer satisfaction is our top priority. Our dedicated support team is always ready to assist you with any inquiries, concerns, or orders. We strive to provide a personalized experience, ensuring that every customer feels valued and heard. Your shopping experience is our commitment, and we’re here to make it exceptional.
								</p>
							</div>
							</article>
						</div>
					</div>
				</section>

				{/* Subscription form for users */}
				<SubscriptionForm />
			</div>
		</motion.div>
	);
};

export default About;
