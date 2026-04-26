const express = require('express');
const cors = require('cors');
const path = require('path');
const { teams, players, matches } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the frontend directory
const frontendPath = path.join(__dirname, '../frontend');
console.log(`Serving static files from: ${frontendPath}`);
app.use(express.static(frontendPath));

// API Endpoints
app.get('/api/teams', (req, res) => {
  console.log('Fetching teams...');
  res.json(teams);
});

app.get('/api/players', (req, res) => {
  console.log('Fetching players...');
  res.json(players);
});

app.get('/api/matches', (req, res) => {
  console.log('Fetching matches...');
  res.json(matches);
});

console.log(`Loaded ${teams.length} teams, ${players.length} players, ${matches.length} matches.`);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
