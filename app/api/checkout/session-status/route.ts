import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "No session id" }, { status: 400 });
  }

  // Tell TypeScript shipping may exist
  const session = await stripe.checkout.sessions.retrieve(sessionId) as Stripe.Checkout.Session & {
    shipping?: {
      name: string;
      phone?: string;
      address: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
      };
    };
  };

  if (session.payment_status === "paid") {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    const shippingAddress = session.customer_details?.address?.line1 + ", " + session.customer_details?.address?.city + ", " + session.customer_details?.address?.country + ", " + session.customer_details?.address?.postal_code;

    const itemsText = lineItems.data.map(
      (item) => `Product: ${item.description}\nQuantity: ${item.quantity}`
    ).join("\n\n");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Order Received",
      text: `
${itemsText}

Customer email: ${session.customer_details?.email}
Delivery address: ${shippingAddress}
Total paid: $${(session.amount_total! / 100).toFixed(2)} ${session.currency?.toUpperCase()}
      `,
    });
  }

  return NextResponse.json({
    amount_total: session.amount_total,
    currency: session.currency,
    customer_details: session.customer_details,
    shipping: session.shipping ?? null,
  });
}