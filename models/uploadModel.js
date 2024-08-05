// models/uploadModel.js
import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;
