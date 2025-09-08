// mobile/blockchainID.js
import { v4 as uuidv4 } from 'uuid';

export function generateDigitalID(userName) {
  return {
    id: uuidv4(),
    name: userName,
    timestamp: new Date().toISOString(),
    signature: Math.random().toString(36).substring(2,15),
  };
}
