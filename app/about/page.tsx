import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/logo.png"
          alt="Caprock Logo"
          width={80}
          height={80}
          className="h-16 w-auto"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          About Caprock
        </h1>
      </div>

      <p className="text-gray-700 leading-relaxed">
        Caprock Capital Group is committed to providing fast, transparent, and trusted vehicle financing solutions tailored to Canadians.
      </p>
    </div>
  );
}
