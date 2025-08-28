import { MAXIMUM_SAVED_SHOPPING_LIST_ITEMS } from "@jcmono/api-contract";

import type { TItemCountBadgeProps } from "./types";

function ItemCountBadge({ count }: TItemCountBadgeProps) {
  const getBadgeStyles = (): string => {
    const ratio = count / MAXIMUM_SAVED_SHOPPING_LIST_ITEMS;
    if (ratio >= 0.9)
      return "bg-red-100 text-red-700 border border-red-200";
    if (ratio >= 0.7)
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    if (ratio >= 0.5)
      return "bg-blue-100 text-blue-700 border border-blue-200";
    return "bg-green-100 text-green-700 border border-green-200";
  };

  const badgeClasses = `px-3 rounded-full text-sm font-medium mr-4 transition-colors ${getBadgeStyles()}`;

  return (
    <div className={badgeClasses}>
      <span className="flex items-center gap-1 h-full">
        <span>
          {count}
          {" "}
          /
          {" "}
          {MAXIMUM_SAVED_SHOPPING_LIST_ITEMS}
        </span>
      </span>
    </div>
  );
}

export default ItemCountBadge;
