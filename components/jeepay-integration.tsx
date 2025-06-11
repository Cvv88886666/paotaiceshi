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
    ],
  })

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
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-700/50">
        <CardTitle className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-100">Jeepay 支付系统</div>
              <div className="text-sm text-slate-400">让支付接入更简单</div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">{systemStatus.version}</Badge>
            <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50">
              Spring Boot {systemStatus.springBootVersion}
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
            <div className="text-xl font-bold text-blue-400">5</div>
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
  )
}