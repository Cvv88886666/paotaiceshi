"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  LineChart,
  PieChart,
  RefreshCw,
  Users,
  type LucideIcon,
} from "lucide-react"

import JeepayIntegration from "../components/jeepay-integration"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Layout from "../components/layout"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // 导出完整报告
  const exportFullReport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      const report = {
        timestamp: new Date().toISOString(),
        paymentOverview: {
          todayTransactions: 1254,
          successRate: 98.7,
          activeMerchants: 342,
          pendingSettlements: 56,
        },
        channels: [
          { name: "Visa Card", transactions: 523, volume: "¥ 245,680.00", successRate: 98.5 },
          { name: "Mastercard", transactions: 412, volume: "¥ 178,940.00", successRate: 97.8 },
          { name: "SWIFT Transfer", transactions: 319, volume: "¥ 468,000.00", successRate: 99.1 },
        ],
      }

      // 模拟导出进度
      for (let i = 0; i <= 100; i += 10) {
        setExportProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // 导出JSON格式的完整报告
      const jsonString = JSON.stringify(report, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `支付系统报告-${new Date().toISOString().split("T")[0]}.json`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("导出失败:", error)
    } finally {
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  // 导出图表为图片
  const exportChartAsImage = async (elementId: string, filename: string) => {
    try {
      // 创建canvas来绘制图表
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = 800
      canvas.height = 400
      ctx.scale(1, 1)

      // 设置背景
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, 800, 400)

      // 绘制标题
      ctx.fillStyle = "#06b6d4"
      ctx.font = "16px Arial"
      ctx.fillText("银行卡支付交易趋势图", 20, 30)

      // 绘制示例数据线
      ctx.strokeStyle = "#06b6d4"
      ctx.lineWidth = 2
      ctx.beginPath()

      const dataPoints = Array.from({ length: 24 }, (_, i) => ({
        x: 50 + (700 / 24) * i,
        y: 350 - Math.random() * 200,
      }))

      dataPoints.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.stroke()

      // 导出图片
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a")
          const url = URL.createObjectURL(blob)
          link.setAttribute("href", url)
          link.setAttribute("download", `${filename}.png`)
          link.style.visibility = "hidden"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
    } catch (error) {
      console.error("导出失败:", error)
    }
  }

  return (
    <Layout>
      {/* Jeepay 系统集成 */}
      <JeepayIntegration />

      <div className="grid gap-4 lg:gap-6 mt-6">
        {/* Payment Overview */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-slate-700/50 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                银行卡支付概览
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                  实时
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <Download className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      onClick={() => exportChartAsImage("payment-chart", "银行卡支付趋势图")}
                      className="text-slate-300 hover:bg-slate-700"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      导出图表 (PNG)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={exportFullReport}
                      className="text-slate-300 hover:bg-slate-700"
                      disabled={isExporting}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      导出完整报告 (JSON)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <MetricCard
                title="今日交易"
                value={1254}
                icon={CreditCard}
                trend="up"
                color="cyan"
                detail="¥ 125,487.00"
                isCount
              />
              <MetricCard title="成功率" value={98.7} icon={PieChart} trend="stable" color="green" detail="1.3% 失败" />
              <MetricCard
                title="活跃商户"
                value={342}
                icon={Users}
                trend="up"
                color="blue"
                detail="今日新增 24"
                isCount
              />
              <MetricCard
                title="待结算"
                value={56}
                icon={DollarSign}
                trend="down"
                color="purple"
                detail="¥ 458,932.00"
                isCount
              />
            </div>

            <div className="mt-8">
              <Tabs defaultValue="transactions" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-slate-800/50 p-1">
                    <TabsTrigger
                      value="transactions"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      交易记录
                    </TabsTrigger>
                    <TabsTrigger
                      value="channels"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      支付渠道
                    </TabsTrigger>
                    <TabsTrigger
                      value="settlements"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      结算记录
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                      信用卡支付
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                      银行转账
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                      国际汇款
                    </div>
                  </div>
                </div>

                <TabsContent value="transactions" className="mt-0">
                  <div
                    id="payment-chart"
                    className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden"
                  >
                    <PaymentChart />
                    <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                      <div className="text-xs text-slate-400">今日交易量</div>
                      <div className="text-lg font-mono text-cyan-400">¥ 125,487.00</div>
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                    <div className="flex justify-between items-center p-4">
                      <div className="text-sm font-medium text-slate-200">最近交易</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/transactions")}
                        className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                      >
                        查看全部
                      </Button>
                    </div>

                    <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                      <div className="col-span-2">交易号</div>
                      <div className="col-span-2">商户</div>
                      <div className="col-span-2">金额</div>
                      <div className="col-span-2">渠道</div>
                      <div className="col-span-2">时间</div>
                      <div className="col-span-2">状态</div>
                    </div>

                    <div className="divide-y divide-slate-700/30">
                      <TransactionRow
                        id="P202306150001"
                        merchant="国际贸易公司"
                        amount="¥ 3,500.00"
                        channel="Visa Card"
                        time="15:42:12"
                        status="success"
                      />
                      <TransactionRow
                        id="P202306150002"
                        merchant="跨境电商"
                        amount="¥ 12,990.00"
                        channel="Mastercard"
                        time="15:38:05"
                        status="success"
                      />
                      <TransactionRow
                        id="P202306150003"
                        merchant="进出口贸易"
                        amount="¥ 25,000.00"
                        channel="SWIFT Transfer"
                        time="15:35:47"
                        status="success"
                      />
                      <TransactionRow
                        id="P202306150004"
                        merchant="海外采购"
                        amount="¥ 8,680.00"
                        channel="American Express"
                        time="15:30:22"
                        status="failed"
                      />
                      <TransactionRow
                        id="P202306150005"
                        merchant="欧洲供应商"
                        amount="¥ 15,650.00"
                        channel="SEPA Transfer"
                        time="15:25:18"
                        status="success"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="channels" className="mt-0">
                  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-slate-400">银行卡支付渠道</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/payment-methods")}
                        className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                      >
                        管理渠道
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                      <PaymentChannelItem
                        name="Visa Card"
                        status="active"
                        transactionCount={1247}
                        volume="¥ 245,680.00"
                        successRate={98.5}
                      />
                      <PaymentChannelItem
                        name="Mastercard"
                        status="active"
                        transactionCount={892}
                        volume="¥ 178,940.00"
                        successRate={97.8}
                      />
                      <PaymentChannelItem
                        name="SWIFT Transfer"
                        status="active"
                        transactionCount={234}
                        volume="¥ 468,000.00"
                        successRate={99.1}
                      />
                      <PaymentChannelItem
                        name="American Express"
                        status="active"
                        transactionCount={456}
                        volume="¥ 91,200.00"
                        successRate={96.2}
                      />
                      <PaymentChannelItem
                        name="SEPA Transfer"
                        status="active"
                        transactionCount={167}
                        volume="¥ 83,500.00"
                        successRate={98.9}
                      />
                      <PaymentChannelItem
                        name="ACH Transfer"
                        status="maintenance"
                        transactionCount={0}
                        volume="¥ 0.00"
                        successRate={0}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settlements" className="mt-0">
                  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-slate-400">最近结算</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/settlements")}
                        className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                      >
                        查看全部
                      </Button>
                    </div>

                    <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                      <div className="col-span-2">结算号</div>
                      <div className="col-span-2">商户</div>
                      <div className="col-span-2">金额</div>
                      <div className="col-span-2">银行账户</div>
                      <div className="col-span-2">日期</div>
                      <div className="col-span-2">状态</div>
                    </div>

                    <div className="divide-y divide-slate-700/30">
                      <SettlementRow
                        id="S202306150001"
                        merchant="国际贸易公司"
                        amount="¥ 35,000.00"
                        account="**** 1234"
                        date="2023-06-15"
                        status="completed"
                      />
                      <SettlementRow
                        id="S202306150002"
                        merchant="跨境电商"
                        amount="¥ 129,900.00"
                        account="**** 5678"
                        date="2023-06-15"
                        status="processing"
                      />
                      <SettlementRow
                        id="S202306150003"
                        merchant="进出口贸易"
                        amount="¥ 250,000.00"
                        account="**** 9012"
                        date="2023-06-15"
                        status="pending"
                      />
                      <SettlementRow
                        id="S202306140001"
                        merchant="海外采购"
                        amount="¥ 86,800.00"
                        account="**** 3456"
                        date="2023-06-14"
                        status="completed"
                      />
                      <SettlementRow
                        id="S202306140002"
                        merchant="欧洲供应商"
                        amount="¥ 156,500.00"
                        account="**** 7890"
                        date="2023-06-14"
                        status="completed"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Merchant & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-100 flex items-center text-base">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                商户概览
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">总商户数</div>
                  <div className="text-sm text-cyan-400">1,245</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">今日活跃</div>
                  <div className="text-sm text-cyan-400">342</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">新注册</div>
                  <div className="text-sm text-cyan-400">
                    24 <span className="text-green-400 text-xs">(+12%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">待审核</div>
                  <div className="text-sm text-amber-400">18</div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">商户增长</div>
                    <div className="text-sm text-cyan-400">
                      +15% <span className="text-slate-500">本月</span>
                    </div>
                  </div>
                  <Progress value={15} className="h-2 bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `15%` }}
                    />
                  </Progress>
                </div>

                <div className="pt-4 mt-2">
                  <Button
                    variant="outline"
                    className="w-full bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                    onClick={() => router.push("/merchants")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    管理商户
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-100 flex items-center text-base">
                <AlertCircle className="mr-2 h-5 w-5 text-green-500" />
                安全状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">风险检测</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">正常</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">欺诈防护</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">启用</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">数据加密</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">启用</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">可疑交易</div>
                  <div className="text-sm text-amber-400">
                    3 <span className="text-slate-500">待审核</span>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">安全等级</div>
                    <div className="text-sm text-cyan-400">85%</div>
                  </div>
                  <Progress value={85} className="h-2 bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                      style={{ width: `85%` }}
                    />
                  </Progress>
                </div>

                <div className="pt-4 mt-2">
                  <Button
                    variant="outline"
                    className="w-full bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                    onClick={() => router.push("/security")}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    安全中心
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
              系统警报
            </CardTitle>
            <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
              4 条新警报
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AlertItem title="银行卡网关状态" time="14:32:12" description="所有银行卡支付网关运行正常" type="info" />
              <AlertItem
                title="异常交易模式"
                time="13:45:06"
                description="商户 M2023051 出现多次银行卡交易失败"
                type="warning"
              />
              <AlertItem
                title="系统更新可用"
                time="09:12:45"
                description="银行卡支付系统 v2.4.5 已就绪，包含安全改进"
                type="update"
              />
              <AlertItem
                title="日结算完成"
                time="04:30:00"
                description="6月14日所有银行卡交易结算已成功处理"
                type="success"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  isCount = false,
}: {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  isCount?: boolean
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-amber-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {isCount ? value.toLocaleString() : `${value}%`}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
  )
}

