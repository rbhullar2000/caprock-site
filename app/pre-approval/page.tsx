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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
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
          onClick={() => router.push(`/full-application/continue?${buildQuery()}`)}
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
        {/* form content here as you've already written */}
        {/* no changes needed to form fields, everything is good */}

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
