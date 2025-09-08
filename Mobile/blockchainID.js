// mobile/blockchainID.js
import { v4 as uuidv4 } from 'uuid';

// Generate a mock blockchain-style digital ID
export function generateDigitalID(userName) {
  return {
    id: uuidv4(), // unique blockchain-like ID
    name: userName,
    timestamp: new Date().toISOString(),
    signature: Math.random().toString(36).substring(2, 15), // fake signature
  };
}
