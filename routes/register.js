import express from 'express';
const router = express.Router();
import User from '../models/User.js';

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { fullName, username, email, phoneNumber, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }, { phoneNumber }] });
        if (existingUser) {
            return res.status(400).send('User already exists with the given email, username, or phone number');
        }

        const user = new User({ fullName, username, email, phoneNumber, password, gender });
        await user.save();

        // Implement session or JWT here
        // req.session.user = user;
        // or
        // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');

        res.redirect('/signin'); // Redirect to the sign-in page after registration
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
