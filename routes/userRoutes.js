const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    res.json(user);
});

router.post('/', async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
});

router.put('/:userId', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
});

router.delete('/:userId', async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted' });
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
});

module.exports = router;
