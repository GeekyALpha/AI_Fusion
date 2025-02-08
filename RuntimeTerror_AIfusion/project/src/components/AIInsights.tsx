import React, { useEffect, useState } from 'react';
import { Brain, Loader2 } from 'lucide-react';
import { generateAIAnalysis } from '../utils/gptApi';
import type { UAVScan, WasteRequest, SmartBin } from '../types';

interface AIInsightsProps {
  uavScans: UAVScan[];
  requests: WasteRequest[];
  bins: SmartBin[];
}

export function AIInsights({ uavScans, requests, bins }: AIInsightsProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateInsights = async () => {
      setLoading(true);
      const data = {
        uavScans,
        requests,
        bins,
        timestamp: new Date().toISOString()
      };

      const prompt = `
        Analyze this waste management data and provide insights:
        1. Identify any concerning pollution levels from UAV scans
        2. Suggest optimal routes for waste collection based on bin status
        3. Provide recommendations for resource allocation
        4. Highlight any patterns or trends
        Please format the response in clear sections with bullet points where appropriate.
      `;

      const result = await generateAIAnalysis(data, prompt);
      setAnalysis(result);
      setLoading(false);
    };

    generateInsights();
  }, [uavScans, requests, bins]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
        </div>
        {loading && (
          <div className="flex items-center text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Analyzing...
          </div>
        )}
      </div>

      <div className="prose prose-sm max-w-none">
        {loading ? (
          <div className="h-32 flex items-center justify-center text-gray-500">
            Generating environmental analysis...
          </div>
        ) : (
          <div className="whitespace-pre-line">{analysis}</div>
        )}
      </div>
    </div>
  );
}