'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/navigation';

export default function PreApprovalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    vehicle: '',
    downPayment: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    addressStreet: '',
    addressCity: '',
    addressProvince: '',
    addressPostalCode: '',
    addressDuration: '',
    employer: '',
    jobTitle: '',
    jobDuration: '',
    income: '',
    otherIncome: '',
    creditConsent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.creditConsent) {
      alert('Please consent to the credit check.');
      return;
    }
    if (!captcha) {
      alert('Please complete the reCAPTCHA.');
      return;
    }

    const cleanData = {
      'Vehicle': formData.vehicle,
      'Down Payment': formData.downPayment,
      'First Name': formData.firstName,
      'Middle Name': formData.middleName,
      'Last Name': formData.lastName,
      'Date of Birth': formData.dob,
      'Email': formData.email,
      'Phone': formData.phone,
      'Street Address': formData.addressStreet,
      'City': formData.addressCity,
      'Province': formData.addressProvince,
      'Postal Code': formData.addressPostalCode,
      'Time at Address': formData.addressDuration,
      'Employer': formData.employer,
      'Job Title': formData.jobTitle,
      'Time at Job': formData.jobDuration,
      'Annual Income': formData.income,
      'Other Income': formData.otherIncome,
      'Credit Consent': formData.creditConsent ? 'Yes' : 'No',
    };

    try {
      const response = await fetch('https://formspree.io/f/mrbqgrlk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(cleanData),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Submission failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission error. Please try again.');
    }
  };

  const buildQuery = () => {
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    return params.toString();
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Thank You!</h1>
        <p className="mt-4 mb-6">Your pre-approval application has been submitted.</p>
        <button
          onClick={() => router.push(`/full-application?${buildQuery()}`)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Proceed to Full Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <form className="bg-white shadow-md rounded-lg p-6 space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-6">Pre-Approval Application</h1>

        {/* VEHICLE INFO */}
        <div>
          <label>Vehicle Type or Budget</label>
          <input name="vehicle" value={formData.vehicle} onChange={handleChange} required className="w-full border p-3 rounded-md" />
        </div>
        <div>
          <label>Down Payment ($)</label>
          <input name="downPayment" value={formData.downPayment} onChange={handleChange} required className="w-full border p-3 rounded-md" />
        </div>

        {/* PERSONAL INFO */}
        <h2 className="text-lg font-semibold border-b pb-1 mt-8">Personal Information</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div><label>First Name</label><input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Middle Name</label><input name="middleName" value={formData.middleName} onChange={handleChange} className="w-full border p-3 rounded-md" /></div>
          <div><label>Last Name</label><input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label>Date of Birth</label><input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
        </div>
        <div><label>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>

        {/* ADDRESS INFO */}
        <h2 className="text-lg font-semibold border-b pb-1 mt-8">Current Address</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label>Street Address</label><input name="addressStreet" value={formData.addressStreet} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>City</label><input name="addressCity" value={formData.addressCity} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Province</label><input name="addressProvince" value={formData.addressProvince} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Postal Code</label><input name="addressPostalCode" value={formData.addressPostalCode} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
        </div>
        <div><label>Time at Address (Years/Months)</label><input name="addressDuration" value={formData.addressDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>

        {/* EMPLOYMENT */}
        <h2 className="text-lg font-semibold border-b pb-1 mt-8">Employment & Income</h2>
        <div><label>Employer</label><input name="employer" value={formData.employer} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
        <div><label>Job Title</label><input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
        <div><label>Time at Job (Years/Months)</label><input name="jobDuration" value={formData.jobDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
        <div><label>Annual Income</label><input name="income" value={formData.income} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
        <div><label>Other Income</label><input name="otherIncome" value={formData.otherIncome} onChange={handleChange} className="w-full border p-3 rounded-md" /></div>

        <div className="flex items-start gap-2 mt-4">
          <input type="checkbox" name="creditConsent" checked={formData.creditConsent} onChange={handleChange} className="mt-1" />
          <label className="text-sm">I consent to a credit check for financing purposes.</label>
        </div>

        <div className="mt-6">
          <ReCAPTCHA sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj" onChange={() => setCaptcha(true)} />
        </div>

        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-semibold">
          Submit Pre-Approval
        </button>
      </form>
    </div>
  );
}
