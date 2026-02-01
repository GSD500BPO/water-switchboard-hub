import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WaterAlerts } from "@/components/home/WaterAlerts";
import { CategoryIcons } from "@/components/home/CategoryIcons";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WaterAlerts />
        <CategoryIcons />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
