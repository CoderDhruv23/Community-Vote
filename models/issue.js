import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
