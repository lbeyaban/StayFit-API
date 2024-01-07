const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/StayFit', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı başarıyla sağlandı');
  } catch (error) {
    console.error('MongoDB bağlantısı başarısız', error);
  }
};

module.exports = connectDB;
