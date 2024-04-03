const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Routes
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
