import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { IngredientsModule } from './ingredients/ingredients.module';
import { auth } from './lib/auth';
import { PrismaModule } from './prisma/prisma.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { ScheduleMealsModule } from './schedule-meals/schedule-meals.module';
import { ShoppingListIngredientsModule } from './shopping-list-ingredients/shopping-list-ingredients.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule.forRootAsync({
      useFactory: () => ({
        auth,
      }),
    }),
    IngredientsModule,
    PrismaModule,
    RecipesModule,
    RecipeIngredientsModule,
    ScheduleMealsModule,
    ShoppingListIngredientsModule,
    UploadModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
