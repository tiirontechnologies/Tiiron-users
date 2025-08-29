import HeroSection from "@components/Home/home/HeroSection";
import Testimonials from "@components/Home/home/Testimonials";
import CTA from "@components/Home/home/CTA";
import HomeFeatures from "@components/Home/home/HomeFeatures";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <HomeFeatures />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default Home;
