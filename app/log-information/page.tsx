"use client"

import { useState, useMemo } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface LogEntry {
  id: string
  api: string
  parameters: string
  type: "log_info" | "order_stats" | "data_center" | "other"
  backendAccount: string
  ip: string
  userAgent: string
  createdAt: string
}

const mockLogEntries: LogEntry[] = [
  {
    id: "563",
    api: "api/operationLog/index",
    parameters:
      '{"action":"","createdName":"","page":"1","pagesize":"10","startTime":"","endTime":"","requestTime":"1749145605"}',
    type: "log_info",
    backendAccount: "admin",
    ip: "38.109.112.6",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 10:30:15",
  },
  {
    id: "562",
    api: "api/user/statistics",
    parameters: "{}",
    type: "order_stats",
    backendAccount: "admin",
    ip: "38.109.112.6",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 10:28:44",
  },
  {
    id: "561",
    api: "api/user/listData",
    parameters: "{}",
    type: "data_center",
    backendAccount: "admin",
    ip: "38.109.112.221",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 10:25:10",
  },
  {
    id: "560",
    api: "api/adminConfig/infoIndex",
    parameters: '{"requestTime":"1749144639"}',
    type: "other",
    backendAccount: "admin",
    ip: "38.89.139.56",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 10:10:39",
  },
  {
    id: "559",
    api: "api/operationLog/viewIndex",
    parameters:
      '{"action":"","createdName":"","page":"1","pagesize":"10","startTime":"","endTime":"","type":"2","requestTime":"1749144462"}',
    type: "other",
    backendAccount: "admin",
    ip: "38.89.139.56",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 10:07:42",
  },
  {
    id: "558",
    api: "api/siteManager/siteIndex",
    parameters: '{"requestTime":"1749143819"}',
    type: "other",
    backendAccount: "admin",
    ip: "38.109.112.221",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 09:56:59",
  },
  {
    id: "556",
    api: "api/sse/applySsl",
    parameters: '{"id":1,"domains":["storepay2.top"],"token":"9aeb1392950f15613123d26710a4376c"}',
    type: "other",
    backendAccount: "admin",
    ip: "38.109.112.6",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 09:45:12",
  },
  {
    id: "555",
    api: "api/siteManager/siteIndex",
    parameters: '{"requestTime":"1749143406"}',
    type: "other",
    backendAccount: "admin",
    ip: "38.109.112.6",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    createdAt: "2025-06-06 09:30:06",
  },
]

const logTypeOptions = [
  { value: "all", label: "全部" },
  { value: "log_info", label: "日志信息" },
  { value: "order_stats", label: "订单统计" },
  { value: "data_center", label: "数据中心" },
  { value: "other", label: "其它" },
]

