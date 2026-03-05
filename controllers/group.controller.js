import Group from '../models/Group.js';
import { generateCode } from '../utils/generateGroupCode.js';

// *********** GET USER GROUPS **********
const getUserGroups = async (req, res) => {
  const groups = await Group.find({ 'members.user': req.user.id }).select('+invitationCode');
  if (!groups) return res.status(404).json({ message: 'You do not have any group yet' });

  res.status(200).json({ total: groups.length, groups });
};

// ****** CREATE GROUP *********
const createGroup = async (req, res) => {
  const { name, description = '' } = req.body;

  // Generate crypto code for group invitation

  const groupCode = generateCode();

  const group = await Group.create({
    name,
    description,
    invitationCode: groupCode,
    members: [
      {
        user: req.user.id,
        rol: 'admin',
      },
    ],
  });

  res.status(200).json(group);
};

// ***** GROUP SEARCH **********
/**
 * Searches a group by a code given by an another user.
 * @param {*} req
 * @param {*} res
 */
const searchGroup = async (req, res) => {
  const { code } = req.query;

  const group = await Group.findOne({ invitationCode: code });

  if (!group) return res.status(404).json({ error: 'Group not found.' });

  // Checks if user already a member
  const isMember = group.members.some((u) => u.user.equals(req.user.id));

  // Return group information

  res.json({
    id: group._id,
    name: group.name,
    description: group.description,
    totalMembers: group.members.length,
    isMember,
  });
};

const getGroupById = async (req, res) => {
  const { id } = req.params;

  const group = await Group.findById(id);
  if (!group) res.status(404).json({ error: 'Group not found' });

  res.status(200).json(group);
};

// ********* JOIN GROUP *********
const joinGroup = async (req, res) => {
  const { groupId } = req.body;

  const group = await Group.findByIdAndUpdate(
    groupId,
    {
      $push: { members: { user: req.user.id, rol: 'member' } }, // $push from MongoDB to update an array without replacing the entire array
    },
    { returnDocument: 'after' }, // returns new group
  );

  if (!group) res.status(400).json({ error: 'Group not found' });

  res.status(200).json('You have joined the group', group);
};

const editGroup = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findById(id);
  if (!group) res.status(404).json({ error: 'Group not found' });

  const isMember = group.members.some((u) => u.user.equals(req.user.id));
  if (!isMember) return res.status(400).json({ error: 'Permission' });

  const groupUpdated = await Group.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
  });

  res.status(200).json({ message: 'Group updated', group: groupUpdated });
};

export { createGroup, searchGroup, getGroupById, joinGroup, getUserGroups, editGroup };
