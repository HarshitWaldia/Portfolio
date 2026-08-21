import Hero from "@/components/home/hero";
import BentoGrid from "@/components/home/bento";
import CuratedWork from "@/components/home/curated-work";
import SecretSauce from "@/components/home/secret-sauce";
import ResponsivePreview from "@/components/home/responsive-preview";
import AboutSummary from "@/components/home/about-summary";
import Testimonials from "@/components/home/testimonials";
import ExploreMore from "@/components/home/explore-more";
import ContactBanner from "@/components/home/contact-banner";
import { useMetadata } from "@/hooks/use-metadata";

export default function HomePage() {
  useMetadata();
  const isPreview = typeof window !== "undefined" && window.location.search.includes("preview=true");

  return (
    <>
      <Hero />
      <div className="w-full max-w-none px-2 sm:px-4 lg:px-6 relative flex flex-col z-10">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          {/* Left vertical bar */}
          <div
            aria-hidden="true"
            className="w-full border-x border-white/5 bg-stripes-vertical [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] [WebkitMaskImage:linear-gradient(to_bottom,transparent,black_10rem)]"
          />

          {/* Main Content */}
          <div className="min-w-0 flex-1">
            <BentoGrid />
            <CuratedWork />
            <SecretSauce />
            {!isPreview && <ResponsivePreview />}
            <AboutSummary />
            <Testimonials />
            <ExploreMore />
            <ContactBanner />
          </div>

          {/* Right vertical bar */}
          <div
            aria-hidden="true"
            className="w-full border-x border-white/5 bg-stripes-vertical [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] [WebkitMaskImage:linear-gradient(to_bottom,transparent,black_10rem)]"
          />
        </div>
      </div>
    </>
  );
}
