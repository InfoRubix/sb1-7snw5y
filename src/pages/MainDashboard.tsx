import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, BarChart2, ArrowRight, FileCheck, Scale } from 'lucide-react';

export default function MainDashboard() {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Reception',
      icon: <FileText className="h-8 w-8" />,
      description: 'File entry and document management',
      path: '/file-entry',
      color: 'bg-blue-500'
    },
    {
      title: 'PIC Workspace',
      icon: <Users className="h-8 w-8" />,
      description: 'Manage and track assigned files',
      path: '/pic-workspace',
      color: 'bg-green-500'
    },
    {
      title: 'HOD Dashboard',
      icon: <Scale className="h-8 w-8" />,
      description: 'Monitor department performance',
      path: '/',
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics',
      icon: <BarChart2 className="h-8 w-8" />,
      description: 'Reports and insights',
      path: '/analytics',
      color: 'bg-yellow-500'
    },
    {
      title: 'Document Templates',
      icon: <FileCheck className="h-8 w-8" />,
      description: 'SPA and Loan agreements',
      path: '/templates',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Scale className="h-16 w-16 mx-auto text-primary" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            Asiah & Hisam LPMS
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Legal Practice Management System 2024
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <button
              key={module.title}
              onClick={() => navigate(module.path)}
              className="relative group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${module.color} text-white`}>
                {module.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-blue-600">
                {module.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {module.description}
              </p>
              <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              {[
                { action: 'New file opened', user: 'Jenny Tan', time: '2 minutes ago' },
                { action: 'SPA completed', user: 'Sarah Lee', time: '15 minutes ago' },
                { action: 'Loan documentation updated', user: 'John Smith', time: '1 hour ago' },
                { action: 'Status update sent', user: 'Maria Garcia', time: '2 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Active Files</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Templates</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Pending Updates</p>
                <p className="text-2xl font-semibold text-gray-900">23</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}