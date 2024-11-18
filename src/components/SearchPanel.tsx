import React, { useState } from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { Search, Filter } from 'lucide-react';
import { File } from '../types';

export default function SearchPanel() {
  const { files } = useStore();
  const [searchParams, setSearchParams] = useState({
    query: '',
    filterBy: 'all',
    dateRange: 'all',
    stage: 'all',
    bank: 'all',
    titleType: 'all',
  });

  const filterFiles = () => {
    return files.filter(file => {
      const matchesQuery = searchParams.query.toLowerCase().split(' ').every(term =>
        file.fileNumber.toLowerCase().includes(term) ||
        file.clientName.toLowerCase().includes(term) ||
        file.propertyDetails.address.toLowerCase().includes(term)
      );

      const matchesBank = searchParams.bank === 'all' || file.loanDetails.bank === searchParams.bank;
      const matchesTitleType = searchParams.titleType === 'all' || file.propertyDetails.titleType === searchParams.titleType;
      const matchesStage = searchParams.stage === 'all' || file.stage === searchParams.stage;

      let matchesDate = true;
      if (searchParams.dateRange !== 'all') {
        const fileDate = new Date(file.openDate);
        const now = new Date();
        const monthsAgo = new Date();
        monthsAgo.setMonth(now.getMonth() - parseInt(searchParams.dateRange));
        matchesDate = fileDate >= monthsAgo;
      }

      return matchesQuery && matchesBank && matchesTitleType && matchesStage && matchesDate;
    });
  };

  const filteredFiles = filterFiles();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by file number, client name, or address..."
              value={searchParams.query}
              onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={searchParams.bank}
              onChange={(e) => setSearchParams({ ...searchParams, bank: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Banks</option>
              <option value="CIMB Bank">CIMB Bank</option>
              <option value="Maybank">Maybank</option>
              <option value="Public Bank">Public Bank</option>
              <option value="Hong Leong Bank">Hong Leong Bank</option>
              <option value="RHB Bank">RHB Bank</option>
            </select>

            <select
              value={searchParams.titleType}
              onChange={(e) => setSearchParams({ ...searchParams, titleType: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Title Types</option>
              <option value="Individual">Individual</option>
              <option value="Strata">Strata</option>
              <option value="Master Title">Master Title</option>
            </select>

            <select
              value={searchParams.stage}
              onChange={(e) => setSearchParams({ ...searchParams, stage: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="PENDING_DOCUMENTS">Pending Documents</option>
              <option value="LOAN_PROCESSING">Loan Processing</option>
              <option value="TITLE_SEARCH">Title Search</option>
              <option value="AGREEMENT_PREPARATION">Agreement Preparation</option>
              <option value="EXECUTION">Execution</option>
              <option value="COMPLETION">Completion</option>
              <option value="REGISTRATION">Registration</option>
            </select>

            <select
              value={searchParams.dateRange}
              onChange={(e) => setSearchParams({ ...searchParams, dateRange: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="1">Last Month</option>
              <option value="3">Last 3 Months</option>
              <option value="6">Last 6 Months</option>
              <option value="12">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Found {filteredFiles.length} files
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredFiles.map((file) => (
            <div key={file.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{file.fileNumber}</h4>
                  <p className="mt-1 text-sm text-gray-500">{file.clientName}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {file.stage.replace(/_/g, ' ').toLowerCase()}
                </span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}