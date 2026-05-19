import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Articles from '@/components/Articles';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import ClientStarCanvas from '@/components/ClientStarCanvas';

export default function Home() {
  return (
    <main style={{ background: '#0a0a12', minHeight: '100vh' }}>
      <ClientStarCanvas />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Skills />
        <Articles />
        <Contact />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
