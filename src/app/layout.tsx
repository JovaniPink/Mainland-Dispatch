import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site";
import { Masthead } from "@/components/shell/masthead";
import { Footer } from "@/components/shell/footer";
import { catalog } from "@/content/catalog";
import { JsonLd } from "@/components/seo/json-ld";
import { siteUrl, socialImage } from "@/lib/seo";

void catalog;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "Research and analysis",
  keywords: [
    "China",
    "US-China relations",
    "Chinese culture",
    "China technology",
    "China economy",
    "China research notebook",
    "podcast analysis",
    "evidence-led analysis",
    "source transparency",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Mainland Dispatch correspondent notebook editorial cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const themeInit = `try{var t=localStorage.getItem("md-theme");if(t==="night")document.documentElement.dataset.theme="night"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                name: site.name,
                url: siteUrl,
                logo: `${siteUrl}/favicon.ico`,
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                url: siteUrl,
                name: site.name,
                description: site.tagline,
                publisher: { "@id": `${siteUrl}/#organization` },
                inLanguage: "en-US",
              },
            ],
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a
          href="#main-content"
          className="skip-link fixed left-3 top-3 z-50 -translate-y-24 bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="notebook-margin min-h-screen lg:pl-24">
          <div className="mx-auto max-w-6xl">
            <Masthead />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
