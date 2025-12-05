import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock,User,Eye } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"
export function LoginCard({handleLogin,loading,setEmail,setPassword,email,password}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f7fb] px-4">
      {/* Header Icon + Title */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 text-blue-600 text-xl font-semibold">
       <User className="w-8 h-8 fill-current" />
          <span className="text-2xl text-gray-600">User Management</span>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-md p-2 rounded-xl bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Chào mừng trở lại</CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Vui lòng nhập thông tin để truy cập hệ thống quản lý.
          </CardDescription>
        </CardHeader>

        <CardContent>
         <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="pl-12 h-12 bg-gray-50 border-gray-200 focus-visible:ring-[#4D55CC]"
                  required
                />
              </div>
            </div>

            {/* Password */}
           <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  // Tăng padding-left và chiều cao input
                  className="pl-12 h-12 bg-gray-50 border-gray-200 focus-visible:ring-[#4D55CC]"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none"
                
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-end mt-1">
                 <NavLink
                 to="/SignUp"
                  className="text-sm text-[#4D55CC] hover:underline font-medium"
                >
                  Quên mật khẩu?
                </NavLink>
              </div>
            </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3  pb-4" >
          <Button
            type="submit"
            className="w-full h-11 text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
                  <div className="flex gap-2 items-center">
                    {" "}
                    <Spinner /> Đang đăng nhập...
                  </div>
                ) : (
                  "Đăng nhập"
                )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
