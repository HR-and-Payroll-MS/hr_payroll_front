// src/utils/auth.js
import { axiosPublic } from "../api/axiosInstance";

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export async function refreshToken() {
  try {
    const refresh = getRefreshToken();
    if (!refresh) return null;

    const res = await axiosPublic.post("/auth/djoser/jwt/refresh/", { refresh });

    const newAccess = res.data.access;
    const newRefresh = res.data.refresh;

    if (newAccess) {
      localStorage.setItem("access", newAccess);
    }
    if (newRefresh) {
      localStorage.setItem("refresh", newRefresh);
    }

    return newAccess;
  } catch (err) {
    console.log("Failed to refresh token:", err);
    return null;
  }
}
