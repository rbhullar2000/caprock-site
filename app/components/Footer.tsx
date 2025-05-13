export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 mt-12 border-t">
      <p>
        © {new Date().getFullYear()} Caprock Capital Group Inc. All rights reserved.{' '}
        <a
          href="/privacy-policy"
          className="text-blue-600 hover:underline ml-2"
        >
          Privacy Policy
        </a>
      </p>
    </footer>
  );
}
