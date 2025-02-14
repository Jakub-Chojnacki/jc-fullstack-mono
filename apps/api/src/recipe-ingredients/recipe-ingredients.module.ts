import { Module } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { RecipeIngredientsController } from './recipe-ingredients.controller';

@Module({
  controllers: [RecipeIngredientsController],
  providers: [RecipeIngredientsService],
})
export class RecipeIngredientsModule {}
