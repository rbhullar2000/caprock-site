'use client';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function PreApprovalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [formData, setFormData] = useState({
    vehicle: '',
    downPayment: '',
    name: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    addressDuration: '',
    employer: '',
    jobTitle: '',
    jobDuration: '',
    income: '',
    otherIncome: '',
    creditConsent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: (type === 'checkbox' && target instanceof HTMLInputElement) ? target.checked : value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      Vehicle: formData.vehicle,
      'Down Payment': formData.downPayment,
      Name: formData.name,
      'Date of Birth': formData.dob,
      Email: formData.email,
      Phone: formData.phone,
      Address: formData.address,
      'Time at Address': formData.addressDuration,
      Employer: formData.employer,
      'Job Title': formData.jobTitle,
      'Time at Job': formData.jobDuration,
      'Annual Income': formData.income,
      'Other Income': formData.otherIncome,
      'Credit Check Consent': formData.creditConsent ? 'Yes' : 'No',
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

  const renderSummary = () => (
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Review Your Application</h2>
      <ul className="space-y-2 text-sm text-left">
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}>
            <strong>{formatLabel(key)}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'Not Provided'}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded font-semibold"
      >
        Confirm and Submit
      </button>
      <button
        onClick={() => setShowSummary(false)}
        className="mt-2 w-full text-gray-600 py-2 underline"
      >
        Go Back and Edit
      </button>
    </div>
  );

  const formatLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      vehicle: 'Vehicle Type or Budget',
      downPayment: 'Down Payment',
      name: 'Full Name',
      dob: 'Date of Birth',
      email: 'Email',
      phone: 'Phone Number',
      address: 'Current Address',
      addressDuration: 'Time at Address',
      employer: 'Employer',
      jobTitle: 'Job Title',
      jobDuration: 'Time at Job',
      income: 'Annual Income',
      otherIncome: 'Other Income',
      creditConsent: 'Credit Check Consent',
    };
    return labels[key] || key;
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Thank You!</h1>
        <p className="mt-4">Your pre-approval application has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-6">
        <img src="/logo-dark.png" alt="Caprock Logo" className="h-20 mx-auto mb-4" />
        <p className="text-green-600 font-semibold">🔒 Secure SSL Encrypted Application</p>
      </div>

      {showSummary ? renderSummary() : (
        <form className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">Pre-Approval Application</h1>

          {/* FORM FIELDS */}
          <div><label>Vehicle Type or Budget</label><input name="vehicle" value={formData.vehicle} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Down Payment ($)</label><input name="downPayment" value={formData.downPayment} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>

          <hr /><h2 className="font-semibold text-lg">Personal Information</h2>

          <div><label>Full Name</label><input name="name" value={formData.name} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Date of Birth</label><input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Phone Number</label><input name="phone" value={formData.phone} onChange={handlePhoneChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Current Address</label><input name="address" value={formData.address} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Time at Address (Years, Months)</label><input name="addressDuration" value={formData.addressDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>

          <hr /><h2 className="font-semibold text-lg">Employment & Income</h2>

          <div><label>Employer</label><input name="employer" value={formData.employer} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Job Title</label><input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Time at Job (Years, Months)</label><input name="jobDuration" value={formData.jobDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Annual Income ($)</label><input name="income" value={formData.income} onChange={handleChange} required className="w-full border p-3 rounded-md" /></div>
          <div><label>Other Income (Optional)</label><input name="otherIncome" value={formData.otherIncome} onChange={handleChange} className="w-full border p-3 rounded-md" /></div>

          <div className="flex items-start gap-2 mt-4">
            <input type="checkbox" name="creditConsent" checked={formData.creditConsent} onChange={handleChange} className="mt-1" />
            <label className="text-sm">I consent to a credit check for financing purposes.</label>
          </div>

          <div className="mt-6">
            <ReCAPTCHA sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj" onChange={() => setCaptcha(true)} />
          </div>

          <button type="button" onClick={() => setShowSummary(true)} className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-semibold">
            Continue to Review
          </button>
        </form>
      )}

      <div className="text-center text-sm text-gray-500 mt-8">
        Need help? Email us at contact@caprockcapital.ca
      </div>
    </div>
  );
}