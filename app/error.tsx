'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 flex items-center justify-center p-4">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <CardTitle className="text-slate-100">出现错误</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-400 text-sm">
            抱歉，应用程序遇到了一个错误。请尝试刷新页面或联系技术支持。
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-slate-800/50 rounded-lg p-3 text-left">
              <p className="text-xs text-red-400 font-mono">
                {error.message}
              </p>
            </div>
          )}
          <Button onClick={reset} className="bg-purple-600 hover:bg-purple-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            重试
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}