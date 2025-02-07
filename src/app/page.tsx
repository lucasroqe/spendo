import Header from "@/components/main-page/Header";
import Hero from "@/components/main-page/Hero";
import Footer from "@/components/main-page/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
