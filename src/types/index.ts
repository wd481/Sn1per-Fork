export interface ScanConfig {
  target: string
  mode: ScanMode
  workspace?: string
  port?: string
  osint: boolean
  recon: boolean
  bruteforce: boolean
  fullPortScan: boolean
  customConfig?: string
}

export type ScanMode = 
  | 'normal'
  | 'stealth' 
  | 'web'
  | 'discover'
  | 'port'
  | 'fullportonly'
  | 'webscan'
  | 'vulnscan'
  | 'airstrike'
  | 'nuke'
  | 'flyover'

export interface ScanResult {
  id: string
  target: string
  mode: ScanMode
  workspace: string
  status: 'running' | 'completed' | 'failed'
  startTime: string
  endTime?: string
  duration?: number
  vulnerabilities: Vulnerability[]
  ports: Port[]
  domains: string[]
}

export interface Vulnerability {
  id: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO'
  name: string
  description: string
  url?: string
  evidence?: string
  cve?: string
}

export interface Port {
  number: number
  protocol: 'tcp' | 'udp'
  state: 'open' | 'closed' | 'filtered'
  service?: string
  version?: string
}

export interface Workspace {
  name: string
  description?: string
  created: string
  lastModified: string
  scanCount: number
  hostCount: number
  vulnerabilityCount: number
}