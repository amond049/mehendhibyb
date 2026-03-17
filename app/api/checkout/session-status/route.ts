import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "No session id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return NextResponse.json({
    amount_total: session.amount_total,
    currency: session.currency,
    customer_details: session.customer_details
  });
}