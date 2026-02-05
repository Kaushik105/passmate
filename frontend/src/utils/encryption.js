import CryptoJS from 'crypto-js';

// Encrypt a single password value
export const encryptPassword = (password, encryptionKey) => {
  if (!encryptionKey) return password;

  try {
    return CryptoJS.AES.encrypt(password, encryptionKey).toString();
  } catch (error) {
    console.error('Password encryption error:', error);
    return password;
  }
};

// Decrypt a single password value
export const decryptPassword = (encryptedPassword, encryptionKey) => {
  if (!encryptionKey) return encryptedPassword;

  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Password decryption error:', error);
    return encryptedPassword;
  }
};