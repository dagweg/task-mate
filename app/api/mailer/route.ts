import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {

    try {
        console.log('huh')
        const { to, subject, text } = await req.json()

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
        // // Send email
        await transporter.sendMail({
            from: 'imafx.io@gmail.com',
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