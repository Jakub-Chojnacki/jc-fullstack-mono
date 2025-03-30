import { EMealTypes } from "@jcmono/api-contract";

export const mealTypes = Object.keys(EMealTypes) as Array<
  keyof typeof EMealTypes
>;
