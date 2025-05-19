import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

function LandingHero() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Plan Your Meals, Simplify Your Life
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Organize your recipes, schedule your meals, and generate
                shopping lists with ease. Take the stress out of meal planning.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white"
                >
                  Start Planning Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 mx-auto lg:ml-auto lg:order-2">
            <img
              src="https://placehold.co/600x400"
              alt="Meal planning app interface"
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
