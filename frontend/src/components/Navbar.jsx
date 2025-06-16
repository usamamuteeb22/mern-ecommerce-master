import { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
			{/* Promotional Header */}
			<div className="bg-green-600 text-white text-center py-2 font-semibold">
				Get Free Coupons on Shopping Over Rs. 2000!
			</div>

			{/* Navbar */}
			<div className="container mx-auto px-4 py-3">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<Link to="/" className="text-2xl font-bold text-emerald-400">
						E-Commerce
					</Link>

					{/* Search Bar (Centered) */}
					<div className="hidden md:block relative w-1/3">
						<input
							type="text"
							placeholder="Search..."
							className="w-full px-4 py-2 border-2 border-green-500 rounded-full text-black focus:outline-none"
						/>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6">
						<Link to="/" className="text-gray-300 hover:text-emerald-400 transition duration-300">
							Home
						</Link>
						{user && (
							<Link to="/cart" className="relative group text-gray-300 hover:text-emerald-400 transition duration-300">
								<ShoppingCart className="inline-block mr-1 group-hover:text-emerald-400" size={20} />
								<span className="hidden sm:inline">Cart</span>
								{cart.length > 0 && (
									<span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 flex items-center"
								to="/secret-dashboard"
							>
								<Lock className="inline-block mr-1" size={18} />
								<span className="hidden sm:inline">Dashboard</span>
							</Link>
						)}
						{user ? (
							<button
								className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300"
								onClick={logout}
							>
								<LogOut size={18} />
								<span className="hidden sm:inline ml-2">Log Out</span>
							</button>
						) : (
							<>
								<Link
									to="/signup"
									className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300"
								>
									<UserPlus className="mr-2" size={18} />
									Sign Up
								</Link>
								<Link
									to="/login"
									className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300"
								>
									<LogIn className="mr-2" size={18} />
									Login
								</Link>
							</>
						)}
					</nav>

					{/* Mobile Menu Button */}
					<button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
						{menuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{menuOpen && (
				<div className="md:hidden bg-gray-800 py-4 px-6 space-y-4">
					<Link to="/" className="block text-gray-300 hover:text-emerald-400" onClick={() => setMenuOpen(false)}>
						Home
					</Link>
					{user && (
						<Link to="/cart" className="block text-gray-300 hover:text-emerald-400" onClick={() => setMenuOpen(false)}>
							Cart {cart.length > 0 && <span className="text-emerald-400">({cart.length})</span>}
						</Link>
					)}
					{isAdmin && (
						<Link to="/secret-dashboard" className="block text-gray-300 hover:text-emerald-400" onClick={() => setMenuOpen(false)}>
							Dashboard
						</Link>
					)}
					{user ? (
						<button
							className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-300"
							onClick={() => {
								logout();
								setMenuOpen(false);
							}}
						>
							<LogOut size={18} />
							<span className="ml-2">Log Out</span>
						</button>
					) : (
						<>
							<Link
								to="/signup"
								className="block bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md text-center transition duration-300"
								onClick={() => setMenuOpen(false)}
							>
								Sign Up
							</Link>
							<Link
								to="/login"
								className="block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-center transition duration-300"
								onClick={() => setMenuOpen(false)}
							>
								Login
							</Link>
						</>
					)}
				</div>
			)}
		</header>
	);
};

export default Navbar;
