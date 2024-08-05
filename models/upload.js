import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;
