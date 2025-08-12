import { EMealTypes } from "@jcmono/api-contract";

export const mealTypeColors = {
  [EMealTypes.BREAKFAST]: "bg-yellow-50 border-yellow-200 text-yellow-800",
  [EMealTypes.LUNCH]: "bg-orange-50 border-orange-200 text-orange-800",
  [EMealTypes.DINNER]: "bg-blue-50 border-blue-200 text-blue-800",
  [EMealTypes.SNACK]: "bg-green-50 border-green-200 text-green-800",
};
