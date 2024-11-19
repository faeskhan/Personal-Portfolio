import { EmailJSResponseStatus, init, send } from '@emailjs/nodejs';
import { NextResponse } from 'next/server';

// Initialize EmailJS with your user ID
init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY!
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, description } = body;

    const response = await send(
      process.env.EMAILJS_SERVICE_ID!,  // Email service ID
      process.env.EMAILJS_TEMPLATE_ID!, // Email template ID
      {
        to_email: 'faeskhan@gmail.com',
        from_name: `${firstName} ${lastName}`,
        from_email: email,
        phone_number: phone,
        message: description,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!, // for server-side sending
      },
    );

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
} 