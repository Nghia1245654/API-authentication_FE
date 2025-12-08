import React from 'react';
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa';

const DashBoardComponent = ({
  projects = [],
  searchQuery,
  setSearchQuery,
  handleDelete,
  getStatusDotColor,
  loading = false,
  userRole
}) => {
 

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Chỉ admin mới thấy */}
          {userRole === 'admin' && (
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              <FaPlus />
              <span>New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Đang tải dự án...</p>
        </div>
      ) : (
        <>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id || project.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                {/* Project Card Header with Gradient */}
                <div className={`h-48 bg-gradient-to-br ${project.gradient || 'from-blue-400 to-purple-600'} relative`}>
                  {/* Delete Button - Chỉ admin mới thấy */}
                  {userRole === 'admin' && (
                    <button
                      onClick={() => handleDelete(project._id || project.id)}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                      title="Delete project"
                    >
                      <FaTrash className="text-white" />
                    </button>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {project.title || project.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusDotColor(project.statusColor || 'blue')}`}></span>
                    <span className="text-sm text-gray-600">{project.status || 'Not Started'}</span>
                  </div>

                  {project.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {userRole === 'user' 
                  ? 'Bạn chưa được gán làm người phụ trách dự án nào'
                  : 'Chưa có dự án nào'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashBoardComponent;
