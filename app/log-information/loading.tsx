import Layout from "@/components/layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Loading() {
  return (
    <Layout>
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <Skeleton className="h-6 w-1/4 bg-slate-700" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="lg:col-span-1 space-y-1">
                <Skeleton className="h-4 w-1/3 bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-800" />
              </div>
            ))}
            <div className="flex gap-2 lg:col-span-2 items-end">
              <Skeleton className="h-10 w-full sm:w-24 bg-purple-600/50" />
              <Skeleton className="h-10 w-full sm:w-24 bg-slate-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-10 w-20 bg-slate-800" />
            <Skeleton className="h-8 w-28 bg-red-700/50" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-800/50">
                  <TableRow className="border-slate-700/50">
                    {[...Array(8)].map((_, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-4 w-20 bg-slate-700" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i} className="border-slate-700/50">
                      {[...Array(8)].map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full bg-slate-700" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-5 w-1/3 bg-slate-700" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 bg-slate-800" />
            <Skeleton className="h-5 w-20 bg-slate-700" />
            <Skeleton className="h-9 w-24 bg-slate-800" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
