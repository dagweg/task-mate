import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export default async function POST(req: NextRequest, res: NextResponse) {

    try {
        console.log('huh')
        const { to, subject, text } = await req.json()

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'imafx.io@gmail.com',
                pass: '1234qwerASDF',
            },
        });
        // Send email
        await transporter.sendMail({
            from: 'Task Mate',
            to,
            subject,
            text,
        });

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error sending email' });
    }
}