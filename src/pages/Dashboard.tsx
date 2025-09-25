import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  Activity,
  TrendingUp,
  Clock,
  Target,
  Database
} from 'lucide-react'

const stats = [
  {
    name: 'Active Scans',
    value: '3',
    change: '+2 from yesterday',
    changeType: 'increase',
    icon: Activity,
  },
  {
    name: 'Total Vulnerabilities',
    value: '127',
    change: '+12 from last week',
    changeType: 'increase',
    icon: AlertTriangle,
  },
  {
    name: 'Hosts Scanned',
    value: '45',
    change: '+7 from yesterday',
    changeType: 'increase',
    icon: Target,
  },
  {
    name: 'Workspaces',
    value: '8',
    change: '+1 from last week',
    changeType: 'increase',
    icon: Database,
  },
]

const recentScans = [
  {
    id: '1',
    target: 'example.com',
    mode: 'normal',
    status: 'completed',
    startTime: '2024-01-15T10:30:00Z',
    vulnerabilities: 12,
    workspace: 'production'
  },
  {
    id: '2',
    target: '192.168.1.0/24',
    mode: 'discover',
    status: 'running',
    startTime: '2024-01-15T09:15:00Z',
    vulnerabilities: 0,
    workspace: 'internal'
  },
  {
    id: '3',
    target: 'test.example.com',
    mode: 'web',
    status: 'completed',
    startTime: '2024-01-15T08:45:00Z',
    vulnerabilities: 5,
    workspace: 'testing'
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your security scanning activities</p>
        </div>
        <Link to="/scan" className="btn-primary">
          <Search className="h-4 w-4 mr-2" />
          New Scan
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scans */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Scans</h3>
            <Link to="/results" className="text-sm text-red-600 hover:text-red-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    scan.status === 'running' ? 'bg-yellow-400' : 
                    scan.status === 'completed' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{scan.target}</p>
                    <p className="text-xs text-gray-500">
                      {scan.mode} • {scan.workspace}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {scan.vulnerabilities} vulns
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(scan.startTime).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/scan" className="flex items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Search className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Start New Scan</p>
                <p className="text-xs text-gray-500">Launch a security scan on a target</p>
              </div>
            </Link>
            
            <Link to="/workspaces" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Database className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Manage Workspaces</p>
                <p className="text-xs text-gray-500">Organize your scan results</p>
              </div>
            </Link>
            
            <Link to="/results" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <AlertTriangle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">View Results</p>
                <p className="text-xs text-gray-500">Analyze scan findings</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Scanner Engine: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Database: Connected</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Updates: Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}