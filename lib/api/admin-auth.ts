"use client";

import type { AuthUser } from "./types";

const TOKEN_KEY = "perfect_immo_admin_token";
const USER_KEY = "perfect_immo_admin_user";
const COOKIE_KEY = "perfect_immo_admin_session";

export function saveAdminSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `${COOKIE_KEY}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminUser(): AuthUser | null {
  const value = localStorage.getItem(USER_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
}
