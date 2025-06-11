import { NextResponse } from 'next/server'

// Mock data for development
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    lastLogin: '2023-12-01T10:00:00Z',
  },
]

const mockTransactions = [
  {
    id: 'TXN001',
    merchantId: 'M001',
    merchantName: '国际贸易公司',
    amount: '35000.00',
    currency: 'CNY',
    channel: 'Visa Card',
    status: 'success',
    fee: '1050.00',
    orderId: 'ORDER_001',
    createdAt: '2023-12-01T15:42:12Z',
    updatedAt: '2023-12-01T15:42:12Z',
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint')

  switch (endpoint) {
    case 'users':
      return NextResponse.json({ success: true, data: mockUsers })
    case 'transactions':
      return NextResponse.json({ success: true, data: mockTransactions })
    case 'system/metrics':
      return NextResponse.json({
        success: true,
        data: {
          cpu: Math.floor(Math.random() * 50) + 20,
          memory: Math.floor(Math.random() * 30) + 50,
          disk: Math.floor(Math.random() * 20) + 30,
          network: Math.floor(Math.random() * 40) + 10,
          uptime: '15天 8小时 32分钟',
          load: [1.2, 1.5, 1.8],
        },
      })
    default:
      return NextResponse.json({ success: false, error: 'Endpoint not found' }, { status: 404 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Mock successful response
  return NextResponse.json({
    success: true,
    data: { id: Date.now().toString(), ...body },
    message: 'Created successfully',
  })
}