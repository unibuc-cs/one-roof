import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/one-roof';
const connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed');
  }
};


export default connect;