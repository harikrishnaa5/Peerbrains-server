import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                priceAtPurchase: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        shippingAddress: {
            house: { type: String, required: true, trim: true },
            city: { type: String, required: true, trim: true },
            state: { type: String, required: true, trim: true },
            postalCode: { type: String, required: true, trim: true },
            country: { type: String, required: true, trim: true },
            phone: { type: String, trim: true }, // optional
        },
    },
    {
        timestamps: true,
    }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
