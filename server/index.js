// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db');
const authRoutes = require('./Routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', require('./Routes/displayData'));
app.use('/api', require('./Routes/OrderData'));

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Error starting the application:", error.message);
    });
