import 'dotenv/config';
import mongoose from 'mongoose';

async function test() {
  console.log('Testing connection to:', process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connection successful');
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
}

test();
