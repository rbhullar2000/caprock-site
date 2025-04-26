'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {/* Navbar */}
        <nav className="flex items-center justify-between flex-wrap bg-[#0C1C2C] p-4">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img src="/logo-light.png" alt="Caprock Logo" className="h-10 w-auto mr-2" />
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
            >
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                <title>Menu</title>
                <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
              </svg>
            </button>
          </div>
          <div className={`w-full ${menuOpen ? 'block' : 'hidden'} flex-grow lg:flex lg:items-center lg:w-auto`}>
            <div className="text-sm lg:flex-grow lg:flex lg:justify-end">
              <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-6">
                Home
              </Link>
              <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-6">
                About
              </Link>
              <Link href="/calculator" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-6">
                Calculator
              </Link>
              <Link href="/pre-approval" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-6 whitespace-nowrap">
                Get Pre-Approved
              </Link>
              <Link href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
