import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import {setUser} from '../service/auth.js';

const router = express.Router();
router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin', async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(401).send('Invalid phone number or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send('Invalid phone number or password');
        }

        // Implement session or JWT here
        // req.session.user = user;
        // or
        // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');

        const sessionID = uuidv4();
        setUser (sessionID, user);
        res.cookie("uid", sessionID);
        res.redirect('/home'); // Redirect to the desired page after sign-in
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
