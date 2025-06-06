'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutPage() {
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
        <section className="bg-black/30 rounded-lg p-8 text-center text-base leading-relaxed space-y-5 w-full max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            About Caprock Capital Group
          </h2>

          <p>
            At Caprock Capital Group, we specialize in helping Canadians move forward with confidence by offering personalized auto financing solutions tailored to real lives and real goals. With deep roots in financial integrity and a passion for client-first service, we’ve built a reputation for being transparent, reliable, and refreshingly easy to work with.
          </p>

          <p>
            Whether you’re buying your first vehicle, upgrading to meet your family’s needs, or rebuilding your credit, our team is here to guide you through every step. We work closely with a wide range of lenders to find flexible financing options that fit your budget — without the pressure, fine print, or unnecessary delays.
          </p>

          <p>
            Our approach is simple: treat people with respect, communicate clearly, and deliver results that earn trust. Backed by modern technology, top-tier lender partnerships, and a genuine care for our clients, we’re more than just a brokerage — we’re your partner on the road ahead.
          </p>

          <p className="font-semibold">
            Let us help you move forward — smarter, stronger, and on your terms.
          </p>
        </section>
      </div>
    </div>
  );
}
