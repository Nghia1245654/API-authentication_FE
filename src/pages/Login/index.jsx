import React, { useEffect } from 'react'
import { LoginCard } from '@/components/LoginCard'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@/services/api/authentication'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra nếu đã login thì redirect về home
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await login({ email, password });
    if (response.status === 200) {
      // Chỉ lưu accessToken vào localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      
      toast.success("Đăng nhập thành công");
      navigate("/home");
    }
  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Đăng nhập thất bại");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <LoginCard handleLogin={handleLogin} loading={Loading} 
      setEmail={setEmail}
      setPassword={setPassword}
        email={email}
        password={password}
      />
    </div>
  )
}

export default Login
