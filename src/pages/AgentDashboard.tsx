import React, { useState } from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { DollarSign, FileText, TrendingUp, Users, ChevronDown, ChevronUp } from 'lucide-react';
import FileTimeline from '../components/FileTimeline';

export default function AgentDashboard() {
  const { currentUser, files } = useStore();
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  const agentFiles = files.filter(file => file.agent === currentUser?.id);
  
  const stats = {
    totalFiles: agentFiles.length,
    activeFiles: agentFiles.filter(f => f.status === 'ONGOING').length,
    totalCommission: agentFiles.reduce((sum, file) => sum + (file.financials.agentCommission || 0), 0),
    releasedCommission: currentUser?.agentCommission?.releasedCommission || 0,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Files</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.totalFiles}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Files</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.activeFiles}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Commission</dt>
                  <dd className="text-lg font-semibold text-gray-900">{formatCurrency(stats.totalCommission)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Released Commission</dt>
                  <dd className="text-lg font-semibold text-gray-900">{formatCurrency(stats.releasedCommission)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">My Files</h3>
          <div className="mt-4">
            <div className="overflow-hidden">
              <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div>File Number</div>
                <div>Client</div>
                <div>Property Value</div>
                <div>Commission</div>
                <div>Status</div>
              </div>
              {agentFiles.map((file) => (
                <div key={file.id} className="border-t border-gray-200">
                  <div 
                    className="px-6 py-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedFile(expandedFile === file.id ? null : file.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1 grid grid-cols-5 gap-4">
                        <div className="text-sm font-medium text-gray-900">
                          {file.fileNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {file.clientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(file.propertyDetails.price)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(file.financials.agentCommission || 0)}
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            file.status === 'CLOSED' ? 'bg-green-100 text-green-800' :
                            file.status === 'ONGOING' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {file.status.toLowerCase()}
                          </span>
                        </div>
                      </div>
                      {expandedFile === file.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {expandedFile === file.id && (
                    <div className="px-6 py-4 bg-gray-50">
                      <FileTimeline 
                        currentStage={file.stage}
                        estimatedCompletionDate={file.estimatedCompletionDate}
                      />
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Property Details</h4>
                          <p className="text-sm text-gray-600">{file.propertyDetails.address}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Title Type: {file.propertyDetails.titleType}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Loan Details</h4>
                          <p className="text-sm text-gray-600">
                            Bank: {file.loanDetails.bank}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Amount: {formatCurrency(file.loanDetails.amount)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Updates</h4>
                        <div className="space-y-2">
                          {file.updates.slice(0, 3).map((update) => (
                            <div key={update.id} className="text-sm">
                              <p className="text-gray-900">{update.message}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(update.date).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}