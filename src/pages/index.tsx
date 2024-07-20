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
      <div className='pb-32'>
        <FirstSection />
      </div>
      <div className='px-4'>
        <div className=''>
          <SecondSection />
        </div>

        <div>
          <ThirdSection />
        </div>
      </div>

      <div>
        <ForthSection />
      </div>

      <div className=''>
        <Footer />
      </div>

    </div>
  );
}
