// This script will create an admin user if not exists
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  await mongoose.connect(MONGO_URI);
  const email = 'archi@dev.com';
  const password = '123456';
  const name = 'Admin';

  let user = await User.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: true
    });
    console.log('✅ Admin user created:', email);
  } else {
    user.isAdmin = true;
    await user.save();
    console.log('ℹ️ Admin user already exists, isAdmin set to true:', email);
  }
  mongoose.disconnect();
}

createAdmin();