// Payment chart component
function PaymentChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">¥30k</div>
        <div className="text-xs text-slate-500">¥20k</div>
        <div className="text-xs text-slate-500">¥10k</div>
        <div className="text-xs text-slate-500">¥5k</div>
        <div className="text-xs text-slate-500">¥0</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const creditCardHeight = Math.floor(Math.random() * 40) + 20
          const bankTransferHeight = Math.floor(Math.random() * 30) + 30
          const internationalHeight = Math.floor(Math.random() * 20) + 10

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${creditCardHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                style={{ height: `${bankTransferHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${internationalHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">00:00</div>
        <div className="text-xs text-slate-500">06:00</div>
        <div className="text-xs text-slate-500">12:00</div>
        <div className="text-xs text-slate-500">18:00</div>
        <div className="text-xs text-slate-500">24:00</div>
      </div>
    </div>
  )
}

// Transaction row component
function TransactionRow({
  id,
  merchant,
  amount,
  channel,
  time,
  status,
}: {
  id: string
  merchant: string
  amount: string
  channel: string
  time: string
  status: string
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-2 text-slate-500">{id}</div>
      <div className="col-span-2 text-slate-300">{merchant}</div>
      <div className="col-span-2 text-cyan-400">{amount}</div>
      <div className="col-span-2 text-slate-400">{channel}</div>
      <div className="col-span-2 text-slate-400">{time}</div>
      <div className="col-span-2">
        <Badge
          variant="outline"
          className={`${status === "success" ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"} text-xs`}
        >
          {status === "success" ? "成功" : "失败"}
        </Badge>
      </div>
    </div>
  )
}

// Settlement row component
function SettlementRow({
  id,
  merchant,
  amount,
  account,
  date,
  status,
}: {
  id: string
  merchant: string
  amount: string
  account: string
  date: string
  status: string
}) {
  const getStatusStyle = () => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "processing":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "已完成"
      case "processing":
        return "处理中"
      case "pending":
        return "待处理"
      default:
        return status
    }
  }

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-2 text-slate-500">{id}</div>
      <div className="col-span-2 text-slate-300">{merchant}</div>
      <div className="col-span-2 text-cyan-400">{amount}</div>
      <div className="col-span-2 text-slate-400">{account}</div>
      <div className="col-span-2 text-slate-400">{date}</div>
      <div className="col-span-2">
        <Badge variant="outline" className={`${getStatusStyle()} text-xs`}>
          {getStatusText()}
        </Badge>
      </div>
    </div>
  )
}

