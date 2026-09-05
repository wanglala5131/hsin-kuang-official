import About from '@/app/_components/Home/About.tsx';
import Banner from '@/app/_components/Home/Banner';
import Customization from '@/app/_components/Home/Customization';
import Scenarios from '@/app/_components/Home/Scenarios';
import { getPageDictionary } from '@/app/_lib/get-page-dictionary';

export default async function Home() {
  const { locale, dict } = await getPageDictionary();

  return (
    <main>
      <Banner dict={dict.home.banner} />
      <About lang={locale} dict={dict.home.about} />
      <Scenarios lang={locale} dict={dict.home.scenarios} />
      <Customization lang={locale} dict={dict.home.customization} />
    </main>
  );
}
