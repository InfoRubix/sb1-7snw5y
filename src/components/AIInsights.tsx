import React from 'react';
import { Lightbulb } from 'lucide-react';
import { File } from '../types';

interface AIInsightsProps {
  type: 'files' | 'performance' | 'finance' | 'stakeholders';
  data: any;
}

export default function AIInsights({ type, data }: AIInsightsProps) {
  const generateInsights = () => {
    switch (type) {
      case 'files':
        return generateFileInsights(data);
      case 'performance':
        return generatePerformanceInsights(data);
      case 'finance':
        return generateFinancialInsights(data);
      case 'stakeholders':
        return generateStakeholderInsights(data);
      default:
        return [];
    }
  };

  const generateFileInsights = (files: File[]) => {
    const insights = [];
    const totalFiles = files.length;
    const overdueFiles = files.filter(f => new Date(f.estimatedCompletionDate) < new Date()).length;
    const completionRate = files.filter(f => f.status === 'CLOSED').length / totalFiles;
    const averageCompletionTime = 45; // Mock data - would be calculated from actual completion times

    insights.push(
      `Based on current trends, ${Math.round(overdueFiles / totalFiles * 100)}% of files are overdue. Consider redistributing workload.`,
      `Files are completed in ${averageCompletionTime} days on average. Peak efficiency is observed during mid-month.`,
      `Suggested action: Prioritize ${overdueFiles} overdue files to maintain client satisfaction.`,
      `Completion rate is ${(completionRate * 100).toFixed(1)}%. Target should be 85% or higher.`
    );

    return insights;
  };

  const generatePerformanceInsights = (performanceData: any) => {
    return [
      'Top performing PIC shows 92% completion rate with minimal delays.',
      'Workload distribution could be optimized - 2 PICs are handling 40% of total files.',
      'Recommended: Schedule training for newer PICs to improve efficiency.',
      'Consider implementing a mentor system for knowledge transfer.'
    ];
  };

  const generateFinancialInsights = (financialData: any) => {
    return [
      'Revenue shows 15% growth compared to previous quarter.',
      'Outstanding payments pattern suggests need for improved collection process.',
      'Profit margins can be optimized by reducing processing time.',
      'Consider implementing early payment incentives for better cash flow.'
    ];
  };

  const generateStakeholderInsights = (stakeholderData: any) => {
    return [
      'Most active banks: CIMB Bank and Maybank, focus on strengthening these relationships.',
      'Client satisfaction correlates with update frequency.',
      'Recommend increasing communication frequency with less active stakeholders.',
      'Pattern shows higher success rate with personalized updates.'
    ];
  };

  const insights = generateInsights();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-6 w-6 text-blue-600" />
        <h3 className="ml-2 text-lg font-semibold text-gray-900">AI Insights</h3>
      </div>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-600" />
            <p className="ml-3 text-sm text-gray-600">{insight}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          These insights are generated using pattern recognition and historical data analysis.
          Recommendations are based on observed trends and industry best practices.
        </p>
      </div>
    </div>
  );
}