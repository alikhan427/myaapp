// src/utils.js
import { ref, set,remove, onValue, push } from "firebase/database";
import { db } from "./firebase";

// ✅ Validate Email
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ Validate Phone
export function isValidPhone(phone) {
  return /^\d{7,15}$/.test(phone);
}

// ✅ Hash Password
export async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ✅ Save user to Firebase + LocalStorage
export async function saveUserToLocal(userObj) {
  try {
    // ✅ Push user to Firebase
    const usersRef = ref(db, "users");
    const newUserRef = push(usersRef);
    await set(newUserRef, userObj);

    // ✅ Also save to LocalStorage
    const existing = JSON.parse(localStorage.getItem("users") || "[]");
    existing.push(userObj);
    localStorage.setItem("users", JSON.stringify(existing));

    alert("✅ User saved successfully (Firebase + LocalStorage)!");
  } catch (error) {
    console.error("❌ Error saving user:", error);
    alert("Error saving user. Check console.");
  }
}

// ✅ Get users from LocalStorage
export function getUsersFromLocal() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// ✅ Listen to users from Firebase (Live updates)
export function listenToUsers(callback) {
  const usersRef = ref(db, "users");
  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    const firebaseUsers = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];

    // ✅ Keep local storage synced
    localStorage.setItem("users", JSON.stringify(firebaseUsers));

    callback(firebaseUsers);
  });
}

// ✅ Clear all users
export async function clearUsers() {
  try {
    const usersRef = ref(db, "users");
    await remove(usersRef);
    localStorage.removeItem("users");
    alert("🗑 All users deleted from Firebase and LocalStorage!");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}
