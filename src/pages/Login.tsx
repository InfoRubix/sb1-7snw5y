import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Scale } from 'lucide-react';
import { useStore } from '../store';

export default function Login() {
  const navigate = useNavigate();
  const { users, setCurrentUser } = useStore();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.name.toLowerCase() === credentials.username.toLowerCase());
    if (user && credentials.password === '123456') {
      setCurrentUser(user);
      if (user.role === 'CLIENT') {
        navigate('/user-dashboard');
      } else if (user.role === 'AGENT') {
        navigate('/agent-dashboard');
      } else if (user.role === 'HOD') {
        navigate('/');
      } else if (user.role === 'PIC') {
        navigate('/pic-workspace');
      } else if (user.role === 'FINANCE') {
        navigate('/finance');
      } else {
        navigate('/file-entry');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Scale className="h-24 w-24 text-accent" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-accent">
          Asiah & Hisam LPMS
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Legal Practice Management System 2024
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-primary-light py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-primary-light text-gray-400">Demo Accounts</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-400">
              <div>HOD: Ahmad Abdullah</div>
              <div>PIC: Sarah Lee</div>
              <div>Reception: Jenny Tan</div>
              <div>Finance: Alice Johnson</div>
              <div>Agent: James Wong</div>
              <div>Client: Client User</div>
              <div className="col-span-2 text-center mt-2 text-accent">Password: 123456</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}