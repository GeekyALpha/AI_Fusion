import React from 'react';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { UAVMonitor } from './components/UAVMonitor';
import { RequestsManager } from './components/RequestsManager';
import { BinStatus } from './components/BinStatus';
import { AIInsights } from './components/AIInsights';
import { Chatbot } from './components/Chatbot';

// Mock data moved to a central location
const mockUAVScans = [
  {
    id: '1',
    timestamp: new Date(),
    location: 'Sector A-1',
    gasLevel: 45,
    contaminationLevel: 'moderate',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'warning',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000),
    location: 'Sector B-2',
    gasLevel: 12,
    contaminationLevel: 'low',
    imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    status: 'normal',
  },
];

const mockRequests = [
  {
    id: '1',
    userId: 'user123',
    location: '123 Main St',
    type: 'Household',
    status: 'pending',
    timestamp: new Date(),
    description: 'Large furniture and some electronic waste',
  },
  {
    id: '2',
    userId: 'user456',
    location: '456 Oak Ave',
    type: 'Construction',
    status: 'approved',
    timestamp: new Date(Date.now() - 7200000),
    description: 'Construction debris from renovation',
  },
];

const mockBins = [
  {
    id: '1',
    location: 'Central Park',
    fillLevel: 85,
    lastUpdated: new Date(),
    type: 'general',
    status: 'attention',
  },
  {
    id: '2',
    location: 'Main Street',
    fillLevel: 95,
    lastUpdated: new Date(Date.now() - 1800000),
    type: 'recyclable',
    status: 'full',
  },
  {
    id: '3',
    location: 'Community Center',
    fillLevel: 45,
    lastUpdated: new Date(Date.now() - 3600000),
    type: 'organic',
    status: 'normal',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">WMS Operator</h1>
          <p className="text-sm text-gray-500">Waste Management System</p>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 border-l-4 border-emerald-500"
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Operator Dashboard</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UAVMonitor scans={mockUAVScans} />
            <RequestsManager requests={mockRequests} />
            <div className="lg:col-span-2">
              <BinStatus bins={mockBins} />
            </div>
            <div className="lg:col-span-2">
              <AIInsights 
                uavScans={mockUAVScans}
                requests={mockRequests}
                bins={mockBins}
              />
            </div>
            <div className="lg:col-span-2">
              <Chatbot />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;