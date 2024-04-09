const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    totalNights: { type: Number, required: true },
    prices: { type: Number },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    maxguest: { type: Number, required: true }

})


const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;