'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Caprock Home">
          <img src="/logo.png" alt="Caprock Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-900">Caprock</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/calculator" className="hover:text-primary">Calculator</Link>
          <Link href="/pre-approval" className="hover:text-primary">Pre-Approval</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
