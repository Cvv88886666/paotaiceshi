"use client"

import { useState, useMemo } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, RotateCcw, Trash2, BarChart3 } from "lucide-react"

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
  {
    domain: "shop.example.org",
    todayVisits: 280,
    todayPayers: 35,
    todayPayments: 42,
    todayConversionRate: "12.50%",
    totalVisits: 3200,
    totalPayers: 380,
    totalPayments: 450,
    totalConversionRate: "11.88%",
  },
]

export default function OrderStatisticsPage() {
  const [showHttpsOnly, setShowHttpsOnly] = useState(false)
  const [domainsInput, setDomainsInput] = useState("")
  const [queriedStats, setQueriedStats] = useState<DomainStats[]>(mockStats)

  const handleQuery = () => {
    const inputDomains = domainsInput
      .split("\n")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean)

    if (inputDomains.length === 0) {
      setQueriedStats(mockStats) // Show all if no specific domains are entered
      return
    }

    const filtered = mockStats.filter(
      (stat) =>
        inputDomains.includes(stat.domain.toLowerCase()) && (showHttpsOnly ? stat.domain.startsWith("https://") : true),
    )
    setQueriedStats(filtered)
  }

  const handleReset = () => {
    setShowHttpsOnly(false)
    setDomainsInput("")
    setQueriedStats(mockStats)
  }

  const handleClearAllData = () => {
    // Implement actual data clearing logic here
    setQueriedStats([])
    console.log("All order statistics data cleared.")
  }

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
    return ((payers / visits) * 100).toFixed(2) + "%"
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
              订单统计过滤器
            </CardTitle>
            <p className="text-sm text-slate-400">统计各个域名下的支付记录</p>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-800/50">
                  <TableRow className="border-slate-700/50">
                    <TableHead className="p-3 text-slate-400">域名</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">今日访问</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">付款人数</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">付款笔数</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">今日转化率</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">总访问</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">总付款人数</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">总付款笔数</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">总转化率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queriedStats.map((stat) => (
                    <TableRow key={stat.domain} className="border-slate-700/50 hover:bg-slate-800/30">
                      <TableCell className="p-3 text-sm text-slate-300">{stat.domain}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300 text-center">{stat.todayVisits}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300 text-center">{stat.todayPayers}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300 text-center">{stat.todayPayments}</TableCell>
                      <TableCell className="p-3 text-sm text-cyan-400 text-center">
                        {calculateConversionRate(stat.todayPayers, stat.todayVisits)}
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-300 text-center">{stat.totalVisits}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300 text-center">{stat.totalPayers}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300 text-center">{stat.totalPayments}</TableCell>
                      <TableCell className="p-3 text-sm text-cyan-400 text-center">
                        {calculateConversionRate(stat.totalPayers, stat.totalVisits)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {queriedStats.length > 0 && (
                    <TableRow className="border-t border-slate-700/50 bg-slate-800/70 font-medium">
                      <TableCell className="p-3 text-sm text-slate-200">总计:</TableCell>
                      <TableCell className="p-3 text-sm text-slate-200 text-center">{totals.todayVisits}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-200 text-center">{totals.todayPayers}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-200 text-center">{totals.todayPayments}</TableCell>
                      <TableCell className="p-3 text-sm text-cyan-300 text-center">
                        {calculateConversionRate(totals.todayPayers, totals.todayVisits)}
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-200 text-center">{totals.totalVisits}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-200 text-center">{totals.totalPayers}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-200 text-center">{totals.totalPayments}</TableCell>
                      <TableCell className="p-3 text-sm text-cyan-300 text-center">
                        {calculateConversionRate(totals.totalPayers, totals.totalVisits)}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {queriedStats.length === 0 && (
              <p className="p-6 text-center text-slate-500">没有找到匹配的订单统计记录。</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
