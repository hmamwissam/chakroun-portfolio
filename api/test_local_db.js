import 'dotenv/config';
import mongoose from 'mongoose';

async function testLocal() {
  const localUri = 'mongodb://localhost:27017/portfolio';
  console.log('Testing local connection to:', localUri);
  try {
    await mongoose.connect(localUri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Local connection successful');
    process.exit(0);
  } catch (err) {
    console.error('❌ Local connection failed:', err.message);
    process.exit(1);
  }
}

testLocal();
