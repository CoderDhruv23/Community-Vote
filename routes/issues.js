import express from 'express';
import Issue from '../models/issue.js';

const router = express.Router();

// Get all issues
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.render('issues/issues', { issues: issues });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get form to create a new issue
router.get('/new', (req, res) => {
    res.render('issues/newIssue');
});

// Get one issue
router.get('/:id', getIssue, (req, res) => {
    res.render('issues/show', { issue: res.issue });
});

// Get form to edit an issue
router.get('/:id/edit', getIssue, (req, res) => {
    res.render('issues/editIssue', { issue: res.issue });
});

// Create an issue
router.post('/', async (req, res) => {
    const issue = new Issue({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newIssue = await issue.save();
        res.redirect(`/issues/${newIssue._id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an issue
router.patch('/:id', getIssue, async (req, res) => {
    if (req.body.title != null) {
        res.issue.title = req.body.title;
    }
    if (req.body.content != null) {
        res.issue.content = req.body.content;
    }
    if (req.body.author != null) {
        res.issue.author = req.body.author;
    }

    try {
        const updatedIssue = await res.issue.save();
        res.redirect(`/issues/${updatedIssue._id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an issue
router.delete('/:id', getIssue, async (req, res) => {
    try {
        await res.issue.remove();
        res.redirect('/issues');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getIssue(req, res, next) {
    let issue;
    try {
        issue = await Issue.findById(req.params.id);
        if (issue == null) {
            return res.status(404).json({ message: 'Cannot find issue' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.issue = issue;
    next();
}

export default router;
