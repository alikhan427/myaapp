import { ref, set, get, remove, onValue, push } from "firebase/database";
import { db } from "./firebase";

// ✅ Validators
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^\d{7,15}$/.test(phone);
}

// ✅ Password hashing
export async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ✅ Save user to Firebase
export async function saveUserToLocal(userObj) {
  try {
    const newUserRef = push(ref(db, "users"));
    await set(newUserRef, userObj);
    alert("✅ User saved successfully to Firebase!");
  } catch (error) {
    console.error("Error saving user:", error);
    alert("❌ Error saving user. Check console.");
  }
}

// ✅ Realtime listener for users
export function listenToUsers(callback) {
  const usersRef = ref(db, "users");
  onValue(usersRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const users = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      callback(users);
    } else {
      callback([]);
    }
  });
}

// ✅ Delete all users
export async function clearUsers() {
  try {
    await remove(ref(db, "users"));
    alert("🗑 All users deleted successfully!");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}
