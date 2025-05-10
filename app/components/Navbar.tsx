'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Caprock Home">
          <img src="/logo.png" alt="Caprock Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-900">Caprock</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/calculator" className="hover:text-blue-600">Calculator</Link>
          <Link href="/pre-approval" className="hover:text-blue-600">Pre-Approval</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Accordion */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="menu">
              <AccordionTrigger className="text-base">Menu</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Link href="/" onClick={() => setMenuOpen(false)} className="block text-blue-700">Home</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-blue-700">About</Link>
                <Link href="/calculator" onClick={() => setMenuOpen(false)} className="block text-blue-700">Calculator</Link>
                <Link href="/pre-approval" onClick={() => setMenuOpen(false)} className="block text-blue-700">Pre-Approval</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-blue-700">Contact</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </nav>
  );
}
