// Install first: npm install express axios cors
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const API_KEY = 'bb532d83773c484fb59151143250607';

app.get('/weather', async (req, res) => {
  const city = req.query.q;

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
