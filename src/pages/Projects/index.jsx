import React, { useState, useEffect } from 'react'
import ProjectsComponent from '@/components/Projects/index.jsx'
import { toast } from 'react-hot-toast'
import { createProject } from '@/services/api/projects.js'
import { getMe } from '@/services/api/authentication'

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Not Started'
  });

  // Lấy thông tin user và role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getMe();
        if (response.status === 200) {
          setUserRole(response.data.data?.role || 'user');
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };
    fetchUserRole();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value); // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProject = async () => {
    // Kiểm tra quyền admin
    if (userRole !== 'admin') {
      toast.error('Bạn không có quyền thực hiện chức năng này!');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập tên dự án');
      return;
    }
    try {
      const response = await createProject(formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Tạo dự án thành công!');
        
        // Reset form and close modal
        setFormData({
          name: '',
          description: '',
          status: 'Not Started'
        });
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Create project failed:', error);
      toast.error(error.response?.data?.message || 'Tạo dự án thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      status: 'Not Started'
    });
    setShowCreateModal(false);
  };

  console.log('Projects component - handleInputChange:', handleInputChange);

  return (
    <div>
      <ProjectsComponent 
        showCreateModal={showCreateModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleCreateProject={handleCreateProject}
        handleCancel={handleCancel}
        loading={loading}
        userRole={userRole}
      />
    </div>
  )
}

export default Projects
