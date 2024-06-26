import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    checkin: {
        type: Date,
        required: true
    }
    ,
    checkout: {
        type: Date,
        required: true
    },
    bed: {
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;