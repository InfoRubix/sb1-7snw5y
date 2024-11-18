import React from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { BarChart2, TrendingUp, Users, FileText } from 'lucide-react';
import AIInsights from '../components/AIInsights';
import PerformanceMetrics from '../components/PerformanceMetrics';
import FeeCalculator from '../components/FeeCalculator';
import SearchPanel from '../components/SearchPanel';

export default function Dashboard() {
  const { files, users, getFileStatistics } = useStore();
  const stats = getFileStatistics();

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
      <h1 className="text-2xl font-bold text-gray-900">HOD Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Files"
          value={stats.totalActive}
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          change="+12.5%"
        />
        <StatCard
          title="Active PICs"
          value={stats.activePICs}
          icon={<Users className="h-6 w-6 text-green-600" />}
          change="+2.3%"
        />
        <StatCard
          title="Past Due"
          value={stats.pastDue}
          icon={<TrendingUp className="h-6 w-6 text-red-600" />}
          change="+5.2%"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={<BarChart2 className="h-6 w-6 text-yellow-600" />}
          change="+8.1%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <PerformanceMetrics />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fee Calculator</h2>
          <FeeCalculator />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Files</h2>
          <SearchPanel />
        </div>
      </div>

      <div className="mt-6">
        <AIInsights type="performance" data={users.filter(u => u.role === 'PIC')} />
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