export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div className="flex justify-center">
        <img src="/logo-dark.png" alt="Caprock Logo" className="h-96" />
      </div>
      <section className="text-center text-gray-800 text-md leading-relaxed space-y-4">
        <p>
          At Caprock Capital Group, we specialize in personalized automotive financing designed to meet your needs —
          whether you're a first-time buyer, upgrading your vehicle, or navigating credit challenges. We offer
          transparent, flexible, and competitively priced financing solutions that give you the power to choose your
          vehicle with confidence.
        </p>
        <p>
          With partnerships across Canada's top lending institutions and trusted dealers, we streamline the loan process
          from application to approval. Our secure online tools let you get pre-approved in minutes, calculate your
          payment options, and apply without any pressure.
        </p>
        <p>
          Backed by experience and driven by trust, Caprock Capital Group is your reliable partner in vehicle
          financing. Our advisors are always available to guide you through your options and ensure you make informed,
          empowered decisions. You're not just another application — you're our priority.
        </p>
        <p className="font-semibold mt-4">Let us help you move forward — stronger, smarter, and on your terms.</p>
      </section>
      <div className="text-center pt-6">
        <a
          href="/pre-approval"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Get Pre-Approved
        </a>
      </div>
      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-10">
        <div className="flex items-center gap-2">
          <span className="text-blue-600">🔒</span> Secure & Encrypted
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">🇨🇦</span> Canadian-Based Company
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">✔️</span> No Credit Score Impact
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600">📞</span> Real People. Real Help.
        </div>
      </div>
    </div>
  );
}
