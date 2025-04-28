import './globals.css';
import Navbar from '../components/Navbar'; // ✅ Correct import

export const metadata = {
  title: 'Caprock Capital Group',
  description: 'Your trusted automotive financing partner.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* ✅ Navbar at top */}
        {children}
      </body>
    </html>
  );
}
