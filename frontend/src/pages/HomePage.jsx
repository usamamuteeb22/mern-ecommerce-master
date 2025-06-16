import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { ChevronUp } from "lucide-react";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/image/jean.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/image/tshirt.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/image/shoes.png" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/image/glasses.jpg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/image/jacket.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/image/suit.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/image/bag.webp" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		fetchFeaturedProducts();

		const handleScroll = () => {
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [fetchFeaturedProducts]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			{/* Parallax Section */}
			<section className='relative h-screen bg-fixed bg-cover bg-center' style={{ backgroundImage: 'url("/image/img.jpg")' }}>
				<div className='absolute inset-0 bg-black opacity-50'></div>
				<div className='relative z-10 flex flex-col justify-center items-center h-full text-center'>
					<h1 className='text-5xl sm:text-6xl font-bold mb-4'>
						Discover Eco-Friendly Fashion
					</h1>
					<p className='text-xl mb-6'>
						Explore our collection of sustainable clothing that blends style and comfort.
					</p>
					<a href="#categories" className='bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded transition duration-300'>
						Explore More
					</a>
				</div>
			</section>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16' id="categories">
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>

			{/* Footer Section */}
			<footer className='bg-gray-900 text-white py-10'>
				<div className='container mx-auto px-6'>
					<div className='flex flex-wrap justify-between'>
						<div className='w-full md:w-1/4 mb-6'>
							<h5 className='text-lg font-semibold mb-4 border-b-2 border-emerald-400 pb-2'>Shop</h5>
							<ul className='space-y-2'>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>New Arrivals</a></li>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>Best Sellers</a></li>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>Sale</a></li>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>Collections</a></li>
							</ul>
						</div>

						<div className='w-full md:w-1/4 mb-6'>
							<h5 className='text-lg font-semibold mb-4 border-b-2 border-emerald-400 pb-2'>Customer Service</h5>
							<ul className='space-y-2'>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>Contact Us</a></li>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>Returns</a></li>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>Shipping Info</a></li>
								<li><a href="#" className='hover:text-emerald-400 transition duration-300'>FAQs</a></li>
							</ul>
						</div>

						<div className='w-full md:w-1/4 mb-6'>
							<h5 className='text-lg font-semibold mb-4 border-b-2 border-emerald-400 pb-2'>Newsletter</h5>
							<p className='mb-4'>Subscribe to get the latest updates and offers.</p>
							<form>
								<input type='email' placeholder='Your Email' className='px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white mb-2 w-full' />
								<button type='submit' className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded transition duration-300'>Subscribe</button>
							</form>
						</div>

						<div className='w-full md:w-1/4 mb-6'>
							<h5 className='text-lg font-semibold mb-4 border-b-2 border-emerald-400 pb-2'>Follow Us</h5>
							<div className='flex space-x-4'>
								<a href="#" className='hover:text-emerald-400 transition duration-300'><i className="fab fa-facebook-f"></i></a>
								<a href="#" className='hover:text-emerald-400 transition duration-300'><i className="fab fa-twitter"></i></a>
								<a href="#" className='hover:text-emerald-400 transition duration-300'><i className="fab fa-instagram"></i></a>
								<a href="#" className='hover:text-emerald-400 transition duration-300'><i className="fab fa-pinterest"></i></a>
							</div>
						</div>
					</div>

					<div className='text-center mt-10 border-t border-gray-700 pt-4'>
						<p className='text-gray-400'>&copy; 2024 Outfit by HR. All rights reserved.</p>
					</div>
				</div>
			</footer>

			{/* Back to Top Button */}
			
{isVisible && (
	<button
		className="fixed bottom-10 right-10 bg-[#067a78] hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition duration-300 z-50 flex items-center justify-center h-12 w-12"
		onClick={scrollToTop}
		aria-label="Back to Top"
	>
		<ChevronUp size={24} />
	</button>
			)}
		</div>
	);
};

export default HomePage;
