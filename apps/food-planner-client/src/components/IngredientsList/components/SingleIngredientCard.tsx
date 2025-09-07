import { Button, Card, CardContent } from "@jcmono/ui";
import { Edit, Trash } from "lucide-react";

import { cn } from "@/lib/utils";

import type { TIngredientCardProps } from "./types";

function SingleIngredientCard({
  ingredient,
  handleDelete,
  handleEdit,
  className,
}: TIngredientCardProps) {
  const { name, id, imageUrl } = ingredient;

  const displayImageUrl = imageUrl || "https://placehold.co/64x64?text=Food+Placeholder";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-4">
          <div className="w-16 h-16 flex-shrink-0 relative bg-muted rounded-md overflow-hidden">
            <img
              src={displayImageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight truncate">
              {name}
            </h3>
          </div>
          <div className="flex gap-2">
            {handleEdit && (
              <Button
                variant="ghost"
                type="button"
                onClick={() => handleEdit(id)}
              >
                <Edit />
              </Button>
            )}
            {handleDelete && (
              <Button
                variant="ghost"
                type="button"
                onClick={() => handleDelete(id)}
              >
                <Trash />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleIngredientCard;
