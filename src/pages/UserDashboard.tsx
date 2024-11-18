import React, { useState } from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { FileText, AlertCircle, Clock, FileCheck2, ChevronDown, ChevronUp } from 'lucide-react';
import FileTimeline from '../components/FileTimeline';

export default function UserDashboard() {
  const { currentUser, files } = useStore();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Get files where the current user is a stakeholder
  const userFiles = files.filter(file => 
    file.stakeholders.some(s => 
      s.contact.email === currentUser?.email || 
      s.contact.phone === currentUser?.phone
    )
  );

  // Group files by status
  const activeFiles = userFiles.filter(f => f.status === 'ONGOING');
  const completedFiles = userFiles.filter(f => f.status === 'CLOSED');

  // Calculate total payments
  const totalPayments = userFiles.reduce((sum, file) => sum + file.financials.legalFees, 0);
  const paidAmount = userFiles.reduce((sum, file) => sum + file.financials.paidAmount, 0);
  const outstandingAmount = userFiles.reduce((sum, file) => sum + file.financials.outstandingAmount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Files</p>
              <p className="text-2xl font-semibold text-gray-900">{activeFiles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileCheck2 className="h-6 w-6 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed Files</p>
              <p className="text-2xl font-semibold text-gray-900">{completedFiles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Outstanding Payment</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(outstandingAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">My Files</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {userFiles.map((file) => (
            <div key={file.id} className="bg-white">
              <div 
                className="px-6 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedFile(selectedFile === file.id ? null : file.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{file.fileNumber}</h3>
                    <p className="mt-1 text-sm text-gray-500">{file.propertyDetails.address}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      file.status === 'ONGOING' ? 'bg-blue-100 text-blue-800' :
                      file.status === 'CLOSED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {file.status.toLowerCase()}
                    </span>
                    {selectedFile === file.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {selectedFile === file.id && (
                  <div className="mt-4 space-y-6">
                    <FileTimeline 
                      currentStage={file.stage}
                      estimatedCompletionDate={file.estimatedCompletionDate}
                    />
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Required Documents</h4>
                        <ul className="space-y-3">
                          {file.documents.map((doc) => (
                            <li key={doc.id} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                <p className="text-xs text-gray-500">{doc.description}</p>
                              </div>
                              {doc.type === 'SUBMITTED' ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Submitted
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Required
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Payment Details</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Legal Fees</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(file.financials.legalFees)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Paid Amount</p>
                            <p className="text-sm font-medium text-green-600">
                              {formatCurrency(file.financials.paidAmount)}
                            </p>
                          </div>
                          {file.financials.outstandingAmount > 0 && (
                            <div>
                              <p className="text-sm text-gray-500">Outstanding Amount</p>
                              <p className="text-sm font-medium text-red-600">
                                {formatCurrency(file.financials.outstandingAmount)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Updates</h4>
                      <div className="space-y-3">
                        {file.updates.map((update) => (
                          <div key={update.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className={`w-2 h-2 mt-2 rounded-full ${
                                update.type === 'STATUS' ? 'bg-blue-600' :
                                update.type === 'DOCUMENT' ? 'bg-green-600' :
                                'bg-yellow-600'
                              }`} />
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">{update.message}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(update.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}