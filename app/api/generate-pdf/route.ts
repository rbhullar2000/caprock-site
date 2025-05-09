import { NextRequest, NextResponse } from 'next/server';
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

  const fieldMap: { [key: string]: string } = {
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
    previousAddress: 'previousaddress',
    previousCity: 'previouscity',
    previousProvince: 'previousprovince',
    previousPostalCode: 'previouspostalcode',
    previousAddressDuration: 'previousaddressduration',
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
    coAddressProvince: 'coapplicantprovince',
    coAddressPostalCode: 'coapplicantpostalcode',
    coAddressDuration: 'coapplicanthomeduration',
    coPreviousAddress: 'coapplicantpreviousaddress',
    coPreviousCity: 'coapplicantpreviouscity',
    coPreviousProvince: 'coapplicantpreviousprovince',
    coPreviousPostalCode: 'coapplicantpreviouspostalcode',
    coPreviousAddressDuration: 'coapplicantpreviousaddressduration',
    coLandlordName: 'coapplicantlandlordname',
    coLandlordNumber: 'coapplicantlandlordphone',
    coMortgageRentAmount: 'coapplicant_mortgage_rent_amount',
    coMortgageBalance: 'coapplicantmortgagebalance',
    coMortgageHolder: 'coapplicantmortgageholder',
    coMarketValue: 'coapplicantmarketvalue',
    coEmployer: 'coapplicantemployername',
    coEmployerAddress: 'coapplicantemployeraddress',
    coJobTitle: 'coapplicantoccupation',
    coJobDuration: 'coapplicantoccupationduration',
    coEmployerPhone: 'coapplicantbusinessphone',
    coNatureOfBusiness: 'coapplicantnameofbusiness',
    coIncome: 'coapplicantmonthlyincome',
    coOtherIncome: 'coapplicantsecondincome',

    // Vehicle
    vehicle: 'vehiclesoldmodel',
    make: 'vehiclesoldmake',
    model: 'vehiclesoldmodel',
    year: 'vehiclesoldyear',
    kms: 'vehiclesoldkms',
    vin: 'vin',
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
      console.warn(`Text field '${fieldName}' not found.`);
    }
  });

  // VIN fields
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

  // Checkbox fields
  const checkboxKeys = [
    'own',
    'rent',
    'coapplicantown',
    'coapplicantrent',
    'damageover2000',
    'rebuilt',
    'vehicleoutofprovince',
    'creditconsent',
  ];

  checkboxKeys.forEach((key) => {
    try {
      const checkbox = form.getCheckBox(key);
      const value = data[key];
      if (value === true || value === 'true' || value === 'on') {
        checkbox.check();
      } else {
        checkbox.uncheck();
      }
    } catch (err) {
      console.warn(`Checkbox '${key}' not found or failed to render.`);
    }
  });

  // Ensure checkboxes render properly
  form.updateFieldAppearances();
  form.flatten();

  const pdfBytesFilled = await pdfDoc.save();

  // Email PDF
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
        content: Buffer.from(pdfBytesFilled),
      },
    ],
  });

  return NextResponse.json({ success: true });
}
