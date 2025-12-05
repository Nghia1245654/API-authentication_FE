import React, { useState } from 'react'
import  UserManagementTable  from "@/components/UserManagement";
import HeaderContent from '@/components/HeaderContent'

const UserManagement = () => {
  const [searchValue, setSearchValue] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <div>
      <HeaderContent 
        title="Danh sách người dùng"
        description="Quản lý tất cả người dùng trong hệ thống."
        showSearch={true}
        searchPlaceholder="Tìm theo tên hoặc email"
        searchValue={searchValue}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        filters={[
          {
            placeholder: "Vai trò",
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
              { value: "all", label: "Tất cả" },
              { value: "admin", label: "Quản trị viên" },
              { value: "editor", label: "Biên tập viên" },
              { value: "user", label: "Thành viên" },
            ]
          },
          {
            placeholder: "Trạng thái",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "Tất cả" },
              { value: "active", label: "Hoạt động" },
              { value: "inactive", label: "Đã khóa" },
            ]
          }
        ]}
      />
      <UserManagementTable />
    </div>
  )
}

export default UserManagement
