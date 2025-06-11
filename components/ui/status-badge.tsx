import { Badge } from "./badge"
import { cn } from "@/lib/utils"
import { STATUS_COLORS } from "@/lib/constants"

interface StatusBadgeProps {
  status: keyof typeof STATUS_COLORS
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(STATUS_COLORS[status], "text-xs", className)}
    >
      {children}
    </Badge>
  )
}