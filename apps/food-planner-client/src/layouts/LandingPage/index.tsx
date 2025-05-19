import LandingFeatures from "./components/LandingFeatures";
import LandingFooter from "./components/LandingFooter";
import LandingHeader from "./components/LandingHeader";
import LandingHero from "./components/LandingHero";
import LandingHow from "./components/LandingHow";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col ">
      <LandingHeader />
      <main className="px-8 flex items-center flex-col">
        <LandingHero />
        <LandingFeatures />
        <LandingHow />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
