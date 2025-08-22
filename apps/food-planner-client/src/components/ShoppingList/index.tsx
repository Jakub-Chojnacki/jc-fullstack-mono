import { Card, CardContent } from "@jcmono/ui";
import { ShoppingBag, ShoppingCart } from "lucide-react";

import useGetShoppingListIngredients from "@queries/useGetShoppingListIngredients";

import AddShoppingListItemForm from "@forms/AddShoppingListItemForm";

import HeaderWithIcon from "../HeaderWithIcon";

import ShoppingListItem from "./components/ShoppingListItem";

function ShoppingList() {
  const { data } = useGetShoppingListIngredients();

  return (
    <div className="max-h-full overflow-hidden flex flex-col">
      <HeaderWithIcon icon={ShoppingBag} title="Shopping List" />
      <div className="">
        <AddShoppingListItemForm />
      </div>

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
        <Card className="my-4 overflow-y-auto max-h-[calc(100vh-48px)]">
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
