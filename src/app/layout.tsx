import type { Metadata, Viewport } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/data";
import { localBusinessLd, websiteLd } from "@/lib/seo";

const heading = Cinzel({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
const body = Josefin_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });

const description = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: site.name, template: `%s | ${site.name}` },
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.name, description },
};

export const viewport: Viewport = { themeColor: "#FAF5F2" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <JsonLd data={[localBusinessLd(), websiteLd()]} />
      </body>
    </html>
  );
}
