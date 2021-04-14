import mongoose from 'mongoose';
import './models/Country';
import './models/City';
import './models/Story';

const conn = {};

const connectDb = async () => {
  if (conn.isConnected) {
    console.log('already connected to db');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    conn.isConnected = db.connections[0].readyState;
    console.log('connected to db');
  } catch (e) {
    console.log('db connect error - ', e);
    throw e;
  }
};

export default connectDb;
