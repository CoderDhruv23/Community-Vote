const express = require('express');
const router = express.Router();
const User = require('../models/user.'); // Assuming you have a User model
const Election = require('../models/election'); // Assuming you have an Election model

// Middleware to check if the admin is logged in
const isAdminAuthenticated = (req, res, next) => {
  if (req.session.admin) {
    return next();
  }
  res.redirect('/admin/login');
};

// Admin login page
router.get('/login', (req, res) => {
  res.render('admin-login', { error: null });
});

// Admin login action
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {  // Use env variables for security
    req.session.admin = true;
    return res.redirect('/admin/dashboard');
  }
  res.render('admin-login', { error: 'Invalid credentials' });
});

// Admin dashboard
router.get('/dashboard', isAdminAuthenticated, (req, res) => {
  res.render('admin-dashboard');
});

// Start election
router.post('/start-election', isAdminAuthenticated, async (req, res) => {
  try {
    await Election.create({ status: 'active' });
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Error starting election');
  }
});

// End election
router.post('/end-election', isAdminAuthenticated, async (req, res) => {
  try {
    await Election.updateMany({}, { status: 'ended' });
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Error ending election');
  }
});

// Add user
router.post('/add-user', isAdminAuthenticated, async (req, res) => {
  try {
    const { username, email } = req.body;
    await User.create({ username, email });
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Error adding user');
  }
});

// Send notifications
router.post('/send-notifications', isAdminAuthenticated, async (req, res) => {
  try {
    const { message } = req.body;
    const users = await User.find();
    // Assuming you have a function to send notifications
    users.forEach(user => sendNotification(user, message));
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Error sending notifications');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;

const sendNotification = (user, message) => {
    // Logic to send notification, could be an email, SMS, or in-app notification
    console.log(`Notification sent to ${user.email}: ${message}`);
};

