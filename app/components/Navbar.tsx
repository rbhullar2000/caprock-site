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
        <div className="absolute top-20 right-4 w-60 rounded-2xl border border-gray-200 shadow-xl bg-white py-4 px-5 z-50 transition-all duration-300">
          <ul className="space-y-3 text-sm text-gray-800 font-medium">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/calculator" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
                Calculator
              </Link>
            </li>
            <li>
              <Link href="/pre-approval" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
                Pre-Approval
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
