// routes/uploadRouter.js
import express from 'express';
import Upload from '../models/uploadModel.js';

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('makepost');
});

router.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newUpload = new Upload({ title, description });
        await newUpload.save();
        res.redirect('/uploads'); // Redirect to the list of uploads or another appropriate page
    } catch (error) {
        res.status(500).send('Error creating upload');
    }
});

export default router;
