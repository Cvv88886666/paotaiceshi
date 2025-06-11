import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-cyan-500 mx-auto mb-4" />
        <p className="text-slate-400">加载中...</p>
      </div>
    </div>
  )
}