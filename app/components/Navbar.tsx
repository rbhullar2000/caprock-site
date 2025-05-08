'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = (href: string) =>
    `hover:underline ${pathname === href ? 'font-bold underline' : ''}`;

  return (
    <nav className="bg-[#0a0e2c] text-white p-4 w-full shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="/"><span className={getLinkClass('/')}>Home</span></Link>
          <Link href="/about"><span className={getLinkClass('/about')}>About</span></Link>
          <Link href="/calculator"><span className={getLinkClass('/calculator')}>Calculator</span></Link>
          <Link href="/pre-approval"><span className={getLinkClass('/pre-approval')}>Get Pre-Approved</span></Link>
          <Link href="/contact"><span className={getLinkClass('/contact')}>Contact</span></Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none text-2xl"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4 text-lg">
          <li><Link href="/"><span onClick={closeMenu} className={getLinkClass('/')}>Home</span></Link></li>
          <li><Link href="/about"><span onClick={closeMenu} className={getLinkClass('/about')}>About</span></Link></li>
          <li><Link href="/calculator"><span onClick={closeMenu} className={getLinkClass('/calculator')}>Calculator</span></Link></li>
          <li><Link href="/pre-approval"><span onClick={closeMenu} className={getLinkClass('/pre-approval')}>Get Pre-Approved</span></Link></li>
          <li><Link href="/contact"><span onClick={closeMenu} className={getLinkClass('/contact')}>Contact</span></Link></li>
        </ul>
      </div>
    </nav>
  );
}
