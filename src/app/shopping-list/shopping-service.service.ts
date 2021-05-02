import { Injectable } from '@angular/core';
import { Ingredients } from '../Shared/Ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientSelected = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apples', 100),
    new Ingredients('Oranges', 100),
    new Ingredients('Coriander', 100),
    new Ingredients('Wheat', 100)
  ];

  constructor() { }

  getAllIngredients() {
    return this.ingredients ;
  }

  getIngredientById(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
  }

  updateIngredient(ingredient: Ingredients, index: number) {
    this.ingredients[index] = ingredient ;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
}
