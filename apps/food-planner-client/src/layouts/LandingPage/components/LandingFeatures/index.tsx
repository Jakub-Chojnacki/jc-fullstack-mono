import LandingSingleFeature from "../LandingSingleFeature";

import { features } from "./const";

function LandingFeatures() {
  return (
    <section id="features" className="bg-slate-50 dark:bg-inherit py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need for Meal Planning
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our app simplifies your meal planning process from start to finish
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-8 py-16 md:grid-cols-2 lg:gap-16">
          {features.map(feature => <LandingSingleFeature key={feature.title} {...feature} />)}
        </div>
      </div>
    </section>
  );
}

export default LandingFeatures;
