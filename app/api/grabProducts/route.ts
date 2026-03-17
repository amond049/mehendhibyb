import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const dynamodb = DynamoDBDocumentClient.from(client);

    const command = new ScanCommand({
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME!,
    });

    const result = await dynamodb.send(command);

    const bucketName = process.env.AWS_BUCKET_NAME!;
    const region = process.env.AWS_REGION!;

    const productsWithImages = (result.Items || []).map((product: any) => ({
      ...product,
      image: `https://${bucketName}.s3.${region}.amazonaws.com/product-images/${product.normalizedName}.jpg`,
    }));

    return NextResponse.json(productsWithImages);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch DynamoDB data" },
      { status: 500 }
    );
  }
}