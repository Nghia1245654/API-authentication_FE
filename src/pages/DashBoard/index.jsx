import React, { useState, useEffect } from 'react'
import DashBoardComponent from '@/components/DashBoard'
import { getProjects, deleteProject } from '@/services/api/projects'
import { getMe } from '@/services/api/authentication'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin user và role
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getMe();
        if (response.status === 200) {
          setUserRole(response.data.data?.role || 'user');
          setCurrentUserId(response.data.data?._id);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        toast.error('Không thể lấy thông tin người dùng');
      }
    };
    fetchUserInfo();
  }, []);

  // Lấy danh sách dự án
  useEffect(() => {
    const fetchProjects = async () => {
      if (!userRole) return; // Chờ userRole được load
      
      setLoading(true);
      try {
        const response = await getProjects();
        if (response.status === 200) {
          let projectsList = response.data.data || [];
          
          // Nếu là user thường, chỉ lấy dự án mình là owner
          if (userRole === 'user') {
            projectsList = projectsList.filter(
              project => project.owner === currentUserId || project.owner?._id === currentUserId
            );
          }
          // Admin xem tất cả dự án
          
          setProjects(projectsList);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Không thể tải danh sách dự án');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userRole, currentUserId]);

  const handleDelete = async (id) => {
    // Kiểm tra quyền admin
    if (userRole !== 'admin') {
      toast.error('Bạn không có quyền xóa dự án!');
      return;
    }

    if (window.confirm('Bạn có chắc muốn xóa dự án này?')) {
      try {
        const response = await deleteProject(id);
        if (response.status === 200) {
          setProjects(projects.filter(project => project._id !== id));
          toast.success('Xóa dự án thành công!');
        }
      } catch (error) {
        console.error('Delete project failed:', error);
        toast.error(error.response?.data?.message || 'Xóa dự án thất bại!');
      }
    }
  };

  const getStatusDotColor = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      gray: 'bg-gray-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  const filteredProjects = projects.filter(project =>
    project.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <DashBoardComponent 
        projects={filteredProjects}
        setProjects={setProjects}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleDelete={handleDelete}
        getStatusDotColor={getStatusDotColor}
        loading={loading}
        userRole={userRole}
      />
    </div>
  )
}

export default Dashboard