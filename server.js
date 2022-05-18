const express = require('express');
const app = express();

const cors = require('cors');
const PORT = 4000;

app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));

// Single route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to SideHustle Node REST API with express."});
})

// Importing our routes file
// require("./src/routes/user_routes")(app)

/* Another way of Importing/Using our routes file and using custom error handler*/
app.use('/api/users', require('./src/routes/user_routes2'));

// error handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
    next();
});
/* End of Importing/Using our routes file and using custom error handler */


// Set port, Listen for requests
app.listen(PORT, () => {
    console.log("Server running on PORT ", PORT);
})