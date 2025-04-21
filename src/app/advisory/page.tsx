import ChatInterface from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profiling";
export default function SeedFundPage() {
    return (
      <main className="relative">
          <Navbar/>
          <ChatInterface />
          <Footer />
      </main>
    );
  }
