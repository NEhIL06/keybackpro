import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import ApiKey from '../models/ApiKey.js';
import auth from '../middleware/auth.js';
import encryption from '../utils/encryption.js'; // crypto utility for encryption/decryption
const {encrypt, decrypt} = encryption;
const router = Router();

// Get all API keys for user
router.get('/', auth, async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = { userId: req.user._id, isActive: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } }
      ];
    }

    const apiKeys = await ApiKey.find(query)
      .select('-encryptedKey -iv')
      .sort({ createdAt: -1 });

    res.json({ apiKeys });
  } catch (error) {
    console.error('Get API keys error:', error);
    res.status(500).json({ message: 'Error fetching API keys' });
  }
});

// Get single API key (with decrypted value)
router.get('/:id', auth, async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne({ 
      _id: req.params.id, 
      userId: req.user._id,
      isActive: true
    });

    if (!apiKey) {
      return res.status(404).json({ message: 'API key not found' });
    }

    // Decrypt the key
    const decryptedKey = decrypt(apiKey.encryptedKey, apiKey.iv);

    // Update last used
    apiKey.lastUsed = new Date();
    await apiKey.save();

    res.json({
      apiKey: {
        ...apiKey.toObject(),
        decryptedKey,
        encryptedKey: undefined,
        iv: undefined
      }
    });
  } catch (error) {
    console.error('Get API key error:', error);
    res.status(500).json({ message: 'Error fetching API key' });
  }
});

// Create new API key
router.post('/', [
  auth,
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('keyValue').isLength({ min: 1 }).withMessage('API key value is required'),
  body('category').isIn(['Payment', 'Social Media', 'Cloud Services', 'Analytics', 'Email', 'SMS', 'Database', 'Other']).withMessage('Invalid category'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('service').optional().trim().isLength({ max: 50 }).withMessage('Service must be less than 50 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, keyValue, category, description, service } = req.body;

    // Check if name already exists for user
    const existingKey = await ApiKey.findOne({ 
      userId: req.user._id, 
      name: name.trim(),
      isActive: true
    });

    if (existingKey) {
      return res.status(400).json({ message: 'API key with this name already exists' });
    }

    // Encrypt the key
    const { encryptedData, iv } = encrypt(keyValue);

    const apiKey = new ApiKey({
      userId: req.user._id,
      name: name.trim(),
      description: description?.trim() || '',
      category,
      service: service?.trim() || '',
      encryptedKey: encryptedData,
      iv
    });

    await apiKey.save();

    res.status(201).json({
      message: 'API key created successfully',
      apiKey: {
        ...apiKey.toObject(),
        encryptedKey: undefined,
        iv: undefined
      }
    });
  } catch (error) {
    console.error('Create API key error:', error);
    res.status(500).json({ message: 'Error creating API key' });
  }
});

// Update API key metadata
router.put('/:id', [
  auth,
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be less than 100 characters'),
  body('category').optional().isIn(['Payment', 'Social Media', 'Cloud Services', 'Analytics', 'Email', 'SMS', 'Database', 'Other']).withMessage('Invalid category'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('service').optional().trim().isLength({ max: 50 }).withMessage('Service must be less than 50 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, category, description, service } = req.body;

    const apiKey = await ApiKey.findOne({ 
      _id: req.params.id, 
      userId: req.user._id,
      isActive: true
    });

    if (!apiKey) {
      return res.status(404).json({ message: 'API key not found' });
    }

    // Check for duplicate names if name is being updated
    if (name && name !== apiKey.name) {
      const existingKey = await ApiKey.findOne({ 
        userId: req.user._id, 
        name: name.trim(),
        _id: { $ne: req.params.id },
        isActive: true
      });

      if (existingKey) {
        return res.status(400).json({ message: 'API key with this name already exists' });
      }
    }

    // Update fields
    if (name !== undefined) apiKey.name = name.trim();
    if (category !== undefined) apiKey.category = category;
    if (description !== undefined) apiKey.description = description.trim();
    if (service !== undefined) apiKey.service = service.trim();

    await apiKey.save();

    res.json({
      message: 'API key updated successfully',
      apiKey: {
        ...apiKey.toObject(),
        encryptedKey: undefined,
        iv: undefined
      }
    });
  } catch (error) {
    console.error('Update API key error:', error);
    res.status(500).json({ message: 'Error updating API key' });
  }
});

// Delete API key (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const apiKey = await ApiKey.findOne({ 
      _id: req.params.id, 
      userId: req.user._id,
      isActive: true
    });

    if (!apiKey) {
      return res.status(404).json({ message: 'API key not found' });
    }

    // Soft delete
    apiKey.isActive = false;
    await apiKey.save();

    res.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('Delete API key error:', error);
    res.status(500).json({ message: 'Error deleting API key' });
  }
});

// Get categories with counts
router.get('/stats/categories', auth, async (req, res) => {
  try {
    const stats = await ApiKey.aggregate([
      { $match: { userId: req.user._id, isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const totalCount = await ApiKey.countDocuments({ userId: req.user._id, isActive: true });

    res.json({
      categories: stats,
      total: totalCount
    });
  } catch (error) {
    console.error('Get categories stats error:', error);
    res.status(500).json({ message: 'Error fetching categories statistics' });
  }
});

export default router;
