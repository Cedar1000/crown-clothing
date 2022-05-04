const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const enforce = require('express-sslify');
// const { dirname } = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

app.use(express.json());

// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(cors());
// Enaling CORS on non-simple request (POST, PATCH, DELETE)
app.options('*', cors());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, 'client/build', 'index.html')));
} else {
  console.log('no test');
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/service-worker.js', (req, res) => {
//   console.log(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
// });

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
);

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`server running on port ${port}`);
});
