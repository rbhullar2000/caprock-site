// app/privacy-policy/page.tsx
'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Caprock Capital Group Inc. (“Caprock”, “we”, “us”, or “our”) is committed to protecting the privacy and security
        of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data
        in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable
        provincial laws.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Full name, address, email, and phone number</li>
        <li>Date of birth, SIN, driver’s licence number</li>
        <li>Employment and income details</li>
        <li>Credit and banking information</li>
        <li>Consent forms and application data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To evaluate and process your auto loan application</li>
        <li>Submit your application to lender partners</li>
        <li>Communicate regarding your application status</li>
        <li>Comply with legal and regulatory obligations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Consent</h2>
      <p className="mb-4">
        By submitting an application to Caprock Capital Group, you consent to the collection, use, and disclosure of your
        information as outlined. You may withdraw consent at any time, subject to legal and contractual restrictions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Disclosure of Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Lenders and financial institutions for financing purposes</li>
        <li>Service providers assisting with secure data handling</li>
        <li>Regulatory authorities if required by law</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Storage and Protection</h2>
      <p className="mb-4">
        All client data is stored securely with access limited to authorized personnel. Records are retained for at least
        two years, then securely destroyed when no longer required.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to access your personal information, request corrections, and withdraw consent. To exercise
        these rights, please contact rob@caprockcapital.ca.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. The latest version will always be available on our website.
        Continued use of our services signifies your acceptance of the revised terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p>
        Caprock Capital Group Inc.<br />
        contact@caprockcapital.ca<br />
      </p>
    </main>
  );
}
