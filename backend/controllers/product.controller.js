import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products });
	} catch (error) {
		console.error("Error in getAllProducts:", error);
		res.status(500).json({ message: "Failed to fetch products", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		if (!featuredProducts.length) {
			return res.status(404).json({ message: "No featured products found" });
		}
		res.json(featuredProducts);
	} catch (error) {
		console.error("Error in getFeaturedProducts:", error);
		res.status(500).json({ message: "Failed to fetch featured products", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;
		
		// 🛑 Prevent duplicate product creation
		const existingProduct = await Product.findOne({ name, category });
		if (existingProduct) {
			return res.status(400).json({ message: "Product with this name already exists in this category" });
		}

		let imageUrl = "";
		if (image) {
			const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
			imageUrl = cloudinaryResponse.secure_url;
		}

		const product = await Product.create({ name, description, price, image: imageUrl, category });
		res.status(201).json(product);
	} catch (error) {
		console.error("Error in createProduct:", error);
		res.status(500).json({ message: "Failed to create product", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			try {
				// ✅ Use Cloudinary API to find and delete by public ID
				const publicId = product.image.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
				console.log("Deleted image from Cloudinary");
			} catch (error) {
				console.error("Error deleting image from Cloudinary:", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Error in deleteProduct:", error);
		res.status(500).json({ message: "Failed to delete product", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{ $sample: { size: 4 } },
			{ $project: { _id: 1, name: 1, description: 1, image: 1, price: 1 } },
		]);
		res.json(products);
	} catch (error) {
		console.error("Error in getRecommendedProducts:", error);
		res.status(500).json({ message: "Failed to fetch recommended products", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	try {
		const products = await Product.find({ category: req.params.category });
		if (!products.length) {
			return res.status(404).json({ message: `No products found in category: ${req.params.category}` });
		}
		res.json({ products });
	} catch (error) {
		console.error("Error in getProductsByCategory:", error);
		res.status(500).json({ message: "Failed to fetch products by category", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		product.isFeatured = !product.isFeatured;
		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} catch (error) {
		console.error("Error in toggleFeaturedProduct:", error);
		res.status(500).json({ message: "Failed to update featured status", error: error.message });
	}
};
