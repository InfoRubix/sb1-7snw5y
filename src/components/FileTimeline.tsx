import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { FileStage } from '../types';

const stages: { stage: FileStage; label: string }[] = [
  { stage: 'PENDING_DOCUMENTS', label: 'Document Collection' },
  { stage: 'LOAN_PROCESSING', label: 'Loan Processing' },
  { stage: 'TITLE_SEARCH', label: 'Title Search' },
  { stage: 'AGREEMENT_PREPARATION', label: 'Agreement Preparation' },
  { stage: 'EXECUTION', label: 'Execution' },
  { stage: 'COMPLETION', label: 'Completion' },
  { stage: 'REGISTRATION', label: 'Registration' }
];

interface FileTimelineProps {
  currentStage: FileStage;
  estimatedCompletionDate: string;
}

export default function FileTimeline({ currentStage, estimatedCompletionDate }: FileTimelineProps) {
  const currentStageIndex = stages.findIndex(s => s.stage === currentStage);
  const isOverdue = new Date(estimatedCompletionDate) < new Date();

  return (
    <div className="py-4">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />

        {/* Timeline points */}
        <div className="relative space-y-8">
          {stages.map((stage, index) => {
            const isPast = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isFuture = index > currentStageIndex;

            return (
              <div key={stage.stage} className="flex items-center">
                <div className="flex w-1/2 justify-end pr-8">
                  <span className={`text-sm ${
                    isPast ? 'text-green-600' : 
                    isCurrent ? 'text-blue-600 font-medium' : 
                    'text-gray-500'
                  }`}>
                    {stage.label}
                  </span>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isPast ? 'bg-green-100' :
                    isCurrent ? 'bg-blue-100' :
                    'bg-gray-100'
                  }`}>
                    {isPast ? (
                      <Check className={`w-5 h-5 text-green-600`} />
                    ) : isCurrent ? (
                      <Clock className={`w-5 h-5 text-blue-600`} />
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${
                        isFuture ? 'bg-gray-400' : 'bg-gray-400'
                      }`} />
                    )}
                  </div>
                </div>

                <div className="flex w-1/2 pl-8">
                  {isCurrent && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">
                        Est. Completion: {new Date(estimatedCompletionDate).toLocaleDateString()}
                      </span>
                      {isOverdue && (
                        <AlertCircle className="ml-2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}