import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/lib/site";
import { locations } from "@/content/locations";
import { ExpertProvider } from "@/components/layout/ExpertProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ExpertModal } from "@/components/layout/ExpertModal";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { WhatsAppModal } from "@/components/whatsapp/WhatsAppModal";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SPC — 100% Solids, Zero-VOC Pipeline & Protective Coatings",
    template: "%s | SPC Specialty Polymer Coatings",
  },
  description: site.description,
  applicationName: "SPC",
  openGraph: {
    type: "website",
    siteName: "SPC — Specialty Polymer Coatings",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b1f33",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const hq = locations[0];
  return (
    <html lang="en">
      <head>
        {/* Consent Mode v2 defaults must run before any tag loads. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
        </Script>
      </head>
      <body>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            alternateName: "SPC",
            url: site.url,
            foundingDate: String(site.founded),
            description: site.description,
            slogan: site.brandLine,
            telephone: site.phone.display,
            faxNumber: site.fax,
            address: {
              "@type": "PostalAddress",
              streetAddress: "#14 – 1595 Cliveden Avenue",
              addressLocality: "Delta",
              addressRegion: "BC",
              postalCode: "V3M 6M2",
              addressCountry: "CA",
            },
            location: { "@type": "Place", name: hq.name },
            parentOrganization: { "@type": "Organization", name: site.parent.name, url: site.parent.url },
            sameAs: Object.values(site.social).filter(Boolean),
          }}
        />
        <ExpertProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
          <MobileActionBar />
          <ChatWidget />
          <ExpertModal />
          <WhatsAppModal />
          <ConsentBanner />
        </ExpertProvider>
      </body>
    </html>
  );
}
