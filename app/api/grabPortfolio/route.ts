// app/api/grabPortfolio/route.ts
import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Prefix: "portfolio/",
    });

    const response = await s3.send(command);

    // app/api/grabPortfolio/route.ts
const images = response.Contents
  ?.filter((item) => !item.Key?.endsWith("/")) // skip folders
  .map((item) => `/api/grabPortfolio/image?key=${encodeURIComponent(item.Key!)}`) || [];

    return NextResponse.json(images);
  } catch (err) {
    console.error("Error listing images:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}