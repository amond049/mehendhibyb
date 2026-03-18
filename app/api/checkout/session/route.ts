import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cart = body.cart;
    const deliveryMethod = body.deliveryMethod;

    const origin = req.headers.get("origin") || "";

    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // ✅ Add delivery fee ONLY if delivery selected
    if (deliveryMethod === "delivery") {
      lineItems.push({
        price_data: {
          currency: "cad",
          product_data: {
            name: "Delivery Fee",
          },
          unit_amount: 1000, // $10
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "required",

      line_items: lineItems,

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,

      metadata: {
        deliveryMethod,
      },

      ...(deliveryMethod === "delivery" && {
        shipping_address_collection: {
          allowed_countries: ["CA"],
        },
      }),
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}