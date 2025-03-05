import { Module } from '@nestjs/common';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';
import { ShoppingListIngredientsController } from './shopping-list-ingredients.controller';

@Module({
  controllers: [ShoppingListIngredientsController],
  providers: [ShoppingListIngredientsService],
})
export class ShoppingListIngredientsModule {}
