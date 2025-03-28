import { Card, CardContent } from "../ui/card";

import { TIngredientCardProps } from "./types";

const IngredientCard = ({ ingredient }: TIngredientCardProps) => {
  const { name, amount, unit } = ingredient;

  const text = `${name} | ${amount} ${unit.toLowerCase()}`;

  return (
    <Card className="my-2">
      <CardContent className="p-4 ">
        <span>{text}</span>
      </CardContent>
    </Card>
  );
};

export default IngredientCard;
