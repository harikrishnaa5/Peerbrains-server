import Product from "../models/product.js";

const productController = {
    findAll: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json({ products, responseCode: 200 });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    create: async (req, res) => {
        try {
            const { title, description, price, stock } = req.body;

            if (!title || !description || !price || !stock) {
                return res.status(400).json({ message: "All fields are required.", responseCode: 400 });
            }

            let imageUrl = null;
            if (req.file) {
                imageUrl = req.file.path;
            }

            await Product.create({
                title: title.trim(),
                description: description.trim(),
                price: parseFloat(price),
                stock: parseInt(stock),
                image: imageUrl,
            });

            return res.status(201).json({
                message: "Product created successfully.",
                responseCode: 201,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error. Please try again later." });
        }
    },

   update: async (req, res) => {
        try {
            const id = req.params.id;
            const { title, description, price, stock } = req.body;

            if (!title || !description || !price || !stock) {
            return res.status(400).json({ message: "All fields are required.", responseCode: 400 });
            }

            const product = await Product.findById(id);
            if (!product) {
            return res.status(404).json({ message: "Product not found.", responseCode: 404 });
            }

            if (req.file) {
            product.image = req.file.path;
            }

            product.title = title.trim();
            product.description = description.trim();
            product.price = parseFloat(price);
            product.stock = parseInt(stock);

            await product.save();

            return res.status(200).json({ message: "Product updated successfully.", responseCode: 200 });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error. Please try again later." });
        }
},


    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            await Product.findByIdAndDelete(id);
            return res.status(200).json({ message: "Product deleted successfully", responseCode: 200 });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },
};

export default productController;
