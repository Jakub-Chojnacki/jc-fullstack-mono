import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IngredientsModule,
    AuthModule,
    PrismaModule,
  ],
  providers: [AppService],
})
export class AppModule {}
