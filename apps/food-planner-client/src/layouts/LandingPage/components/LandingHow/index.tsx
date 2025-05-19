import LandingHowSinglePoint from "../LandingHowSinglePoint";

import { steps } from "./const";

function LandingHow() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How MealMaster Works</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Four simple steps to transform your meal planning experience
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-16 md:grid-cols-4">
          {steps.map(step => <LandingHowSinglePoint key={step.number} {...step} />)}
        </div>
      </div>
    </section>
  );
}

export default LandingHow;
