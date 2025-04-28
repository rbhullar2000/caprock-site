'use client';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p>Caprock Capital Group Inc.</p>
          <p>112 - 970 Burrard Street, Office #1547</p>
          <p>Vancouver, BC V6Z 2R4, Canada</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Email</h2>
          <p>contact@caprockcapital.ca</p>
        </div>
      </div>
    </div>
  );
}