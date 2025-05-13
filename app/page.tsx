'use client';

import { MessageCircleIcon } from 'lucide-react';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 space-y-8" style={{ paddingTop: '0rem', paddingBottom: '1rem' }}>
      
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/logo.png" alt="Caprock Logo" className="h-64" />
      </div>

      {/* Hero Section */}
      <section className="text-center text-gray-800 text-base leading-relaxed space-y-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          Financing Built on Trust. Powered by Experience.
        </h2>

        <p>
          At Caprock Capital Group, we specialize in delivering personalized automotive financing tailored to your unique needs—whether you're a first-time buyer, upgrading your vehicle, or rebuilding credit. Our mission is to provide a transparent, flexible, and supportive path to vehicle ownership.
        </p>

        <p>
          With a network of Canada’s leading lenders and trusted dealership partners, we simplify the entire loan process. From pre-approval to funding, our secure platform allows you to apply with ease, compare your options, and move forward with confidence—without the pressure.
        </p>

        <p>
          Our advisors are here to support you at every step. We bring years of experience, local insight, and a commitment to ensuring every client makes informed, empowered financial decisions.
        </p>

        <p className="font-semibold">
          Let us help you move forward — with confidence, clarity, and control.
        </p>
      </section>

      {/* CTA Button */}
      <div className="text-center pt-4">
        <a
          href="/pre-approval"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Get Pre-Approved
        </a>
      </div>

      {/* Trust Bar */}
      <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-x-8 gap-y-4 px-4">
        <div className="flex items-center gap-2">
          <span className="text-blue-600">🔒</span> Secure & Encrypted
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">🇨🇦</span> Canadian-Based Company
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">✔️</span> No Credit Score Impact (Pre-Approvals)
        </div>
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="w-4 h-4 text-blue-600" />
          Real People. Real Help.
        </div>
        <div className="flex items-center gap-2">
          <img src="/cloudflare-logo.png" alt="Cloudflare logo" className="h-4" />
          Protected by Cloudflare
        </div>
      </div>
    </div>
  );
}
