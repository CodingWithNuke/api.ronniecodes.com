require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');

const app = express();

app
  .set('trust proxy', 1)
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(helmet())
  .use(morgan('dev'))
  .use(cors())

require('./routes')(app);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || res.statusCode !== 200 ? res.statusCode : 500);
  return res.json({
    error: {
      message: error.message
    }
  })
})

require('./database')()

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`))