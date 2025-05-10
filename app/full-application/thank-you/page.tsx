export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Thank You!</h1>
      <p className="text-gray-700 text-lg mb-6">
        Your full credit application has been submitted.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
