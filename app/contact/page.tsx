'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  <div className="relative z-10 max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
      {/* ✅ Full background image */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      {/* ✅ Optional: overlay for readability */}
      {/* <div className="fixed inset-0 bg-black/30 -z-10" /> */}

      {/* ✅ Content wrapper */}
      <br />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        <Image
          src="/logo.png"
          alt="Caprock Capital Group Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
        <div></div>
        <h1 className="text-4xl font-bold">Contact Us</h1>

        <div className="bg-black/30 rounded-lg p-8 text-left space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Office Address</h2>
            <p>Caprock Capital Group Inc.</p>
            <p>112 – 970 Burrard Street, Office #1547</p>
            <p>Vancouver, BC V6Z 2R4, Canada</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-blue-300 hover:underline">
              <a href="mailto:contact@caprockcapital.ca">contact@caprockcapital.ca</a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
            <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
            <p>Saturday & Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
