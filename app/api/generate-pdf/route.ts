import { NextRequest } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const filePath = path.join(process.cwd(), 'public', 'Credit Application CapRock Capital Group.pdf');
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  const fieldMap = {
    // Applicant
    firstName: 'firstname',
    middleName: 'middlename',
    lastName: 'lastname',
    dob: 'dob',
    sin: 'sin',
    license: 'license',
    licenseExpiry: 'licenseexpiry',
    maritalStatus: 'maritalstatus',
    natureOfBusiness: 'natureofbusiness',
    employerPhone: 'businessphone',
    phone: 'homephone',
    cellphone: 'cellphone',
    email: 'Email',
    addressStreet: 'address',
    addressCity: 'city',
    addressProvince: 'province',
    addressPostalCode: 'postalcode',
    addressDuration: 'homeduration',
    landlordName: 'landlordname',
    landlordNumber: 'landlordphone',
    mortgageRentAmount: 'mortgage_rent_amount',
    mortgageBalance: 'mortgagebalance',
    mortgageHolder: 'mortgageholder',
    marketValue: 'marketvalue',
    employer: 'presentemployername',
    employerAddress: 'employeraddress',
    jobTitle: 'occupation',
    jobDuration: 'occupationduration',
    income: 'monthlyincome',
    otherIncome: 'secondincome',
    previousEmployer: 'previousemployer',
    previousEmployerPhone: 'previousemployerphone',
    previousEmployerDuration: 'previousemployerduration',
    previousAddress: 'previousaddress',
    previousCity: 'previouscity',
    previousProvince: 'previousprovince',
    previousPostalCode: 'previouspostalcode',
    previousAddressDuration: 'previousaddressduration',

    // Co-Applicant
    coFirstName: 'coapplicantgivenname',
    coMiddleName: 'coapplicantmiddlename',
    coLastName: 'coapplicantlastname',
    coDob: 'coapplicantdob',
    coSin: 'coapplicantsin',
    coLicense: 'coapplicantlicense',
    coLicenseExpiry: 'coapplicantlicenseexpiry',
    coMaritalStatus: 'coapplicantmaritalstatus',
    coPhone: 'coapplicanthomephone',
    coCellphone: 'coapplicantcellphone',
    coEmail: 'coapplicantemail',
    coAddressStreet: 'coapplicantaddress',
    coAddressCity: 'coapplicantcity',
    coAddressProvince: 'coapplicantpreviousprovince',
    coAddressPostalCode: 'coapplicantpostalcode',
    coAddressDuration: 'coapplicanthomeduration',
    coPreviousAddress: 'coapplicantpreviousaddress',
    coPreviousCity: 'coapplicantpreviouscity',
    coPreviousProvince: 'coapplicantpreviousprovince',
    coPreviousPostalCode: 'coapplicantpreviouspostalcode',
    coPreviousAddressDuration: 'coapplicantpreviousaddressduration',
    coEmployer: 'coapplicantemployername',
    coEmployerAddress: 'coapplicantemployeraddress',
    coJobTitle: 'coapplicantoccupation',
    coJobDuration: 'coapplicantoccupationduration',
    coEmployerPhone: 'coapplicantbusinessphone',
    coNatureOfBusiness: 'coapplicantnameofbusiness',
    coIncome: 'coapplicantmonthlyincome',
    coOtherIncome: 'coapplicantsecondincome',
    coMortgageBalance: 'coapplicantmortgagebalance',
    coMortgageRentAmount: 'coapplicant_mortgage_rent_amount',
    coMarketValue: 'coapplicantmarketvalue',
    coMortgageHolder: 'coapplicantmortgageholder',
    coLandlordName: 'coapplicantlandlordname',
    coLandlordNumber: 'coapplicantlandlordphone',

    // Vehicle Info
    vehicle: 'vehiclesoldmodel',
    make: 'vehiclesoldmake',
    model: 'vehiclesoldmodel',
    year: 'vehiclesoldyear',
    kms: 'vehiclesoldkms',
    downPayment: 'vehicledownpmt',
    price: 'vehicleprice',
    docFee: 'vehicledocfee',
    tradeValue: 'vehicletrade',
    difference: 'vehicledifference',
    balanceOwing: 'vehiclebalanceowing',
    tradeYear: 'tradeinyear',
    tradeMake: 'trademake',
    tradeModel: 'trademodel',

    // Other
    date: 'date',
  };

  // Fill text fields
  Object.entries(fieldMap).forEach(([key, fieldName]) => {
    try {
      const field = form.getTextField(fieldName);
      field.setText(data[key] || '');
    } catch (err) {
      console.warn(`Field '${fieldName}' not found in PDF.`);
    }
  });

  // VIN1–VIN17 fields
  if (data.vin) {
    const vin = data.vin.toUpperCase().slice(0, 17).padEnd(17, ' ');
    for (let i = 0; i < 17; i++) {
      try {
        const field = form.getTextField(`VIN${i + 1}`);
        field.setText(vin[i]);
      } catch (err) {
        console.warn(`VIN field VIN${i + 1} not found.`);
      }
    }
  }

  // Handle checkbox-lookalike fields that are actually text fields
  ['damageover2000', 'rebuilt', 'vehicleoutofprovince'].forEach((fieldName) => {
    try {
      const field = form.getTextField(fieldName);
      field.setText(data[fieldName] ? 'X' : '');
    } catch (err) {
      console.warn(`Field '${fieldName}' not found or not a text field.`);
    }
  });

  // Own/rent checkboxes
  try {
    if (data.own) form.getCheckBox('own').check();
    if (data.rent) form.getCheckBox('rent').check();
    if (data.coapplicantown) form.getCheckBox('coapplicantown').check();
    if (data.coapplicantrent) form.getCheckBox('coapplicantrent').check();
  } catch (err) {
    console.warn('Own/Rent checkbox error:', err);
  }

  form.flatten();
  const pdfBytesFilled = await pdfDoc.save();

  // Only send email in production
  if (process.env.NODE_ENV === 'production') {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'rob@caprockcapital.ca',
      subject: 'New Credit Application Submission',
      text: 'A new credit application has been submitted. See attached PDF.',
      attachments: [
        {
          filename: 'credit-application.pdf',
          content: pdfBytesFilled,
        },
      ],
    });
  }

  return NextResponse.json({ success: true });
}
