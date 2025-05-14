'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      {/* Logo aligned top-right consistently */}
      <div className="flex justify-end w-full pr-6 pt-6">
        <img src="/logo.png" alt="Caprock Logo" className="h-24 sm:h-24" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 w-full space-y-8">
        <section className="bg-black/30 rounded-lg p-8 text-base leading-relaxed w-full max-w-3xl space-y-6 text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
            Contact Us
          </h2>

          <div>
            <h3 className="text-xl font-semibold mb-2">Office Address</h3>
            <p>Caprock Capital Group Inc.</p>
            <p>112 – 970 Burrard Street, Office #1547</p>
            <p>Vancouver, BC V6Z 2R4, Canada</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-blue-300 hover:underline">
              <a href="mailto:contact@caprockcapital.ca">contact@caprockcapital.ca</a>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
            <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
            <p>Saturday & Sunday: Closed</p>
          </div>
        </section>
      </div>
    </div>
  );
}
