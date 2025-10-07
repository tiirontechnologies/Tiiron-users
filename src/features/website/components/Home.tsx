import HeroSection from "./home/HeroSection";
import Testimonials from "./home/Testimonials";
import WhoAndWhy from "./home/WhoAndWhy";
import CTA from "./home/CTA";
import HomeFeatures from "./home/HomeFeatures";

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
