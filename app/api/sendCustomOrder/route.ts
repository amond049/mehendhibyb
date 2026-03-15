import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get('name')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const details = formData.get('details')?.toString() || '';
        const date = formData.get('date')?.toString() || '';

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
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
            subject: 'New Custom Order Request',
            text: `
                Name: ${name}
                Email: ${email}
                Date: ${date}
                Order details: ${details}
            `  
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Something went wrong when trying to send the email!", error);
        return new Response(
            JSON.stringify({ success: false, error: "Failed to send the email!"}),
            { status: 500 }
        )
    }
}