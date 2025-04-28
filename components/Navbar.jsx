'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // for active link highlighting

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
          <Link href="/" className={pathname === '/' ? 'font-bold underline' : ''}>Home</Link>
          <Link href="/about" className={pathname === '/about' ? 'font-bold underline' : ''}>About</Link>
          <Link href="/calculator" className={pathname === '/calculator' ? 'font-bold underline' : ''}>Calculator</Link>
          <Link href="/pre-approval" className={pathname === '/pre-approval' ? 'font-bold underline' : ''}>Get Pre-Approved</Link>
          <Link href="/contact" className={pathname === '/contact' ? 'font-bold underline' : ''}>Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-[600px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
        }`}
      >
        <ul className="flex flex-col items-center space-y-6 text-white text-lg py-6">
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link href="/calculator" onClick={() => setIsMenuOpen(false)}>Calculator</Link></li>
          <li><Link href="/pre-approval" onClick={() => setIsMenuOpen(false)}>Get Pre-Approved</Link></li>
          <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}