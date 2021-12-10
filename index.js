const express = require('express');
const routes = require('./routes');
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const connectDatabase = require('./mongoDB');

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended: true})); 

dotenv.config()
const port = process.env.PORT || 5000

app.use(cors());

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true})); 
  
// Parses the text as json
app.use(bodyParser.json()); 

app.use(express.json());

app.use(routes);

connectDatabase()

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(port,() => console.log(`Server is running on http://localhost:${port}`));
