import express from 'express';
import Upload from '../models/upload.js';

const router = express.Router();

// Get all uploads
router.get('/', async (req, res) => {
    try {
        const uploads = await Upload.find();
        res.render('uploads/uploads', { uploads: uploads });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get form to upload a new file
router.get('/new', (req, res) => {
    res.render('uploads/newUpload');
});

// Get one upload
router.get('/:id', getUpload, (req, res) => {
    res.render('uploads/show', { upload: res.upload });
});

// Get form to edit an upload
router.get('/:id/edit', getUpload, (req, res) => {
    res.render('uploads/editUpload', { upload: res.upload });
});

// Upload a new file
router.post('/', async (req, res) => {
    const upload = new Upload({
        title: req.body.title,
        description: req.body.description,
        fileUrl: req.body.fileUrl,
        author: req.body.author
    });

    try {
        const newUpload = await upload.save();
        res.redirect(`/uploads/${newUpload._id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an upload
router.patch('/:id', getUpload, async (req, res) => {
    if (req.body.title != null) {
        res.upload.title = req.body.title;
    }
    if (req.body.description != null) {
        res.upload.description = req.body.description;
    }
    if (req.body.fileUrl != null) {
        res.upload.fileUrl = req.body.fileUrl;
    }
    if (req.body.author != null) {
        res.upload.author = req.body.author;
    }

    try {
        const updatedUpload = await res.upload.save();
        res.redirect(`/uploads/${updatedUpload._id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an upload
router.delete('/:id', getUpload, async (req, res) => {
    try {
        await res.upload.remove();
        res.redirect('/uploads');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUpload(req, res, next) {
    let upload;
    try {
        upload = await Upload.findById(req.params.id);
        if (upload == null) {
            return res.status(404).json({ message: 'Cannot find upload' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.upload = upload;
    next();
}

export default router;
