const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://aymencherife:26443637@bipbop.vyouywo.mongodb.net/pexpenses?retryWrites=true&w=majority&appName=BipBop";
const clientOptions = {serverApi: { version: '1', strict: true, deprecationErrors: true }};

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200'  // Adjust the port if your Angular app is served from a different one
}));

mongoose.connect(uri, clientOptions)
.then(() => {
  console.log("Connected to MongoDB!");

  //setting up the routes under '/' =====================
  // Import the transaction routes
    app.use('/', authRoutes);
    app.use('/', transactionRoutes); 


    app.get('/', (req, res) => res.send('Hello, Pexpenses!'));
//===============================================================
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
