import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | IIT Sri Lanka`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "IEEE WIE IIT",
    "Women in Engineering Sri Lanka",
    "IIT Sri Lanka STEM",
    "Women in STEM",
    "IEEE student branch",
    "tech community Sri Lanka",
    "female leadership in technology",
    "engineering events Sri Lanka",
  ],
  category: "education",
  authors: [{ name: "IEEE WIE Affinity Group of IIT" }],
  creator: "IEEE WIE Affinity Group of IIT",
  publisher: "Informatics Institute of Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteName} | IIT Sri Lanka`,
    description: siteDescription,
    siteName,
    locale: "en_LK",
    images: [
      {
        url: `${siteUrl}/Images/bgphoto.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} at IIT Sri Lanka`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | IIT Sri Lanka`,
    description: siteDescription,
    images: [`${siteUrl}/Images/bgphoto.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "IEEE Women in Engineering Affinity Group - IIT Sri Lanka",
    alternateName: "IEEE WIE IIT",
    url: siteUrl,
    description: siteDescription,
    sameAs: [
      "https://www.instagram.com/ieeewieiit?igsh=MWpwdHR6c2ZhNzVzaA==",
      "https://www.linkedin.com/company/wie-affinity-group-of-iit/posts/?feedView=all",
      "https://www.facebook.com/share/14DNsp2yrmi/",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Informatics Institute of Technology",
    },
  };

  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1P9HSCP74K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1P9HSCP74K');
          `}
        </Script>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
