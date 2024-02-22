// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

//product routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

//employee routes
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

//order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

//cart routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/carts', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
