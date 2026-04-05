import Record from '../models/Record.js';

const createRecord = async (req, res) => {
  try {
    const record = await Record.create({ ...req.body, user: req.user._id });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', type, category } = req.query;
    
    // Base filter: matching user, not deleted
   let filter = { isDeleted: false };

// Viewer → should NOT see raw records (optional but ideal)
if (req.user.role === 'Viewer') {
  return res.status(403).json({ message: 'Not allowed to view records' });
}

// Analyst → see ALL records
if (req.user.role === 'Analyst') {
  filter = { isDeleted: false };
}

// Admin → full access
if (req.user.role === 'Admin') {
  filter = { isDeleted: false };
}
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    if (search) {
      filter.$or = [
        { category: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } }
      ];
    }
    
    const limitNum = parseInt(limit, 10);
    const skipNum = (parseInt(page, 10) - 1) * limitNum;

    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip(skipNum)
      .limit(limitNum);
      
    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limitNum),
      records
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    // Soft delete functionality instead of actual delete
    let query = { _id: req.params.id, isDeleted: false };

if (req.user.role === 'Analyst') {
  // Optional: restrict analyst
  query.user = req.user._id;
}

const record = await Record.findOneAndUpdate(
  query,
  { isDeleted: true },
  { new: true }
);
    
    if (!record) return res.status(404).json({ message: 'Record not found or already deleted' });
    res.json({ message: 'Record deleted successfully (soft delete)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createRecord, getRecords, deleteRecord };
