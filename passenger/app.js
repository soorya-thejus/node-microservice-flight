// passenger/app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Passenger schema
const passengerSchema = new mongoose.Schema({
  name: String,
  flightid: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
});

const Passenger = mongoose.model('Passenger', passengerSchema);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/flightdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Passenger Service: Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err));

// Routes
app.post('/', async (req, res) => {
  const passenger = new Passenger(req.body);
  await passenger.save();
  res.status(201).json(passenger);
});

app.get('/', async (req, res) => {
  const passengers = await Passenger.find().populate('flightid');
  res.status(200).json(passengers);
});

app.listen(3003, () => {
  console.log('Passenger service running on port 3003');
});
