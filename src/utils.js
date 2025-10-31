export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^\d{7,15}$/.test(phone);
}

export async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

const STORAGE_KEY = "my_app_users";

export function saveUserToLocal(userObj) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const arr = raw ? JSON.parse(raw) : [];
  arr.push(userObj);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function getUsersFromLocal() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearUsers() {
  localStorage.removeItem(STORAGE_KEY);
}
