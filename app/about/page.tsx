'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <Image
        src="/logo.png"
        alt="Caprock Capital Group Logo"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />

      <h1 className="text-3xl font-bold mb-6">About Caprock Capital Group</h1>

      <p className="text-gray-700 leading-relaxed">
        At Caprock Capital Group, we’re dedicated to providing Canadians with dependable auto financing options built on a foundation of trust, transparency, and real-world results.
      </p>

      <p className="text-gray-700 leading-relaxed mt-6">
        Our team focuses on delivering a smooth, secure, and straightforward financing experience for every client. Whether you're purchasing your first car or upgrading to something new, we’re committed to helping you achieve your goals — with integrity, care, and expertise.
      </p>
    </div>
  );
}
