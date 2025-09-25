import React, { useState } from 'react'
import { Search, FileText, Settings, Play } from 'lucide-react'
import type { ScanConfig, ScanMode } from '../types'

const scanModes: { value: ScanMode; label: string; description: string }[] = [
  { value: 'normal', label: 'Normal', description: 'Basic scan with active and passive checks' },
  { value: 'stealth', label: 'Stealth', description: 'Non-intrusive scan to avoid detection' },
  { value: 'web', label: 'Web', description: 'Full web application scan (ports 80/443)' },
  { value: 'discover', label: 'Discover', description: 'Network discovery scan for CIDR ranges' },
  { value: 'fullportonly', label: 'Full Port', description: 'Comprehensive port scan only' },
  { value: 'webscan', label: 'Web Scan', description: 'Burpsuite and Arachni web scanning' },
  { value: 'vulnscan', label: 'Vulnerability', description: 'OpenVAS vulnerability assessment' },
  { value: 'airstrike', label: 'Airstrike', description: 'Fast enumeration of multiple targets' },
  { value: 'nuke', label: 'Nuke', description: 'Full audit of multiple targets' },
  { value: 'flyover', label: 'Flyover', description: 'High-speed multi-threaded scanning' },
]

export default function NewScan() {
  const [config, setConfig] = useState<ScanConfig>({
    target: '',
    mode: 'normal',
    workspace: '',
    osint: false,
    recon: false,
    bruteforce: false,
    fullPortScan: false,
  })

  const [isRunning, setIsRunning] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRunning(true)
    
    // Simulate scan execution
    console.log('Starting scan with config:', config)
    
    // In a real implementation, this would call the backend API
    setTimeout(() => {
      setIsRunning(false)
      alert('Scan started successfully!')
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Scan</h1>
        <p className="text-gray-600">Configure and launch a security scan</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Target Configuration */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-gray-900">Target Configuration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target *
              </label>
              <input
                type="text"
                className="input"
                placeholder="example.com or 192.168.1.1"
                value={config.target}
                onChange={(e) => setConfig({ ...config, target: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a domain, IP address, or CIDR range
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace
              </label>
              <input
                type="text"
                className="input"
                placeholder="my-workspace"
                value={config.workspace}
                onChange={(e) => setConfig({ ...config, workspace: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional workspace name for organizing results
              </p>
            </div>
          </div>
        </div>

        {/* Scan Mode */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-gray-900">Scan Mode</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {scanModes.map((mode) => (
              <label
                key={mode.value}
                className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  config.mode === mode.value
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="scan-mode"
                  value={mode.value}
                  checked={config.mode === mode.value}
                  onChange={(e) => setConfig({ ...config, mode: e.target.value as ScanMode })}
                  className="sr-only"
                />
                <div className="flex flex-1 flex-col">
                  <span className="block text-sm font-medium text-gray-900">
                    {mode.label}
                  </span>
                  <span className="mt-1 flex items-center text-xs text-gray-500">
                    {mode.description}
                  </span>
                </div>
                {config.mode === mode.value && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-600 rounded-full" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="osint"
                  type="checkbox"
                  checked={config.osint}
                  onChange={(e) => setConfig({ ...config, osint: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="osint" className="ml-3 text-sm text-gray-700">
                  Enable OSINT gathering
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="recon"
                  type="checkbox"
                  checked={config.recon}
                  onChange={(e) => setConfig({ ...config, recon: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="recon" className="ml-3 text-sm text-gray-700">
                  Enable reconnaissance
                </label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="bruteforce"
                  type="checkbox"
                  checked={config.bruteforce}
                  onChange={(e) => setConfig({ ...config, bruteforce: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="bruteforce" className="ml-3 text-sm text-gray-700">
                  Enable brute force attacks
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="fullPortScan"
                  type="checkbox"
                  checked={config.fullPortScan}
                  onChange={(e) => setConfig({ ...config, fullPortScan: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="fullPortScan" className="ml-3 text-sm text-gray-700">
                  Full port scan (1-65535)
                </label>
              </div>
            </div>
          </div>

          {/* Port specification for port mode */}
          {config.mode === 'port' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Port Number *
              </label>
              <input
                type="number"
                className="input max-w-xs"
                placeholder="80"
                value={config.port || ''}
                onChange={(e) => setConfig({ ...config, port: e.target.value })}
                required
              />
            </div>
          )}
        </div>

        {/* Command Preview */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-gray-900">Command Preview</h3>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-green-400 text-sm font-mono">
              sniper -t {config.target || '<TARGET>'} -m {config.mode}
              {config.workspace && ` -w ${config.workspace}`}
              {config.port && ` -p ${config.port}`}
              {config.osint && ' -o'}
              {config.recon && ' -re'}
              {config.bruteforce && ' -b'}
              {config.fullPortScan && ' -fp'}
            </code>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <button type="button" className="btn-secondary">
            Save as Template
          </button>
          <button 
            type="submit" 
            disabled={!config.target || isRunning}
            className="btn-primary disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Starting Scan...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Scan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}