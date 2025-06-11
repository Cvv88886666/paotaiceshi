"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  KeyRound,
  Mail,
  Smartphone,
  ShieldAlert,
  CreditCard,
  XCircle,
  CheckCircle2,
  Ban,
  UserX,
  MoreVertical,
} from "lucide-react"
import type React from "react"

interface UserStatusActionsProps {
  status: string
  lastUpdate: string
  onOtpVerify?: () => void
  onEmailVerify?: () => void
  onAppVerify?: () => void
  onPinVerify?: () => void
  onCvvVerify?: () => void
  onRejectCustom?: () => void
  onRejectChangeCard?: () => void
  onApprove?: () => void
  onDisconnect?: () => void
  onDisconnectAndBlacklist?: () => void
  triggerElement?: React.ReactNode // Allow custom trigger
}

export const UserStatusActions: React.FC<UserStatusActionsProps> = ({
  status,
  lastUpdate,
  onOtpVerify,
  onEmailVerify,
  onAppVerify,
  onPinVerify,
  onCvvVerify,
  onRejectCustom,
  onRejectChangeCard,
  onApprove,
  onDisconnect,
  onDisconnectAndBlacklist,
  triggerElement,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerElement || (
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Open actions</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <div className="p-2 text-center">
          <Badge variant="warning" className="bg-orange-400 hover:bg-orange-500 text-white text-sm px-3 py-1.5">
            <Bell className="h-4 w-4 mr-2" />
            {status}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1">{lastUpdate}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>验证方式 (Verification Methods)</DropdownMenuLabel>
        <DropdownMenuItem onClick={onOtpVerify} disabled={!onOtpVerify}>
          <KeyRound className="h-4 w-4 mr-2" />
          <span>OTP验证</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEmailVerify} disabled={!onEmailVerify}>
          <Mail className="h-4 w-4 mr-2" />
          <span>Email验证</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAppVerify} disabled={!onAppVerify}>
          <Smartphone className="h-4 w-4 mr-2" />
          <span>APP验证</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPinVerify} disabled={!onPinVerify}>
          <ShieldAlert className="h-4 w-4 mr-2" /> {/* Using ShieldAlert for PIN */}
          <span>PIN验证</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCvvVerify} disabled={!onCvvVerify}>
          <CreditCard className="h-4 w-4 mr-2" />
          <span>运通CVV验证</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>操作 (Actions)</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={onRejectCustom}
          className="text-red-600 focus:text-red-700 focus:bg-red-50"
          disabled={!onRejectCustom}
        >
          <XCircle className="h-4 w-4 mr-2" />
          <span>拒绝, 自定义文案</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onRejectChangeCard}
          className="text-red-600 focus:text-red-700 focus:bg-red-50"
          disabled={!onRejectChangeCard}
        >
          <XCircle className="h-4 w-4 mr-2" />
          <span>拒绝, 更换卡片</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onApprove}
          className="text-green-600 focus:text-green-700 focus:bg-green-50"
          disabled={!onApprove}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          <span>放行, 验证完成</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDisconnect} disabled={!onDisconnect}>
          <Ban className="h-4 w-4 mr-2" />
          <span>断开</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDisconnectAndBlacklist} disabled={!onDisconnectAndBlacklist}>
          <UserX className="h-4 w-4 mr-2" />
          <span>断开, 拉黑用户</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Example of how to use it (you can place this in a page or another component)
// For demonstration, it uses a simple button as a trigger.
// You'd replace this with your actual trigger, like the orange badge.
export function UserStatusActionsExample() {
  const handleAction = (actionName: string) => {
    alert(`Action: ${actionName}`)
  }

  const orangeBadgeTrigger = (
    <Button variant="outline" className="flex flex-col items-center h-auto p-2 border-orange-400 hover:bg-orange-50">
      <Badge variant="warning" className="bg-orange-400 hover:bg-orange-500 text-white text-sm px-3 py-1.5 mb-1">
        <Bell className="h-4 w-4 mr-2" />
        已提交卡号
      </Badge>
      <span className="text-xs text-muted-foreground">1小时前</span>
    </Button>
  )

  return (
    <div className="p-4 bg-background">
      <UserStatusActions
        status="已提交卡号"
        lastUpdate="1小时前"
        onOtpVerify={() => handleAction("OTP Verify")}
        onEmailVerify={() => handleAction("Email Verify")}
        onAppVerify={() => handleAction("App Verify")}
        onPinVerify={() => handleAction("PIN Verify")}
        onCvvVerify={() => handleAction("CVV Verify")}
        onRejectCustom={() => handleAction("Reject Custom")}
        onRejectChangeCard={() => handleAction("Reject Change Card")}
        onApprove={() => handleAction("Approve")}
        onDisconnect={() => handleAction("Disconnect")}
        onDisconnectAndBlacklist={() => handleAction("Disconnect & Blacklist")}
        triggerElement={orangeBadgeTrigger} // Using the custom badge as trigger
      />
    </div>
  )
}
