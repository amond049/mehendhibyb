// app/api/grabPortfolio/image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");
    if (!key) return NextResponse.json({ error: "No key provided" }, { status: 400 });

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    const s3Response = await s3.send(command);

    const body = s3Response.Body;
    const contentType = s3Response.ContentType || "application/octet-stream";

    return new Response(body as any, {
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    console.error("Error fetching S3 image:", err);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}