import EndlessBlogFeed from "@/components/BlogPost";

import { ContactSection } from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SeedFundPage() {
    return (
      <main className="relative">
          <Navbar/>         
          <ContactSection />
          <Footer />
      </main>
    );
  }
