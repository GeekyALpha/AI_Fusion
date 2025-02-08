import React from 'react';
import { Bone as Drone, AlertTriangle, CheckCircle } from 'lucide-react';
import type { UAVScan } from '../types';

interface UAVMonitorProps {
  scans: UAVScan[];
}

export function UAVMonitor({ scans }: UAVMonitorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Drone className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">UAV Monitoring</h2>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Active
        </span>
      </div>

      <div className="space-y-4">
        {scans.map((scan) => (
          <div key={scan.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{scan.location}</span>
              {scan.status === 'warning' ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={scan.imageUrl}
                alt={`Scan of ${scan.location}`}
                className="rounded-lg w-full h-32 object-cover"
              />
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Gas Level:</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        scan.gasLevel > 40 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${scan.gasLevel}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Contamination: <span className="font-medium">{scan.contaminationLevel}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Last Updated: {scan.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}