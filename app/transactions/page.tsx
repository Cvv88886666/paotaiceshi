"use client"

import { useState } from "react"
import { CreditCard, Download, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "../../components/layout"

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")

  const transactions = [
    {
      id: "P202306150001",
      merchant: "国际贸易有限公司",
      amount: "¥ 35,000.00",
      channel: "Visa Card",
      time: "2023-06-15 15:42:12",
      status: "success",
      fee: "¥ 1,050.00",
      orderId: "ORDER_001",
    },
    {
      id: "P202306150002",
      merchant: "跨境电商平台",
      amount: "¥ 129,900.00",
      channel: "Mastercard",
      time: "2023-06-15 15:38:05",
      status: "success",
      fee: "¥ 3,897.00",
      orderId: "ORDER_002",
    },
    {
      id: "P202306150003",
      merchant: "进出口贸易公司",
      amount: "¥ 250,000.00",
      channel: "SWIFT Transfer",
      time: "2023-06-15 15:35:47",
      status: "success",
      fee: "¥ 2,500.00",
      orderId: "ORDER_003",
    },
    {
      id: "P202306150004",
      merchant: "海外采购中心",
      amount: "¥ 86,800.00",
      channel: "American Express",
      time: "2023-06-15 15:30:22",
      status: "failed",
      fee: "¥ 0.00",
      orderId: "ORDER_004",
    },
    {
      id: "P202306150005",
      merchant: "欧洲供应商",
      amount: "¥ 156,500.00",
      channel: "SEPA Transfer",
      time: "2023-06-15 15:25:18",
      status: "success",
      fee: "¥ 1,565.00",
      orderId: "ORDER_005",
    },
    {
      id: "P202306150006",
      merchant: "美国科技公司",
      amount: "¥ 45,000.00",
      channel: "ACH Transfer",
      time: "2023-06-15 15:20:33",
      status: "pending",
      fee: "¥ 450.00",
      orderId: "ORDER_006",
    },
    {
      id: "P202306150007",
      merchant: "国际物流公司",
      amount: "¥ 78,900.00",
      channel: "Visa Card",
      time: "2023-06-15 15:15:45",
      status: "success",
      fee: "¥ 2,367.00",
      orderId: "ORDER_007",
    },
    {
      id: "P202306150008",
      merchant: "全球采购平台",
      amount: "¥ 234,500.00",
      channel: "SWIFT Transfer",
      time: "2023-06-15 15:10:12",
      status: "success",
      fee: "¥ 2,345.00",
      orderId: "ORDER_008",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesChannel = channelFilter === "all" || transaction.channel === channelFilter

    return matchesSearch && matchesStatus && matchesChannel
  })

  const exportTransactions = () => {
    const csvContent = [
      "交易号,商户,金额,渠道,时间,状态,手续费,订单号",
      ...filteredTransactions.map(
        (t) =>
          `${t.id},${t.merchant},${t.amount},${t.channel},${t.time},${t.status === "success" ? "成功" : t.status === "failed" ? "失败" : "处理中"},${t.fee},${t.orderId}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `交易记录-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Layout>
      <div className="grid gap-4 lg:gap-6">
        {/* Filters */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="搜索交易..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                  <SelectValue placeholder="按状态筛选" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="success">成功</SelectItem>
                  <SelectItem value="failed">失败</SelectItem>
                  <SelectItem value="pending">处理中</SelectItem>
                </SelectContent>
              </Select>

              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                  <SelectValue placeholder="按渠道筛选" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">全部渠道</SelectItem>
                  <SelectItem value="Visa Card">Visa Card</SelectItem>
                  <SelectItem value="Mastercard">Mastercard</SelectItem>
                  <SelectItem value="American Express">American Express</SelectItem>
                  <SelectItem value="SWIFT Transfer">SWIFT Transfer</SelectItem>
                  <SelectItem value="SEPA Transfer">SEPA Transfer</SelectItem>
                  <SelectItem value="ACH Transfer">ACH Transfer</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-400">
                  <Filter className="mr-2 h-4 w-4" />
                  {filteredTransactions.length} / {transactions.length} 条记录
                </div>
                <Button onClick={exportTransactions} className="bg-cyan-600 hover:bg-cyan-700">
                  <Download className="mr-2 h-4 w-4" />
                  导出 CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-cyan-500" />
              交易记录
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/50">
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      交易号
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">商户</th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">金额</th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">渠道</th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">时间</th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">状态</th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      手续费
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      订单号
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 text-sm text-slate-300 font-mono">{transaction.id}</td>
                      <td className="p-4 text-sm text-slate-200">{transaction.merchant}</td>
                      <td className="p-4 text-sm text-cyan-400 font-medium">{transaction.amount}</td>
                      <td className="p-4 text-sm text-slate-300">{transaction.channel}</td>
                      <td className="p-4 text-sm text-slate-400 font-mono">{transaction.time}</td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            transaction.status === "success"
                              ? "bg-green-500/10 text-green-400 border-green-500/30"
                              : transaction.status === "failed"
                                ? "bg-red-500/10 text-red-400 border-red-500/30"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {transaction.status === "success"
                            ? "成功"
                            : transaction.status === "failed"
                              ? "失败"
                              : "处理中"}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-slate-400">{transaction.fee}</td>
                      <td className="p-4 text-sm text-slate-300 font-mono">{transaction.orderId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
