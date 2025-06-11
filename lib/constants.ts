export const APP_CONFIG = {
  name: "林北炮台支付系统",
  version: "v2.4.5",
  description: "基于 Jeepay 的现代化支付管理平台",
  author: "Global Pay Team",
} as const

export const ROUTES = {
  HOME: "/",
  DATA_CENTER: "/data-center",
  ORDER_STATISTICS: "/order-statistics",
  LOG_INFORMATION: "/log-information",
  ACCESS_RECORDS: "/access-records",
  FRONTEND_CONFIG: "/frontend-config",
  LINBEIPAY_CONFIG: "/frontend-config/linbeipay",
  SYSTEM_SETTINGS: "/system-settings",
  MERCHANTS: "/merchants",
  PAYMENT_METHODS: "/payment-methods",
  TRANSACTIONS: "/transactions",
  SYSTEM: "/system",
} as const

export const STATUS_COLORS = {
  success: "bg-green-500/10 text-green-400 border-green-500/30",
  failed: "bg-red-500/10 text-red-400 border-red-500/30",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  blocked: "bg-red-500/10 text-red-400 border-red-500/30",
  active: "bg-green-500/10 text-green-400 border-green-500/30",
  inactive: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  maintenance: "bg-amber-500/10 text-amber-400 border-amber-500/30",
} as const

export const PAGINATION_SIZES = [10, 25, 50, 100] as const

export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"

export const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  CNY: "¥",
  TWD: "NT$",
} as const