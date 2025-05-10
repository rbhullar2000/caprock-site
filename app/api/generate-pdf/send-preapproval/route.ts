'use server';

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const {
    vehicle,
    downPayment,
    firstName,
    middleName,
    lastName,
    dob,
    email,
    phone,
    addressStreet,
    addressCity,
    addressProvince,
    addressPostalCode,
    addressDuration,
    employer,
    jobTitle,
    jobDuration,
    income,
    otherIncome,
    creditConsent,
  } = data;

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rob@caprockcapital.ca',
      pass: process.env.EMAIL_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: 'rob@caprockcapital.ca',
    to: 'rob@caprockcapital.ca',
    subject: `Pre-Approval Submission – ${firstName} ${lastName}`,
    text: `Vehicle Type or Budget: ${vehicle}
Down Payment: ${downPayment}

First Name: ${firstName}
Middle Name: ${middleName}
Last Name: ${lastName}
Date of Birth: ${dob}
Email: ${email}
Phone: ${phone}

Street Address: ${addressStreet}
City: ${addressCity}
Province: ${addressProvince}
Postal Code: ${addressPostalCode}
Time at Address: ${addressDuration}

Employer: ${employer}
Job Title: ${jobTitle}
Time at Job: ${jobDuration}
Annual Income: ${income}
Other Income: ${otherIncome}

Credit Consent: ${creditConsent ? 'Yes' : 'No'}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending pre-approval email:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
