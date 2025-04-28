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
        <ul className="hidden md:flex space-x-8 text-white text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/calculator">Calculator</Link></li>
          <li><Link href="/pre-approval">Get Pre-Approved</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Mobile Hamburger Button */}
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
          <ul className="flex flex-col space-y-4 text-white text-center py-4">
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