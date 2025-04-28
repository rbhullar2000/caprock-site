
import './globals.css'
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo-light.png" alt="Caprock Logo" width={40} height={40} />
            <span className="font-bold text-lg"></span>
          </Link>
          <div className="space-x-6 text-sm sm:text-base">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/calculator" className="hover:underline">Calculator</Link>
            <Link href="/pre-approval" className="hover:underline">Get Pre-Approved</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </nav>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 border-t">
          <div>Caprock Capital Group Inc.</div>
          <div className="mt-1">112 - 970 Burrard Street, Office #1547, Vancouver, BC V6Z 2R4, Canada</div>
        </footer>
      </body>
    </html>
  );
}
