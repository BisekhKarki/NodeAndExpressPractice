require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// middleware to parse JSON bodies
app.use(express.json());

// static files
app.use(express.static('./public'));

// Router
const mainRouter = require("./routes/main")
app.use('/api/v1', mainRouter)

// middleware for 404 and error handling
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
