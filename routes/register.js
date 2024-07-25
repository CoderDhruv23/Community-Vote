import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { fullName, username, email, phoneNumber, password, confirmPassword, gender } = req.body;

    // Basic validation
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Create a new user
        const newUser = new User({
            fullName,
            username,
            email,
            phoneNumber,
            password,
            gender
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
