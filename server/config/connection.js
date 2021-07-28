const mongoose = require('mongoose');

//changed db name to codecreatures
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/codecreatures', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;