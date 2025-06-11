"use client"

import { useState, useEffect } from "react"
import {
  Server,
  Database,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Download,
  Upload,
  Activity,
  CheckCircle,
  Settings,
  RefreshCw,
  Terminal,
  FileText,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Layout from "../../components/layout"

export default function SystemPage() {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 25,
    memory: 68,
    disk: 45,
    network: 12,
    uptime: "15天 8小时 32分钟",
    load: [1.2, 1.5, 1.8],
  })

  const [services, setServices] = useState([
    { name: "jeepay-manager", status: "running", port: 9217, pid: 1234, memory: "512MB" },
    { name: "jeepay-merchant", status: "running", port: 9218, pid: 1235, memory: "256MB" },
    { name: "jeepay-payment", status: "running", port: 9216, pid: 1236, memory: "1024MB" },
    { name: "mysql", status: "running", port: 3306, pid: 1237, memory: "2048MB" },
    { name: "redis", status: "running", port: 6379, pid: 1238, memory: "128MB" },
    { name: "rabbitmq", status: "running", port: 5672, pid: 1239, memory: "256MB" },
  ])

  const [logs, setLogs] = useState([
    { time: "2023-06-15 15:42:12", level: "INFO", service: "jeepay-payment", message: "支付订单处理成功 [ORDER_001]" },
    { time: "2023-06-15 15:41:58", level: "INFO", service: "jeepay-manager", message: "商户认证通过 [M2023001]" },
    { time: "2023-06-15 15:41:45", level: "WARN", service: "jeepay-payment", message: "支付渠道响应超时，正在重试" },
    {
      time: "2023-06-15 15:41:32",
      level: "INFO",
      service: "jeepay-merchant",
      message: "商户登录成功 [admin@test.com]",
    },
    { time: "2023-06-15 15:41:18", level: "ERROR", service: "jeepay-payment", message: "支付订单验签失败 [ORDER_002]" },
    { time: "2023-06-15 15:41:05", level: "INFO", service: "jeepay-manager", message: "系统配置更新完成" },
  ])

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        ...prev,
        cpu: Math.max(5, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(1, Math.min(50, prev.network + (Math.random() - 0.5) * 8)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-400 bg-green-500/10 border-green-500/30"
      case "stopped":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      case "warning":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30"
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/30"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "INFO":
        return "text-blue-400"
      case "WARN":
        return "text-amber-400"
      case "ERROR":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <Layout>
      <div className="grid gap-4 lg:gap-6">
        {/* 系统概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">CPU 使用率</p>
                  <p className="text-2xl font-bold text-cyan-400">{systemMetrics.cpu.toFixed(1)}%</p>
                </div>
                <Cpu className="h-8 w-8 text-cyan-500" />
              </div>
              <Progress value={systemMetrics.cpu} className="mt-2 h-2 bg-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${systemMetrics.cpu}%` }}
                />
              </Progress>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">内存使用率</p>
                  <p className="text-2xl font-bold text-green-400">{systemMetrics.memory}%</p>
                </div>
                <MemoryStick className="h-8 w-8 text-green-500" />
              </div>
              <Progress value={systemMetrics.memory} className="mt-2 h-2 bg-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  style={{ width: `${systemMetrics.memory}%` }}
                />
              </Progress>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">磁盘使用率</p>
                  <p className="text-2xl font-bold text-blue-400">{systemMetrics.disk}%</p>
                </div>
                <HardDrive className="h-8 w-8 text-blue-500" />
              </div>
              <Progress value={systemMetrics.disk} className="mt-2 h-2 bg-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  style={{ width: `${systemMetrics.disk}%` }}
                />
              </Progress>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">网络流量</p>
                  <p className="text-2xl font-bold text-purple-400">{systemMetrics.network.toFixed(1)} MB/s</p>
                </div>
                <Network className="h-8 w-8 text-purple-500" />
              </div>
              <div className="flex items-center mt-2 space-x-2 text-xs text-slate-500">
                <Upload className="h-3 w-3" />
                <span>5.2 MB/s</span>
                <Download className="h-3 w-3" />
                <span>7.8 MB/s</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细监控 */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="bg-slate-800/50 p-1">
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              服务状态
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              性能监控
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              系统日志
            </TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              系统配置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-4">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Server className="mr-2 h-5 w-5 text-cyan-500" />
                    服务状态监控
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                          <div>
                            <div className="text-sm font-medium text-slate-200">{service.name}</div>
                            <div className="text-xs text-slate-500">
                              PID: {service.pid} | 端口: {service.port}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-xs text-slate-400">内存: {service.memory}</div>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(service.status)}`}>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            运行中
                          </Badge>
                          <Button variant="ghost" size="sm" className="text-slate-400">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                    系统负载
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">1分钟负载</span>
                        <span className="text-sm text-cyan-400">{systemMetrics.load[0]}</span>
                      </div>
                      <Progress value={systemMetrics.load[0] * 25} className="h-2 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${systemMetrics.load[0] * 25}%` }}
                        />
                      </Progress>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">5分钟负载</span>
                        <span className="text-sm text-green-400">{systemMetrics.load[1]}</span>
                      </div>
                      <Progress value={systemMetrics.load[1] * 25} className="h-2 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${systemMetrics.load[1] * 25}%` }}
                        />
                      </Progress>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">15分钟负载</span>
                        <span className="text-sm text-blue-400">{systemMetrics.load[2]}</span>
                      </div>
                      <Progress value={systemMetrics.load[2] * 25} className="h-2 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${systemMetrics.load[2] * 25}%` }}
                        />
                      </Progress>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Monitor className="mr-2 h-5 w-5 text-green-500" />
                    系统信息
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">系统运行时间</span>
                      <span className="text-sm text-slate-300">{systemMetrics.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">操作系统</span>
                      <span className="text-sm text-slate-300">Ubuntu 20.04 LTS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">内核版本</span>
                      <span className="text-sm text-slate-300">5.4.0-74-generic</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Java 版本</span>
                      <span className="text-sm text-slate-300">OpenJDK 1.8.0_292</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Docker 版本</span>
                      <span className="text-sm text-slate-300">20.10.7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Jeepay 版本</span>
                      <span className="text-sm text-cyan-400">v2.4.5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-cyan-500" />
                    系统日志
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-slate-400">
                      <Terminal className="mr-2 h-4 w-4" />
                      实时日志
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-700/50 font-mono text-sm max-h-96 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 py-1 hover:bg-slate-800/30 rounded px-2">
                      <span className="text-slate-500 text-xs w-20 flex-shrink-0">{log.time.split(" ")[1]}</span>
                      <span className={`text-xs w-12 flex-shrink-0 ${getLevelColor(log.level)}`}>{log.level}</span>
                      <span className="text-slate-400 text-xs w-24 flex-shrink-0">{log.service}</span>
                      <span className="text-slate-300 text-xs flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Database className="mr-2 h-5 w-5 text-blue-500" />
                    数据库配置
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">数据库类型</span>
                      <span className="text-sm text-slate-300">MySQL 8.0.25</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">连接池大小</span>
                      <span className="text-sm text-slate-300">20</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">最大连接数</span>
                      <span className="text-sm text-slate-300">100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">连接超时</span>
                      <span className="text-sm text-slate-300">30s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">查询超时</span>
                      <span className="text-sm text-slate-300">60s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <GitBranch className="mr-2 h-5 w-5 text-purple-500" />
                    应用配置
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">运行环境</span>
                      <span className="text-sm text-slate-300">production</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">日志级别</span>
                      <span className="text-sm text-slate-300">INFO</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">会话超时</span>
                      <span className="text-sm text-slate-300">30分钟</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">文件上传限制</span>
                      <span className="text-sm text-slate-300">10MB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">API 限流</span>
                      <span className="text-sm text-slate-300">1000/分钟</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
