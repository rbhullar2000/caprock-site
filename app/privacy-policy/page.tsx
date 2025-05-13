'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 border-b pb-4">Privacy Policy</h1>

      <p className="mb-6 text-lg">
        Caprock Capital Group Inc. (“Caprock”, “we”, “us”, or “our”) is committed to protecting the privacy and security
        of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data
        in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial laws.
      </p>

      <Section
        title="1. Information We Collect"
        items={[
          'Full name, address, email, and phone number',
          'Date of birth, SIN, driver’s licence number',
          'Employment and income details',
          'Credit and banking information',
          'Consent forms and application data',
        ]}
      />

      <Section
        title="2. How We Use Your Information"
        items={[
          'To evaluate and process your auto loan application',
          'Submit your application to lender partners',
          'Communicate regarding your application status',
          'Comply with legal and regulatory obligations',
        ]}
      />

      <Section title="3. Consent">
        <p>
          By submitting an application to Caprock Capital Group, you consent to the collection, use, and disclosure of
          your information as outlined. You may withdraw consent at any time, subject to legal and contractual restrictions.
        </p>
      </Section>

      <Section
        title="4. Disclosure of Information"
        items={[
          'Lenders and financial institutions for financing purposes',
          'Service providers assisting with secure data handling',
          'Regulatory authorities if required by law',
        ]}
      />

      <Section title="5. Data Storage and Protection">
        <p>
          All client data is stored securely with access limited to authorized personnel. Records are retained for a
          minimum of two years, then securely destroyed when no longer required.
        </p>
      </Section>

      <Section title="6. Your Rights">
        <p>
          You have the right to access your personal information, request corrections, and withdraw consent. To exercise
          these rights, please contact us at <a href="mailto:rob@caprockcapital.ca" className="text-blue-600 underline">rob@caprockcapital.ca</a>.
        </p>
      </Section>

      <Section title="7. Changes to This Policy">
        <p>
          We may update this policy from time to time. The latest version will always be available on our website.
          Continued use of our services indicates acceptance of the revised terms.
        </p>
      </Section>

      <Section title="8. Contact Us">
        <p>
          Rob Bhullar<br />
          Managing Partner<br />
          Caprock Capital Group Inc.<br />
          <a href="mailto:rob@caprockcapital.ca" className="text-blue-600 underline">rob@caprockcapital.ca</a><br />
          778-889-7964
        </p>
      </Section>
    </main>
  );
}

function Section({ title, items, children }: { title: string, items?: string[], children?: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      {items && (
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      {children && <div className="mt-2 text-base">{children}</div>}
    </section>
  );
}
