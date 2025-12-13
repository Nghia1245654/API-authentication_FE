import React, { useState, useEffect } from 'react'
import ProjectsComponent from '@/components/Projects/index.jsx'
import { toast } from 'react-hot-toast'
import { createProject } from '@/services/api/projects.js'
import { getMe, getAllUsers } from '@/services/api/authentication'

const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Not Started',
    ownerId: ''
  });

  // Lấy thông tin user và role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getMe();
        if (response.status === 200) {
          const role = response.data.data?.role || 'user';
          setUserRole(role);
          
          // Nếu là admin, lấy danh sách users
          if (role === 'admin') {
            try {
              const usersResponse = await getAllUsers();
              console.log('Users API response:', usersResponse);
              if (usersResponse.status === 200) {
                // Backend trả về data trong field "message"
                const usersList = usersResponse.data.message || usersResponse.data.data || [];
                console.log('Users list:', usersList);
                setUsers(Array.isArray(usersList) ? usersList : []);
              }
            } catch (userError) {
              console.error('Failed to fetch users:', userError);
              toast.error('Không thể tải danh sách người dùng');
              setUsers([]);
            }
          }
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
    
    if (!formData.ownerId && userRole === 'admin') {
      toast.error('Vui lòng chọn owner cho dự án');
      return;
    }
    
    console.log('Creating project with data:', formData);
    try {
      const response = await createProject(formData);
      console.log('Create project response:', response);
      if (response.status === 200 || response.status === 201) {
        toast.success('Tạo dự án thành công!');
        
        // Reset form and close modal
        setFormData({
          name: '',
          description: '',
          status: 'Not Started',
          ownerId: ''
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
      status: 'Not Started',
      ownerId: ''
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
        users={users}
      />
    </div>
  )
}

export default Projects
