import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { cart } = await req.json();

  try {

    const origin = req.headers.get("origin") || "";

    const session = await stripe.checkout.sessions.create({

      mode: "payment",

      payment_method_types: ["card"],

      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: item.name,
            images: [item.image]
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`

    });

    return NextResponse.json({
      url: session.url
    });

  } catch (err) {

    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );

  }
}