import React, { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  Key, 
  Globe, 
  Shield,
  Bell,
  Save,
  RefreshCw
} from 'lucide-react'

interface SettingsConfig {
  // API Keys
  shodanApiKey: string
  censysAppId: string
  censysApiSecret: string
  hunterIoKey: string
  githubApiKey: string
  
  // Scan Settings
  threads: number
  timeout: number
  enableAutoUpdates: boolean
  
  // Notifications
  slackNotifications: boolean
  slackWebhookUrl: string
  
  // Advanced
  nmapOptions: string
  customWordlists: boolean
}

export default function Settings() {
  const [config, setConfig] = useState<SettingsConfig>({
    shodanApiKey: '',
    censysAppId: '',
    censysApiSecret: '',
    hunterIoKey: '',
    githubApiKey: '',
    threads: 100,
    timeout: 30,
    enableAutoUpdates: true,
    slackNotifications: false,
    slackWebhookUrl: '',
    nmapOptions: '--script-args http.useragent=\'\' --open',
    customWordlists: false,
  })

  const [activeTab, setActiveTab] = useState('api-keys')

  const handleSave = () => {
    // In a real implementation, this would save to the backend
    console.log('Saving configuration:', config)
    alert('Settings saved successfully!')
  }

  const tabs = [
    { id: 'api-keys', name: 'API Keys', icon: Key },
    { id: 'scan-settings', name: 'Scan Settings', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'advanced', name: 'Advanced', icon: Shield },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure Sn1per scanner options and integrations</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'api-keys' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Keys</h3>
              <p className="text-sm text-gray-600 mb-6">
                Configure API keys for enhanced OSINT and reconnaissance capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shodan API Key
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Shodan API key"
                  value={config.shodanApiKey}
                  onChange={(e) => setConfig({ ...config, shodanApiKey: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hunter.io API Key
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Hunter.io API key"
                  value={config.hunterIoKey}
                  onChange={(e) => setConfig({ ...config, hunterIoKey: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Censys App ID
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Censys App ID"
                  value={config.censysAppId}
                  onChange={(e) => setConfig({ ...config, censysAppId: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Censys API Secret
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Censys API Secret"
                  value={config.censysApiSecret}
                  onChange={(e) => setConfig({ ...config, censysApiSecret: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub API Key
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter GitHub API key for subdomain enumeration"
                  value={config.githubApiKey}
                  onChange={(e) => setConfig({ ...config, githubApiKey: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scan-settings' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Scan Settings</h3>
              <p className="text-sm text-gray-600 mb-6">
                Configure default scanning parameters and performance options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thread Count
                </label>
                <input
                  type="number"
                  className="input"
                  min="1"
                  max="500"
                  value={config.threads}
                  onChange={(e) => setConfig({ ...config, threads: parseInt(e.target.value) })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Number of parallel execution threads (1-500)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeout (seconds)
                </label>
                <input
                  type="number"
                  className="input"
                  min="5"
                  max="300"
                  value={config.timeout}
                  onChange={(e) => setConfig({ ...config, timeout: parseInt(e.target.value) })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Connection timeout for network operations
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="auto-updates"
                  type="checkbox"
                  checked={config.enableAutoUpdates}
                  onChange={(e) => setConfig({ ...config, enableAutoUpdates: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="auto-updates" className="ml-3 text-sm text-gray-700">
                  Enable automatic updates
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="custom-wordlists"
                  type="checkbox"
                  checked={config.customWordlists}
                  onChange={(e) => setConfig({ ...config, customWordlists: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="custom-wordlists" className="ml-3 text-sm text-gray-700">
                  Use custom wordlists for directory brute forcing
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
              <p className="text-sm text-gray-600 mb-6">
                Configure notification settings for scan completion and findings.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="slack-notifications"
                  type="checkbox"
                  checked={config.slackNotifications}
                  onChange={(e) => setConfig({ ...config, slackNotifications: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="slack-notifications" className="ml-3 text-sm text-gray-700">
                  Enable Slack notifications
                </label>
              </div>

              {config.slackNotifications && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slack Webhook URL
                  </label>
                  <input
                    type="url"
                    className="input"
                    placeholder="https://hooks.slack.com/services/..."
                    value={config.slackWebhookUrl}
                    onChange={(e) => setConfig({ ...config, slackWebhookUrl: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h3>
              <p className="text-sm text-gray-600 mb-6">
                Advanced configuration options for experienced users.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Nmap Options
              </label>
              <textarea
                className="textarea"
                placeholder="--script-args http.useragent='' --open"
                value={config.nmapOptions}
                onChange={(e) => setConfig({ ...config, nmapOptions: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Custom Nmap command line options (use with caution)
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Warning
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Modifying advanced settings may affect scan performance and accuracy. 
                      Only change these settings if you understand their implications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t">
          <button onClick={handleSave} className="btn-primary">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}