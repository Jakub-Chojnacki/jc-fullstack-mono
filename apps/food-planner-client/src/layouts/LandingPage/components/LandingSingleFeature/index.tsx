import { iconMap } from "./const";

import type { TLandingSingleFeatureProps } from "./types";

function LandingSingleFeature({ icon, title, description }: TLandingSingleFeatureProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900">
          <IconComponent className="h-6 w-6 text-violet-600 dark:text-violet-400" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground pl-15 ml-15">{description}</p>
    </div>
  );
}

export default LandingSingleFeature;
