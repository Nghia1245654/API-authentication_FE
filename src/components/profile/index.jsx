import React from "react";
import { FaUserCircle } from "react-icons/fa";


const ProfileComponent = ({ user, loading, handleLogout }) => {
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-500">Đang tải thông tin...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-500">Không tìm thấy thông tin người dùng</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-center mt-10">
        <div className="bg-white w-[380px] rounded-xl shadow-md p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center">
              <FaUserCircle size={60} className="text-gray-700" />
            </div>
          </div>

          <div className="text-left text-sm space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Tên</span>
              <span>{user.data?.name || "Chưa có tên"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span>{user.data?.email || "Chưa có email"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Vai trò</span>
              <span>{user.data?.role || "Người dùng"}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            {loading ? "Loading..." : "Đăng xuất"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
