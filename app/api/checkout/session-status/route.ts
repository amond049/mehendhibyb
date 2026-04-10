"use server";

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Path to JSON file storing session IDs for which email was sent
const SENT_EMAILS_FILE = path.join(process.cwd(), "tmp/sentEmails.json");

// Read sent emails cache
function readSentEmails(): string[] {
  try {
    const data = fs.readFileSync(SENT_EMAILS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write sent emails cache
function writeSentEmails(sent: string[]) {
  fs.writeFileSync(SENT_EMAILS_FILE, JSON.stringify(sent, null, 2), "utf-8");
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "No session id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  // ✅ Get delivery method from metadata
  const deliveryMethod = session.metadata?.deliveryMethod;

  // Read sent emails
  const sentEmails = readSentEmails();

  // Only send email if payment is paid and email has not been sent yet
  if (session.payment_status === "paid" && !sentEmails.includes(sessionId)) {
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

    const itemsText = lineItems.data
      .map((item) => `Product: ${item.description}\nQuantity: ${item.quantity}`)
      .join("\n\n");

    // Build address only if delivery
    const addr = session.customer_details?.address;
    let formattedAddress = "";
    if (deliveryMethod === "delivery" && addr) {
      formattedAddress = [
        addr.line1,
        addr.line2,
        addr.city,
        addr.state,
        addr.postal_code,
        addr.country,
      ]
        .filter(Boolean)
        .join(", ");
    }

    const emailText = `
${itemsText}

Customer email: ${session.customer_details?.email}
Delivery method: ${deliveryMethod}

${
  deliveryMethod === "delivery"
    ? `Delivery address: ${formattedAddress}`
    : "Pickup order (no delivery address)"
}

Total paid: $${(session.amount_total! / 100).toFixed(2)} ${session.currency?.toUpperCase()}
`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Order Received",
      text: emailText,
    });

    // Mark this session as sent
    sentEmails.push(sessionId);
    writeSentEmails(sentEmails);
  }

  console.log("Doing some testing to see if logs print properly?")
  return NextResponse.json({
    amount_total: session.amount_total,
    currency: session.currency,
    customer_details: session.customer_details,
    shipping: session.customer_details?.address ?? null,
    deliveryMethod: session.metadata?.deliveryMethod ?? null,
  });
}