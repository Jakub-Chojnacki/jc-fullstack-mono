import type { iconMap } from "./const";

export type TLandingSingleFeatureProps = {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
};
