import React, { useState } from 'react';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Templates() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = {
    spa: {
      title: 'Sale and Purchase Agreement',
      fields: [
        { name: 'vendor_name', label: 'Vendor Name', type: 'text' },
        { name: 'purchaser_name', label: 'Purchaser Name', type: 'text' },
        { name: 'property_address', label: 'Property Address', type: 'textarea' },
        { name: 'purchase_price', label: 'Purchase Price', type: 'number' },
        { name: 'deposit_amount', label: 'Deposit Amount', type: 'number' },
        { name: 'completion_period', label: 'Completion Period (days)', type: 'number' }
      ]
    },
    loan: {
      title: 'Loan Agreement',
      fields: [
        { name: 'borrower_name', label: 'Borrower Name', type: 'text' },
        { name: 'bank_name', label: 'Bank Name', type: 'text' },
        { name: 'loan_amount', label: 'Loan Amount', type: 'number' },
        { name: 'interest_rate', label: 'Interest Rate (%)', type: 'number' },
        { name: 'loan_term', label: 'Loan Term (years)', type: 'number' },
        { name: 'security_details', label: 'Security Details', type: 'textarea' }
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/main')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Document Templates</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Template Selection */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Templates</h2>
          <div className="space-y-4">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border ${
                  selectedTemplate === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 ${
                    selectedTemplate === key ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className="ml-3 font-medium">{template.title}</span>
                </div>
                <Download className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Template Form */}
        {selectedTemplate && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {templates[selectedTemplate].title} Form
            </h2>
            <form className="space-y-4">
              {templates[selectedTemplate].fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Generate Document
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}