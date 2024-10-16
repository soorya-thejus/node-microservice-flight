// flight/models/airline.js
const mongoose = require('mongoose');

// Airline schema and model
const airlineSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Airline', airlineSchema);
