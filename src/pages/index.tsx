import Header from '../components/header/index';
import FirstSection from '../components/firstSection/index';
import SecondSection from '@/components/secondSection';
import ThirdSection from '@/components/thirdSection';
import ForthSection from '@/components/forthSection';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div>
      <Header />
      <div id='home' className='pb-32'>
        <FirstSection />
      </div>
      <div className='px-4'>
        <div id='about' className='scroll-mt-8'>
          <SecondSection />
        </div>

        <div id='services' className='scroll-mt-8'>
          <ThirdSection />
        </div>
      </div>

      <div id='contact' className='scroll-mt-8 pb-24'>
        <ForthSection />
      </div>

      <div className=''>
        <Footer />
      </div>

    </div>
  );
}
