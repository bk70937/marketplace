const express = require('express');
const routes = require('./routes');
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(port,() => console.log(`Server is running on http://localhost:${port}`));
