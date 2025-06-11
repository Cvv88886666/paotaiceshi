"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LinbeipayConfigRow, type LinBeiPayConfigEntry } from "./linbeipay-config-row" // Assuming LinbeipayConfigRow is in the same directory or adjust path

const initialEntries: LinBeiPayConfigEntry[] = [
  {
    id: "1",
    userIdPrefix: "OA",
    userIdSuffix: "(H-4383)",
    userEmail: "family@buyzone.com",
    phone: "+4015217253893",
    isFavorite: true,
    cardHolderName: "Lin bei",
    cardNumber: "4111 1111 1111 1111",
    expiryDate: "01/27",
    cvv: "666",
    cardInfoSuffix: "1",
    status: "正常", // Example status
    account: "",
    password: "",
    verificationCode: "",
    customField: "",
    pin: "",
  },
  // Add more mock entries if needed
]

export default function LinbeipayFrontendConfig() {
  const [entries, setEntries] = useState<LinBeiPayConfigEntry[]>(initialEntries)
  const [selectedEntryIds, setSelectedEntryIds] = useState<Set<string>>(new Set())

  const handleSelectionChange = useCallback((id: string, selected: boolean) => {
    setSelectedEntryIds((prev) => {
      const newSet = new Set(prev)
      if (selected) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }, [])

  const handleEntryChange = useCallback((id: string, updatedEntryPart: Partial<LinBeiPayConfigEntry>) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => (entry.id === id ? { ...entry, ...updatedEntryPart } : entry)),
    )
  }, [])

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedEntryIds(new Set(entries.map((e) => e.id)))
    } else {
      setSelectedEntryIds(new Set())
    }
  }

  const isAllSelected = entries.length > 0 && selectedEntryIds.size === entries.length

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm w-full">
      <CardHeader>
        <CardTitle className="text-slate-100 text-lg">LinBeiPay 前台配置</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800/50">
              <tr className="border-b border-slate-700/50">
                <th className="p-3 text-left font-medium text-slate-400 w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                </th>
                <th className="p-3 text-left font-medium text-slate-400">用户ID</th>
                <th className="p-3 text-left font-medium text-slate-400">账号</th>
                <th className="p-3 text-left font-medium text-slate-400">密码</th>
                <th className="p-3 text-left font-medium text-slate-400">电话</th>
                <th className="p-3 text-left font-medium text-slate-400">卡头备注</th>
                <th className="p-3 text-left font-medium text-slate-400">卡信息</th>
                <th className="p-3 text-left font-medium text-slate-400">验证码</th>
                <th className="p-3 text-left font-medium text-slate-400">自定义</th>
                <th className="p-3 text-left font-medium text-slate-400">PIN</th>
                <th className="p-3 text-left font-medium text-slate-400">用户状态和操作</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <LinbeipayConfigRow
                  key={entry.id}
                  entry={entry}
                  isSelected={selectedEntryIds.has(entry.id)}
                  onSelectionChange={handleSelectionChange}
                  onEntryChange={handleEntryChange}
                />
              ))}
            </tbody>
          </table>
        </div>
        {entries.length === 0 && <p className="p-4 text-center text-slate-500">暂无配置项。</p>}
      </CardContent>
    </Card>
  )
}
