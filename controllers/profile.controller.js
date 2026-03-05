import User from '../models/User.js';

const showProfile = async (req, res) => {
  const userData = await User.findById(req.user.id);
  if (!userData) return res.status(404).json({ error: 'Not found' });

  res.status(200).json({ user: userData });
};

const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { ...req.body },
    { returnDocument: 'after' },
  ).select('-password');

  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user.id);
  if (!deletedUser) return res.status(404).json({ error: 'Not found' });
  res.status(200).json({ message: 'User deleted.' });
};

export { showProfile, updateProfile, deleteUser };
