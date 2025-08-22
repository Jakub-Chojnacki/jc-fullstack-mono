import type { Control, FieldValues, Path } from "react-hook-form";

export type TScheduleRecipeSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};
