import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://pawtrust.in"),
  title: {
    default: "PawTrust — Find Healthy Puppies From Trusted Breeders Near You",
    template: "%s | PawTrust",
  },
  description:
    "PawTrust connects puppy buyers with verified breeders across India. Browse Labrador, Golden Retriever, Husky, German Shepherd and more. Safe buying, vaccinated puppies.",
  keywords: ["puppies for sale India", "buy puppy", "verified breeders", "PawTrust", "labrador puppy"],
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
        <StickyWhatsApp />
      </body>
    </html>
  );
}
