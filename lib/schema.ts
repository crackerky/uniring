export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Üniring",
  description: "高校生発、ハラスメント未然防止教育プログラム",
  url: "https://uniring.jp",
  logo: "https://uniring.jp/logo.png",
  sameAs: [
    "https://www.instagram.com/uniring_study",
    "https://www.facebook.com/Uniring-Study",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "上野3丁目16-2天翔上野末広町ビル702",
    addressLocality: "台東区",
    addressRegion: "東京都",
    postalCode: "110-0005",
    addressCountry: "JP"
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "uniring2025@gmail.com",
    contactType: "customer service"
  }
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ハラスメント未然防止教育プログラム",
  provider: {
    "@type": "Organization",
    name: "Üniring"
  },
  serviceType: "Educational Program",
  areaServed: {
    "@type": "Country",
    name: "Japan"
  }
};