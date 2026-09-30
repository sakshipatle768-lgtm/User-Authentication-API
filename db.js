const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'users.json');

function ensureFile() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
}

function readUsers() {
  ensureFile();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeUsers(users) {
  ensureFile();
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

function findByEmail(email) {
  return readUsers().find((u) => u.email === email.toLowerCase());
}

function createUser({ name, email, passwordHash }) {
  const users = readUsers();
  const user = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

module.exports = { findByEmail, createUser };
