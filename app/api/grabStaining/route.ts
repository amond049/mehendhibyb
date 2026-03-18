import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  try {
    // List objects in the staining results folder
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Prefix: "staining-results/", // folder containing exactly 3 images
    });

    const response = await s3.send(command);

    const images =
      response.Contents
        ?.filter((item) => item.Key && !item.Key.endsWith("/"))
        .slice(0, 3) // take exactly 3
        .map(
          (item) =>
            `/api/grabStaining/image?key=${encodeURIComponent(item.Key!)}&cb=${Date.now()}`
        ) || [];

    return NextResponse.json(images);
  } catch (err) {
    console.error("Error fetching staining images:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}