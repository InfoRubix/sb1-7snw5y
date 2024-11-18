import React, { useState } from 'react';
import { useStore } from '../store';
import { BarChart2, TrendingUp, AlertCircle } from 'lucide-react';

export default function PerformanceMetrics() {
  const { users, files } = useStore();
  const [timeframe, setTimeframe] = useState('month');

  const getPerformanceData = () => {
    const pics = users.filter(u => u.role === 'PIC');
    return pics.map(pic => {
      const picFiles = files.filter(f => f.assignedTo === pic.id);
      const completedFiles = picFiles.filter(f => f.status === 'CLOSED');
      const overdueFiles = picFiles.filter(f => new Date(f.estimatedCompletionDate) < new Date());
      
      return {
        name: pic.name,
        totalFiles: picFiles.length,
        completedFiles: completedFiles.length,
        overdueFiles: overdueFiles.length,
        completionRate: picFiles.length ? (completedFiles.length / picFiles.length) * 100 : 0,
        accuracy: Math.round(Math.random() * 20 + 80) // Mock accuracy data
      };
    });
  };

  const performanceData = getPerformanceData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Staff Performance Metrics</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {performanceData.map(data => (
          <div key={data.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{data.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">PIC</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  data.completionRate >= 80
                    ? 'bg-green-100 text-green-800'
                    : data.completionRate >= 60
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {Math.round(data.completionRate)}% Completion
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Total Files</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{data.totalFiles}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Completed</span>
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{data.completedFiles}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Completion Rate</span>
                  <span className="font-medium">{Math.round(data.completionRate)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${data.completionRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Accuracy</span>
                  <span className="font-medium">{data.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${data.accuracy}%` }}
                  />
                </div>
              </div>

              {data.overdueFiles > 0 && (
                <div className="flex items-center mt-4 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="ml-2 text-sm">
                    {data.overdueFiles} overdue files
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}