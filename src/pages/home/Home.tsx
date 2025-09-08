import HeroSection from "@components/Home/home/HeroSection";
import Testimonials from "@components/Home/home/Testimonials";
import WhoAndWhy from "@components/Home/home/WhoAndWhy";
import CTA from "@components/Home/home/CTA";
import HomeFeatures from "@components/Home/home/HomeFeatures";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <HomeFeatures />
      <WhoAndWhy />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default Home;
