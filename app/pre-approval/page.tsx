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
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert('Please verify that you are not a robot.');
      return;
    }
    if (!formData.creditConsent) {
      alert('Please consent to a credit check to proceed.');
      return;
    }
    setSubmitted(true);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : value;
  };

  const renderSummary = () => (
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Review Your Application</h2>
      <ul className="space-y-2 text-sm text-left">
        {Object.entries(formData).map(([key, value]) => (
          typeof value === 'string' && (
            <li key={key}>
              <strong>{formatFieldName(key)}:</strong> {value.trim() ? value : 'Not Provided'}
            </li>
          )
        ))}
        <li><strong>Credit Check Consent:</strong> {formData.creditConsent ? 'Yes' : 'No'}</li>
        <li><strong>Photo ID Uploaded:</strong> {formData.idFile ? 'Yes' : 'No'}</li>
        <li><strong>Pay Stub Uploaded:</strong> {formData.payStub ? 'Yes' : 'No'}</li>
      </ul>
      <ReCAPTCHA sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj" onChange={() => setCaptchaVerified(true)} className="mt-6" />
      <button
        onClick={() => setSubmitted(true)}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded font-semibold"
      >
        Confirm and Submit
      </button>
      <button
        onClick={() => setShowSummary(false)}
        className="mt-2 w-full text-gray-600 py-2 underline"
      >
        Edit Information
      </button>
    </div>
  );

  const formatFieldName = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace('Dob', 'Date of Birth')
      .replace('IdFile', 'Photo ID')
      .replace('PayStub', 'Pay Stub')
      .trim();
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
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6" method="POST">
          <h1 className="text-2xl font-bold text-center mb-6">Pre-Approval Application</h1>

          <div>
            <label className="block font-medium mb-1">Vehicle Type or Budget</label>
            <input name="vehicle" value={formData.vehicle} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Down Payment ($)</label>
            <input name="downPayment" value={formData.downPayment} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Personal Information</h2>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, value: formatPhone(e.target.value) } })}
              required className="w-full border p-3 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Current Address</label>
            <input name="address" value={formData.address} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Time at Address (Years, Months)</label>
            <input name="addressDuration" value={formData.addressDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Employment & Income</h2>
          <div>
            <label className="block font-medium mb-1">Employer</label>
            <input name="employer" value={formData.employer} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Time at Job (Years, Months)</label>
            <input name="jobDuration" value={formData.jobDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Annual Income ($)</label>
            <input name="income" value={formData.income} onChange={handleChange} required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Other Income (Optional)</label>
            <input name="otherIncome" value={formData.otherIncome} onChange={handleChange} className="w-full border p-3 rounded-md" />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Upload Documents</h2>
          <div>
            <label className="block font-medium mb-1">Photo ID (Driver’s License)</label>
            <input name="idFile" type="file" onChange={handleChange} className="w-full border p-3 rounded-md bg-white" />
          </div>
          <div>
            <label className="block font-medium mb-1">Recent Pay Stub</label>
            <input name="payStub" type="file" onChange={handleChange} className="w-full border p-3 rounded-md bg-white" />
          </div>

          <div className="flex items-start gap-2 mt-4">
            <input type="checkbox" name="creditConsent" checked={formData.creditConsent} onChange={handleChange} className="mt-1" />
            <label className="text-sm">I consent to a credit check for financing purposes.</label>
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
