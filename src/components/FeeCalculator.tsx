import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function FeeCalculator() {
  const [values, setValues] = useState({
    propertyPrice: '',
    loanAmount: '',
    hasAgent: false
  });

  const calculateFees = () => {
    const price = parseFloat(values.propertyPrice) || 0;
    const loan = parseFloat(values.loanAmount) || 0;

    // Scale-based legal fees calculation (example rates)
    let spaFee = 0;
    if (price <= 500000) {
      spaFee = price * 0.01;
    } else if (price <= 1000000) {
      spaFee = 5000 + (price - 500000) * 0.008;
    } else {
      spaFee = 9000 + (price - 1000000) * 0.005;
    }

    // Loan documentation fees
    let loanFee = 0;
    if (loan <= 500000) {
      loanFee = loan * 0.01;
    } else if (loan <= 1000000) {
      loanFee = 5000 + (loan - 500000) * 0.008;
    } else {
      loanFee = 9000 + (loan - 1000000) * 0.005;
    }

    // Agent commission (50% of legal fees if applicable)
    const agentCommission = values.hasAgent ? (spaFee + loanFee) * 0.5 : 0;

    return {
      spaFee,
      loanFee,
      agentCommission,
      totalFees: spaFee + loanFee,
      netFees: spaFee + loanFee - agentCommission
    };
  };

  const fees = calculateFees();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <div className="flex items-center">
            <Calculator className="h-6 w-6 text-white" />
            <h2 className="ml-2 text-lg font-semibold text-white">Legal Fee Calculator</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property Price (RM)
              </label>
              <input
                type="number"
                value={values.propertyPrice}
                onChange={(e) => setValues({ ...values, propertyPrice: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loan Amount (RM)
              </label>
              <input
                type="number"
                value={values.loanAmount}
                onChange={(e) => setValues({ ...values, loanAmount: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={values.hasAgent}
                onChange={(e) => setValues({ ...values, hasAgent: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Real Estate Agent Involved (50% Commission)
              </span>
            </label>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">SPA Legal Fee</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  RM {fees.spaFee.toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Loan Documentation Fee</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  RM {fees.loanFee.toFixed(2)}
                </dd>
              </div>
              {values.hasAgent && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Agent Commission</dt>
                  <dd className="mt-1 text-lg font-semibold text-red-600">
                    - RM {fees.agentCommission.toFixed(2)}
                  </dd>
                </div>
              )}
              <div className="sm:col-span-2 border-t pt-4">
                <dt className="text-sm font-medium text-gray-500">Total Legal Fees</dt>
                <dd className="mt-1 text-xl font-bold text-gray-900">
                  RM {fees.totalFees.toFixed(2)}
                </dd>
                {values.hasAgent && (
                  <>
                    <dt className="mt-4 text-sm font-medium text-gray-500">Net Fees (After Commission)</dt>
                    <dd className="mt-1 text-xl font-bold text-blue-600">
                      RM {fees.netFees.toFixed(2)}
                    </dd>
                  </>
                )}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}