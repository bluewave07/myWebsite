import CloneNavbar from '@/components/Clone/CloneNavbar';
import CloneBanner from '@/components/Clone/CloneBanner';
import CloneSkills from '@/components/Clone/CloneSkills';
import CloneProjects from '@/components/Clone/CloneProjects';
import CloneContact from '@/components/Clone/CloneContact';
import CloneNewsletter from '@/components/Clone/CloneNewsletter';
import CloneFooter from '@/components/Clone/CloneFooter';

export const metadata = {
  title: 'Abdulkadir Akyurt — Portfolio',
  description: 'ISTQB Certified QA Engineer & Blockchain Enthusiast',
};

export default function Home() {
  return (
    <main style={{ background: '#121212', minHeight: '100vh', fontFamily: "var(--font-karla), 'Karla', sans-serif" }}>
      <CloneNavbar />
      <CloneBanner />
      <CloneSkills />
      <CloneProjects />
      <CloneContact />
      <CloneNewsletter />
      <CloneFooter />
    </main>
  );
}
