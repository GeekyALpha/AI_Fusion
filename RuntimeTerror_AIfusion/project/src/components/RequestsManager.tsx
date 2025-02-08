import React from 'react';
import { ClipboardList, CheckCircle2, XCircle } from 'lucide-react';
import type { WasteRequest } from '../types';

interface RequestsManagerProps {
  requests: WasteRequest[];
}

export function RequestsManager({ requests }: RequestsManagerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Collection Requests</h2>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          {requests.filter(r => r.status === 'pending').length} Pending
        </span>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Request #{request.id}</span>
              <span className={`px-2 py-1 rounded-full text-sm font-medium
                ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Location: <span className="font-medium">{request.location}</span>
              </p>
              <p className="text-sm text-gray-600">
                Type: <span className="font-medium">{request.type}</span>
              </p>
              <p className="text-sm text-gray-600">
                Description: <span className="font-medium">{request.description}</span>
              </p>
              <p className="text-sm text-gray-600">
                Submitted: {request.timestamp.toLocaleString()}
              </p>
              {request.status === 'pending' && (
                <div className="flex space-x-2 mt-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}