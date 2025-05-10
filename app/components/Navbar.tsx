'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Caprock Home">
          <img src="/logo.png" alt="Caprock Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-900">Caprock</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/calculator" className="hover:text-blue-600">Calculator</Link>
          <Link href="/pre-approval" className="hover:text-blue-600">Pre-Approval</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {menuOpen && (
        <div className="absolute top-20 right-4 w-56 bg-white shadow-xl rounded-lg p-4 space-y-3 border z-50 transition-all duration-300">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block text-blue-700 hover:underline">Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-blue-700 hover:underline">About</Link>
          <Link href="/calculator" onClick={() => setMenuOpen(false)} className="block text-blue-700 hover:underline">Calculator</Link>
          <Link href="/pre-approval" onClick={() => setMenuOpen(false)} className="block text-blue-700 hover:underline">Pre-Approval</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-blue-700 hover:underline">Contact</Link>
        </div>
      )}
    </nav>
  );
}
