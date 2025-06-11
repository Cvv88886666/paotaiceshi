"use client"

import type React from "react"
import { useEffect, useState, useRef, useMemo } from "react"
import {
  Bell,
  Hexagon,
  Moon,
  Search,
  Shield,
  Sun,
  type LucideIcon,
  Database,
  BarChart3,
  GitBranch,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  List,
  Hourglass,
  Link2,
  CheckCircle2,
  Trash2,
  Ban,
  Scroll,
  HistoryIcon,
  UserCog,
  SettingsIcon,
  Settings2,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [systemStatus, setSystemStatus] = useState(85)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 优化的粒子效果
  const particleEffect = useMemo(() => {
    if (typeof window === 'undefined') return null
    
    return {
      particles: Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      }))
    }
  }, [])

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // 更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // 模拟数据变化
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(Math.floor(Math.random() * 10) + 80)
      setSecurityLevel(Math.floor(Math.random() * 15) + 70)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 优化的粒子动画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !particleEffect) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particleEffect.particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.fillStyle = `rgba(100, 150, 200, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [particleEffect])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const getPageTitle = () => {
    if (pathname.startsWith("/data-center")) {
      if (pathname === "/data-center/pending") return "数据中心 - 待处理"
      if (pathname === "/data-center/bound") return "数据中心 - 已绑定"
      if (pathname === "/data-center/completed") return "数据中心 - 已完成"
      if (pathname === "/data-center/trash") return "数据中心 - 垃圾桶"
      if (pathname === "/data-center/blacklist") return "数据中心 - 黑名单"
      return "数据中心 - 全部"
    }
    if (pathname.startsWith("/roles-permissions")) {
      if (pathname === "/roles-permissions/account-list") return "角色 & 权限 - 账号列表"
      if (pathname === "/roles-permissions/role-permissions") return "角色 & 权限 - 角色权限"
      return "角色 & 权限"
    }
    switch (pathname) {
      case "/":
        return "仪表盘"
      case "/data-center":
        return "数据中心"
      case "/order-statistics":
        return "订单统计"
      case "/log-information":
        return "日志信息"
      case "/roles-permissions":
        return "角色 & 权限"
      case "/access-records":
        return "访问记录"
      case "/frontend-config":
        return "前台配置"
      case "/frontend-config/linbeipay":
        return "访问控制"
      case "/source-version":
        return "源码 & 版本"
      case "/system-settings":
        return "系统设置"
      case "/faq":
        return "FAQ"
      default:
        return "仪表盘"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
            <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
          <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">系统初始化中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />
      
      <div className="w-full px-4 lg:px-6 xl:px-8 relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-4 lg:mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              林北炮台支付系统
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索交易、商户、银行..."
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
                    <p>通知</p>
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
                    <p>切换主题</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="用户" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">管理</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-4 lg:gap-6 flex-1">
          <div className="col-span-12 xl:col-span-2 2xl:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem
                    icon={LayoutDashboard}
                    label="仪表盘"
                    active={pathname === "/"}
                    onClick={() => navigateTo("/")}
                  />
                  <NavItem
                    icon={Shield}
                    label="访问控制"
                    active={pathname === "/frontend-config/linbeipay"}
                    onClick={() => navigateTo("/frontend-config/linbeipay")}
                  />
                  <Collapsible
                    open={pathname.startsWith("/data-center")}
                    onOpenChange={(isOpen) => {
                      if (isOpen && !pathname.startsWith("/data-center/")) {
                        navigateTo("/data-center")
                      }
                    }}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${pathname.startsWith("/data-center") ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
                      >
                        <Database className="mr-2 h-4 w-4" />
                        数据中心
                        {pathname.startsWith("/data-center") ? (
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 py-1">
                      <NavItem
                        icon={List}
                        label="全部"
                        active={pathname === "/data-center" || pathname === "/data-center/all"}
                        onClick={() => navigateTo("/data-center")}
                        isSubItem
                      />
                      <NavItem
                        icon={Hourglass}
                        label="待处理"
                        active={pathname === "/data-center/pending"}
                        onClick={() => navigateTo("/data-center/pending")}
                        isSubItem
                      />
                      <NavItem
                        icon={Link2}
                        label="已绑定"
                        active={pathname === "/data-center/bound"}
                        onClick={() => navigateTo("/data-center/bound")}
                        isSubItem
                      />
                      <NavItem
                        icon={CheckCircle2}
                        label="已完成"
                        active={pathname === "/data-center/completed"}
                        onClick={() => navigateTo("/data-center/completed")}
                        isSubItem
                      />
                      <NavItem
                        icon={Trash2}
                        label="垃圾桶"
                        active={pathname === "/data-center/trash"}
                        onClick={() => navigateTo("/data-center/trash")}
                        isSubItem
                      />
                      <NavItem
                        icon={Ban}
                        label="黑名单"
                        active={pathname === "/data-center/blacklist"}
                        onClick={() => navigateTo("/data-center/blacklist")}
                        isSubItem
                      />
                    </CollapsibleContent>
                  </Collapsible>
                  <NavItem
                    icon={BarChart3}
                    label="订单统计"
                    active={pathname === "/order-statistics"}
                    onClick={() => navigateTo("/order-statistics")}
                  />
                  <NavItem
                    icon={Scroll}
                    label="日志信息"
                    active={pathname === "/log-information"}
                    onClick={() => navigateTo("/log-information")}
                  />
                  <Collapsible
                    open={pathname.startsWith("/roles-permissions") || pathname === "/access-records"}
                    onOpenChange={(isOpen) => {
                      if (isOpen && !pathname.startsWith("/roles-permissions/") && pathname !== "/access-records") {
                        navigateTo("/roles-permissions/account-list")
                      }
                    }}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${pathname.startsWith("/roles-permissions") || pathname === "/access-records" ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        角色 & 权限
                        {pathname.startsWith("/roles-permissions") || pathname === "/access-records" ? (
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 py-1">
                      <NavItem
                        icon={List}
                        label="账号列表"
                        active={pathname === "/roles-permissions/account-list"}
                        onClick={() => navigateTo("/roles-permissions/account-list")}
                        isSubItem
                      />
                      <NavItem
                        icon={ShieldCheck}
                        label="角色权限"
                        active={pathname === "/roles-permissions/role-permissions"}
                        onClick={() => navigateTo("/roles-permissions/role-permissions")}
                        isSubItem
                      />
                      <NavItem
                        icon={HistoryIcon}
                        label="访问记录"
                        active={pathname === "/access-records"}
                        onClick={() => navigateTo("/access-records")}
                        isSubItem
                      />
                    </CollapsibleContent>
                  </Collapsible>
                  <NavItem
                    icon={Settings2}
                    label="前台配置"
                    active={pathname === "/frontend-config"}
                    onClick={() => navigateTo("/frontend-config")}
                  />
                  <NavItem
                    icon={GitBranch}
                    label="源码 & 版本"
                    active={pathname === "/source-version"}
                    onClick={() => navigateTo("/source-version")}
                  />
                  <NavItem
                    icon={SettingsIcon}
                    label="系统设置"
                    active={pathname === "/system-settings"}
                    onClick={() => navigateTo("/system-settings")}
                  />
                  <NavItem
                    icon={HelpCircle}
                    label="FAQ"
                    active={pathname === "/faq"}
                    onClick={() => navigateTo("/faq")}
                  />
                  <div className="pt-2 border-t border-slate-700/50">
                    <NavItem icon={LogOut} label="登出" active={false} onClick={() => console.log("Logout clicked")} />
                  </div>
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">系统状态</div>
                  <div className="space-y-3">
                    <StatusItem label="API服务" value={systemStatus} color="cyan" />
                    <StatusItem label="安全防护" value={securityLevel} color="green" />
                    <StatusItem label="数据库" value={networkStatus} color="blue" />
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">系统时间</div>
                      <div className="text-lg font-mono text-cyan-400 mb-1">{formatTime(currentTime)}</div>
                      <div className="text-xs text-slate-400">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 xl:col-span-10 2xl:col-span-10">
            <div className="mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {getPageTitle()}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {pathname === "/" && "欢迎来到林北炮台支付系统控制面板"}
                {pathname === "/data-center" && "查看和管理数据中心"}
                {pathname === "/order-statistics" && "查看订单统计信息"}
                {pathname === "/log-information" && "查看系统日志信息"}
                {pathname === "/access-records" && "查看用户访问记录"}
                {pathname === "/frontend-config" && "配置前台显示"}
                {pathname === "/frontend-config/linbeipay" && "配置前台显示"}
                {pathname === "/system-settings" && "配置系统设置"}
              </p>
            </div>
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </div>

        <footer className="border-t border-slate-700/50 mt-8 pt-6 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>系统运行正常</span>
              </div>
              <div>在线用户: 1,245</div>
              <div>今日交易: ¥ 2,458,932.00</div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div>版本 v2.4.5</div>
              <div>© 2023 国际支付管理系统</div>
              <div className="flex items-center space-x-2">
                <span>技术支持:</span>
                <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                  Global Pay
                </Badge>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
  isSubItem = false,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
  isSubItem?: boolean
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start text-sm transition-all duration-200 ${isSubItem ? "h-8 pl-3" : "h-9"} ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"}`}
      onClick={onClick}
    >
      <Icon
        className={`mr-2 h-4 w-4 ${isSubItem ? "text-slate-500 group-hover:text-cyan-400" : ""} ${active && isSubItem ? "text-cyan-400" : ""}`}
      />
      {label}
    </Button>
  )
}

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
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-500`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}