import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authController = {
    signToken: (user) => {
        const payload = { userId: user._id.toString(), email: user.email, isAdmin: user.isAdmin };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

        return token;
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "Invalid email" });
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) return res.status(401).json({ message: "Invalid password" });
            const token = authController.signToken(user);

            res.status(200).json({ token, message: "User logged in successfully", responseCode: 200 });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
    signup: async (req, res) => {
        const { fullName, email, password } = req.body;

        try {
            if (!fullName || !fullName.trim()) return res.status(400).json({ message: "Full Name is required" });
            if (!email || !email.trim()) return res.status(400).json({ message: "Email is required" });
            if (!password || !password.trim()) return res.status(400).json({ message: "Password is required" });
            if (password.length > 12 || password.length < 8)
                return res.status(400).json({ message: "Password should be of length 8 - 12" });

            const existingUser = await User.findOne({ email });
            if (existingUser)
                return res.status(409).json({ message: "Email already exists. Try another one", responseCode: 409 });
            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                fullName,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            return res.status(201).json({ message: "Successfully created the user", responseCode: 201 });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },
};

export default authController;
