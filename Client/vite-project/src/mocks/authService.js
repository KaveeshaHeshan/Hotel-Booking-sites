import { getDB, saveDB } from "./db.js";

const AUTH_KEY = "hb_auth_user";

export function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function login(email, password) {
  const db = getDB();
  const u = db.users.find(u => u.email === email && u.password === password);
  await new Promise(r => setTimeout(r, 150));
  if (!u) throw new Error("Invalid credentials");
  const user = { id: u.id, name: u.name, email: u.email };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export async function register(name, email, password) {
  const db = getDB();
  if (db.users.some(u => u.email === email)) throw new Error("Email already used");
  const nu = { id: "u" + Math.random().toString(36).slice(2,8), name, email, password };
  db.users.push(nu);
  saveDB(db);
  await new Promise(r => setTimeout(r, 150));
  return true;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
