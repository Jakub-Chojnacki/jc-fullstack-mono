import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { ScheduleMealsModule } from './schedule-meals/schedule-meals.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IngredientsModule,
    AuthModule,
    PrismaModule,
    RecipesModule,
    RecipeIngredientsModule,
    ScheduleMealsModule,
    ShoppingListModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
