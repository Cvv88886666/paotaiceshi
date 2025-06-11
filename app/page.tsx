"use client"

import { useState, useEffect } from "react"
import { Activity, CreditCard, DollarSign, Users, BarChart3, TrendingUp } from "lucide-react"
import Layout from "@/components/layout"
import { MetricCard } from "@/components/common/metric-card"
import { PageHeader } from "@/components/common/page-header"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/utils/format"
import { usePagination } from "@/lib/hooks/use-pagination"
import type { Transaction } from "@/lib/types"

const mockTransactions: Transaction[] = [
  {
    id: "P202306150001",
    merchantId: "M001",
    merchantName: "国际贸易有限公司",
    amount: "35000.00",
    currency: "CNY",
    channel: "Visa Card",
    status: "success",
    fee: "1050.00",
    orderId: "ORDER_001",
    createdAt: "2023-06-15T15:42:12Z",
    updatedAt: "2023-06-15T15:42:12Z",
  },
  {
    id: "P202306150002",
    merchantId: "M002",
    merchantName: "跨境电商平台",
    amount: "129900.00",
    currency: "CNY",
    channel: "Mastercard",
    status: "success",
    fee: "3897.00",
    orderId: "ORDER_002",
    createdAt: "2023-06-15T15:38:05Z",
    updatedAt: "2023-06-15T15:38:05Z",
  },
  {
    id: "P202306150003",
    merchantId: "M003",
    merchantName: "进出口贸易公司",
    amount: "250000.00",
    currency: "CNY",
    channel: "SWIFT Transfer",
    status: "pending",
    fee: "2500.00",
    orderId: "ORDER_003",
    createdAt: "2023-06-15T15:35:47Z",
    updatedAt: "2023-06-15T15:35:47Z",
  },
]

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    todayTransactions: 1254,
    successRate: 98.7,
    activeMerchants: 342,
    pendingSettlements: 56,
  })

  const pagination = usePagination({
    data: mockTransactions,
    itemsPerPage: 5,
  })

  const columns = [
    {
      key: 'id',
      title: '交易号',
      render: (value: string) => (
        <span className="font-mono text-xs">{value}</span>
      ),
    },
    {
      key: 'merchantName',
      title: '商户',
    },
    {
      key: 'amount',
      title: '金额',
      render: (value: string) => (
        <span className="text-cyan-400 font-medium">
          {formatCurrency(parseFloat(value))}
        </span>
      ),
    },
    {
      key: 'channel',
      title: '渠道',
    },
    {
      key: 'status',
      title: '状态',
      render: (value: string) => (
        <StatusBadge status={value as any}>
          {value === 'success' ? '成功' : value === 'failed' ? '失败' : '处理中'}
        </StatusBadge>
      ),
    },
    {
      key: 'createdAt',
      title: '时间',
      render: (value: string) => (
        <span className="text-xs text-slate-400">
          {formatDate(value, 'time')}
        </span>
      ),
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        todayTransactions: prev.todayTransactions + Math.floor(Math.random() * 5),
        successRate: Math.max(95, Math.min(99.9, prev.successRate + (Math.random() - 0.5) * 0.5)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <PageHeader
        title="仪表盘"
        description="欢迎来到林北炮台支付系统控制面板"
      >
        <Button className="bg-purple-600 hover:bg-purple-700">
          <BarChart3 className="h-4 w-4 mr-2" />
          查看报告
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="今日交易"
          value={metrics.todayTransactions.toLocaleString()}
          icon={CreditCard}
          trend={{ value: 12.5, isPositive: true }}
          color="cyan"
        />
        <MetricCard
          title="成功率"
          value={`${metrics.successRate.toFixed(1)}%`}
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          color="green"
        />
        <MetricCard
          title="活跃商户"
          value={metrics.activeMerchants}
          icon={Users}
          trend={{ value: 8.3, isPositive: true }}
          color="blue"
        />
        <MetricCard
          title="待结算"
          value={metrics.pendingSettlements}
          icon={DollarSign}
          trend={{ value: -5.2, isPositive: false }}
          color="purple"
        />
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-100">
            <Activity className="mr-2 h-5 w-5 text-cyan-500" />
            最近交易
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={pagination.paginatedData}
            columns={columns}
            pagination={{
              current: pagination.currentPage,
              pageSize: pagination.pageSize,
              total: pagination.totalItems,
              onChange: (page, pageSize) => {
                pagination.goToPage(page)
                pagination.setPageSize(pageSize)
              },
            }}
          />
        </CardContent>
      </Card>
    </Layout>
  )
}