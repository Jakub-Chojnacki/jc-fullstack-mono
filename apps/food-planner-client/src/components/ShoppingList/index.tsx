import { ShoppingBag, ShoppingCart } from "lucide-react";

import useGetShoppingListIngredients from "@queries/useGetShoppingListIngredients";

import AddShoppingListItemForm from "@forms/AddShoppingListItemForm";

import ShoppingListItem from "../ShoppingListItem";
import { Card, CardContent } from "../ui/card";

function ShoppingList() {
  const { data } = useGetShoppingListIngredients();

  return (
    <div>
      <div className="flex items-center">
        <ShoppingBag className="h-6 w-6 mr-2" />
        <h2 className="text-3xl font-bold">Shopping List</h2>
      </div>

      <AddShoppingListItemForm />

      {data && !data.body.length && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your shopping list is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Add items manually using the form above or generate a list from your meal schedule.
          </p>
        </div>
      )}

      {data && data.body.length > 0 && (
        <Card className="my-4">
          <CardContent className="p-0">
            <ul className="divide-y">
              {data.body.map(item => <ShoppingListItem key={item.id} item={item} />)}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ShoppingList;
