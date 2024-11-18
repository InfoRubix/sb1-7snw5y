import React, { useState } from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { Search, MessageSquare, FileText } from 'lucide-react';
import AIInsights from '../components/AIInsights';
import WhatsAppButton from '../components/WhatsAppButton';

export default function PICWorkspace() {
  const { currentUser, files } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const myFiles = files.filter(file => file.assignedTo === currentUser?.id);
  const filteredFiles = myFiles.filter(file =>
    file.fileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [editingProgress, setEditingProgress] = useState<string | null>(null);
  const [progressNotes, setProgressNotes] = useState<{ [key: string]: string }>({});

  const handleProgressUpdate = (fileId: string) => {
    // In a real app, this would update the progress in the database
    setEditingProgress(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">File Progress</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            My Files ({filteredFiles.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredFiles.map((file) => (
            <div key={file.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{file.fileNumber}</h3>
                  <p className="mt-1 text-sm text-gray-500">{file.clientName}</p>
                </div>
                <WhatsAppButton file={file} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Property</p>
                  <p className="mt-1 text-sm text-gray-900">{file.propertyDetails.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loan Details</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatCurrency(file.loanDetails.amount)} • {file.loanDetails.bank}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">Progress</p>
                  {editingProgress === file.id ? (
                    <button
                      onClick={() => handleProgressUpdate(file.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingProgress(file.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Update
                    </button>
                  )}
                </div>

                {editingProgress === file.id ? (
                  <div className="space-y-4">
                    <select
                      value={file.stage}
                      onChange={(e) => {
                        // Update stage logic here
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="PENDING_DOCUMENTS">Pending Documents</option>
                      <option value="LOAN_PROCESSING">Loan Processing</option>
                      <option value="TITLE_SEARCH">Title Search</option>
                      <option value="AGREEMENT_PREPARATION">Agreement Preparation</option>
                      <option value="EXECUTION">Execution</option>
                      <option value="COMPLETION">Completion</option>
                      <option value="REGISTRATION">Registration</option>
                    </select>

                    <textarea
                      placeholder="Add progress notes..."
                      value={progressNotes[file.id] || ''}
                      onChange={(e) => setProgressNotes({
                        ...progressNotes,
                        [file.id]: e.target.value
                      })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (['PENDING_DOCUMENTS', 'LOAN_PROCESSING', 'TITLE_SEARCH', 'AGREEMENT_PREPARATION', 'EXECUTION', 'COMPLETION', 'REGISTRATION']
                              .indexOf(file.stage) + 1) * (100 / 7)
                          }%`
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Current Stage: {file.stage.replace(/_/g, ' ').toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <AIInsights type="files" data={filteredFiles} />
      </div>
    </div>
  );
}