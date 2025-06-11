"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, CheckCircle, Clock, ExternalLink } from "lucide-react"

interface LinPayPaymentProps {
  onPaymentResult: (result: {
    status: "success" | "failed" | "pending"
    amount: string
    orderId: string
    transactionId: string
    message: string
  }) => void
}

export default function LinPayPayment({ onPaymentResult }: LinPayPaymentProps) {
  const [paymentData, setPaymentData] = useState({
    amount: "100.00",
    currency: "TWD",
    productName: "测试商品",
    orderId: `TEST_${Date.now()}`,
  })

  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "completed">("idle")
  const [paymentUrl, setPaymentUrl] = useState("")

  const handleCreatePayment = async () => {
    setPaymentStatus("processing")

    try {
      // 模拟创建 LinPay 支付订单
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockPaymentUrl = `https://sandbox-web-pay.line.me/web/payment/wait?transactionId=mock_${Date.now()}`
      setPaymentUrl(mockPaymentUrl)

      // 模拟支付页面跳转
      console.log("LinPay 支付链接:", mockPaymentUrl)

      // 模拟用户支付过程
      setTimeout(() => {
        handlePaymentCallback("success")
      }, 3000)
    } catch (error) {
      handlePaymentCallback("failed")
    }
  }

  const handlePaymentCallback = (status: "success" | "failed") => {
    setPaymentStatus("completed")

    const result = {
      status,
      amount: `¥ ${paymentData.amount}`,
      orderId: paymentData.orderId,
      transactionId: `LINPAY_${Date.now()}`,
      message: status === "success" ? "LinPay 支付成功" : "LinPay 支付失败",
    }

    onPaymentResult(result)
  }

  const openPaymentUrl = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank")
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-100">
            <CreditCard className="mr-2 h-5 w-5 text-green-500" />
            LinPay 支付测试
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-300">
                支付金额
              </Label>
              <Input
                id="amount"
                value={paymentData.amount}
                onChange={(e) => setPaymentData((prev) => ({ ...prev, amount: e.target.value }))}
                className="bg-slate-800/50 border-slate-600 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-slate-300">
                货币
              </Label>
              <Input
                id="currency"
                value={paymentData.currency}
                onChange={(e) => setPaymentData((prev) => ({ ...prev, currency: e.target.value }))}
                className="bg-slate-800/50 border-slate-600 text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName" className="text-slate-300">
              商品名称
            </Label>
            <Input
              id="productName"
              value={paymentData.productName}
              onChange={(e) => setPaymentData((prev) => ({ ...prev, productName: e.target.value }))}
              className="bg-slate-800/50 border-slate-600 text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderId" className="text-slate-300">
              订单号
            </Label>
            <Input
              id="orderId"
              value={paymentData.orderId}
              onChange={(e) => setPaymentData((prev) => ({ ...prev, orderId: e.target.value }))}
              className="bg-slate-800/50 border-slate-600 text-slate-100"
            />
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleCreatePayment}
              disabled={paymentStatus === "processing"}
              className="bg-green-600 hover:bg-green-700"
            >
              {paymentStatus === "processing" ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  创建支付中...
                </>
              ) : (
                <>
                  <Smartphone className="mr-2 h-4 w-4" />
                  创建 LinPay 支付
                </>
              )}
            </Button>

            {paymentUrl && (
              <Button onClick={openPaymentUrl} variant="outline" className="bg-slate-700 border-slate-600">
                <ExternalLink className="mr-2 h-4 w-4" />
                打开支付页面
              </Button>
            )}
          </div>

          {paymentStatus === "processing" && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-400 animate-spin" />
                <span className="text-blue-400">正在创建 LinPay 支付订单...</span>
              </div>
            </div>
          )}

          {paymentUrl && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400">支付链接已生成</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  等待支付
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-2">模拟支付将在 3 秒后自动完成</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
