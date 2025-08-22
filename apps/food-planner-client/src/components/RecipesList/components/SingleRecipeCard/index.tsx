import { Button, Card, CardContent } from "@jcmono/ui";
import { Edit, Search, Trash } from "lucide-react";

import { cn } from "@/lib/utils";

import type { TRecipeCardProps } from "./types";

function SingleRecipeCard({
  recipe,
  onPreview,
  onEdit,
  onDelete,
  className,
}: TRecipeCardProps) {
  const { name, description, id, isGlobal } = recipe;

  const imageUrl = "https://placehold.co/200x120?text=Recipe+Image";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-32 object-cover"
          />
          {isGlobal && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              Global
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex-1 min-w-0 mb-3">
            <h3 className="font-semibold text-lg leading-tight truncate mb-1">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description || "No description available"}
            </p>
          </div>
          <div className="flex items-center justify-end gap-1">
            {onPreview && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => onPreview(id)}
                title="Preview recipe"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => onEdit(id)}
                title="Edit recipe"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => onDelete(id)}
                title="Delete recipe"
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleRecipeCard;
