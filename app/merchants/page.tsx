"use client"

import { useState } from "react"
import { Users, Search, Filter, Download, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "../../components/layout"

export default function MerchantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const merchants = [
    {
      id: "M2023001",
      name: "环球贸易集团",
      contact: "张总经理",
      phone: "138****1234",
      email: "manager@globaltrade.com",
      status: "active",
      registerDate: "2023-01-15",
      todayTransactions: 156,
      todayVolume: "¥ 1,245,000.00",
      totalVolume: "¥ 124,500,000.00",
    },
    {
      id: "M2023002",
      name: "跨境电商平台",
      contact: "李总监",
      phone: "139****5678",
      email: "director@crossborder.com",
      status: "active",
      registerDate: "2023-02-20",
      todayTransactions: 892,
      todayVolume: "¥ 8,920,000.00",
      totalVolume: "¥ 892,000,000.00",
    },
    {
      id: "M2023003",
      name: "国际物流公司",
      contact: "王总裁",
      phone: "137****9012",
      email: "ceo@intllogistics.com",
      status: "active",
      registerDate: "2023-03-10",
      todayTransactions: 234,
      todayVolume: "¥ 2,340,000.00",
      totalVolume: "¥ 234,000,000.00",
    },
    {
      id: "M2023004",
      name: "欧洲进口商",
      contact: "陈经理",
      phone: "136****3456",
      email: "manager@euroimport.com",
      status: "pending",
      registerDate: "2023-06-14",
      todayTransactions: 0,
      todayVolume: "¥ 0.00",
      totalVolume: "¥ 0.00",
    },
    {
      id: "M2023005",
      name: "美国科技公司",
      contact: "刘主管",
      phone: "135****7890",
      email: "supervisor@ustech.com",
      status: "active",
      registerDate: "2023-04-05",
      todayTransactions: 445,
      todayVolume: "¥ 4,450,000.00",
      totalVolume: "¥ 445,000,000.00",
    },
    {
      id: "M2023006",
      name: "国际金融服务",
      contact: "赵总监",
      phone: "134****2468",
      email: "director@intlfinance.com",
      status: "suspended",
      registerDate: "2023-05-12",
      todayTransactions: 0,
      todayVolume: "¥ 0.00",
      totalVolume: "¥ 56,700,000.00",
    },
  ]

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || merchant.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const exportMerchants = () => {
    const csvContent = [
      "商户ID,商户名称,联系人,电话,邮箱,状态,注册日期,今日交易笔数,今日交易额,总交易额",
      ...filteredMerchants.map(
        (m) =>
          `${m.id},${m.name},${m.contact},${m.phone},${m.email},${getStatusText(m.status)},${m.registerDate},${m.todayTransactions},${m.todayVolume},${m.totalVolume}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `商户列表-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "正常"
      case "pending":
        return "待审核"
      case "suspended":
        return "暂停"
      default:
        return status
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      case "suspended":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <Layout>
      <div className="grid gap-4 lg:gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">总商户数</p>
                  <p className="text-2xl font-bold text-cyan-400">1,245</p>
                </div>
                <Users className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">活跃商户</p>
                  <p className="text-2xl font-bold text-green-400">1,127</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">待审核</p>
                  <p className="text-2xl font-bold text-amber-400">18</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">本月新增</p>
                  <p className="text-2xl font-bold text-blue-400">24</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="搜索商户..."
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
                  <SelectItem value="active">正常</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                  <SelectItem value="suspended">暂停</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center text-sm text-slate-400">
                <Filter className="mr-2 h-4 w-4" />
                {filteredMerchants.length} / {merchants.length} 条记录
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={exportMerchants}
                  variant="outline"
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  导出
                </Button>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="mr-2 h-4 w-4" />
                  新增商户
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Merchants Table */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-cyan-500" />
              商户列表
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/50">
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      商户信息
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      联系方式
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">状态</th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      今日交易
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      总交易额
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredMerchants.map((merchant) => (
                    <tr key={merchant.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="text-sm font-medium text-slate-200">{merchant.name}</div>
                          <div className="text-xs text-slate-400">{merchant.id}</div>
                          <div className="text-xs text-slate-500">注册: {merchant.registerDate}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="text-sm text-slate-300">{merchant.contact}</div>
                          <div className="text-xs text-slate-400">{merchant.phone}</div>
                          <div className="text-xs text-slate-500">{merchant.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={`text-xs ${getStatusStyle(merchant.status)}`}>
                          {getStatusText(merchant.status)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="text-sm text-cyan-400 font-medium">{merchant.todayVolume}</div>
                          <div className="text-xs text-slate-400">{merchant.todayTransactions} 笔</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-slate-300 font-medium">{merchant.totalVolume}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
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
