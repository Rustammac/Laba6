const express = require('express');
const app = express();
const path = require('path')

const RATES = {
  'USD-EUR': 0.92,
  'EUR-RUB': 105,
  'USD-RUB': 92,
};

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/convert', (req, res) => {
  const from = String(req.query.from || '').toUpperCase();
  const to = String(req.query.to || '').toUpperCase();
  const amount = Number(req.query.amount);

  
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  
  const rate = RATES[`${from}-${to}`];
  if (rate === undefined) {
    return res.status(400).json({ error: `unsupported currency pair: ${from} -> ${to}` });
  }
  
  
  const result = Math.round(amount * rate * 100) / 100;
  res.json({ from, to, amount, result, rate });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'))
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));