import React from "react";
import { Search, Filter, Pencil, Trash2, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Dữ liệu giả lập (Mock Data) giống trong hình
const users = [
  {
    id: "#001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "Quản trị viên",
    status: "Active",
  },
  {
    id: "#002",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "Biên tập viên",
    status: "Active",
  },
  {
    id: "#003",
    name: "Lê Văn C",
    email: "levanc@example.com",
    role: "Thành viên",
    status: "Inactive",
  },
  {
    id: "#004",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    role: "Thành viên",
    status: "Active",
  },
];

export default function UserManagementTable() {
  // Hàm helper để lấy màu sắc badge dựa trên vai trò
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Quản trị viên":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "Biên tập viên":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      default: // Thành viên
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-100 h-screen overflow-y-auto">
      {/* --- HEADER --- */}
    

      {/* --- TABLE CONTENT --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[100px] font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Tên</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Vai trò</TableHead>
              <TableHead className="text-right font-semibold pr-6">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium text-gray-600">{user.id}</TableCell>
                <TableCell className="font-semibold text-gray-900">{user.name}</TableCell>
                <TableCell className="text-gray-500">{user.email}</TableCell>
                <TableCell>
                  {/* Badge hiển thị Role */}
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* --- PAGINATION (Footer của bảng) --- */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
          <div className="text-sm text-gray-500">
            Hiển thị 1-4 trên 20 kết quả
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Button>
            {/* Active Page */}
            <Button className="h-9 w-9 bg-blue-600 hover:bg-blue-700 text-white">
                1
            </Button>
            <Button variant="outline" className="h-9 w-9 border-gray-200 text-gray-600">
                2
            </Button>
            <Button variant="outline" className="h-9 w-9 border-gray-200 text-gray-600">
                3
            </Button>
            <span className="text-gray-400">...</span>
            <Button variant="outline" className="h-9 w-9 border-gray-200 text-gray-600">
                5
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
                <ChevronRight className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}