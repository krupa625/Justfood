// // app.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectToDatabase = require('./db');
// const authRoutes = require('./Routes/auth');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api', authRoutes);
// app.use('/api', require('./Routes/displayData'));
// app.use('/api', require('./Routes/OrderData'));
// app.get("/gett", (req,res) =>{
//     res.send("hello");
// })
// connectToDatabase()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Server is running at http://localhost:${port}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Error starting the application:", error.message);
//     });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const connectToDatabase = require('./db');
const authRoutes = require('./Routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', authRoutes);
app.use('/api', require('./Routes/displayData'));
app.use('/api', require('./Routes/OrderData'));
app.get("/gett", (req,res) =>{
    res.send("hello");
});

// Catch-all route to serve the React app's index.html file
app.get('*', (req, res) => {
    // Correct the path to 'index.html'
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Error starting the application:", error.message);
    });

