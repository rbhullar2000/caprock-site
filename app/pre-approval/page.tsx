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
    idFile: null as File | null,
    payStub: null as File | null,
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] || null : value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length >= 4 && cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }

    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert('Please verify reCAPTCHA.');
      return;
    }

    if (!formData.creditConsent) {
      alert('Please consent to the credit check to proceed.');
      return;
    }

    // Submit to Formspree or API here
    setSubmitted(true);
  };

  const renderSummary = () => (
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Application Summary</h2>
      <ul className="space-y-2 text-sm">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'idFile' || key === 'payStub') return null;
          if (key === 'creditConsent') {
            return (
              <li key={key}>
                <strong>Credit Check Consent:</strong> {formData.creditConsent ? 'Yes' : 'No'}
              </li>
            );
          }
          return (
            <li key={key}>
              <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value ? value : 'Not provided'}
            </li>
          );
        })}
        <li><strong>Uploaded ID:</strong> {formData.idFile ? 'Uploaded' : 'Not uploaded'}</li>
        <li><strong>Uploaded Pay Stub:</strong> {formData.payStub ? 'Uploaded' : 'Not uploaded'}</li>
      </ul>

      <p className="mt-4 italic text-gray-500 text-sm">
        * Driver’s License and/or Pay Stub will be attached with this application.
      </p>

      <div className="mt-6">
        <ReCAPTCHA
          sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj"
          onChange={token => setRecaptchaToken(token)}
        />
      </div>

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
        <form className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">Pre-Approval Application</h1>

          <div>
            <label className="block font-medium mb-1">Vehicle Type or Budget</label>
            <input
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Down Payment ($)</label>
            <input
              name="downPayment"
              value={formData.downPayment}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Personal Information</h2>

          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Current Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Time at Address (Years, Months)</label>
            <input
              name="addressDuration"
              value={formData.addressDuration}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Employment & Income</h2>

          <div>
            <label className="block font-medium mb-1">Employer</label>
            <input
              name="employer"
              value={formData.employer}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Time at Job (Years, Months)</label>
            <input
              name="jobDuration"
              value={formData.jobDuration}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Annual Income ($)</label>
            <input
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Other Income (Optional)</label>
            <input
              name="otherIncome"
              value={formData.otherIncome}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
            />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Upload Documents</h2>

          <div>
            <label className="block font-medium mb-1">Photo ID (Driver’s License)</label>
            <input
              name="idFile"
              type="file"
              onChange={handleChange}
              className="w-full border p-3 rounded-md bg-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Recent Pay Stub</label>
            <input
              name="payStub"
              type="file"
              onChange={handleChange}
              className="w-full border p-3 rounded-md bg-white"
            />
          </div>

          <div className="flex items-start gap-2 mt-4">
            <input
              type="checkbox"
              name="creditConsent"
              checked={formData.creditConsent}
              onChange={handleChange}
              className="mt-1"
            />
            <label className="text-sm">
              I consent to a credit check for financing purposes.
            </label>
          </div>

          <button
            type="button"
            onClick={() => setShowSummary(true)}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-semibold"
          >
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
