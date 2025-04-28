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
        {/* Logo */}
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto cursor-pointer" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white text-lg">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/calculator" className="hover:underline">Calculator</Link>
          <Link href="/pre-approval" className="hover:underline">Get Pre-Approved</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Hamburger for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-[#0a0e2c] rounded-lg shadow-lg">
          <ul className="flex flex-col items-center space-y-6 text-white text-lg py-6">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link href="/calculator" onClick={() => setIsMenuOpen(false)}>Calculator</Link></li>
            <li><Link href="/pre-approval" onClick={() => setIsMenuOpen(false)}>Get Pre-Approved</Link></li>
            <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
