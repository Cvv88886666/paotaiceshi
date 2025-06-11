"use client"

import { useState } from "react"
import { Wallet, Search, Filter, Download, Plus, Settings, Eye, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Layout from "../../components/layout"
// 删除这行：import LinPayConfig from "../../components/linpay-config"

export default function PaymentMethodsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showLinPayConfig, setShowLinPayConfig] = useState(false)

  const paymentMethods = [
    {
      id: "visa",
      name: "Visa Card",
      type: "国际信用卡",
      status: "active",
      merchantId: "VISA_MERCHANT_001",
      appId: "visa_app_12345",
      successRate: 98.5,
      todayTransactions: 1247,
      todayVolume: "¥ 245,680.00",
      config: {
        merchantId: "VISA_MERCHANT_001",
        apiKey: "***************",
        environment: "production",
        currency: "USD",
      },
    },
    {
      id: "mastercard",
      name: "Mastercard",
      type: "国际信用卡",
      status: "active",
      merchantId: "MC_MERCHANT_002",
      appId: "mc_app_67890",
      successRate: 97.8,
      todayTransactions: 892,
      todayVolume: "¥ 178,940.00",
      config: {
        merchantId: "MC_MERCHANT_002",
        apiKey: "***************",
        environment: "production",
        currency: "USD",
      },
    },
    {
      id: "amex",
      name: "American Express",
      type: "国际信用卡",
      status: "active",
      merchantId: "AMEX_MERCHANT_003",
      appId: "amex_app_11111",
      successRate: 96.2,
      todayTransactions: 456,
      todayVolume: "¥ 91,200.00",
      config: {
        merchantId: "AMEX_MERCHANT_003",
        apiKey: "***************",
        environment: "production",
        currency: "USD",
      },
    },
    {
      id: "swift",
      name: "SWIFT Bank Transfer",
      type: "国际银行转账",
      status: "active",
      merchantId: "SWIFT_BANK_004",
      appId: "swift_app_22222",
      successRate: 99.1,
      todayTransactions: 234,
      todayVolume: "¥ 468,000.00",
      config: {
        bankCode: "SWIFT_BANK_004",
        routingNumber: "***************",
        environment: "production",
        currency: "USD",
      },
    },
    {
      id: "sepa",
      name: "SEPA Direct Debit",
      type: "欧洲银行转账",
      status: "active",
      merchantId: "SEPA_BANK_005",
      appId: "sepa_app_33333",
      successRate: 98.9,
      todayTransactions: 167,
      todayVolume: "¥ 83,500.00",
      config: {
        creditorId: "SEPA_BANK_005",
        bic: "***************",
        environment: "production",
        currency: "EUR",
      },
    },
    {
      id: "ach",
      name: "ACH Bank Transfer",
      type: "美国银行转账",
      status: "maintenance",
      merchantId: "ACH_BANK_006",
      appId: "ach_app_44444",
      successRate: 0,
      todayTransactions: 0,
      todayVolume: "¥ 0.00",
      config: {
        routingNumber: "***************",
        accountNumber: "***************",
        environment: "sandbox",
        currency: "USD",
      },
    },
  ]

  const filteredMethods = paymentMethods.filter((method) => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || method.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const exportMethods = () => {
    const csvContent = [
      "支付方式ID,支付方式名称,类型,状态,商户号,应用ID,成功率,今日交易笔数,今日交易额",
      ...filteredMethods.map(
        (m) =>
          `${m.id},${m.name},${m.type},${getStatusText(m.status)},${m.merchantId},${m.appId},${m.successRate}%,${m.todayTransactions},${m.todayVolume}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `支付方式配置-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "启用"
      case "inactive":
        return "停用"
      case "maintenance":
        return "维护中"
      default:
        return status
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "inactive":
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
      case "maintenance":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "国际信用卡":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case "国际银行转账":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30"
      case "欧洲银行转账":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
      case "美国银行转账":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30"
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
                  <p className="text-sm text-slate-400">支付方式总数</p>
                  <p className="text-2xl font-bold text-cyan-400">{paymentMethods.length}</p>
                </div>
                <Wallet className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">启用中</p>
                  <p className="text-2xl font-bold text-green-400">
                    {paymentMethods.filter((m) => m.status === "active").length}
                  </p>
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
                  <p className="text-sm text-slate-400">维护中</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {paymentMethods.filter((m) => m.status === "maintenance").length}
                  </p>
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
                  <p className="text-sm text-slate-400">今日总交易</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {paymentMethods.reduce((sum, m) => sum + m.todayTransactions, 0)}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
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
                  placeholder="搜索支付方式..."
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
                  <SelectItem value="active">启用</SelectItem>
                  <SelectItem value="inactive">停用</SelectItem>
                  <SelectItem value="maintenance">维护中</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center text-sm text-slate-400">
                <Filter className="mr-2 h-4 w-4" />
                {filteredMethods.length} / {paymentMethods.length} 条记录
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={exportMethods}
                  variant="outline"
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  导出
                </Button>
                <Dialog open={showLinPayConfig} onOpenChange={setShowLinPayConfig}>
                  <DialogTrigger asChild>
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="mr-2 h-4 w-4" />
                      添加支付方式
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">支付方式配置</DialogTitle>
                    </DialogHeader>
                    <div className="p-6 text-center text-slate-400">
                      <CreditCard className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                      <p>选择要配置的国际银行或信用卡支付方式</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredMethods.map((method) => (
            <Card key={method.id} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-100 text-base">{method.name}</CardTitle>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(method.type)}`}>
                        {method.type}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getStatusStyle(method.status)}`}>
                    {getStatusText(method.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-slate-500 text-xs">商户号</div>
                      <div className="text-slate-300 font-mono text-xs">{method.merchantId || "未配置"}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">应用ID</div>
                      <div className="text-slate-300 font-mono text-xs">{method.appId || "未配置"}</div>
                    </div>
                  </div>

                  {method.status === "active" && (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-slate-500 text-xs">今日交易</div>
                        <div className="text-cyan-400 font-medium">{method.todayVolume}</div>
                        <div className="text-slate-400 text-xs">{method.todayTransactions} 笔</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs">成功率</div>
                        <div className="text-green-400 font-medium">{method.successRate}%</div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-slate-400 hover:text-slate-100">
                      <Eye className="mr-2 h-4 w-4" />
                      查看
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-slate-400 hover:text-slate-100"
                      onClick={() => {
                        if (method.id === "linpay") {
                          setShowLinPayConfig(true)
                        }
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      配置
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
