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
      Prefix: "portfolio/", // folder in S3
    });

    const response = await s3.send(command);

    // Filter out folder keys and generate proxy URLs
    const images = response.Contents
      ?.filter((item) => item.Key && !item.Key.endsWith("/"))
      .map((item) => `/api/grabRoulette/image?key=${encodeURIComponent(item.Key!)}`) || [];

    return NextResponse.json(images);
  } catch (err) {
    console.error("Error listing roulette images:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}