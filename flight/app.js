// flight/app.js
const express = require('express');
const mongoose = require('mongoose');
require('./models/airline');
// Flight schema and model
const flightSchema = new mongoose.Schema({
  airlineid: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline' },
  departure: String,
  arrival: String,
  date: Date,
});
const Flight = mongoose.model('Flight', flightSchema);

// Setup express app
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/flightdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Flight Service: Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err));

// Create a flight
app.post('/', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all flights or filter by airline and date range
app.get('/', async (req, res) => {
  try {
    const { airlineid, startdate, enddate } = req.query;

    // Build the query object
    const query = {};
    if (airlineid) query.airlineid = airlineid;
    if (startdate && enddate) {
      query.date = { $gte: new Date(startdate), $lte: new Date(enddate) };
    }

    const flights = await Flight.find(query).populate('airlineid');
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start flight microservice
app.listen(3002, () => {
  console.log('Flight service is running on port 3002');
});
