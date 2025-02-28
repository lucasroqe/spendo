import Header from '@/components/main-page/Header'
import Hero from '@/components/main-page/Hero'
import Footer from '@/components/main-page/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <Footer />
    </div>
  )
}
