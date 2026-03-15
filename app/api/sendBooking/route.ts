import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // parse FormData automatically
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const service = formData.get("service")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const people = formData.get("people")?.toString() || "";

    // Collect files
    const attachments: { filename: string; content: Buffer }[] = [];
    const files = formData.getAll("files") as File[];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Booking Request",
      text: `
Name: ${name}
Email: ${email}
Service: ${service}
Date: ${date}
Number of people: ${people}

Message:
${message}
      `,
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email" }),
      { status: 500 }
    );
  }
}