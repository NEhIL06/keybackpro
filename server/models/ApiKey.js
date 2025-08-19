import { Schema, model } from 'mongoose';

const apiKeySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'API key name is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Payment', 'Social Media', 'Cloud Services', 'Analytics', 'Email', 'SMS', 'Database', 'Other'],
    default: 'Other'
  },
  encryptedKey: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  service: {
    type: String,
    trim: true,
    maxlength: 50
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsed: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
apiKeySchema.index({ userId: 1, category: 1 });
apiKeySchema.index({ userId: 1, name: 1 });

export default model('ApiKey', apiKeySchema);