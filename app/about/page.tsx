'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background image with 50% opacity */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-center bg-cover opacity-50"
          style={{ backgroundImage: "url('/background.png')" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
        <Image
          src="/logo.png"
          alt="Caprock Capital Group Logo"
          width={120}
          height={120}
          priority
          className="mx-auto mb-4"
        />

        <h1 className="text-4xl font-bold mb-6">About Caprock Capital Group</h1>

        <div className="bg-black/20 rounded-lg p-8 text-left space-y-6">
          <p className="text-lg leading-relaxed">
            At Caprock Capital Group, we specialize in helping Canadians move forward with confidence by offering personalized auto financing solutions tailored to real lives and real goals. With deep roots in financial integrity and a passion for client-first service, we’ve built a reputation for being transparent, reliable, and refreshingly easy to work with.
          </p>

          <p className="text-lg leading-relaxed">
            Whether you’re buying your first vehicle, upgrading to meet your family’s needs, or rebuilding your credit, our team is here to guide you through every step. We work closely with a wide range of lenders to find flexible financing options that fit your budget — without the pressure, fine print, or unnecessary delays.
          </p>

          <p className="text-lg leading-relaxed">
            Our approach is simple: treat people with respect, communicate clearly, and deliver results that earn trust. Backed by modern technology, top-tier lender partnerships, and a genuine care for our clients, we’re more than just a brokerage — we’re your partner on the road ahead.
          </p>

          <p className="text-lg leading-relaxed font-semibold">
            Let us help you move forward — smarter, stronger, and on your terms.
          </p>
        </div>
      </div>
    </div>
  );
}
