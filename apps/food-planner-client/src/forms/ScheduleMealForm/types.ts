import type { EMealTypes } from "@jcmono/api-contract";

export type TScheduleMealFormProps = {
  initialSelectedDay: Date | null;
  initialMealType: EMealTypes;
  handleCloseDialog: () => void;
};
