import React, { useState } from 'react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { FileStage } from '../types';
import { FileText, Landmark, ChevronRight, ChevronLeft } from 'lucide-react';

export default function FileEntry() {
  const [fileType, setFileType] = useState<'conveyancing' | 'litigation' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Common fields
    fileNumber: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    
    // Conveyancing specific
    propertyAddress: '',
    titleType: '',
    propertyPrice: '',
    loanAmount: '',
    bank: '',
    
    // Litigation specific
    caseType: '',
    courtLocation: '',
    opposingParty: '',
    opposingLawyer: '',
    caseDescription: '',
    reliefSought: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderFileTypeSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        onClick={() => setFileType('conveyancing')}
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <Landmark className="h-12 w-12 text-accent mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Conveyancing</h3>
        <p className="text-gray-600">Property transactions, loans, and title transfers</p>
      </button>
      <button
        onClick={() => setFileType('litigation')}
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <FileText className="h-12 w-12 text-accent mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Litigation</h3>
        <p className="text-gray-600">Court cases, disputes, and legal proceedings</p>
      </button>
    </div>
  );

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'File Information' },
      { number: 2, title: 'Client Details' },
      { number: 3, title: fileType === 'conveyancing' ? 'Property Details' : 'Case Details' }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.number
                    ? 'bg-accent text-black'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-accent' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderConveyancingForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">File Number</label>
              <input
                type="text"
                name="fileNumber"
                value={formData.fileNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
              <select
                name="transactionType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="purchase">Purchase</option>
                <option value="sale">Sale</option>
                <option value="refinancing">Refinancing</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Address</label>
              <textarea
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title Type</label>
              <select
                name="titleType"
                value={formData.titleType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="">Select Title Type</option>
                <option value="Individual">Individual</option>
                <option value="Strata">Strata</option>
                <option value="Master">Master Title</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Price</label>
                <input
                  type="number"
                  name="propertyPrice"
                  value={formData.propertyPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank</label>
              <select
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="">Select Bank</option>
                <option value="CIMB Bank">CIMB Bank</option>
                <option value="Maybank">Maybank</option>
                <option value="Public Bank">Public Bank</option>
                <option value="Hong Leong Bank">Hong Leong Bank</option>
                <option value="RHB Bank">RHB Bank</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderLitigationForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">File Number</label>
              <input
                type="text"
                name="fileNumber"
                value={formData.fileNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Case Type</label>
              <select
                name="caseType"
                value={formData.caseType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="">Select Case Type</option>
                <option value="civil">Civil Litigation</option>
                <option value="criminal">Criminal Defense</option>
                <option value="family">Family Law</option>
                <option value="commercial">Commercial Dispute</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Court Location</label>
              <input
                type="text"
                name="courtLocation"
                value={formData.courtLocation}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opposing Party</label>
              <input
                type="text"
                name="opposingParty"
                value={formData.opposingParty}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Opposing Lawyer</label>
              <input
                type="text"
                name="opposingLawyer"
                value={formData.opposingLawyer}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Case Description</label>
              <textarea
                name="caseDescription"
                value={formData.caseDescription}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Relief Sought</label>
              <textarea
                name="reliefSought"
                value={formData.reliefSought}
                onChange={handleInputChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  if (!fileType) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Select File Type</h1>
        {renderFileTypeSelection()}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        New {fileType === 'conveyancing' ? 'Conveyancing' : 'Litigation'} File
      </h1>
      
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {fileType === 'conveyancing' ? renderConveyancingForm() : renderLitigationForm()}
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-accent hover:bg-accent-dark ml-auto"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-accent hover:bg-accent-dark ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}