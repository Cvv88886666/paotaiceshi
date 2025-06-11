"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Server,
  Database,
  Shield,
  Zap,
  GitBranch,
  Package,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"

interface JeepaySystemStatus {
  version: string
  springBootVersion: string
  jdkVersion: string
  uptime: string
  status: "running" | "stopped" | "maintenance"
  services: {
    name: string
    status: "healthy" | "warning" | "error"
    port: number
    memory: number
    cpu: number
  }[]
}

export default function JeepayIntegration() {
  const [systemStatus, setSystemStatus] = useState<JeepaySystemStatus>({
    version: "v2.4.5",
    springBootVersion: "2.7.0",
    jdkVersion: "1.8+",
    uptime: "15天 8小时 32分钟",
    status: "running",
    services: [
      {
        name: "manager",
        status: "healthy",
        port: 9217,
        memory: 512,
        cpu: 15,
      },
      {
        name: "merchant",
        status: "healthy",
        port: 9218,
        memory: 256,
        cpu: 8,
      },
      {
        name: "payment",
        status: "healthy",
        port: 9216,
        memory: 1024,
        cpu: 25,
      },
      {
        name: "mch-ui",
        status: "healthy",
        port: 3001,
        memory: 128,
        cpu: 5,
      },
      {
        name: "ui-manager",
        status: "healthy",
        port: 3002,
        memory: 128,
        cpu: 3,
      },
    ],
  })

  const [dockerStatus, setDockerStatus] = useState({
    containers: [
      { name: "mysql", status: "running", uptime: "15天" },
      { name: "redis", status: "running", uptime: "15天" },
      { name: "rabbitmq", status: "running", uptime: "15天" },
      { name: "manager", status: "running", uptime: "15天" },
      { name: "payment", status: "running", uptime: "15天" },
    ],
  })

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        ...prev,
        services: prev.services.map((service) => ({
          ...service,
          cpu: Math.max(1, Math.min(50, service.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(64, Math.min(2048, service.memory + (Math.random() - 0.5) * 100)),
        })),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "running":
        return "text-green-400 bg-green-500/10 border-green-500/30"
      case "warning":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30"
      case "error":
      case "stopped":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "running":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
      case "stopped":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="grid gap-4 lg:gap-6">
      {/* Jeepay 系统概览 */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50">
          <CardTitle className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-100">支付系统</div>
                <div className="text-sm text-slate-400">让支付接入更简单</div>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">{systemStatus.version}</Badge>
              <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50">
                Spring Boot {systemStatus.springBootVersion}
              </Badge>
              <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                JDK {systemStatus.jdkVersion}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-400">系统状态</div>
                <Server className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-xl font-bold text-green-400">运行中</div>
              <div className="text-xs text-slate-500">运行时间: {systemStatus.uptime}</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-400">活跃服务</div>
                <Activity className="h-5 w-5 text-cyan-500" />
              </div>
              <div className="text-xl font-bold text-cyan-400">{systemStatus.services.length}</div>
              <div className="text-xs text-slate-500">全部服务正常</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-400">Docker 容器</div>
                <Package className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-xl font-bold text-blue-400">{dockerStatus.containers.length}</div>
              <div className="text-xs text-slate-500">容器运行正常</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-400">安全等级</div>
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <div className="text-xl font-bold text-purple-400">高</div>
              <div className="text-xs text-slate-500">LGPL-3.0 许可</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 微服务状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Zap className="mr-2 h-5 w-5 text-cyan-500" />
              微服务状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.services.map((service, index) => (
                <div key={index} className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-slate-200">{service.name}</div>
                      <Badge
                        variant="outline"
                        className={`ml-2 text-xs ${getStatusColor(service.status)} flex items-center`}
                      >
                        {getStatusIcon(service.status)}
                        <span className="ml-1">{service.status === "healthy" ? "正常" : service.status}</span>
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400">:{service.port}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-slate-500">CPU</div>
                        <div className="text-xs text-slate-400">{service.cpu.toFixed(1)}%</div>
                      </div>
                      <Progress value={service.cpu} className="h-1.5 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${service.cpu}%` }}
                        />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-slate-500">内存</div>
                        <div className="text-xs text-slate-400">{service.memory}MB</div>
                      </div>
                      <Progress value={(service.memory / 2048) * 100} className="h-1.5 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                          style={{ width: `${(service.memory / 2048) * 100}%` }}
                        />
                      </Progress>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Package className="mr-2 h-5 w-5 text-blue-500" />
              Docker 容器
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dockerStatus.containers.map((container, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                    <div>
                      <div className="text-sm text-slate-200">{container.name}</div>
                      <div className="text-xs text-slate-500">运行时间: {container.uptime}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(container.status)} flex items-center`}>
                    {getStatusIcon(container.status)}
                    <span className="ml-1">运行中</span>
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  <GitBranch className="mr-2 h-4 w-4" />
                  查看日志
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  <Database className="mr-2 h-4 w-4" />
                  监控面板
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统架构信息 */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <GitBranch className="mr-2 h-5 w-5 text-purple-500" />
            系统架构
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm font-medium text-slate-200 mb-3">前端应用</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">管理端 UI</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                    Vue.js
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">商户端 UI</span>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                    React
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">移动端 H5</span>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
                    Uni-app
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm font-medium text-slate-200 mb-3">后端服务</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">管理服务</span>
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs">
                    Spring Boot
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">支付服务</span>
                  <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs">
                    Spring Cloud
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">商户服务</span>
                  <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-500/30 text-xs">
                    MyBatis Plus
                  </Badge>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm font-medium text-slate-200 mb-3">基础设施</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">数据库</span>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                    MySQL 8.0
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">缓存</span>
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30 text-xs">
                    Redis 6.0
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">消息队列</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                    RabbitMQ
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                基于 shiyanpin 项目集成 | 开源协议: LGPL-3.0 | 最后更新: 2分钟前
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  查看源码
                </Button>
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                  系统升级
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
