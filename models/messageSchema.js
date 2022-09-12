const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    Date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);