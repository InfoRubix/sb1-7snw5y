import React, { useState } from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { BarChart2, TrendingUp, Users, FileText } from 'lucide-react';

export default function Analytics() {
  const { files, users } = useStore();
  const [timeframe, setTimeframe] = useState('month');

  const stats = {
    totalFiles: files.length,
    ongoing: files.filter(f => f.status === 'ONGOING').length,
    cancelled: files.filter(f => f.status === 'CANCELLED').length,
    completed: files.filter(f => f.status === 'CLOSED').length,
    safekeeping: files.filter(f => f.status === 'SAFEKEEPING').length,
    revenue: files.reduce((sum, file) => sum + (file.propertyDetails.price * 0.01), 0)
  };

  const picPerformance = users
    .filter(u => u.role === 'PIC')
    .map(pic => ({
      name: pic.name,
      files: files.filter(f => f.assignedTo === pic.id).length,
      completed: files.filter(f => f.assignedTo === pic.id && f.status === 'CLOSED').length
    }))
    .sort((a, b) => b.completed - a.completed);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Files"
          value={stats.totalFiles}
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          change="+12.5%"
        />
        <StatCard
          title="Active PICs"
          value={picPerformance.length}
          icon={<Users className="h-6 w-6 text-green-600" />}
          change="+2.3%"
        />
        <StatCard
          title="Completion Rate"
          value={`${Math.round((stats.completed / stats.totalFiles) * 100)}%`}
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
          change="+5.2%"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<BarChart2 className="h-6 w-6 text-yellow-600" />}
          change="+8.1%"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">File Status Distribution</h2>
          <div className="space-y-4">
            <StatusBar label="Ongoing" value={stats.ongoing} total={stats.totalFiles} color="blue" />
            <StatusBar label="Completed" value={stats.completed} total={stats.totalFiles} color="green" />
            <StatusBar label="Cancelled" value={stats.cancelled} total={stats.totalFiles} color="red" />
            <StatusBar label="Safekeeping" value={stats.safekeeping} total={stats.totalFiles} color="yellow" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">PIC Performance</h2>
          <div className="space-y-4">
            {picPerformance.map(pic => (
              <PerformanceBar
                key={pic.name}
                name={pic.name}
                completed={pic.completed}
                total={pic.files}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, change }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
}) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ label, value, total, color }: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percentage = (value / total) * 100;
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-500">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colors[color]} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PerformanceBar({ name, completed, total }: {
  name: string;
  completed: number;
  total: number;
}) {
  const percentage = (completed / total) * 100;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm font-medium text-gray-500">
          {completed}/{total} completed
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}