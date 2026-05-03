
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { teams, players, matches, stockPlayers } = require('./data');
const db = require('./db');
const { authenticateToken, SECRET_KEY } = require('./auth');

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

// Auth Endpoints
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  });
});

// API Endpoints
app.get('/api/teams', authenticateToken, (req, res) => {
  console.log('Fetching teams...');
  res.json(teams);
});

app.get('/api/players', authenticateToken, (req, res) => {
  console.log('Fetching players...');
  res.json(players);
});

app.get('/api/matches', authenticateToken, (req, res) => {
  console.log('Fetching matches...');
  res.json(matches);
});

app.get('/api/stock-players', authenticateToken, (req, res) => {
  console.log('Fetching stock players...');
  res.json(stockPlayers);
});

console.log(`Loaded ${teams.length} teams, ${players.length} players, ${matches.length} matches, ${stockPlayers.length} stock players.`);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
