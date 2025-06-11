"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Trash2, Eye, MoreVertical, ChevronLeft, ChevronRight, Settings } from "lucide-react"

interface AccessRecord {
  id: string
  domain: string
  browser: string
  platform: string
  browserInfo: string
  type: "success" | "blocked" | "warning"
  statusText: string
  ip: string
  country: string
  createdAt: string
}

const mockAccessRecords: AccessRecord[] = [
  {
    id: "1",
    domain: "familybuyzone.com",
    browser: "Chrome",
    platform: "Windows",
    browserInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    type: "success",
    statusText: "访问成功",
    ip: "38.109.112.6",
    country: "CA",
    createdAt: "2025-06-06 01:11:16",
  },
  {
    id: "2",
    domain: "secure-portal.net",
    browser: "Firefox",
    platform: "Linux",
    browserInfo: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
    type: "blocked",
    statusText: "IP地址被阻止",
    ip: "102.55.12.98",
    country: "NG",
    createdAt: "2025-06-06 00:55:02",
  },
  {
    id: "3",
    domain: "shop.example.org",
    browser: "Safari",
    platform: "MacOS",
    browserInfo:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15",
    type: "success",
    statusText: "访问成功",
    ip: "198.51.100.23",
    country: "US",
    createdAt: "2025-06-05 23:10:45",
  },
  {
    id: "4",
    domain: "payment-gateway.co",
    browser: "Edge",
    platform: "Windows",
    browserInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
    type: "warning",
    statusText: "可疑活动",
    ip: "203.0.113.45",
    country: "AU",
    createdAt: "2025-06-05 22:45:18",
  },
]

export default function AccessRecordsPage() {
  const [filterType, setFilterType] = useState("all")
  const [dateRange, setDateRange] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // TODO: Implement actual filtering and pagination logic
  const filteredRecords = mockAccessRecords
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadgeVariant = (type: AccessRecord["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "blocked":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      case "warning":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusText = (type: AccessRecord["type"]) => {
    switch (type) {
      case "success":
        return "成功"
      case "blocked":
        return "阻止"
      case "warning":
        return "警告"
      default:
        return "未知"
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg">搜索过滤器</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 min-w-[150px]">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100">
                  <SelectValue placeholder="类型" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="success">成功</SelectItem>
                  <SelectItem value="blocked">阻止</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="日期范围 (例如: 2025-06-01 - 2025-06-07)"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Search className="h-4 w-4 mr-2" />
              查询
            </Button>
            <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
              重置
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={String(itemsPerPage)} onValueChange={(val) => setItemsPerPage(Number(val))}>
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
            <Button variant="destructive" size="sm" className="bg-red-700/80 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              一键清空
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-800/50">
                  <TableRow className="border-slate-700/50">
                    <TableHead className="text-slate-400">域名</TableHead>
                    <TableHead className="text-slate-400">浏览器</TableHead>
                    <TableHead className="text-slate-400">平台</TableHead>
                    <TableHead className="text-slate-400 min-w-[300px]">浏览器信息</TableHead>
                    <TableHead className="text-slate-400">类型</TableHead>
                    <TableHead className="text-slate-400">状态</TableHead>
                    <TableHead className="text-slate-400">IP</TableHead>
                    <TableHead className="text-slate-400">国家</TableHead>
                    <TableHead className="text-slate-400">创建时间</TableHead>
                    <TableHead className="text-slate-400 text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.map((record) => (
                    <TableRow key={record.id} className="border-slate-700/50 hover:bg-slate-800/30">
                      <TableCell className="text-slate-300">{record.domain}</TableCell>
                      <TableCell className="text-slate-300">{record.browser}</TableCell>
                      <TableCell className="text-slate-300">{record.platform}</TableCell>
                      <TableCell className="text-slate-400 text-xs max-w-xs truncate" title={record.browserInfo}>
                        {record.browserInfo}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeVariant(record.type)}>
                          {getStatusText(record.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{record.statusText}</TableCell>
                      <TableCell className="text-slate-300">{record.ip}</TableCell>
                      <TableCell className="text-slate-300">{record.country}</TableCell>
                      <TableCell className="text-slate-400">{record.createdAt}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-slate-100">
                            <DropdownMenuItem className="hover:bg-slate-700">
                              <Eye className="h-4 w-4 mr-2" />
                              查看详情
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-700 text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除记录
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {paginatedRecords.length === 0 && (
              <p className="p-6 text-center text-slate-500">没有找到匹配的访问记录。</p>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-slate-400">
            显示 {paginatedRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} 到{" "}
            {Math.min(currentPage * itemsPerPage, filteredRecords.length)} 共 {filteredRecords.length} 条记录
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-slate-800 border-slate-600 hover:bg-slate-700"
                }
              >
                {page}
              </Button>
            ))}
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
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
              <Settings className="h-4 w-4" />
              <span className="sr-only">表格设置</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
