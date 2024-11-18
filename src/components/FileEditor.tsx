import React, { useState } from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { Save, X, Edit2 } from 'lucide-react';
import { File, FileStage } from '../types';

export default function FileEditor() {
  const { files } = useStore();
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editForm, setEditForm] = useState({
    clientName: '',
    propertyAddress: '',
    loanAmount: '',
    bank: '',
    titleType: '',
    stage: ''
  });

  const filteredFiles = files.filter(file => 
    file.fileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (file: File) => {
    setEditingFile(file.id);
    setEditForm({
      clientName: file.clientName,
      propertyAddress: file.propertyDetails.address,
      loanAmount: file.loanDetails.amount.toString(),
      bank: file.loanDetails.bank,
      titleType: file.propertyDetails.titleType,
      stage: file.stage
    });
  };

  const handleSave = (fileId: string) => {
    // In a real app, this would update the file in the database
    setEditingFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Edit Files</h2>
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property & Loan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFiles.map((file) => (
              <tr key={file.id}>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    {editingFile === file.id ? (
                      <input
                        type="text"
                        value={editForm.clientName}
                        onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <>
                        <div className="text-sm font-medium text-gray-900">{file.fileNumber}</div>
                        <div className="text-sm text-gray-500">{file.clientName}</div>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {editingFile === file.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.propertyAddress}
                        onChange={(e) => setEditForm({ ...editForm, propertyAddress: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Property Address"
                      />
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={editForm.loanAmount}
                          onChange={(e) => setEditForm({ ...editForm, loanAmount: e.target.value })}
                          className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Loan Amount"
                        />
                        <select
                          value={editForm.bank}
                          onChange={(e) => setEditForm({ ...editForm, bank: e.target.value })}
                          className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="CIMB Bank">CIMB Bank</option>
                          <option value="Maybank">Maybank</option>
                          <option value="Public Bank">Public Bank</option>
                          <option value="Hong Leong Bank">Hong Leong Bank</option>
                          <option value="RHB Bank">RHB Bank</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-900">{file.propertyDetails.address}</div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(file.loanDetails.amount)} • {file.loanDetails.bank}
                      </div>
                    </>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingFile === file.id ? (
                    <select
                      value={editForm.stage}
                      onChange={(e) => setEditForm({ ...editForm, stage: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="PENDING_DOCUMENTS">Pending Documents</option>
                      <option value="LOAN_PROCESSING">Loan Processing</option>
                      <option value="TITLE_SEARCH">Title Search</option>
                      <option value="AGREEMENT_PREPARATION">Agreement Preparation</option>
                      <option value="EXECUTION">Execution</option>
                      <option value="COMPLETION">Completion</option>
                      <option value="REGISTRATION">Registration</option>
                    </select>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {file.stage.replace(/_/g, ' ').toLowerCase()}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  {editingFile === file.id ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingFile(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleSave(file.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(file)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}