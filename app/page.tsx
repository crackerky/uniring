import { Hero } from '@/components/hero/Hero';
import { News } from '@/components/news/News';
import { Awareness } from '@/components/awareness/Awareness';
import { Mission } from '@/components/mission/Mission';
import { Services } from '@/components/services/Services';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { About } from '@/components/about/About';
import { Origin } from '@/components/origin/Origin';
import { Timeline } from '@/components/timeline/Timeline';
import { Media } from '@/components/media/Media';
import { Organization } from '@/components/organization/Organization';
import { Contact } from '@/components/contact/Contact';
import { IntroOverlay } from '@/components/intro/IntroOverlay';

// Use a server-side component for the main page since we're just composing components
export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Hero />
      <News />
      <Awareness />
      <Mission />
      <Services />
      <Testimonials />
      <About />
      <Origin />
      <Timeline />
      <Media />
      <Organization />
      <Contact />
    </>
  );
}