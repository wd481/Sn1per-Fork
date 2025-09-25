import React, { useState } from 'react'
import { 
  FolderOpen, 
  Plus, 
  Search, 
  MoreVertical,
  Calendar,
  Target,
  AlertTriangle,
  Trash2,
  Edit
} from 'lucide-react'
import type { Workspace } from '../types'

const mockWorkspaces: Workspace[] = [
  {
    name: 'production',
    description: 'Production environment security scans',
    created: '2024-01-10T10:00:00Z',
    lastModified: '2024-01-15T14:30:00Z',
    scanCount: 25,
    hostCount: 12,
    vulnerabilityCount: 45,
  },
  {
    name: 'internal',
    description: 'Internal network assessment',
    created: '2024-01-12T09:15:00Z',
    lastModified: '2024-01-15T11:20:00Z',
    scanCount: 8,
    hostCount: 156,
    vulnerabilityCount: 23,
  },
  {
    name: 'testing',
    description: 'Development and testing environment',
    created: '2024-01-14T16:45:00Z',
    lastModified: '2024-01-15T09:10:00Z',
    scanCount: 12,
    hostCount: 7,
    vulnerabilityCount: 8,
  },
  {
    name: 'external',
    description: 'External facing assets',
    created: '2024-01-08T11:30:00Z',
    lastModified: '2024-01-14T15:45:00Z',
    scanCount: 18,
    hostCount: 23,
    vulnerabilityCount: 67,
  },
]

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewWorkspace, setShowNewWorkspace] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('')

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workspace.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWorkspaceName.trim()) return

    const newWorkspace: Workspace = {
      name: newWorkspaceName.trim(),
      description: newWorkspaceDescription.trim(),
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      scanCount: 0,
      hostCount: 0,
      vulnerabilityCount: 0,
    }

    setWorkspaces([...workspaces, newWorkspace])
    setNewWorkspaceName('')
    setNewWorkspaceDescription('')
    setShowNewWorkspace(false)
  }

  const handleDeleteWorkspace = (name: string) => {
    if (confirm(`Are you sure you want to delete workspace "${name}"? This action cannot be undone.`)) {
      setWorkspaces(workspaces.filter(w => w.name !== name))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workspaces</h1>
          <p className="text-gray-600">Organize and manage your scan results</p>
        </div>
        <button 
          onClick={() => setShowNewWorkspace(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Workspace
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search workspaces..."
          className="input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* New Workspace Form */}
      {showNewWorkspace && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Workspace</h3>
          <form onSubmit={handleCreateWorkspace} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name *
              </label>
              <input
                type="text"
                className="input"
                placeholder="my-workspace"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="textarea"
                placeholder="Optional description for this workspace"
                value={newWorkspaceDescription}
                onChange={(e) => setNewWorkspaceDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => setShowNewWorkspace(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Create Workspace
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkspaces.map((workspace) => (
          <div key={workspace.name} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{workspace.name}</h3>
                  {workspace.description && (
                    <p className="text-sm text-gray-500">{workspace.description}</p>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{workspace.scanCount}</div>
                <div className="text-xs text-gray-500">Scans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{workspace.hostCount}</div>
                <div className="text-xs text-gray-500">Hosts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{workspace.vulnerabilityCount}</div>
                <div className="text-xs text-gray-500">Vulns</div>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-2 text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-3 w-3" />
                <span>Created {new Date(workspace.created).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-3 w-3" />
                <span>Modified {new Date(workspace.lastModified).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 btn-outline text-xs">
                <Target className="h-3 w-3 mr-1" />
                View
              </button>
              <button className="flex-1 btn-outline text-xs">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </button>
              <button 
                onClick={() => handleDeleteWorkspace(workspace.name)}
                className="btn-outline text-xs text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkspaces.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No workspaces found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new workspace.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button 
                onClick={() => setShowNewWorkspace(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Workspace
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}