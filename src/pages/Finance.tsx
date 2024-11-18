import React from 'react';
import { useStore } from '../store';
import { formatCurrency } from '../utils/format';
import { DollarSign, TrendingUp, CreditCard, AlertCircle } from 'lucide-react';
import AIInsights from '../components/AIInsights';

export default function Finance() {
  const { files } = useStore();

  const financials = {
    totalRevenue: files.reduce((sum, file) => sum + file.financials.legalFees, 0),
    outstandingAmount: files.reduce((sum, file) => sum + file.financials.outstandingAmount, 0),
    paidAmount: files.reduce((sum, file) => sum + file.financials.paidAmount, 0),
    profitMargin: files.reduce((sum, file) => sum + file.financials.profitMargin, 0) / files.length,
  };

  const recentTransactions = files
    .filter(file => file.financials.paidAmount > 0)
    .slice(0, 5)
    .map(file => ({
      fileNumber: file.fileNumber,
      clientName: file.clientName,
      amount: file.financials.paidAmount,
      date: new Date(file.lastUpdated).toLocaleDateString()
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-semibold text-gray-900">{formatCurrency(financials.totalRevenue)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Outstanding Amount</dt>
                  <dd className="text-lg font-semibold text-red-600">{formatCurrency(financials.outstandingAmount)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Profit Margin</dt>
                  <dd className="text-lg font-semibold text-gray-900">{financials.profitMargin.toFixed(1)}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Collection Rate</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {((financials.paidAmount / (financials.paidAmount + financials.outstandingAmount)) * 100).toFixed(1)}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Status</h2>
          <div className="space-y-4">
            {files.slice(0, 5).map(file => (
              <div key={file.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.fileNumber}</p>
                  <p className="text-sm text-gray-500">{file.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(file.financials.paidAmount)} / {formatCurrency(file.financials.legalFees)}
                  </p>
                  <div className="mt-1 w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(file.financials.paidAmount / file.financials.legalFees) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.fileNumber}</p>
                  <p className="text-sm text-gray-500">{transaction.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    +{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <AIInsights type="finance" data={financials} />
      </div>
    </div>
  );
}