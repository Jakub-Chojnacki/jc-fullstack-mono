import { Trash } from "lucide-react";

import useDeleteShoppingListIngredient from "@queries/useDeleteShoppingListIngredient";
import useUpdateShoppingListIngredient from "@queries/useUpdateShoppingListIngredient";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import type { TShoppingListItemProps } from "./types";

function ShoppingListItem({ item }: TShoppingListItemProps) {
  const { mutate: deleteItem } = useDeleteShoppingListIngredient();
  const { mutate: updateItem } = useUpdateShoppingListIngredient();

  const toggleItemChecked = (id: string | number) => {
    updateItem({ params: { id }, body: { ...item, isDone: !item.isDone } });
  };

  const removeItem = (id: string | number) => {
    deleteItem({ params: { id } });
  };

  return (
    <li className="flex items-center p-3 group">
      <Checkbox
        id={`item-${item.id}`}
        checked={item.isDone}
        onCheckedChange={() => toggleItemChecked(item.id)}
        className="mr-3"
      />
      <label
        htmlFor={`item-${item.id}`}
        className={`flex-grow cursor-pointer ${item.isDone ? "line-through text-muted-foreground" : ""}`}
      >
        <span className="font-medium">{item.ingredient.name}</span>
        <span className="ml-2 text-muted-foreground">
          {item.amount}
          {" "}
          {item.unit}
        </span>

      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </li>

  );
}

export default ShoppingListItem;
