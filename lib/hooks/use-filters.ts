import { useState, useMemo } from 'react'

interface UseFiltersProps<T> {
  data: T[]
  filterFunctions: Record<string, (item: T, value: any) => boolean>
}

export function useFilters<T>({ data, filterFunctions }: UseFiltersProps<T>) {
  const [filters, setFilters] = useState<Record<string, any>>({})

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all' || value === '') return true
        const filterFn = filterFunctions[key]
        return filterFn ? filterFn(item, value) : true
      })
    })
  }, [data, filters, filterFunctions])

  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[key]
      return newFilters
    })
  }

  const clearAllFilters = () => {
    setFilters({})
  }

  return {
    filters,
    filteredData,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters: Object.keys(filters).length > 0,
  }
}