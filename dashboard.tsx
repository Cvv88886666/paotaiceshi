"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Command,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Hexagon,
  LineChart,
  type LucideIcon,
  Moon,
  PieChart,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sun,
  Users,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [systemStatus, setSystemStatus] = useState(85)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [activeModule, setActiveModule] = useState("dashboard")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // 导出CSV数据
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(",")
    const csvContent = [headers, ...data.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 导出JSON数据
  const exportToJSON = (data: any, filename: string) => {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 导出图表为图片
  const exportChartAsImage = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    try {
      // 创建canvas来绘制图表
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const rect = element.getBoundingClientRect()
      canvas.width = rect.width * 2 // 高分辨率
      canvas.height = rect.height * 2
      ctx.scale(2, 2)

      // 设置背景
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, rect.width, rect.height)

      // 简化的图表绘制（实际项目中可以使用html2canvas等库）
      ctx.strokeStyle = "#06b6d4"
      ctx.lineWidth = 2
      ctx.beginPath()

      // 绘制示例数据线
      const dataPoints = Array.from({ length: 24 }, (_, i) => ({
        x: (rect.width / 24) * i,
        y: rect.height - (Math.random() * rect.height * 0.6 + rect.height * 0.2),
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
      console.error("Export failed:", error)
    }
  }

  // 生成系统报告数据
  const generateSystemReport = () => {
    return {
      timestamp: new Date().toISOString(),
      systemOverview: {
        cpuUsage,
        memoryUsage,
        networkStatus,
        systemStatus,
        securityLevel,
      },
      processes: [
        { pid: "1024", name: "system_core.exe", user: "SYSTEM", cpu: 12.4, memory: 345, status: "running" },
        { pid: "1842", name: "nexus_service.exe", user: "SYSTEM", cpu: 8.7, memory: 128, status: "running" },
        { pid: "2156", name: "security_monitor.exe", user: "ADMIN", cpu: 5.2, memory: 96, status: "running" },
        { pid: "3012", name: "network_manager.exe", user: "SYSTEM", cpu: 3.8, memory: 84, status: "running" },
        { pid: "4268", name: "user_interface.exe", user: "USER", cpu: 15.3, memory: 256, status: "running" },
        { pid: "5124", name: "data_analyzer.exe", user: "ADMIN", cpu: 22.1, memory: 512, status: "running" },
      ],
      storage: [
        { name: "System Drive (C:)", total: 512, used: 324, type: "SSD" },
        { name: "Data Drive (D:)", total: 2048, used: 1285, type: "HDD" },
        { name: "Backup Drive (E:)", total: 4096, used: 1865, type: "HDD" },
        { name: "External Drive (F:)", total: 1024, used: 210, type: "SSD" },
      ],
      alerts: [
        {
          title: "Security Scan Complete",
          time: "14:32:12",
          description: "No threats detected in system scan",
          type: "info",
        },
        {
          title: "Bandwidth Spike Detected",
          time: "13:45:06",
          description: "Unusual network activity on port 443",
          type: "warning",
        },
        {
          title: "System Update Available",
          time: "09:12:45",
          description: "Version 12.4.5 ready to install",
          type: "update",
        },
        {
          title: "Backup Completed",
          time: "04:30:00",
          description: "Incremental backup to drive E: successful",
          type: "success",
        },
      ],
    }
  }

  // 导出完整报告
  const exportFullReport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      const report = generateSystemReport()

      // 模拟导出进度
      for (let i = 0; i <= 100; i += 10) {
        setExportProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // 导出JSON格式的完整报告
      exportToJSON(report, `system-report-${new Date().toISOString().split("T")[0]}`)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  // 导出进程数据
  const exportProcessData = () => {
    const processData = [
      { pid: "1024", name: "system_core.exe", user: "SYSTEM", cpu: 12.4, memory: 345, status: "running" },
      { pid: "1842", name: "nexus_service.exe", user: "SYSTEM", cpu: 8.7, memory: 128, status: "running" },
      { pid: "2156", name: "security_monitor.exe", user: "ADMIN", cpu: 5.2, memory: 96, status: "running" },
      { pid: "3012", name: "network_manager.exe", user: "SYSTEM", cpu: 3.8, memory: 84, status: "running" },
      { pid: "4268", name: "user_interface.exe", user: "USER", cpu: 15.3, memory: 256, status: "running" },
      { pid: "5124", name: "data_analyzer.exe", user: "ADMIN", cpu: 22.1, memory: 512, status: "running" },
    ]
    exportToCSV(processData, `processes-${new Date().toISOString().split("T")[0]}`)
  }

  // 导出存储数据
  const exportStorageData = () => {
    const storageData = [
      { name: "System Drive (C:)", total: 512, used: 324, free: 188, type: "SSD", usage: "63%" },
      { name: "Data Drive (D:)", total: 2048, used: 1285, free: 763, type: "HDD", usage: "63%" },
      { name: "Backup Drive (E:)", total: 4096, used: 1865, free: 2231, type: "HDD", usage: "46%" },
      { name: "External Drive (F:)", total: 1024, used: 210, free: 814, type: "SSD", usage: "21%" },
    ]
    exportToCSV(storageData, `storage-${new Date().toISOString().split("T")[0]}`)
  }

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // 导航到不同的模块
  const navigateTo = (module: string) => {
    setActiveModule(module)
    if (module !== "dashboard") {
      router.push(`/${module}`)
    } else {
      router.push("/")
    }
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
          </div>
        </div>
      )}

      <div className="w-full px-4 lg:px-6 xl:px-8 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-4 lg:mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              JEEPAY ADMIN
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 xl:w-60 2xl:w-80 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">CM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Sidebar */}
          <div className="col-span-12 xl:col-span-2 2xl:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem
                    icon={Command}
                    label="Dashboard"
                    active={activeModule === "dashboard"}
                    onClick={() => navigateTo("dashboard")}
                  />
                  <NavItem
                    icon={CreditCard}
                    label="Transactions"
                    active={activeModule === "transactions"}
                    onClick={() => navigateTo("transactions")}
                  />
                  <NavItem
                    icon={Users}
                    label="Merchants"
                    active={activeModule === "merchants"}
                    onClick={() => navigateTo("merchants")}
                  />
                  <NavItem
                    icon={Wallet}
                    label="Payment Methods"
                    active={activeModule === "payment-methods"}
                    onClick={() => navigateTo("payment-methods")}
                  />
                  <NavItem
                    icon={DollarSign}
                    label="Settlements"
                    active={activeModule === "settlements"}
                    onClick={() => navigateTo("settlements")}
                  />
                  <NavItem
                    icon={FileText}
                    label="Reconciliation"
                    active={activeModule === "reconciliation"}
                    onClick={() => navigateTo("reconciliation")}
                  />
                  <NavItem
                    icon={Shield}
                    label="Security"
                    active={activeModule === "security"}
                    onClick={() => navigateTo("security")}
                  />
                  <NavItem
                    icon={Settings}
                    label="Settings"
                    active={activeModule === "settings"}
                    onClick={() => navigateTo("settings")}
                  />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
                  <div className="space-y-3">
                    <StatusItem label="API Services" value={systemStatus} color="cyan" />
                    <StatusItem label="Security" value={securityLevel} color="green" />
                    <StatusItem label="Database" value={networkStatus} color="blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <div className="grid gap-4 lg:gap-6">
              {/* Payment Overview */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                      Payment Overview
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                        LIVE
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
                            onClick={() => exportChartAsImage("payment-chart", "payment-chart")}
                            className="text-slate-300 hover:bg-slate-700"
                          >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Export Chart as PNG
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={exportFullReport}
                            className="text-slate-300 hover:bg-slate-700"
                            disabled={isExporting}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Export Full Report (JSON)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <MetricCard
                      title="Today's Transactions"
                      value={1254}
                      icon={CreditCard}
                      trend="up"
                      color="cyan"
                      detail="¥ 125,487.00"
                      isCount
                    />
                    <MetricCard
                      title="Successful Rate"
                      value={98.7}
                      icon={PieChart}
                      trend="stable"
                      color="green"
                      detail="1.3% Failed"
                    />
                    <MetricCard
                      title="Active Merchants"
                      value={342}
                      icon={Users}
                      trend="up"
                      color="blue"
                      detail="24 New Today"
                      isCount
                    />
                    <MetricCard
                      title="Pending Settlements"
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
                            Transactions
                          </TabsTrigger>
                          <TabsTrigger
                            value="channels"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Payment Channels
                          </TabsTrigger>
                          <TabsTrigger
                            value="settlements"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Settlements
                          </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                            WeChat Pay
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                            Alipay
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                            UnionPay
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
                            <div className="text-xs text-slate-400">Today's Volume</div>
                            <div className="text-lg font-mono text-cyan-400">¥ 125,487.00</div>
                          </div>
                        </div>

                        <div className="mt-6 bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <div className="flex justify-between items-center p-4">
                            <div className="text-sm font-medium text-slate-200">Recent Transactions</div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigateTo("transactions")}
                              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                            >
                              View All
                            </Button>
                          </div>

                          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="col-span-2">Transaction ID</div>
                            <div className="col-span-2">Merchant</div>
                            <div className="col-span-2">Amount</div>
                            <div className="col-span-2">Channel</div>
                            <div className="col-span-2">Time</div>
                            <div className="col-span-2">Status</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            <TransactionRow
                              id="P202306150001"
                              merchant="Coffee Shop"
                              amount="¥ 35.00"
                              channel="WeChat Pay"
                              time="15:42:12"
                              status="success"
                            />
                            <TransactionRow
                              id="P202306150002"
                              merchant="Online Store"
                              amount="¥ 299.00"
                              channel="Alipay"
                              time="15:38:05"
                              status="success"
                            />
                            <TransactionRow
                              id="P202306150003"
                              merchant="Gas Station"
                              amount="¥ 200.00"
                              channel="UnionPay"
                              time="15:35:47"
                              status="success"
                            />
                            <TransactionRow
                              id="P202306150004"
                              merchant="Restaurant"
                              amount="¥ 168.00"
                              channel="WeChat Pay"
                              time="15:30:22"
                              status="failed"
                            />
                            <TransactionRow
                              id="P202306150005"
                              merchant="Supermarket"
                              amount="¥ 86.50"
                              channel="Alipay"
                              time="15:25:18"
                              status="success"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="channels" className="mt-0">
                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-sm text-slate-400">Payment Channels</div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigateTo("payment-methods")}
                              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                            >
                              Manage Channels
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                            <PaymentChannelItem
                              name="WeChat Pay"
                              status="active"
                              transactionCount={523}
                              volume="¥ 52,487.00"
                              successRate={99.2}
                            />
                            <PaymentChannelItem
                              name="Alipay"
                              status="active"
                              transactionCount={412}
                              volume="¥ 48,932.00"
                              successRate={98.5}
                            />
                            <PaymentChannelItem
                              name="UnionPay"
                              status="active"
                              transactionCount={319}
                              volume="¥ 24,068.00"
                              successRate={99.8}
                            />
                            <PaymentChannelItem
                              name="Apple Pay"
                              status="inactive"
                              transactionCount={0}
                              volume="¥ 0.00"
                              successRate={0}
                            />
                            <PaymentChannelItem
                              name="PayPal"
                              status="maintenance"
                              transactionCount={0}
                              volume="¥ 0.00"
                              successRate={0}
                            />
                            <PaymentChannelItem
                              name="Credit Card"
                              status="active"
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
                            <div className="text-sm text-slate-400">Recent Settlements</div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigateTo("settlements")}
                              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                            >
                              View All
                            </Button>
                          </div>

                          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="col-span-2">Settlement ID</div>
                            <div className="col-span-2">Merchant</div>
                            <div className="col-span-2">Amount</div>
                            <div className="col-span-2">Bank Account</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2">Status</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            <SettlementRow
                              id="S202306150001"
                              merchant="Coffee Shop"
                              amount="¥ 3,500.00"
                              account="**** 1234"
                              date="2023-06-15"
                              status="completed"
                            />
                            <SettlementRow
                              id="S202306150002"
                              merchant="Online Store"
                              amount="¥ 12,299.00"
                              account="**** 5678"
                              date="2023-06-15"
                              status="processing"
                            />
                            <SettlementRow
                              id="S202306150003"
                              merchant="Gas Station"
                              amount="¥ 8,200.00"
                              account="**** 9012"
                              date="2023-06-15"
                              status="pending"
                            />
                            <SettlementRow
                              id="S202306140001"
                              merchant="Restaurant"
                              amount="¥ 5,168.00"
                              account="**** 3456"
                              date="2023-06-14"
                              status="completed"
                            />
                            <SettlementRow
                              id="S202306140002"
                              merchant="Supermarket"
                              amount="¥ 15,086.50"
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
                      Merchant Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Total Merchants</div>
                        <div className="text-sm text-cyan-400">1,245</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Active Today</div>
                        <div className="text-sm text-cyan-400">342</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">New Registrations</div>
                        <div className="text-sm text-cyan-400">
                          24 <span className="text-green-400 text-xs">(+12%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Pending Approval</div>
                        <div className="text-sm text-amber-400">18</div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Merchant Growth</div>
                          <div className="text-sm text-cyan-400">
                            +15% <span className="text-slate-500">this month</span>
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
                          onClick={() => navigateTo("merchants")}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Manage Merchants
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Shield className="mr-2 h-5 w-5 text-green-500" />
                      Security Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Risk Detection</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Fraud Prevention</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Data Encryption</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Suspicious Transactions</div>
                        <div className="text-sm text-amber-400">
                          3 <span className="text-slate-500">pending review</span>
                        </div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Security Level</div>
                          <div className="text-sm text-cyan-400">{securityLevel}%</div>
                        </div>
                        <Progress value={securityLevel} className="h-2 bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                            style={{ width: `${securityLevel}%` }}
                          />
                        </Progress>
                      </div>

                      <div className="pt-4 mt-2">
                        <Button
                          variant="outline"
                          className="w-full bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                          onClick={() => navigateTo("security")}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Security Center
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
                    System Alerts
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                    4 New Alerts
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AlertItem
                      title="Payment Gateway Status"
                      time="14:32:12"
                      description="All payment gateways are operational"
                      type="info"
                    />
                    <AlertItem
                      title="Unusual Transaction Pattern"
                      time="13:45:06"
                      description="Multiple failed transactions from merchant ID: M2023051"
                      type="warning"
                    />
                    <AlertItem
                      title="System Update Available"
                      time="09:12:45"
                      description="Jeepay v2.4.5 ready to install with security improvements"
                      type="update"
                    />
                    <AlertItem
                      title="Daily Settlement Completed"
                      time="04:30:00"
                      description="All merchant settlements for June 14 processed successfully"
                      type="success"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Export Progress Indicator */}
        {isExporting && (
          <div className="fixed bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 min-w-[300px] z-50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200 mb-1">Exporting Report...</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 mt-1">{exportProgress}% complete</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
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
          const wechatHeight = Math.floor(Math.random() * 40) + 20
          const alipayHeight = Math.floor(Math.random() * 30) + 30
          const unionpayHeight = Math.floor(Math.random() * 20) + 10

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${wechatHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                style={{ height: `${alipayHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${unionpayHeight}%` }}
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
          {status === "success" ? "Success" : "Failed"}
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

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-2 text-slate-500">{id}</div>
      <div className="col-span-2 text-slate-300">{merchant}</div>
      <div className="col-span-2 text-cyan-400">{amount}</div>
      <div className="col-span-2 text-slate-400">{account}</div>
      <div className="col-span-2 text-slate-400">{date}</div>
      <div className="col-span-2">
        <Badge variant="outline" className={`${getStatusStyle()} text-xs`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
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

  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{name}</div>
        <Badge variant="outline" className={`${getStatusStyle()} text-xs`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {status === "active" ? (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="text-xs text-slate-500 mb-1">Transactions</div>
              <div className="text-sm font-medium text-slate-200">{transactionCount}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Volume</div>
              <div className="text-sm font-medium text-cyan-400">{volume}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs text-slate-500">Success Rate</div>
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
          {status === "maintenance" ? "Under maintenance" : "No active transactions"}
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
function Info(props) {
  return <AlertCircle {...props} />
}

function Check(props) {
  return <Shield {...props} />
}
