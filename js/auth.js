
//LocalStorage-based Authentication & User Store

import { onlyDigits, isValidMobile11, isValidPin6 } from "./validators.js";


//LocalStorage database table
const KEYS = {
  USERS: "harkash_users",
  SESSION: "harkash_session",
  USED_BONUS: "harkash_used_bonus", // per user later
};


//for read and write local storage function  ans if no user then return fallback 
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function write(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function getSession() {
  return read(KEYS.SESSION, null);
}

export function setSession(session) {
  write(KEYS.SESSION, session);
}

export function logoutLocal() {
  localStorage.removeItem(KEYS.SESSION);
}

export function getUsers() {
  return read(KEYS.USERS, []);
}

export function saveUsers(users) {
  write(KEYS.USERS, users);
}

export function findUserByMobile(mobile) {
  return getUsers().find((u) => u.mobile === mobile) || null;
}

export function createUserLocal({ mobile, pin }) {
  const users = getUsers();
  if (users.some((u) => u.mobile === mobile)) {
    return { ok: false, msg: "User already exists. Please login." };
  }

  const user = {
    id: crypto.randomUUID(),
    mobile,
    pin, // demo only
    balance: 0,
    createdAt: Date.now(),
  };

  users.push(user);
  saveUsers(users);
  return { ok: true, user };
}

export function verifyLoginLocal({ mobile, pin }) {
  const u = findUserByMobile(mobile);
  if (!u) return { ok: false, msg: "User not found. Please register." };
  if (u.pin !== pin) return { ok: false, msg: "Wrong PIN" };
  return { ok: true, user: u };
}

export function updateBalanceLocal(userId, newBalance) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return;
  users[idx].balance = newBalance;
  saveUsers(users);
}

export function getMeLocal(userId) {
  return getUsers().find((u) => u.id === userId) || null;
}

export function normalizeAuthInput(mobile, pin) {
  const m = onlyDigits(mobile);
  const p = onlyDigits(pin);

  if (!isValidMobile11(m)) return { ok: false, msg: "Mobile must be 11 digits" };
  if (!isValidPin6(p)) return { ok: false, msg: "Please give 6 digit PIN" };

  return { ok: true, mobile: m, pin: p };
}

export function bonusKeyForUser(userId) {
  return `${KEYS.USED_BONUS}_${userId}`;
}

export function getUsedBonusCodes(userId) {
  return read(bonusKeyForUser(userId), []);
}

export function markBonusUsed(userId, code) {
  const used = getUsedBonusCodes(userId);
  if (!used.includes(code)) used.push(code);
  write(bonusKeyForUser(userId), used);
}