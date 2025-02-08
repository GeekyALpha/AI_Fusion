export interface UAVScan {
  id: string;
  timestamp: Date;
  location: string;
  gasLevel: number;
  contaminationLevel: string;
  imageUrl: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface WasteRequest {
  id: string;
  userId: string;
  location: string;
  type: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  timestamp: Date;
  description: string;
}

export interface SmartBin {
  id: string;
  location: string;
  fillLevel: number;
  lastUpdated: Date;
  type: 'general' | 'recyclable' | 'organic';
  status: 'normal' | 'attention' | 'full';
}