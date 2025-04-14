import type { EMealTypes } from "@jcmono/api-contract";

export type TScheduleMealFormProps = {
  addMealDialogOpen: boolean;
  initialSelectedDay: Date | null;
  initialMealType: EMealTypes;
  handleCloseDialog: () => void;
};
