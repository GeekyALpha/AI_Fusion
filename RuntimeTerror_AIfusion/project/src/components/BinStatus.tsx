import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import type { SmartBin } from '../types';

interface BinStatusProps {
  bins: SmartBin[];
}

export function BinStatus({ bins }: BinStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Trash2 className="h-6 w-6 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Smart Bins Status</h2>
        </div>
        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
          {bins.filter(bin => bin.status === 'full').length} Full
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {bins.map((bin) => (
          <div key={bin.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium text-gray-900">{bin.location}</span>
                <span className="ml-2 text-sm text-gray-500">({bin.type})</span>
              </div>
              {bin.status === 'full' && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Fill Level</span>
                  <span>{bin.fillLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      bin.fillLevel > 90 ? 'bg-red-500' :
                      bin.fillLevel > 75 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${bin.fillLevel}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Last Updated: {bin.lastUpdated.toLocaleTimeString()}
              </p>
              {bin.status === 'full' && (
                <button className="w-full mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                  Schedule Collection
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}