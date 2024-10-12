const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require('../models/User');

router.get('/', async (req, res) => {
    const thoughts = await Thought.find();
    res.json(thoughts);
});

router.get('/:thoughtId', async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
});

router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.thoughts.push(newThought._id);
        await user.save();

        res.json(newThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create thought', details: error.message });
    }
});

router.put('/:thoughtId', async (req, res) => {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    res.json(updatedThought);
});

router.delete('/:thoughtId', async (req, res) => {
    await Thought.findByIdAndDelete(req.params.thoughtId);
    res.json({ message: 'Thought deleted' });
});

router.post('/:thoughtId/reactions', async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }

        const reaction = thought.reactions.id(req.params.reactionId);

        if (!reaction) {
            return res.status(404).json({ error: 'Reaction not found' });
        }

        thought.reactions.pull(req.params.reactionId); 

        await thought.save();
        res.json({ message: 'Reaction deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;
