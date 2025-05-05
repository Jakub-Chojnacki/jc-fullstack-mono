import type { ComponentType, SVGProps } from "react";

export type THeaderWithIconProps = {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
