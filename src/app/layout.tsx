import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pawtrust.in"),
  title: {
    default: "PawTrust — Find Verified Puppies for Sale in India",
    template: "%s | PawTrust",
  },
  description:
    "PawTrust connects puppy buyers with verified breeders and pet owners across India. Browse Labrador, Golden Retriever, Beagle puppies and more.",
  keywords: ["puppies for sale", "buy puppy India", "verified breeders", "PawTrust"],
  openGraph: {
    siteName: "PawTrust.in",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
