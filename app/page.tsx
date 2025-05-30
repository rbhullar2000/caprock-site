'use client';

import { MessageCircleIcon } from 'lucide-react';

export default function Page() {
  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      {/* Optional: Overlay */}
      {/* <div className="fixed inset-0 bg-black/20 -z-10" /> */}

      {/* Logo aligned top-right consistently */}
      <div className="flex justify-end w-full pr-6 pt-6">
        <img src="/logo.png" alt="Caprock Logo" className="h-24 sm:h-24" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 w-full space-y-8">
        {/* Headline & Description in translucent box */}
        <section className="bg-black/30 rounded-lg p-8 text-center text-base leading-relaxed space-y-5 w-full max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
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

        {/* CTA */}
        <div className="pt-4">
          <a
            href="/pre-approval"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Get Pre-Approved
          </a>
        </div>

        {/* Trust Bar */}
        <div className="mt-10 pt-6 text-sm text-gray-200 flex flex-wrap justify-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2">
            <span>🔒</span> Secure & Encrypted
          </div>
          <div className="flex items-center gap-2">
            <span>🇨🇦</span> Canadian-Based Company
          </div>
          <div className="flex items-center gap-2">
            <span>✔️</span> No Credit Score Impact (Pre-Approvals)
          </div>
          <div className="flex items-center gap-2">
            <MessageCircleIcon className="w-4 h-4" />
            Real People. Real Help.
          </div>
          <div className="flex items-center gap-2">
            <img src="/cloudflare-logo.png" alt="Cloudflare logo" className="h-4" />
            Protected by Cloudflare
          </div>
        </div>
      </div>
    </div>
  );
}
