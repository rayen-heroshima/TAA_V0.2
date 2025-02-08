

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";




export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
        <Hero />
        {children}

        <ContactSection />
        <Footer />
    </div>
  );
}