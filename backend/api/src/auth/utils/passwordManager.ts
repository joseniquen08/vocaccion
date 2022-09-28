import CryptoJS from "crypto-js";

export const passwordManager = {
  encryptText: async (text: string): Promise<string> => {
    return CryptoJS.AES.encrypt(text, `${process.env.ENCRYPT_SECRET}`).toString();
  },
  decryptHash: (hash: string): string => {
    const bytes = CryptoJS.AES.decrypt(hash, `${process.env.ENCRYPT_SECRET}`);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
  validatePassword: (password: string, encryptedPassword: string): boolean => {
    if (password === passwordManager.decryptHash(encryptedPassword)) return true;
    return false;
  }
}
