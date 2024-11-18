import React, { useState } from 'react';
import { Bell, Search, UserCircle, LogOut } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const dummyNotifications = [
    { id: 1, message: "New file CV2024006 assigned to Sarah Lee", time: "2 minutes ago", unread: true },
    { id: 2, message: "Loan documentation for CV2024003 updated", time: "1 hour ago", unread: true },
    { id: 3, message: "Payment received for CV2024002", time: "3 hours ago", unread: false },
    { id: 4, message: "Deadline reminder: CV2024001 completion due tomorrow", time: "5 hours ago", unread: false }
  ];

  const unreadCount = dummyNotifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary border-b border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center">
            <div className="max-w-xs w-full">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  placeholder="Quick search files..."
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                type="button" 
                className="relative p-1 rounded-full text-gray-400 hover:text-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-primary" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-primary-light rounded-lg shadow-lg py-1 z-50 border border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <h3 className="text-sm font-medium text-gray-200">Notifications</h3>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {dummyNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-800 cursor-pointer ${
                          notification.unread ? 'bg-gray-900/50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-300">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-700">
                    <button className="text-xs text-accent hover:text-accent-light w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <UserCircle className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-300">
                  {currentUser?.name || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-black bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}