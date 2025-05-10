import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const output = `
      <h2>New Pre-Approval Submission</h2>
      <p><strong>Vehicle:</strong> ${data.vehicle}</p>
      <p><strong>Down Payment:</strong> ${data.downPayment}</p>
      <p><strong>Name:</strong> ${data.firstName} ${data.middleName} ${data.lastName}</p>
      <p><strong>Date of Birth:</strong> ${data.dob}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <h3>Address</h3>
      <p>${data.addressStreet}, ${data.addressCity}, ${data.addressProvince} ${data.addressPostalCode}</p>
      <p><strong>Time at Address:</strong> ${data.addressDuration}</p>
      <h3>Employment</h3>
      <p><strong>Employer:</strong> ${data.employer}</p>
      <p><strong>Job Title:</strong> ${data.jobTitle}</p>
      <p><strong>Job Duration:</strong> ${data.jobDuration}</p>
      <p><strong>Annual Income:</strong> ${data.income}</p>
      <p><strong>Other Income:</strong> ${data.otherIncome}</p>
      <p><strong>Credit Consent:</strong> ${data.creditConsent ? 'Yes' : 'No'}</p>
    `;

    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'rob@caprockcapital.ca',
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: 'Caprock Capital <rob@caprockcapital.ca>',
      to: 'rob@caprockcapital.ca',
      subject: 'New Pre-Approval Submission',
      html: output,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email sending error:', err);
    return NextResponse.json({ success: false, error: 'Email failed to send' }, { status: 500 });
  }
}
