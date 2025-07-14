
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const {
    subAccountConnectAccId,
    prices,

  }: {
    subAccountConnectAccId: string
    prices: { recurring: boolean; productId: string }[]
    subaccountId: string
  } = await req.json()

  const origin = req.headers.get('origin') || '*'

  if (!subAccountConnectAccId || !prices.length) {
    return new NextResponse(
      JSON.stringify({ error: 'Stripe Account Id or price id is missing' }),
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }

  const subscriptionFee = process.env.NEXT_PUBLIC_PLATFORM_SUBSCRIPTION_PERCENT
  const onetimeFee = process.env.NEXT_PUBLIC_PLATFORM_ONETIME_FEE

  if (!subscriptionFee || !onetimeFee) {
    console.log('❌ Fees missing from env vars')
    return new NextResponse(
      JSON.stringify({ error: 'Fees do not exist' }),
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }

  const subscriptionPriceExists = prices.find((price) => price.recurring)

  try {
    const session = await stripe.checkout.sessions.create(
      {
        line_items: prices.map((price) => ({
          price: price.productId,
          quantity: 1,
        })),

        ...(subscriptionPriceExists && {
          subscription_data: {
            metadata: { connectAccountSubscriptions: 'true' },
            application_fee_percent: +subscriptionFee,
          },
        }),

        ...(!subscriptionPriceExists && {
          payment_intent_data: {
            metadata: { connectAccountPayments: 'true' },
            application_fee_amount: +onetimeFee * 100,
          },
        }),

        mode: subscriptionPriceExists ? 'subscription' : 'payment',
        ui_mode: 'embedded',
        redirect_on_completion: 'never',
      },
      { stripeAccount: subAccountConnectAccId }
    )

    return new NextResponse(
      JSON.stringify({ clientSecret: session.client_secret }),
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  } catch (error) {
    console.log('🔴 Stripe Error:', error)
    return new NextResponse(
      JSON.stringify({ error: error }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get('origin') || '*'
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400',
    },
  })
}
