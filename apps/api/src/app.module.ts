import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { AtGuard } from './common/guards';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { ScheduleMealsModule } from './schedule-meals/schedule-meals.module';
import { ShoppingListIngredientsModule } from './shopping-list-ingredients/shopping-list-ingredients.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    IngredientsModule,
    AuthModule,
    PrismaModule,
    RecipesModule,
    RecipeIngredientsModule,
    ScheduleMealsModule,
    ShoppingListIngredientsModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
