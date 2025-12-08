// src/services/api/projects.js
import apiInstance from "./index";

// POST: Tạo dự án mới
export const createProject = async (projectData) => {
  const response = await apiInstance.post("/projects", projectData);
  return response;
};

// GET: Lấy danh sách dự án của tôi
export const getProjects = async () => {
  const response = await apiInstance.get("/projects");
  return response;
};

// PUT: Cập nhật dự án
export const updateProject = async (id, projectData) => {
  const response = await apiInstance.put(`/projects/${id}`, projectData);
  return response;
};

// DELETE: Xóa dự án
export const deleteProject = async (id) => {
  const response = await apiInstance.delete(`/projects/${id}`);
  return response;
};
