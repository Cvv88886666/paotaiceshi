"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column<T> {
  key: keyof T | string
  title: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    showSizeChanger?: boolean
    pageSizeOptions?: number[]
    onChange: (page: number, pageSize: number) => void
  }
  rowSelection?: {
    selectedRowKeys: string[]
    onChange: (selectedRowKeys: string[]) => void
    getCheckboxProps?: (record: T) => { disabled?: boolean }
  }
  className?: string
  emptyText?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pagination,
  rowSelection,
  className,
  emptyText = "暂无数据",
}: DataTableProps<T>) {
  const handlePageChange = (page: number) => {
    pagination?.onChange(page, pagination.pageSize)
  }

  const handlePageSizeChange = (pageSize: string) => {
    pagination?.onChange(1, parseInt(pageSize))
  }

  const renderCell = (column: Column<T>, record: T, index: number) => {
    const value = typeof column.key === 'string' && column.key.includes('.') 
      ? column.key.split('.').reduce((obj, key) => obj?.[key], record)
      : record[column.key as keyof T]

    if (column.render) {
      return column.render(value, record, index)
    }

    return value
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-md border border-slate-700/50 bg-slate-900/50">
        <Table>
          <TableHeader className="bg-slate-800/50">
            <TableRow className="border-slate-700/50">
              {rowSelection && (
                <TableHead className="w-12 text-slate-400">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 && 
                      data.every(record => rowSelection.selectedRowKeys.includes(record.id))
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        rowSelection.onChange(data.map(record => record.id))
                      } else {
                        rowSelection.onChange([])
                      }
                    }}
                    className="rounded border-slate-600"
                  />
                </TableHead>
              )}
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "text-slate-400",
                    column.align === 'center' && "text-center",
                    column.align === 'right' && "text-right"
                  )}
                  style={{ width: column.width }}
                >
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (rowSelection ? 1 : 0)} 
                  className="text-center py-8 text-slate-500"
                >
                  加载中...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (rowSelection ? 1 : 0)} 
                  className="text-center py-8 text-slate-500"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              data.map((record, index) => (
                <TableRow 
                  key={record.id || index} 
                  className="border-slate-700/50 hover:bg-slate-800/30"
                >
                  {rowSelection && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={rowSelection.selectedRowKeys.includes(record.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            rowSelection.onChange([...rowSelection.selectedRowKeys, record.id])
                          } else {
                            rowSelection.onChange(
                              rowSelection.selectedRowKeys.filter(key => key !== record.id)
                            )
                          }
                        }}
                        disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                        className="rounded border-slate-600"
                      />
                    </TableCell>
                  )}
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn(
                        "text-slate-300",
                        column.align === 'center' && "text-center",
                        column.align === 'right' && "text-right"
                      )}
                    >
                      {renderCell(column, record, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            显示 {Math.min((pagination.current - 1) * pagination.pageSize + 1, pagination.total)} 到{" "}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} 共 {pagination.total} 条记录
          </div>
          
          <div className="flex items-center space-x-2">
            {pagination.showSizeChanger && (
              <Select
                value={pagination.pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-20 bg-slate-800 border-slate-600 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                  {(pagination.pageSizeOptions || [10, 25, 50, 100]).map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm text-slate-400">
              第 {pagination.current} 页 / 共 {Math.ceil(pagination.total / pagination.pageSize)} 页
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.current + 1)}
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              className="bg-slate-800 border-slate-600 hover:bg-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}