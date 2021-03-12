const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    authSource: 'admin'
  });

  mongoose.connection.on('connected', () => console.log('Connected to the DB...'));
  mongoose.connection.on('disconnected', () => console.log('Disconnected from the DB...'));
  mongoose.connection.on('error', (error) => console.log('An error occurred', error));
}