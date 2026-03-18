// app/api/test/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  console.log("Test API route hit!");
  return NextResponse.json({ ok: true });
}