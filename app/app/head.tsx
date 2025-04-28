
export default function Head() {
  return (
    <>
      <title>Caprock Capital Group | Trusted Canadian Auto Financing</title>
      <meta name="description" content="Caprock Capital Group offers transparent and flexible car loan solutions across Canada. Get pre-approved quickly and securely." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Caprock Capital Group | Car Financing Made Simple" />
      <meta property="og:description" content="Get fast, secure auto loan pre-approvals across Canada." />
      <meta property="og:image" content="https://caprockcapitalgroup.com/og-preview.png" />
      <meta property="og:url" content="https://caprockcapitalgroup.com" />
      <meta property="og:type" content="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Caprock Capital Group",
            "url": "https://caprockcapitalgroup.com",
            "areaServed": "CA",
            "serviceType": "Auto Loans",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "112 - 970 Burrard Street",
              "addressLocality": "Vancouver",
              "addressRegion": "BC",
              "postalCode": "V6Z 2R4",
              "addressCountry": "Canada"
            }
          })
        }}
      />
    </>
  );
}
