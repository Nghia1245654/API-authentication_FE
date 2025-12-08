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
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  const handleSignUp = async () => {
    if (!email || !password || !name || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await register({
        email,
        name,
        password,
        role,
      });
      if (response.status === 200) {
        toast.success("Registration successful");
        navigate("/login");
        setEmail("");
        setName("");
        setPassword("");
        setRole("");
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
        role={role}
        setRole={setRole}
      />
    </div>
  )
}   

export default SignUp
