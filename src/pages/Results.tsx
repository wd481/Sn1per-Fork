import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Search, 
  Filter,
  Download,
  Eye,
  Clock,
  Target,
  Shield,
  ExternalLink
} from 'lucide-react'
import type { ScanResult, Vulnerability } from '../types'

const mockResults: ScanResult[] = [
  {
    id: '1',
    target: 'example.com',
    mode: 'normal',
    workspace: 'production',
    status: 'completed',
    startTime: '2024-01-15T10:30:00Z',
    endTime: '2024-01-15T11:45:00Z',
    duration: 4500,
    vulnerabilities: [
      {
        id: '1',
        severity: 'HIGH',
        name: 'SQL Injection',
        description: 'Potential SQL injection vulnerability found',
        url: 'https://example.com/login.php',
        evidence: 'Error message revealed database structure'
      },
      {
        id: '2',
        severity: 'MEDIUM',
        name: 'XSS Vulnerability',
        description: 'Cross-site scripting vulnerability detected',
        url: 'https://example.com/search.php',
        evidence: 'Reflected user input without sanitization'
      }
    ],
    ports: [
      { number: 80, protocol: 'tcp', state: 'open', service: 'http', version: 'Apache 2.4.41' },
      { number: 443, protocol: 'tcp', state: 'open', service: 'https', version: 'Apache 2.4.41' },
      { number: 22, protocol: 'tcp', state: 'open', service: 'ssh', version: 'OpenSSH 8.2' }
    ],
    domains: ['example.com', 'www.example.com', 'api.example.com']
  },
  {
    id: '2',
    target: '192.168.1.0/24',
    mode: 'discover',
    workspace: 'internal',
    status: 'running',
    startTime: '2024-01-15T09:15:00Z',
    vulnerabilities: [],
    ports: [],
    domains: []
  }
]

const severityColors = {
  CRITICAL: 'bg-red-100 text-red-800 border-red-200',
  HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
  MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  LOW: 'bg-blue-100 text-blue-800 border-blue-200',
  INFO: 'bg-gray-100 text-gray-800 border-gray-200',
}

export default function Results() {
  const [results] = useState<ScanResult[]>(mockResults)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null)

  const filteredResults = results.filter(result =>
    result.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.workspace.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scan Results</h1>
          <p className="text-gray-600">View and analyze your security scan findings</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search results..."
          className="input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <div key={result.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  result.status === 'running' ? 'bg-yellow-400' : 
                  result.status === 'completed' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{result.target}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="capitalize">{result.mode} scan</span>
                    <span>•</span>
                    <span>{result.workspace}</span>
                    <span>•</span>
                    <span>{new Date(result.startTime).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {result.status === 'completed' && (
                  <button 
                    onClick={() => setSelectedResult(result)}
                    className="btn-outline"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                )}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  result.status === 'running' ? 'bg-yellow-100 text-yellow-800' :
                  result.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {result.status}
                </span>
              </div>
            </div>

            {result.status === 'completed' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-700">
                    {result.vulnerabilities.length} vulnerabilities
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {result.ports.length} open ports
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    {result.domains.length} domains
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {result.duration ? `${Math.round(result.duration / 60)}m` : 'N/A'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedResult.target}</h2>
                <p className="text-gray-600">Scan Results Details</p>
              </div>
              <button 
                onClick={() => setSelectedResult(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Vulnerabilities */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Vulnerabilities ({selectedResult.vulnerabilities.length})
                </h3>
                <div className="space-y-3">
                  {selectedResult.vulnerabilities.map((vuln) => (
                    <div key={vuln.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded border ${severityColors[vuln.severity]}`}>
                            {vuln.severity}
                          </span>
                          <h4 className="font-medium text-gray-900">{vuln.name}</h4>
                        </div>
                        {vuln.url && (
                          <a 
                            href={vuln.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{vuln.description}</p>
                      {vuln.evidence && (
                        <div className="bg-gray-50 rounded p-2">
                          <p className="text-xs text-gray-700">
                            <strong>Evidence:</strong> {vuln.evidence}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Ports */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Open Ports ({selectedResult.ports.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Port
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Protocol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Version
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedResult.ports.map((port, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {port.number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {port.protocol.toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {port.service || 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {port.version || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Discovered Domains */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Discovered Domains ({selectedResult.domains.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {selectedResult.domains.map((domain, index) => (
                    <div key={index} className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700">
                      {domain}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Run your first scan to see results here.'}
          </p>
        </div>
      )}
    </div>
  )
}