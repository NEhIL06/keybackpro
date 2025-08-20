import { scryptSync, randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY || 'your-32-character-encryption-key-here';

// Ensure the key is exactly 32 bytes
const key = scryptSync(secretKey, 'salt', 32);

const encrypt = (text) => {
  try {
    const iv = randomBytes(16); // IV is required now
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
    };
  } catch (error) {
    throw new Error('Encryption failed');
  }
};

const decrypt = (encryptedData, ivHex) => {
  try {
    
    console.log('key', key);  
    console.log('Decrypting data:', encryptedData, ivHex);
    const iv = Buffer.from(ivHex, 'hex');
    console.log('IV:', iv);
    const decipher = createDecipheriv(algorithm, key, iv);
    console.log('Decipher:', decipher);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    console.log('Decrypted:', decrypted);
    decrypted += decipher.final('utf8');
    console.log('Final decrypted:', decrypted);

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed');
  }
};

export default {
  encrypt,
  decrypt,
};
