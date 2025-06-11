export function formatCurrency(
  amount: number | string,
  currency: string = 'CNY'
): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numAmount)) return '¥ 0.00'

  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: currency === 'CNY' ? 'CNY' : 'USD',
    minimumFractionDigits: 2,
  })

  return formatter.format(numAmount)
}

export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'time' = 'long'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) return 'Invalid Date'

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('zh-CN')
    case 'time':
      return dateObj.toLocaleTimeString('zh-CN')
    case 'long':
    default:
      return dateObj.toLocaleString('zh-CN')
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('zh-CN').format(num)
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`
}

export function formatFileSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}