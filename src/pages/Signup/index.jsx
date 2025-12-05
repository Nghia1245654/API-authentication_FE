import React, { useEffect } from 'react'
import  RegisterPage  from '@/components/RegisterPage'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { register } from '@/services/api/authentication'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await register({
        email,
        name,
        password,
      });
      if (response.status === 200) {
        toast.success("Registration successful");
        navigate("/login");
        setEmail("");
        setName("");
        setPassword("");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Registration failed");
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <RegisterPage
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        Loading={Loading}
        handleSignUp={handleSignUp}
      />
    </div>
  )
}   

export default SignUp
