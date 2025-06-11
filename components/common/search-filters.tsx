import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, RotateCcw } from "lucide-react"

interface FilterOption {
  label: string
  value: string
}

interface SearchFiltersProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filters: Array<{
    key: string
    label: string
    value: string
    options: FilterOption[]
    onChange: (value: string) => void
  }>
  onReset: () => void
  children?: React.ReactNode
}

export function SearchFilters({
  searchValue,
  onSearchChange,
  filters,
  onReset,
  children
}: SearchFiltersProps) {
  return (
    <div className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="搜索..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
          />
        </div>

        {filters.map((filter) => (
          <Select key={filter.key} value={filter.value} onValueChange={filter.onChange}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        <div className="flex space-x-2">
          <Button
            onClick={onReset}
            variant="outline"
            className="bg-slate-700 border-slate-600 hover:bg-slate-600"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
          {children}
        </div>
      </div>
    </div>
  )
}