export default function LogInformationPage() {
  const [filterType, setFilterType] = useState("all")
  const [dateRange, setDateRange] = useState("")
  const [backendAccount, setBackendAccount] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredLogs = useMemo(() => {
    return mockLogEntries.filter((log) => {
      const typeMatch = filterType === "all" || log.type === filterType
      const accountMatch =
        backendAccount === "" || log.backendAccount.toLowerCase().includes(backendAccount.toLowerCase())
      // Add date range filtering logic here if needed
      return typeMatch && accountMatch
    })
  }, [filterType, backendAccount, mockLogEntries])

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredLogs, currentPage, itemsPerPage])

  const getLogTypeBadgeVariant = (type: LogEntry["type"]) => {
    switch (type) {
      case "log_info":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case "order_stats":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30"
      case "data_center":
        return "bg-teal-500/10 text-teal-400 border-teal-500/30"
      case "other":
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30"
    }
  }

  const getLogTypeLabel = (type: LogEntry["type"]) => {
    return logTypeOptions.find((opt) => opt.value === type)?.label || "未知"
  }

  const handleQuery = () => {
    setCurrentPage(1) // Reset to first page on new query
    // Actual query logic would go here if fetching from backend
  }

  const handleReset = () => {
    setFilterType("all")
    setDateRange("")
    setBackendAccount("")
    setCurrentPage(1)
  }

  const handleClearAll = () => {
    // Implement logic to clear all logs (e.g., API call)
    alert("一键清空功能待实现")
  }

  return (
    <Layout>
      <TooltipProvider>
        <div className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 text-lg">搜索过滤器</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="lg:col-span-1">
                <label htmlFor="logType" className="block text-sm font-medium text-slate-300 mb-1">
                  类型
                </label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="logType" className="bg-slate-800 border-slate-600 text-slate-100">
                    <SelectValue placeholder="类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    {logTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-1">
                <label htmlFor="dateRange" className="block text-sm font-medium text-slate-300 mb-1">
                  日期范围
                </label>
                <Input
                  id="dateRange"
                  type="text"
                  placeholder="例如: 2025-06-01 - 2025-06-07"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
              <div className="lg:col-span-1">
                <label htmlFor="backendAccount" className="block text-sm font-medium text-slate-300 mb-1">
                  后台账号
                </label>
                <Input
                  id="backendAccount"
                  type="text"
                  placeholder="输入后台账号"
                  value={backendAccount}
                  onChange={(e) => setBackendAccount(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
              <div className="flex gap-2 lg:col-span-2 items-end">
                <Button onClick={handleQuery} className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  查询
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="bg-slate-700 border-slate-600 hover:bg-slate-600 w-full sm:w-auto"
                >
                  重置
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={(val) => {
                    setItemsPerPage(Number(val))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[80px] bg-slate-800 border-slate-600 text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleClearAll}
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
                      <TableHead className="text-slate-400 w-[80px]">ID</TableHead>
                      <TableHead className="text-slate-400 min-w-[200px]">API</TableHead>
                      <TableHead className="text-slate-400 min-w-[300px]">参数</TableHead>
                      <TableHead className="text-slate-400 w-[120px]">类型</TableHead>
                      <TableHead className="text-slate-400 w-[120px]">后台账号</TableHead>
                      <TableHead className="text-slate-400 w-[150px]">IP</TableHead>
                      <TableHead className="text-slate-400 min-w-[300px]">USER-AGENT</TableHead>
                      <TableHead className="text-slate-400 w-[180px]">创建时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedLogs.map((log) => (
                      <TableRow key={log.id} className="border-slate-700/50 hover:bg-slate-800/30">
                        <TableCell className="text-slate-300">{log.id}</TableCell>
                        <TableCell className="text-slate-300">{log.api}</TableCell>
                        <TableCell className="text-slate-400 text-xs">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="truncate block max-w-xs cursor-pointer hover:underline">
                                {log.parameters}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="bottom"
                              align="start"
                              className="bg-slate-800 text-slate-200 border-slate-700 max-w-md break-all"
                            >
                              <pre className="text-xs whitespace-pre-wrap">
                                {JSON.stringify(JSON.parse(log.parameters || "{}"), null, 2)}
                              </pre>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getLogTypeBadgeVariant(log.type)}>
                            {getLogTypeLabel(log.type)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{log.backendAccount}</TableCell>
                        <TableCell className="text-slate-300">{log.ip}</TableCell>
                        <TableCell className="text-slate-400 text-xs">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="truncate block max-w-xs cursor-pointer hover:underline">
                                {log.userAgent}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="bottom"
                              align="start"
                              className="bg-slate-800 text-slate-200 border-slate-700 max-w-md break-all"
                            >
                              <p className="text-xs">{log.userAgent}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-slate-400">{log.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {paginatedLogs.length === 0 && <p className="p-6 text-center text-slate-500">没有找到匹配的日志记录。</p>}
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-slate-400">
                显示 {paginatedLogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} 到{" "}
                {Math.min(currentPage * itemsPerPage, filteredLogs.length)} 共 {filteredLogs.length} 条记录
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="bg-slate-800 border-slate-600 hover:bg-slate-700"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  上一页
                </Button>
                {/* Simplified pagination: show current page and ellipses if many pages */}
                <span className="text-slate-400 text-sm">
                  第 {currentPage} 页 / 共 {totalPages} 页
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-slate-800 border-slate-600 hover:bg-slate-700"
                >
                  下一页
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                {/* Table settings button can be added if needed */}
                {/* <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">表格设置</span>
                </Button> */}
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    </Layout>
  )
}
