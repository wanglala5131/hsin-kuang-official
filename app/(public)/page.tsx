import About from '@/app/_components/Home/About.tsx';
import Banner from '@/app/_components/Home/Banner';
import Customization from '@/app/_components/Home/Customization';
import Scenarios from '@/app/_components/Home/Scenarios';

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
