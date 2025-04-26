'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function PreApprovalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
    idFile: null,
    payStub: null,
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : value;
  };

  const handlePhoneChange = (e: any) => {
    const formatted = formatPhone(e.target.value);
    handleChange({ target: { name: 'phone', value: formatted, type: 'text' } });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert('Please verify you are human.');
      return;
    }
    if (!formData.creditConsent) {
      alert('Please consent to the credit check.');
      return;
    }
    setSubmitted(true);
  };

  const renderSummary = () => (
    <div className="bg-white shadow-lg p-8 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Review Your Application</h2>
      <ul className="space-y-3 text-sm">
        {[
          { label: 'Vehicle', key: 'vehicle' },
          { label: 'Down Payment', key: 'downPayment' },
          { label: 'Full Name', key: 'name' },
          { label: 'Date of Birth', key: 'dob' },
          { label: 'Email', key: 'email' },
          { label: 'Phone Number', key: 'phone' },
          { label: 'Current Address', key: 'address' },
          { label: 'Time at Address', key: 'addressDuration' },
          { label: 'Employer', key: 'employer' },
          { label: 'Job Title', key: 'jobTitle' },
          { label: 'Time at Job', key: 'jobDuration' },
          { label: 'Annual Income', key: 'income' },
          { label: 'Other Income', key: 'otherIncome' },
        ].map(({ label, key }) => (
          <li key={key}>
            <strong>{label}:</strong> {formData[key as keyof typeof formData] || 'Not Provided'}
          </li>
        ))}
        <li><strong>Credit Check Consent:</strong> {formData.creditConsent ? 'Yes' : 'No'}</li>
        <li><strong>Photo ID Uploaded:</strong> {formData.idFile ? 'Yes' : 'No'}</li>
        <li><strong>Pay Stub Uploaded:</strong> {formData.payStub ? 'Yes' : 'No'}</li>
      </ul>

      <div className="mt-6">
        <ReCAPTCHA
          sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj"
          onChange={(token) => setRecaptchaToken(token)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
      >
        Confirm and Submit
      </button>

      <button
        onClick={() => setShowSummary(false)}
        className="mt-4 w-full text-blue-600 underline text-sm"
      >
        Go Back and Edit
      </button>
    </div>
  );

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

      {showSummary ? (
        renderSummary()
      ) : (
        <form className="bg-white shadow-md rounded-lg p-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          setShowSummary(true);
        }}>
          <h1 className="text-2xl font-bold text-center mb-6">Pre-Approval Application</h1>

          {/* Vehicle Section */}
          <div>
            <label className="block font-medium mb-1">Vehicle Type or Budget</label>
            <input name="vehicle" value={formData.vehicle} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Down Payment ($)</label>
            <input name="downPayment" value={formData.downPayment} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>

          {/* Personal Information */}
          <h2 className="font-semibold text-lg pt-4">Personal Information</h2>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handlePhoneChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Current Address</label>
            <input name="address" value={formData.address} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Time at Address (Years, Months)</label>
            <input name="addressDuration" value={formData.addressDuration} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>

          {/* Employment */}
          <h2 className="font-semibold text-lg pt-4">Employment & Income</h2>
          <div>
            <label className="block font-medium mb-1">Employer</label>
            <input name="employer" value={formData.employer} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Time at Job (Years, Months)</label>
            <input name="jobDuration" value={formData.jobDuration} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Annual Income ($)</label>
            <input name="income" value={formData.income} onChange={handleChange} required className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Other Income (Optional)</label>
            <input name="otherIncome" value={formData.otherIncome} onChange={handleChange} className="w-full border p-3 rounded" />
          </div>

          {/* Documents Upload */}
          <h2 className="font-semibold text-lg pt-4">Upload Documents</h2>
          <div>
            <label className="block font-medium mb-1">Photo ID (Driver’s License)</label>
            <input name="idFile" type="file" onChange={handleChange} className="w-full border p-3 rounded bg-white" />
          </div>
          <div>
            <label className="block font-medium mb-1">Recent Pay Stub</label>
            <input name="payStub" type="file" onChange={handleChange} className="w-full border p-3 rounded bg-white" />
          </div>

          {/* Consent */}
          <div className="flex items-start gap-2">
            <input type="checkbox" name="creditConsent" checked={formData.creditConsent} onChange={handleChange} required />
            <label className="text-sm">I consent to a credit check for financing purposes.</label>
          </div>

          <button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold">
            Continue to Review
          </button>
        </form>
      )}

      <div className="text-center text-xs text-gray-500 mt-8">
        Need help? Email us at contact@caprockcapital.ca
      </div>
    </div>
  );
}