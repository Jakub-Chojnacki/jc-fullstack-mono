import { Link } from "@tanstack/react-router";
import { ChefHat } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="ml-auto mr-auto container px-4 lg:px-8 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          <span className="text-xl font-bold">MealMaster</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            How It Works
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/signin">
            <Button variant="outline" className="hidden sm:flex">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingHeader;
