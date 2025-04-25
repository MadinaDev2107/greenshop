import "bootstrap/dist/css/bootstrap.min.css";

import HeroSection from "./Section1";
import PlantShop from "./Section2";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <PlantShop />
      <Footer />
    </div>
  );
}
