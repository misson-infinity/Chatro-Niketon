const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chhatro-niketon', { useNewUrlParser: true, useUnifiedTopology: true });

// User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String // member or admin
});

const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  res.send('User signed up');
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');
  const token = jwt.sign({ userId: user._id }, 'secretkey');
  res.json({ token });
});

// Admin Route (for updating data)
app.post('/admin/update', async (req, res) => {
  const { token, data } = req.body;
  const decoded = jwt.verify(token, 'secretkey');
  const user = await User.findById(decoded.userId);
  if (user.role !== 'admin') return res.status(403).send('Access denied');
  // Here you can update data like food account, rent, etc.
  res.send('Data updated');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
