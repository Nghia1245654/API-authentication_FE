import React, { useEffect, useState } from 'react'
import HeaderContent from '@/components/HeaderContent'
import ProfileComponent from '@/components/profile'
import { getMe } from '@/services/api/authentication'
import { toast } from 'react-hot-toast'
 import { useNavigate } from 'react-router-dom'
 import { logout } from '@/services/api/authentication'
const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const response = await getMe()
        console.log('Response:', response);
        if (response.status === 200) {
          console.log('User data:', response.data);
          setUser(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        console.error('Error response:', error.response);
        toast.error('Không thể tải thông tin người dùng')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Đăng xuất thất bại");
    }
  };

  return (
    <div>
      <HeaderContent 
        title="Hồ sơ của bạn" 
        showSearch={false} 
        description="Quản lý thông tin cá nhân của bạn."
      />
      <ProfileComponent user={user} loading={loading} handleLogout={handleLogout} />
    </div>
  )
}

export default Profile
