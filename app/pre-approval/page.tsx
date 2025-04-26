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
    idFile: null,
    payStub: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.creditConsent) {
      alert('Please consent to the credit check to proceed.');
      return;
    }
    if (!captcha) {
      alert('Please complete the reCAPTCHA.');
      return;
    }
    setSubmitted(true);
  };

  const renderSummary = () => (
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Review Your Application</h2>
      <ul className="space-y-2 text-sm text-left">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'idFile' || key === 'payStub') {
            return (
              <li key={key}>
                <strong>{key === 'idFile' ? 'Photo ID' : 'Pay Stub'}:</strong>{' '}
                {value ? 'Attached' : 'Not Provided'}
              </li>
            );
          }
          if (key === 'creditConsent') {
            return (
              <li key={key}>
                <strong>Credit Check Consent:</strong> {value ? 'Yes' : 'No'}
              </li>
            );
          }
          return (
            <li key={key}>
              <strong>{formatLabel(key)}:</strong> {value ? value : 'Not Provided'}
            </li>
          );
        })}
      </ul>

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

  const formatLabel = (key: string) => {
    switch (key) {
      case 'vehicle': return 'Vehicle Type or Budget';
      case 'downPayment': return 'Down Payment';
      case 'name': return 'Full Name';
      case 'dob': return 'Date of Birth';
      case 'email': return 'Email';
      case 'phone': return 'Phone Number';
      case 'address': return 'Current Address';
      case 'addressDuration': return 'Time at Address';
      case 'employer': return 'Employer';
      case 'jobTitle': return 'Job Title';
      case 'jobDuration': return 'Time at Job';
      case 'income': return 'Annual Income';
      case 'otherIncome': return 'Other Income';
      default: return key;
    }
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
            <input name="vehicle" value={formData.vehicle} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Down Payment ($)</label>
            <input name="downPayment" value={formData.downPayment} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Personal Information</h2>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input name="dob" type="date" value={formData.dob} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Current Address</label>
            <input name="address" value={formData.address} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Time at Address (Years, Months)</label>
            <input name="addressDuration" value={formData.addressDuration} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Employment & Income</h2>
          <div>
            <label className="block font-medium mb-1">Employer</label>
            <input name="employer" value={formData.employer} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Time at Job (Years, Months)</label>
            <input name="jobDuration" value={formData.jobDuration} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Annual Income ($)</label>
            <input name="income" value={formData.income} onChange={handleChange}
                   required className="w-full border p-3 rounded-md" />
          </div>
          <div>
            <label className="block font-medium mb-1">Other Income (Optional)</label>
            <input name="otherIncome" value={formData.otherIncome} onChange={handleChange}
                   className="w-full border p-3 rounded-md" />
          </div>

          <hr />

          <h2 className="font-semibold text-lg">Upload Documents</h2>
          <div>
            <label className="block font-medium mb-1">Photo ID (Driver’s License)</label>
            <input name="idFile" type="file" onChange={handleChange}
                   className="w-full border p-3 rounded-md bg-white" />
          </div>
          <div>
            <label className="block font-medium mb-1">Recent Pay Stub</label>
            <input name="payStub" type="file" onChange={handleChange}
                   className="w-full border p-3 rounded-md bg-white" />
          </div>

          <div className="flex items-start gap-2 mt-4">
            <input type="checkbox" name="creditConsent" checked={formData.creditConsent} onChange={handleChange}
                   className="mt-1" />
            <label className="text-sm">I consent to a credit check for financing purposes.</label>
          </div>

          <div className="mt-6">
            <ReCAPTCHA
              sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj"
              onChange={() => setCaptcha(true)}
            />
          </div>

          <button type="button" onClick={() => setShowSummary(true)}
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-semibold">
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
