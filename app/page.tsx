import { AwardsSlider } from '@/components/AwardsSlider';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Hero } from '@/components/Hero';
import { LeadForm } from '@/components/LeadForm';
import { ProcessSection } from '@/components/ProcessSection';
import { Stats } from '@/components/Stats';

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <ProcessSection />
      <Stats />
      <AwardsSlider />
      <Gallery />
      <LeadForm />
      <Footer />
    </main>
  );
}
