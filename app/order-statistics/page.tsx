"use client"

import { useState, useMemo } from "react"
import Layout from "@/components/layout"
import { PageHeader } from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DataTable } from "@/components/ui/data-table"
import { Search, RotateCcw, Trash2, BarChart3 } from "lucide-react"
import { formatPercentage } from "@/lib/utils/format"

interface DomainStats {
  domain: string
  todayVisits: number
  todayPayers: number
  todayPayments: number
  todayConversionRate: string
  totalVisits: number
  totalPayers: number
  totalPayments: number
  totalConversionRate: string
}

const mockStats: DomainStats[] = [
  {
    domain: "familybuyzone.com",
    todayVisits: 1,
    todayPayers: 1,
    todayPayments: 1,
    todayConversionRate: "100%",
    totalVisits: 1,
    totalPayers: 1,
    totalPayments: 1,
    totalConversionRate: "100%",
  },
  {
    domain: "secure-portal.net",
    todayVisits: 150,
    todayPayers: 15,
    todayPayments: 20,
    todayConversionRate: "10.00%",
    totalVisits: 1250,
    totalPayers: 130,
    totalPayments: 180,
    totalConversionRate: "10.40%",
  },
]

export default function OrderStatisticsPage() {
  const [showHttpsOnly, setShowHttpsOnly] = useState(false)
  const [domainsInput, setDomainsInput] = useState("")
  const [queriedStats, setQueriedStats] = useState<DomainStats[]>(mockStats)

  const columns = [
    { key: 'domain', title: '域名' },
    { 
      key: 'todayVisits', 
      title: '今日访问',
      align: 'center' as const,
    },
    { 
      key: 'todayPayers', 
      title: '付款人数',
      align: 'center' as const,
    },
    { 
      key: 'todayPayments', 
      title: '付款笔数',
      align: 'center' as const,
    },
    { 
      key: 'todayConversionRate', 
      title: '今日转化率',
      align: 'center' as const,
      render: (value: string) => (
        <span className="text-cyan-400">{value}</span>
      ),
    },
    { 
      key: 'totalVisits', 
      title: '总访问',
      align: 'center' as const,
    },
    { 
      key: 'totalPayers', 
      title: '总付款人数',
      align: 'center' as const,
    },
    { 
      key: 'totalPayments', 
      title: '总付款笔数',
      align: 'center' as const,
    },
    { 
      key: 'totalConversionRate', 
      title: '总转化率',
      align: 'center' as const,
      render: (value: string) => (
        <span className="text-cyan-400">{value}</span>
      ),
    },
  ]

  const totals = useMemo(() => {
    return queriedStats.reduce(
      (acc, stat) => {
        acc.todayVisits += stat.todayVisits
        acc.todayPayers += stat.todayPayers
        acc.todayPayments += stat.todayPayments
        acc.totalVisits += stat.totalVisits
        acc.totalPayers += stat.totalPayers
        acc.totalPayments += stat.totalPayments
        return acc
      },
      {
        todayVisits: 0,
        todayPayers: 0,
        todayPayments: 0,
        totalVisits: 0,
        totalPayers: 0,
        totalPayments: 0,
      },
    )
  }, [queriedStats])

  const calculateConversionRate = (payers: number, visits: number): string => {
    if (visits === 0) return "0.00%"
    return formatPercentage((payers / visits) * 100)
  }

  const handleQuery = () => {
    const inputDomains = domainsInput
      .split("\n")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean)

    if (inputDomains.length === 0) {
      setQueriedStats(mockStats)
      return
    }

    const filtered = mockStats.filter(
      (stat) =>
        inputDomains.includes(stat.domain.toLowerCase()) && 
        (showHttpsOnly ? stat.domain.startsWith("https://") : true),
    )
    setQueriedStats(filtered)
  }

  const handleReset = () => {
    setShowHttpsOnly(false)
    setDomainsInput("")
    setQueriedStats(mockStats)
  }

  const handleClearAllData = () => {
    setQueriedStats([])
  }

  // Add totals row to data
  const dataWithTotals = [
    ...queriedStats,
    ...(queriedStats.length > 0 ? [{
      domain: "总计:",
      todayVisits: totals.todayVisits,
      todayPayers: totals.todayPayers,
      todayPayments: totals.todayPayments,
      todayConversionRate: calculateConversionRate(totals.todayPayers, totals.todayVisits),
      totalVisits: totals.totalVisits,
      totalPayers: totals.totalPayers,
      totalPayments: totals.totalPayments,
      totalConversionRate: calculateConversionRate(totals.totalPayers, totals.totalVisits),
    }] : [])
  ]

  return (
    <Layout>
      <PageHeader
        title="订单统计"
        description="统计各个域名下的支付记录"
      />

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="text-slate-100 text-lg flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
            订单统计过滤器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="https-only"
              checked={showHttpsOnly}
              onCheckedChange={setShowHttpsOnly}
              className="data-[state=checked]:bg-purple-500"
            />
            <Label htmlFor="https-only" className="text-slate-300">
              只显示https链接
            </Label>
          </div>
          <div>
            <Textarea
              placeholder="如有多个域名, 一行一个"
              value={domainsInput}
              onChange={(e) => setDomainsInput(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-100 min-h-[80px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleQuery} className="bg-purple-600 hover:bg-purple-700">
              <Search className="h-4 w-4 mr-2" />
              查询
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-slate-100 text-lg">统计结果</CardTitle>
          <Button
            onClick={handleClearAllData}
            variant="destructive"
            size="sm"
            className="bg-red-700/80 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            一键清空
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={dataWithTotals}
            columns={columns}
            emptyText="没有找到匹配的订单统计记录。"
          />
        </CardContent>
      </Card>
    </Layout>
  )
}