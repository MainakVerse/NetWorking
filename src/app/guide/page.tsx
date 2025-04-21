import EndlessBlogFeed from "@/components/BlogPost";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SeedFundPage() {
    return (
      <main className="relative">
          <Navbar/>
          <EndlessBlogFeed />
          <Footer />
      </main>
    );
  }
