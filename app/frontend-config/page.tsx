"use client"

import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ShieldCheck,
  RefreshCw,
  Download,
  Settings,
  Trash2,
  Copy,
  ExternalLink,
  Info,
  ImageIcon,
  AlertTriangle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FrontendConfigPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <Alert variant="default" className="bg-slate-800/60 border-slate-700">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-slate-300">操作提示</AlertTitle>
              <AlertDescription className="text-slate-400 text-sm">
                如果你没有成功进入前台首页，可以点击菜单栏【访问记录】来查看拦截原因，并根据信息提示操作。
              </AlertDescription>
            </Alert>

            <Alert variant="default" className="bg-slate-800/60 border-slate-700">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertTitle className="text-slate-300">维护建议</AlertTitle>
              <AlertDescription className="text-slate-400 text-sm">
                建议每天去点一次【更新前台】来保持最新的前台和功能。
                <Button variant="link" className="p-0 h-auto ml-1 text-amber-400 hover:text-amber-300">
                  点击查询域名解析是否生效 (查看域名解析的是不是后台服务器IP)
                </Button>
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center space-x-2">
                <Switch id="ssl-auto-apply" />
                <Label htmlFor="ssl-auto-apply" className="text-slate-300 text-sm">
                  自动申请SSL证书
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="domain-auto-check" />
                <Label htmlFor="domain-auto-check" className="text-slate-300 text-sm">
                  自动检测域名状态
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?width=64&height=64" alt="Wordpress Logo" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">WP</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-slate-100 text-lg">电商 Wordpress Stripe 全球</CardTitle>
                <a
                  href="https://wordpress.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center"
                >
                  官网: https://wordpress.org <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
              <ImageIcon className="h-5 w-5" />
              <span className="sr-only">更改图片</span>
            </Button>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-slate-300">支付插件:</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  填卡不实时: 点击下载 (v4.88)
                </Button>
                <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  填卡实时显示 [推荐]: 点击下载 (v10.04)
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="3d-domain" className="text-slate-300 text-sm">
                3D验证域名地址:
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="3d-domain"
                  defaultValue="https://storepay2.top/uDkn2z"
                  className="bg-slate-800 border-slate-600 text-slate-100"
                  readOnly
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-slate-700 border-slate-600 hover:bg-slate-600"
                  onClick={() => navigator.clipboard.writeText("https://storepay2.top/uDkn2z")}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">复制</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Settings className="h-4 w-4 mr-2" />
                配置
              </Button>
              <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
                <ShieldCheck className="h-4 w-4 mr-2" />
                申请证书
              </Button>
              <Button variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
                <RefreshCw className="h-4 w-4 mr-2" />
                更新前台
              </Button>
              <Button variant="destructive" className="bg-red-700/80 hover:bg-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                删除
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
