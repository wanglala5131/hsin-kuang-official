import About from '@/app/_components/About.tsx';
import Banner from '@/app/_components/Banner';
import Customization from '@/app/_components/Customization';
import Scenarios from '@/app/_components/Scenarios';

export default function Home() {
  return (
    <main>
      <Banner />
      <About />
      <Scenarios />
      <Customization />
    </main>
  );
}
