import Navbar from '@/components/Navbar';
import Banner from '@/components/Banner';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export const metadata = {
  title: 'Abdulkadir Akyurt — Portfolio',
  description: 'ISTQB Certified QA Engineer & Blockchain Enthusiast',
};

export default function Home() {
  const articles = getAllArticles();
  return (
    <main style={{ background: '#121212', minHeight: '100vh', fontFamily: "var(--font-karla), 'Karla', sans-serif" }}>
      <Navbar />
      <Banner />
      <Skills />
      <Projects articles={articles} />
      <Contact />
      <Footer />
    </main>
  );
}