// Payment Channel Item component
function PaymentChannelItem({
  name,
  status,
  transactionCount,
  volume,
  successRate,
}: {
  name: string
  status: "active" | "inactive" | "maintenance"
  transactionCount: number
  volume: string
  successRate: number
}) {
  const getStatusStyle = () => {
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

  const getStatusText = () => {
    switch (status) {
      case "active":
        return "正常"
      case "inactive":
        return "停用"
      case "maintenance":
        return "维护中"
      default:
        return status
    }
  }

  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{name}</div>
        <Badge variant="outline" className={`${getStatusStyle()} text-xs`}>
          {getStatusText()}
        </Badge>
      </div>

      {status === "active" ? (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="text-xs text-slate-500 mb-1">交易笔数</div>
              <div className="text-sm font-medium text-slate-200">{transactionCount}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">交易金额</div>
              <div className="text-sm font-medium text-cyan-400">{volume}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs text-slate-500">成功率</div>
              <div className="text-xs text-slate-400">{successRate}%</div>
            </div>
            <Progress value={successRate} className="h-1.5 bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                style={{ width: `${successRate}%` }}
              />
            </Progress>
          </div>
        </>
      ) : (
        <div className="py-3 text-center text-xs text-slate-500">
          {status === "maintenance" ? "系统维护中" : "暂无活跃交易"}
        </div>
      )}
    </div>
  )
}

// Alert item component
function AlertItem({
  title,
  time,
  description,
  type,
}: {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "warning":
        return { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "error":
        return { icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30" }
      case "success":
        return { icon: Check, color: "text-green-500 bg-green-500/10 border-green-500/30" }
      case "update":
        return { icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" }
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{title}</div>
          <div className="ml-2 text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}

// Add missing imports
function Info(props: any) {
  return <AlertCircle {...props} />
}

function Check(props: any) {
  return <AlertCircle {...props} />
}
