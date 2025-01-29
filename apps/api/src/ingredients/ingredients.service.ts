import { Injectable } from '@nestjs/common';
import { type TIngredient } from 'api-contract';

@Injectable()
export class IngredientsService {
  create(body: TIngredient) {
    //TODO: Implement db logic
    return body;
  }
}
