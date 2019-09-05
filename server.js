const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require('./config/db');
const path = require('path');

// Connecting DB
connectDB();

// MIddleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => {
//   res.json({ msg: 'Welcome To Test App' });
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/logs', require('./routes/logs'));

app.listen(PORT, () =>
  console.log(`Listening on the http://localhost:${PORT}`)
);
