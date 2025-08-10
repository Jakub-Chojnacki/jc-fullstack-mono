import { ChefHat } from "lucide-react";

import { footerSections } from "./const";

function LandingFooter() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-inherit px-4 lg:px-8">
      <div className="container flex flex-col gap-8 py-12 md:py-16 mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              <span className="text-xl font-bold">MealMaster</span>
            </div>
            <p className="max-w-[350px] text-sm text-muted-foreground">
              Simplifying meal planning for busy people. Plan your meals,
              generate shopping lists, and reduce food waste.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerSections.map(section => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-medium">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            ©
            {" "}
            {new Date().getFullYear()}
            {" "}
            MealMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
