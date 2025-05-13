'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <Image
        src="/logo.png"
        alt="Caprock Capital Group Logo"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />

      <h1 className="text-4xl font-bold mb-6">About Caprock Capital Group</h1>

      <p className="text-gray-700 text-lg leading-relaxed">
        At Caprock Capital Group, we specialize in helping Canadians move forward with confidence by offering personalized auto financing solutions tailored to real lives and real goals. With deep roots in financial integrity and a passion for client-first service, we’ve built a reputation for being transparent, reliable, and refreshingly easy to work with.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mt-6">
        Whether you’re buying your first vehicle, upgrading to meet your family’s needs, or rebuilding your credit, our team is here to guide you through every step. We work closely with a wide range of lenders to find flexible financing options that fit your budget — without the pressure, fine print, or unnecessary delays.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mt-6">
        Our approach is simple: treat people with respect, communicate clearly, and deliver results that earn trust. Backed by modern technology, top-tier lender partnerships, and a genuine care for our clients, we’re more than just a brokerage — we’re your partner on the road ahead.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mt-6 font-semibold">
        Let us help you move forward — smarter, stronger, and on your terms.
      </p>
    </div>
  );
}
