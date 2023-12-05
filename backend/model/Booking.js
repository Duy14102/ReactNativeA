const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    employee: {
        type: Array,
        default: null
    },

    customer: {
        id: {
            default: null,
            type: String
        },
        fullname: {
            type: String
        },
        phonenumber: {
            type: String
        }
    },

    date: {
        type: Date
    },

    people: {
        type: Number
    },

    denyreason: {
        default: null,
        type: String
    },

    status: {
        type: Number
    },

    message: {
        default: null,
        type: String
    },

    table: {
        default: null,
        type: String
    },

    fulltotal: {
        type: String,
        default: null
    }

}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = mongoose.model.Menu || mongoose.model("Booking", BookingSchema);