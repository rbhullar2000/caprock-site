'use client';

import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <Image
        src="/logo.png"
        alt="Caprock Capital Group Logo"
        width={120}
        height={120}
        className="mx-auto"
      />

      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 text-left space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Office Address</h2>
          <p className="text-gray-700">Caprock Capital Group Inc.</p>
          <p className="text-gray-700">112 – 970 Burrard Street, Office #1547</p>
          <p className="text-gray-700">Vancouver, BC V6Z 2R4, Canada</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Email</h2>
          <p className="text-blue-600 hover:underline">
            <a href="mailto:contact@caprockcapital.ca">contact@caprockcapital.ca</a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Business Hours</h2>
          <p className="text-gray-700">Monday – Friday: 9:00 AM – 5:00 PM</p>
          <p className="text-gray-700">Saturday & Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
