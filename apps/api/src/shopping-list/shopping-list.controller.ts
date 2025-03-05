import { Controller } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}
}
