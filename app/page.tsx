'use client';

import { MessageCircleIcon } from 'lucide-react';

export default function Page() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 space-y-8 text-center">
        
        <img src="/logo.png" alt="Caprock Logo" className="h-48 sm:h-56 -mt-6" />

        <h1 className="text-2xl sm:text-3xl font-bold">
          Financing Built on Trust. Powered by Experience.
        </h1>

        <div className="max-w-2xl space-y-4 text-base sm:text-lg">
          <p>
            At Caprock Capital Group, we specialize in delivering personalized automotive financing tailored to your unique needs—whether you're a first-time buyer, upgrading your vehicle, or rebuilding credit.
          </p>
          <p>
            We work with top lenders and trusted dealerships to simplify the process from pre-approval to funding. Apply online, explore options, and move forward confidently — with zero pressure.
          </p>
          <p className="font-semibold">
            Let us help you move forward — with confidence, clarity, and control.
          </p>
        </div>

        <a
          href="/pre-approval"
          className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Get Pre-Approved
        </a>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-200">
          <div className="flex items-center gap-2">🔒 Secure & Encrypted</div>
          <div className="flex items-center gap-2">🇨🇦 Canadian-Based Company</div>
          <div className="flex items-center gap-2">✔️ No Credit Score Impact</div>
          <div className="flex items-center gap-2">
            <MessageCircleIcon className="w-4 h-4" />
            Real People. Real Help.
          </div>
        </div>
      </div>
    </div>
  );
}
