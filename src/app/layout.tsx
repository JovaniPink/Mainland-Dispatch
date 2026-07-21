import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site";
import { Masthead } from "@/components/shell/masthead";
import { Footer } from "@/components/shell/footer";
import { PrototypeNotice } from "@/components/shell/prototype-notice";
import { catalog, isPrototypeCatalog } from "@/content/catalog";

void catalog;

export const metadata: Metadata = {
  metadataBase: new URL("https://mainlanddispatch.com"),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mainland Dispatch Evidence Atlas map and semiconductor evidence chain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/og.png"],
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
            {isPrototypeCatalog && <PrototypeNotice />}
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
