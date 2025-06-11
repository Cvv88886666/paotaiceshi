import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 flex items-center justify-center p-4">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            404
          </div>
          <CardTitle className="text-slate-100">页面未找到</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-400 text-sm">
            抱歉，您访问的页面不存在或已被移动。
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
              <Link href="javascript:history.back()">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回上页
              </Link>
            </Button>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                回到首页
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}