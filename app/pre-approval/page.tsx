'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic'; // ✅ NEW: dynamic import
import { useRouter } from 'next/navigation';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false }); // ✅ Load client-side only

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

    try {
      const res = await fetch('/api/send-preapproval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
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
      <form
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Pre-Approval Application
        </h1>

        {/* ... your form fields stay unchanged ... */}

        <div className="mt-6">
          <ReCAPTCHA
            sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj"
            onChange={() => setCaptcha(true)}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-semibold"
        >
          Submit Pre-Approval
        </button>
      </form>
    </div>
  );
}
