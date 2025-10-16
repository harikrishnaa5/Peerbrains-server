import User from "../models/user.js";

const userController = {
    findAll: async (req, res) => {
        try {
            console.log("entering inside")
            // Select only _id, fullName, and email fields
            const users = await User.find().select("_id fullName email").sort({ createdAt: -1 });

            res.status(200).json({ users, responseCode: 200 });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
};

export default userController;
