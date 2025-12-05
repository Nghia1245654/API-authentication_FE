import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// Import thêm icon PanelTop để giống mẫu hơn
import { Eye, ArrowRight, PanelTop } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
export default function RegisterPage({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  Loading,
  handleSignUp,
}) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col items-center justify-center px-4 py-10">
      <Card className="w-full max-w-5xl shadow-lg border-0 bg-white rounded-xl overflow-hidden">
        <div className="border-b py-4 px-8 flex items-center gap-3 bg-white">
          <PanelTop className="w-5 h-5 text-blue-600 fill-current" />
          <span className="text-1xl font-extrabold text-gray-900 tracking-tight">
            Hệ thống quản lý người dùng
          </span>
        </div>

        <CardContent className="p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Đăng ký tài khoản mới
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            Tạo tài khoản mới cho hệ thống
          </p>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-8">
            {/* Họ và tên */}
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">Họ và Tên</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên của bạn"
                className="h-12 bg-gray-50 border-gray-200 focus-visible:ring-blue-600"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">
                Địa chỉ Email
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                className="h-12 bg-gray-50 border-gray-200 focus-visible:ring-blue-600"
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label className="font-semibold text-gray-700">Mật khẩu</Label>
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className="h-12 pr-10 bg-gray-50 border-gray-200 focus-visible:ring-blue-600"
                />
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-gray-700">Vai trò</Label>
              <Select defaultValue="user">
                <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200 focus:ring-blue-600 flex items-center justify-between">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Người dùng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-12 pt-2">
            <NavLink
              to="/login"
              className="text-blue-600 hover:underline font-medium text-sm"
            >
              Đã có tài khoản? Đăng nhập
            </NavLink>

            <Button
              onClick={handleSignUp}
              disabled={Loading}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
          {Loading ? (
                  <div className="flex gap-2 items-center">
                    {" "}
                    <Spinner  /> Đang đăng ký...
                  </div>
                ) : (
                  "Đăng ký"
                )}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
