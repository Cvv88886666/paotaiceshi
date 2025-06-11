"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, TestTube, CheckCircle, AlertCircle, Copy, CreditCard, Shield, Globe, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import LinPayPayment from "./linpay-payment"

interface LinPayConfigProps {
  onClose: () => void
}

export default function LinPayConfig({ onClose }: LinPayConfigProps) {
  const { toast } = useToast()
  const [config, setConfig] = useState({
    channelMerchantId: "",
    channelSecret: "",
    sandbox: true,
    notifyUrl: "https://your-domain.com/api/pay/notify/linpay",
    returnUrl: "https://your-domain.com/api/pay/return/linpay",
    currency: "TWD",
    locale: "zh_TW",
  })

  const [testResult, setTestResult] = useState<{
    status: "success" | "error" | "pending" | null
    message: string
  }>({ status: null, message: "" })

  const [showPaymentDemo, setShowPaymentDemo] = useState(false)
  const [paymentCallbacks, setPaymentCallbacks] = useState<
    Array<{
      id: string
      timestamp: string
      type: "success" | "failed" | "pending"
      amount: string
      orderId: string
      transactionId: string
      message: string
    }>
  >([])

  // 模拟支付回调
  const handlePaymentCallback = (result: any) => {
    const callback = {
      id: `cb_${Date.now()}`,
      timestamp: new Date().toLocaleString("zh-CN"),
      type: result.status as "success" | "failed" | "pending",
      amount: result.amount || "¥ 0.00",
      orderId: result.orderId || `ORDER_${Date.now()}`,
      transactionId: result.transactionId || `TXN_${Date.now()}`,
      message: result.message || "支付处理完成",
    }

    setPaymentCallbacks((prev) => [callback, ...prev.slice(0, 9)]) // 保留最近10条记录

    // 显示 toast 通知
    toast({
      title: result.status === "success" ? "支付成功" : result.status === "failed" ? "支付失败" : "支付处理中",
      description: `订单号: ${callback.orderId}，金额: ${callback.amount}`,
      variant: result.status === "success" ? "default" : "destructive",
    })

    console.log("LinPay 支付回调:", callback)
  }

  const handleSave = async () => {
    try {
      // 模拟保存配置
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "配置保存成功",
        description: "LinPay 支付网关配置已更新",
      })

      console.log("LinPay 配置已保存:", config)
    } catch (error) {
      toast({
        title: "保存失败",
        description: "请检查配置信息是否正确",
        variant: "destructive",
      })
    }
  }

  const handleTest = async () => {
    setTestResult({ status: "pending", message: "正在测试连接..." })

    try {
      // 模拟测试连接
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (config.channelMerchantId && config.channelSecret) {
        setTestResult({
          status: "success",
          message: "连接测试成功，LinPay API 响应正常",
        })

        toast({
          title: "测试成功",
          description: "LinPay 支付网关连接正常",
        })
      } else {
        setTestResult({
          status: "error",
          message: "请填写完整的商户ID和密钥信息",
        })
      }
    } catch (error) {
      setTestResult({
        status: "error",
        message: "连接测试失败，请检查配置信息",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "已复制",
      description: "URL 已复制到剪贴板",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="config" className="data-[state=active]:bg-slate-700">
            基础配置
          </TabsTrigger>
          <TabsTrigger value="urls" className="data-[state=active]:bg-slate-700">
            回调地址
          </TabsTrigger>
          <TabsTrigger value="test" className="data-[state=active]:bg-slate-700">
            测试支付
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-slate-700">
            回调日志
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-100">
                <Settings className="mr-2 h-5 w-5 text-cyan-500" />
                LinPay 基础配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="merchantId" className="text-slate-300">
                    商户ID (Channel Merchant ID)
                  </Label>
                  <Input
                    id="merchantId"
                    value={config.channelMerchantId}
                    onChange={(e) => setConfig((prev) => ({ ...prev, channelMerchantId: e.target.value }))}
                    placeholder="请输入 LinPay 商户ID"
                    className="bg-slate-900/50 border-slate-600 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secret" className="text-slate-300">
                    商户密钥 (Channel Secret)
                  </Label>
                  <Input
                    id="secret"
                    type="password"
                    value={config.channelSecret}
                    onChange={(e) => setConfig((prev) => ({ ...prev, channelSecret: e.target.value }))}
                    placeholder="请输入 LinPay 商户密钥"
                    className="bg-slate-900/50 border-slate-600 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-slate-300">
                    默认货币
                  </Label>
                  <Input
                    id="currency"
                    value={config.currency}
                    onChange={(e) => setConfig((prev) => ({ ...prev, currency: e.target.value }))}
                    placeholder="TWD"
                    className="bg-slate-900/50 border-slate-600 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locale" className="text-slate-300">
                    语言设置
                  </Label>
                  <Input
                    id="locale"
                    value={config.locale}
                    onChange={(e) => setConfig((prev) => ({ ...prev, locale: e.target.value }))}
                    placeholder="zh_TW"
                    className="bg-slate-900/50 border-slate-600 text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="sandbox"
                  checked={config.sandbox}
                  onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, sandbox: checked }))}
                />
                <Label htmlFor="sandbox" className="text-slate-300">
                  沙箱模式 (测试环境)
                </Label>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                  {config.sandbox ? "测试" : "生产"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urls" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-100">
                <Globe className="mr-2 h-5 w-5 text-blue-500" />
                回调地址配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notifyUrl" className="text-slate-300">
                  异步通知地址 (Notify URL)
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="notifyUrl"
                    value={config.notifyUrl}
                    onChange={(e) => setConfig((prev) => ({ ...prev, notifyUrl: e.target.value }))}
                    className="bg-slate-900/50 border-slate-600 text-slate-100"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(config.notifyUrl)}
                    className="bg-slate-700 border-slate-600"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500">LinPay 将向此地址发送支付结果通知</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnUrl" className="text-slate-300">
                  同步返回地址 (Return URL)
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="returnUrl"
                    value={config.returnUrl}
                    onChange={(e) => setConfig((prev) => ({ ...prev, returnUrl: e.target.value }))}
                    className="bg-slate-900/50 border-slate-600 text-slate-100"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(config.returnUrl)}
                    className="bg-slate-700 border-slate-600"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500">用户支付完成后跳转的页面地址</p>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <h4 className="text-sm font-medium text-slate-300 mb-2">配置说明</h4>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• 请确保回调地址可以从外网访问</li>
                  <li>• 建议使用 HTTPS 协议保证安全性</li>
                  <li>• 异步通知地址用于接收支付结果</li>
                  <li>• 同步返回地址用于用户支付后的页面跳转</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-100">
                <TestTube className="mr-2 h-5 w-5 text-green-500" />
                连接测试
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Button onClick={handleTest} disabled={testResult.status === "pending"}>
                  <TestTube className="mr-2 h-4 w-4" />
                  {testResult.status === "pending" ? "测试中..." : "测试连接"}
                </Button>

                {testResult.status && (
                  <div className="flex items-center space-x-2">
                    {testResult.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {testResult.status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                    {testResult.status === "pending" && (
                      <div className="h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    )}
                    <span
                      className={`text-sm ${
                        testResult.status === "success"
                          ? "text-green-400"
                          : testResult.status === "error"
                            ? "text-red-400"
                            : "text-cyan-400"
                      }`}
                    >
                      {testResult.message}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-100">
                <CreditCard className="mr-2 h-5 w-5 text-purple-500" />
                支付测试
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Button onClick={() => setShowPaymentDemo(true)} className="bg-purple-600 hover:bg-purple-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  启动支付测试
                </Button>
              </div>

              {showPaymentDemo && (
                <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                  <LinPayPayment onPaymentResult={handlePaymentCallback} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-100">
                <Shield className="mr-2 h-5 w-5 text-amber-500" />
                支付回调日志
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentCallbacks.length === 0 ? (
                <div className="text-center py-8 text-slate-500">暂无支付回调记录</div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {paymentCallbacks.map((callback) => (
                    <div key={callback.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              callback.type === "success"
                                ? "bg-green-500/10 text-green-400 border-green-500/30"
                                : callback.type === "failed"
                                  ? "bg-red-500/10 text-red-400 border-red-500/30"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            {callback.type === "success" ? "成功" : callback.type === "failed" ? "失败" : "处理中"}
                          </Badge>
                          <span className="text-sm text-slate-300">{callback.orderId}</span>
                        </div>
                        <span className="text-xs text-slate-500">{callback.timestamp}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">金额: </span>
                          <span className="text-cyan-400">{callback.amount}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">交易号: </span>
                          <span className="text-slate-300 font-mono text-xs">{callback.transactionId}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">消息: </span>
                          <span className="text-slate-300">{callback.message}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose} className="bg-slate-700 border-slate-600">
          取消
        </Button>
        <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700">
          <Save className="mr-2 h-4 w-4" />
          保存配置
        </Button>
      </div>
    </div>
  )
}
