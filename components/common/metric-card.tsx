import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'cyan' | 'green' | 'blue' | 'purple' | 'amber' | 'red'
  className?: string
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'cyan',
  className
}: MetricCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500 border-cyan-500/30',
    green: 'from-green-500 to-emerald-500 border-green-500/30',
    blue: 'from-blue-500 to-indigo-500 border-blue-500/30',
    purple: 'from-purple-500 to-pink-500 border-purple-500/30',
    amber: 'from-amber-500 to-orange-500 border-amber-500/30',
    red: 'from-red-500 to-rose-500 border-red-500/30',
  }

  const iconColors = {
    cyan: 'text-cyan-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    amber: 'text-amber-500',
    red: 'text-red-500',
  }

  return (
    <Card className={cn(
      "bg-slate-900/50 border-slate-700/50 backdrop-blur-sm relative overflow-hidden",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-400">{title}</div>
          <Icon className={cn("h-5 w-5", iconColors[color])} />
        </div>
        <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
          {value}
        </div>
        {trend && (
          <div className={cn(
            "text-xs",
            trend.isPositive ? "text-green-400" : "text-red-400"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}%
          </div>
        )}
        <div className={cn(
          "absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl",
          colorClasses[color].split(' ')[0]
        )}></div>
      </CardContent>
    </Card>
  )
}