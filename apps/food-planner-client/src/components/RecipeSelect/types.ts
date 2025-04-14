import type { Control, FieldValues, Path } from "react-hook-form";

export type TRecipeSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};
