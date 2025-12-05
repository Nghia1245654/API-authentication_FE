import { LayoutDashboard, Users, Settings, BarChart2, LogOut, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import React from "react";
import key from "@/assets/key.png";
const menuItems = [
  { name: "Bảng điều khiển", navLink: "/home/dashboard", icon: LayoutDashboard },
  { name: "Quản lý người dùng", navLink: "/home/userManagement", icon: Users },
  { name: "Cài đặt", navLink: "/home/settings", icon: Settings },
  { name: "Báo cáo", navLink: "/home/reports", icon: BarChart2 },
  { name: "Hồ sơ", navLink: "/home/profile", icon: User },

];

export default function AppSidebar() {
  return (
    <SidebarProvider className="fixed lg:static inset-y-0 left-0 z-50 w-64 border-r bg-white">
      <Sidebar className="h-full flex flex-col pt-6">
        <div className="px-6 pb-6 flex items-center gap-3 border-b">
          <img
            src={key}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h2 className="text-base font-semibold">Admin Name</h2>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>

        {/* MENU */}
        <SidebarContent className="flex-1 overflow-y-auto px-4 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">

                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <NavLink
                      to={item.navLink}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive
                            ? "bg-[#E8F0FF] text-blue-600 font-medium"
                            : "text-gray-800 hover:bg-gray-100"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={`w-5 h-5 ${
                              isActive ? "text-blue-600" : "text-gray-700"
                            }`}
                          />
                          <span className={isActive ? "text-blue-600" : ""}>
                            {item.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* LOGOUT */}
        <div className="px-6 py-4 border-t">
          <button className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition">
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </Sidebar>
    </SidebarProvider>
  );
}
