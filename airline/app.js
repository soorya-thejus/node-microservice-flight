// airline/app.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

// Airline schema and model
const airlineSchema = new mongoose.Schema({
  name: String,
});
const Airline = mongoose.model('Airline', airlineSchema);

// Setup express app
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/flightdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Airline Service: Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err));

// Create an airline
app.post('/', async (req, res) => {
  try {
    const airline = new Airline(req.body);
    await airline.save();
    res.status(201).json(airline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all airlines
app.get('/', async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.status(200).json(airlines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get airlines with flights in a date range using axios
app.get('/flights', async (req, res) => {
  try {
    const { startdate, enddate } = req.query;
    if (!startdate || !enddate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const start = new Date(startdate);
    const end = new Date(enddate);

    // Get all airlines
    const airlines = await Airline.find();

    // Fetch flights from the Flight microservice using axios
    const airlinesWithFlights = await Promise.all(airlines.map(async (airline) => {
      const response = await axios.get(`http://127.0.0.1:3002/`, {
        params: {
          airlineid: airline._id,
          startdate: start,
          enddate: end,
        }
      });

      const flights = response.data;
      return { airline, flights };
    }));

    res.status(200).json(airlinesWithFlights);
  } catch (error) {
    console.error('Error fetching airlines with flights', error);
    res.status(500).json({ error: error.message });
  }
});

// Start airline microservice
app.listen(3001, () => {
  console.log('Airline service is running on port 3001');
});
