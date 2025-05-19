import type { TLandingHowSinglePointProps } from "./types";

function LandingHowSinglePoint({ number, description, title }: TLandingHowSinglePointProps) {
  return (
    <div className="flex flex-col items-center space-y-4 border rounded-lg p-6 shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 font-bold text-2xl">
        {number}
      </div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-center text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default LandingHowSinglePoint;
