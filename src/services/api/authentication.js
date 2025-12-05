// src/services/api/authentication.js
import apiInstance from "./index";

// POST: Đăng ký tài khoản mới
export const register = async (userData) => {
  const response = await apiInstance.post("/auth/register", userData);
  return response;
};

// POST: Đăng nhập người dùng
export const login = async (userData) => {
  const response = await apiInstance.post("/auth/login", userData);
  return response;
};

// POST: Lấy access token mới từ refresh token (cookie)
export const refreshToken = async () => {
  const response = await apiInstance.post("/auth/refresh-token");
  return response;
};

// GET: Lấy thông tin người dùng hiện tại
export const getMe = async () => {
  const response = await apiInstance.get("/auth/me");
  return response;
};

// POST: Đăng xuất người dùng (xóa refresh token cookie)
export const logout = async () => {
  const response = await apiInstance.post("/auth/logout");
  return response;
};