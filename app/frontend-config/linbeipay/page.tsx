"use client"

import Layout from "@/components/layout" // Assuming your main layout component path
import LinbeipayFrontendConfig from "@/components/linbeipay-frontend-config"

export default function LinbeipayConfigPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <LinbeipayFrontendConfig />
        {/* You can add more components or sections related to LinBeiPay config here */}
      </div>
    </Layout>
  )
}
