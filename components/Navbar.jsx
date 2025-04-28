'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#0a0e2c] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto cursor-pointer" />
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6 text-white text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/calculator">Calculator</Link></li>
          <li><Link href="/pre-approval">Pre-Approval</Link></li> {/* 👈 EXACTLY THIS */}
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div className="text-white text-3xl md:hidden cursor-pointer" onClick={toggleMenu}>
          ☰
        </div>
      </div>

      {isMenuOpen && (
        <ul className="flex flex-col mt-4 space-y-4 text-white text-lg md:hidden">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/calculator">Calculator</Link></li>
          <li><Link href="/pre-approval">Pre-Approval</Link></li> {/* 👈 EXACTLY THIS */}
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}